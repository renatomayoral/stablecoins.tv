import { StablecoinData } from "../config/types";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fetchStablecoins(): Promise<StablecoinData> {
  const response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=625d04fa57c0560770d004e1",
    {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": "c94fe46f-e969-4170-97ee-094de3ad54b8",
      },
    },
  );
  const data = await response.json();
  return data.data;
}

async function seedStablecoins() {
  try {
    const stablecoinData = await fetchStablecoins();

    // Convert id from string to int
    const stablecoinId = parseInt(stablecoinData.id, 10);

    // Create a UsdStableMarketInfo entry
    const usdStableMarketInfo = await prisma.usdStableMarketInfo.upsert({
      where: { id: stablecoinId },
      update: {
        category_id: stablecoinData.id,
        name: stablecoinData.name,
        title: stablecoinData.title,
        description: stablecoinData.description,
        num_tokens: stablecoinData.num_tokens,
        last_updated: stablecoinData.last_updated,
        avg_price_change: stablecoinData.avg_price_change,
        market_cap: stablecoinData.market_cap,
        market_cap_change: stablecoinData.market_cap_change,
        volume: stablecoinData.volume,
        volume_change: stablecoinData.volume_change,
      },
      create: {
        id: stablecoinId,
        category_id: stablecoinData.id,
        name: stablecoinData.name,
        title: stablecoinData.title,
        description: stablecoinData.description,
        num_tokens: stablecoinData.num_tokens,
        last_updated: new Date(stablecoinData.last_updated),
        avg_price_change: stablecoinData.avg_price_change,
        market_cap: stablecoinData.market_cap,
        market_cap_change: stablecoinData.market_cap_change,
        volume: stablecoinData.volume,
        volume_change: stablecoinData.volume_change,
      },
    });

    for (const stablecoin of stablecoinData.coins) {
      if (!stablecoin.platform || !stablecoin.quote || !stablecoin.quote.USD) {
        console.warn(`Skipping coin with missing data: ${stablecoin.name}`);
        continue;
      }
      // Create a Platform entry
      const platform = await prisma.platform.upsert({
        where: { id: stablecoin.platform.id },
        update: {
          name: stablecoin.platform.name,
          symbol: stablecoin.platform.symbol,
          token_address: stablecoin.platform.token_address,
        },
        create: {
          id: stablecoin.platform.id,
          name: stablecoin.platform.name,
          symbol: stablecoin.platform.symbol,
          token_address: stablecoin.platform.token_address,
        },
      });

      if (stablecoin.quote.USD.price !== null) {
        // Create a Quote entry
        const usdQuote = await prisma.quote.upsert({
          where: {
            price_last_updated: {
              price: stablecoin.quote.USD.price,
              last_updated: new Date(stablecoin.quote.USD.last_updated),
            },
          },
          update: {
            price: stablecoin.quote.USD.price,
            volume_24h: stablecoin.quote.USD.volume_24h,
            volume_change_24h: stablecoin.quote.USD.volume_change_24h,
            percent_change_1h: stablecoin.quote.USD.percent_change_1h,
            percent_change_24h: stablecoin.quote.USD.percent_change_24h,
            percent_change_7d: stablecoin.quote.USD.percent_change_7d,
            percent_change_30d: stablecoin.quote.USD.percent_change_30d,
            percent_change_60d: stablecoin.quote.USD.percent_change_60d,
            percent_change_90d: stablecoin.quote.USD.percent_change_90d,
            market_cap: stablecoin.quote.USD.market_cap,
            market_cap_dominance: stablecoin.quote.USD.market_cap_dominance,
            fully_diluted_market_cap:
              stablecoin.quote.USD.fully_diluted_market_cap,
            last_updated: new Date(stablecoin.quote.USD.last_updated),
          },
          create: {
            id: stablecoin.quote.USD.id,
            price: stablecoin.quote.USD.price,
            volume_24h: stablecoin.quote.USD.volume_24h,
            volume_change_24h: stablecoin.quote.USD.volume_change_24h,
            percent_change_1h: stablecoin.quote.USD.percent_change_1h,
            percent_change_24h: stablecoin.quote.USD.percent_change_24h,
            percent_change_7d: stablecoin.quote.USD.percent_change_7d,
            percent_change_30d: stablecoin.quote.USD.percent_change_30d,
            percent_change_60d: stablecoin.quote.USD.percent_change_60d,
            percent_change_90d: stablecoin.quote.USD.percent_change_90d,
            market_cap: stablecoin.quote.USD.market_cap,
            market_cap_dominance: stablecoin.quote.USD.market_cap_dominance,
            fully_diluted_market_cap:
              stablecoin.quote.USD.fully_diluted_market_cap,
            last_updated: new Date(stablecoin.quote.USD.last_updated),
          },
        });



        // Create a single Coin entry
        const coin = await prisma.coin.upsert({
          where: { id: stablecoin.id },
          update: {
            cmc_id: stablecoin.id,
            name: stablecoin.name,
            symbol: stablecoin.symbol,
            slug: stablecoin.slug,
            num_market_pairs: stablecoin.num_market_pairs,
            date_added: new Date(stablecoin.date_added),
            tags: stablecoin.tags,
            max_supply: stablecoin.max_supply,
            circulating_supply: stablecoin.circulating_supply,
            total_supply: stablecoin.total_supply,
            is_active: stablecoin.is_active,
            infinite_supply: stablecoin.infinite_supply,
            cmc_rank: stablecoin.cmc_rank,
            is_fiat: stablecoin.is_fiat,
            last_updated: new Date(stablecoin.last_updated),
            platformId: platform.id,
            usdQuoteId: usdQuote.id,
            usdStablecMarketInfoId: usdStableMarketInfo.id,

          },
          create: {
            cmc_id: stablecoin.id,
            id: stablecoin.id,
            name: stablecoin.name,
            symbol: stablecoin.symbol,
            slug: stablecoin.slug,
            num_market_pairs: stablecoin.num_market_pairs,
            date_added: new Date(stablecoin.date_added),
            tags: stablecoin.tags,
            max_supply: stablecoin.max_supply,
            circulating_supply: stablecoin.circulating_supply,
            total_supply: stablecoin.total_supply,
            is_active: stablecoin.is_active,
            infinite_supply: stablecoin.infinite_supply,
            cmc_rank: stablecoin.cmc_rank,
            is_fiat: stablecoin.is_fiat,
            last_updated: new Date(stablecoin.last_updated),
            platformId: platform.id,
            usdQuoteId: usdQuote.id,
            usdStablecMarketInfoId: usdStableMarketInfo.id,
          },
        });

      } else {
        console.warn(
          `Skipping quote with null price for coin: ${stablecoin.name}`,
        );
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

seedStablecoins();
