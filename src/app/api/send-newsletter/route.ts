import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { title, subject, content, subscribers } = await request.json();

    if (!title || !subject || !content || !subscribers || !Array.isArray(subscribers)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'Subscribers list is empty' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("WARNING: RESEND_API_KEY is not defined. Simulating email dispatch in development mode.");
      console.log(`\n=================== SIMULATED EMAIL DISPATCH ===================`);
      console.log(`To: ${subscribers.join(', ')}`);
      console.log(`Subject: ${subject}`);
      console.log(`Title: ${title}`);
      console.log(`Body:\n${content}`);
      console.log(`================================================================\n`);
      
      return NextResponse.json({ 
        success: true, 
        simulated: true, 
        message: `Simulated dispatch of '${title}' to ${subscribers.length} subscribers (local dev mode).` 
      });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'newsletter@drhephzibah.com';
    const fromName = process.env.RESEND_FROM_NAME || 'Dr. Hephzi Newsletter';
    
    const appUrl = process.env.APP_URL || 'https://drhephzibah.com';
    let logoAttachment: any = null;
    let logoSrc = `${appUrl}/HANAT.png`;

    try {
      const logoPath = path.join(process.cwd(), 'public', 'HANAT.png');
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        logoAttachment = {
          filename: 'HANAT.png',
          content: logoBuffer,
          contentId: 'hanat-logo',
        };
        logoSrc = 'cid:hanat-logo';
      }
    } catch (err) {
      console.error('Failed to load inline logo attachment:', err);
    }

    const hasHtml = /<[a-z][\s\S]*>/i.test(content);
    const formattedContent = hasHtml 
      ? content 
      : content.split('\n\n').map((p: string) => `<p style="margin-bottom: 1.5rem;">${p}</p>`).join('');

    // Send emails
    const sendPromises = subscribers.map(async (email: string) => {
      try {
        const response = await resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: email,
          subject: subject,
          html: `
            <div style="font-family: 'Georgia', serif; color: #352d3d; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.85;">
              <div style="margin-bottom: 25px; text-align: center;">
                <img src="${logoSrc}" alt="HANAT Logo" style="height: 40px; width: auto; display: inline-block;" />
              </div>
              <h1 style="font-family: 'Georgia', serif; color: #1e1329; font-weight: 400; border-top: 1px solid rgba(43,41,39,0.08); border-bottom: 1px solid rgba(43,41,39,0.08); padding: 15px 0; margin-top: 20px; margin-bottom: 25px; text-align: center; font-size: 24px;">
                ${title}
              </h1>
              <p style="font-style: italic; color: #6f647d; font-size: 14px; margin-bottom: 25px; text-align: center;">
                Delivered to Dr. Hephzi's scientific network.
              </p>
              <div style="font-size: 16px;">
                ${formattedContent}
              </div>
              <hr style="border: none; border-top: 1px solid rgba(43,41,39,0.08); margin: 40px 0 20px 0;" />
              <p style="font-family: sans-serif; font-size: 12px; color: #6f647d; text-align: center;">
                &copy; ${new Date().getFullYear()} Dr. Hephzi Angela Tagoe. All rights reserved.<br />
                You received this email because you subscribed to Dr. Hephzi's newsletter.
              </p>
            </div>
          `,
          attachments: logoAttachment ? [logoAttachment] : undefined
        });

        if (response.error) {
          console.error(`Resend API error sending to ${email}:`, response.error);
          return { success: false, email, error: response.error.message || JSON.stringify(response.error) };
        }

        return { success: true, email, id: response.data?.id };
      } catch (err: any) {
        console.error(`Resend catch error sending to ${email}:`, err);
        return { success: false, email, error: err.message || err };
      }
    });

    const results = await Promise.all(sendPromises);
    const failures = results.filter(r => !r.success);
    const successes = results.filter(r => r.success);

    if (failures.length === results.length) {
      const errorMsg = failures[0].error || 'Resend API rejected delivery.';
      return NextResponse.json({ 
        error: `Resend dispatch failed: ${errorMsg} (Sender: ${fromEmail}). If you are using a sandbox account, make sure your recipients are authorized, or set RESEND_FROM_EMAIL=onboarding@resend.dev in .env.local.`
      }, { status: 400 });
    }

    if (failures.length > 0) {
      return NextResponse.json({ 
        success: true, 
        simulated: false,
        warning: `Dispatched to ${successes.length} subscribers, but failed for ${failures.length} (Error: ${failures[0].error})`,
        results 
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      simulated: false,
      results 
    });
    
  } catch (error: any) {
    console.error('API newsletter handler error:', error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
