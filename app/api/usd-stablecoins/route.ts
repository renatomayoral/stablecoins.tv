import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const coins = await prisma.coin.findMany();
    return NextResponse.json(coins, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

