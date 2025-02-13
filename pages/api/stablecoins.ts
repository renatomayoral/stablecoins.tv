import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the import path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const coins = await prisma.coin.findMany({
        include: {
          platform: true,
          usd_quote: true,
          usdStableMarketInfo: true,
          tokenomics: true,
        },
      });
      res.status(200).json(coins);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
      res.status(500).json({ error: 'Failed to fetch coins' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}