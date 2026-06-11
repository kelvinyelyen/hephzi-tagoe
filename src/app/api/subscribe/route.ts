import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/subscribers.json');

// Helper to safely read subscribers
async function readSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to safely write subscribers
async function writeSubscribers(subscribers: string[]) {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (_) {}
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf8');
}

// GET: Retrieve all subscribers (Protected)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const passcode = searchParams.get('passcode') || '';
    
    // Simple authentication check
    if (passcode.toLowerCase() !== 'hephzi') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscribers = await readSubscribers();
    const resendConfigured = !!process.env.RESEND_API_KEY;
    return NextResponse.json({ subscribers, resendConfigured });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add a new subscriber (Public)
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const subscribers = await readSubscribers();
    const normalizedEmail = email.trim().toLowerCase();

    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }

    subscribers.push(normalizedEmail);
    await writeSubscribers(subscribers);

    return NextResponse.json({ success: true, message: 'Successfully subscribed' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
