import { Coin } from "../config/types";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fetchStablecoins(): Promise<Coin[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&per_page=100&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y&precision=5",
    {
      method: "GET",
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-LHi8StpU6p6ZGuyAu9WxQ8or'}
    },
  );
  const data = await response.json();
  console.log("Fetched Coin Gecko stablecoins:", data);
  return data;
}

async function seedStablecoins() {
  try {
    const stablecoinData: Coin[] = await fetchStablecoins();
    for (const stablecoin of stablecoinData) {

        // Create a single Coin entry
        await prisma.coin.upsert({
          where: { id: stablecoin.id },
          update: {
          symbol: stablecoin.symbol,
          name: stablecoin.name,
          image: stablecoin.image,
          current_price: stablecoin.current_price,
          market_cap: BigInt(stablecoin.market_cap || 0),
          market_cap_rank: stablecoin.market_cap_rank,
          fully_diluted_valuation: stablecoin.fully_diluted_valuation ? BigInt(stablecoin.fully_diluted_valuation) : null,
          total_volume: stablecoin.total_volume,
          high_24h: stablecoin.high_24h,
          low_24h: stablecoin.low_24h,
          price_change_24h: stablecoin.price_change_24h,
          price_change_percentage_24h: stablecoin.price_change_percentage_24h,
          market_cap_change_24h: stablecoin.market_cap_change_24h,
          market_cap_change_percentage_24h: stablecoin.market_cap_change_percentage_24h,
          circulating_supply: stablecoin.circulating_supply,
          total_supply: stablecoin.total_supply,
          max_supply: stablecoin.max_supply,
          ath: stablecoin.ath,
          ath_change_percentage: stablecoin.ath_change_percentage,
          ath_date: stablecoin.ath_date ? new Date(stablecoin.ath_date) : null,
          atl: stablecoin.atl,
          atl_change_percentage: stablecoin.atl_change_percentage,
          atl_date: stablecoin.atl_date ? new Date(stablecoin.atl_date) : null,
          roi: stablecoin.roi as any,
          last_updated: stablecoin.last_updated ? new Date(stablecoin.last_updated) : undefined,
          sparkline_in_7d: stablecoin.sparkline_in_7d as any,
          price_change_percentage_1h_in_currency: stablecoin.price_change_percentage_1h_in_currency,
          price_change_percentage_24h_in_currency: stablecoin.price_change_percentage_24h_in_currency,
          price_change_percentage_7d_in_currency: stablecoin.price_change_percentage_7d_in_currency,
          price_change_percentage_14d_in_currency: stablecoin.price_change_percentage_14d_in_currency,
          price_change_percentage_30d_in_currency: stablecoin.price_change_percentage_30d_in_currency,
          price_change_percentage_200d_in_currency: stablecoin.price_change_percentage_200d_in_currency,
          price_change_percentage_1y_in_currency: stablecoin.price_change_percentage_1y_in_currency,
        },
        create: {
          cg_id: stablecoin.cg_id,
          symbol: stablecoin.symbol,
          name: stablecoin.name,
          image: stablecoin.image,
          current_price: stablecoin.current_price,
          market_cap: BigInt(stablecoin.market_cap || 0),
          market_cap_rank: stablecoin.market_cap_rank,
          fully_diluted_valuation: stablecoin.fully_diluted_valuation ? BigInt(stablecoin.fully_diluted_valuation) : null,
          total_volume: stablecoin.total_volume,
          high_24h: stablecoin.high_24h,
          low_24h: stablecoin.low_24h,
          price_change_24h: stablecoin.price_change_24h,
          price_change_percentage_24h: stablecoin.price_change_percentage_24h,
          market_cap_change_24h: stablecoin.market_cap_change_24h,
          market_cap_change_percentage_24h: stablecoin.market_cap_change_percentage_24h,
          circulating_supply: stablecoin.circulating_supply,
          total_supply: stablecoin.total_supply,
          max_supply: stablecoin.max_supply,
          ath: stablecoin.ath,
          ath_change_percentage: stablecoin.ath_change_percentage,
          ath_date: stablecoin.ath_date ? new Date(stablecoin.ath_date) : null,
          atl: stablecoin.atl,
          atl_change_percentage: stablecoin.atl_change_percentage,
          atl_date: stablecoin.atl_date ? new Date(stablecoin.atl_date) : null,
          roi: stablecoin.roi as any,
          last_updated: stablecoin.last_updated ? new Date(stablecoin.last_updated) : "",
          sparkline_in_7d: stablecoin.sparkline_in_7d as any,
          price_change_percentage_1h_in_currency: stablecoin.price_change_percentage_1h_in_currency,
          price_change_percentage_24h_in_currency: stablecoin.price_change_percentage_24h_in_currency,
          price_change_percentage_7d_in_currency: stablecoin.price_change_percentage_7d_in_currency,
          price_change_percentage_14d_in_currency: stablecoin.price_change_percentage_14d_in_currency,
          price_change_percentage_30d_in_currency: stablecoin.price_change_percentage_30d_in_currency,
          price_change_percentage_200d_in_currency: stablecoin.price_change_percentage_200d_in_currency,
          price_change_percentage_1y_in_currency: stablecoin.price_change_percentage_1y_in_currency,
        },
      });
      console.log(`Upserted coin: ${stablecoin.name}`);
    }
  } catch (e) {
    console.error("Seeding failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

seedStablecoins();
