export type Platform = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

  
  export type Quote = {
    coinId: number | null
    id: number;
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: string;
  }
  
  export type Coin = {
    id: number;
    category_id: string;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: string;
    tags: string[];
    max_supply: number | null;
    circulating_supply: number;
    total_supply: number;
    platform: Platform;
    is_active: number | null | undefined;
    infinite_supply: boolean;
    cmc_rank: number;
    is_fiat: number;
    last_updated: string;
    usd_quote: Quote
  }
  
  export type StablecoinData = {
    id: string;
    name: string;
    title: string;
    description: string;
    num_tokens: number;
    last_updated: string;
    avg_price_change: number;
    market_cap: number;
    market_cap_change: number;
    volume: number;
    volume_change: number;
    coins: Coin[];
  }
  