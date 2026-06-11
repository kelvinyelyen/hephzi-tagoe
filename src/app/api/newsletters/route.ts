import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/newsletters.json');

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  date: string;
  content: string;
  readTime: string;
}

// Helper to safely read newsletters
async function readNewsletters(): Promise<Newsletter[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to safely write newsletters
async function writeNewsletters(newsletters: Newsletter[]) {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (_) {}
  await fs.writeFile(DATA_FILE, JSON.stringify(newsletters, null, 2), 'utf8');
}

// Helper to check auth passcode
function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return token.toLowerCase() === 'hephzi';
}

// GET: Retrieve custom newsletters (Public)
export async function GET() {
  try {
    const newsletters = await readNewsletters();
    return NextResponse.json({ newsletters });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Save a new custom newsletter (Protected)
export async function POST(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newIssue: Newsletter = await request.json();

    if (!newIssue.id || !newIssue.title || !newIssue.subject || !newIssue.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newsletters = await readNewsletters();
    
    // Prevent duplicate IDs
    const filtered = newsletters.filter(item => item.id !== newIssue.id);
    const updated = [newIssue, ...filtered];
    
    await writeNewsletters(updated);

    return NextResponse.json({ success: true, newsletter: newIssue });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a custom newsletter (Protected)
export async function DELETE(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Newsletter ID is required' }, { status: 400 });
    }

    const newsletters = await readNewsletters();
    const filtered = newsletters.filter(item => item.id !== id);
    
    await writeNewsletters(filtered);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
