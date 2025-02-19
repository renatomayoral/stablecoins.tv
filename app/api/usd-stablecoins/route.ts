import { NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';



export async function GET() {
  try {
    const coins = await prisma.coin.findMany();
    return NextResponse.json(coins, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

