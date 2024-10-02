import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
