export type Platform = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

  
export type Coin = {
  id: number 
  cg_id: string | number;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank?: number | null;
  fully_diluted_valuation?: number | null;
  total_volume?: number | null;
  high_24h?: number | null;
  low_24h?: number | null;
  price_change_24h?: number | null;
  price_change_percentage_24h?: number | null;
  market_cap_change_24h?: number | null;
  market_cap_change_percentage_24h?: number | null;
  circulating_supply?: number
  total_supply?: number
  max_supply?: number | null;
  ath?: number | null;
  ath_change_percentage?: number | null;
  ath_date?: Date | null;
  atl?: number | null;
  atl_change_percentage?: number | null;
  atl_date?: Date | null;
  roi?: any; // Consider defining a more specific type if possible
  last_updated?: Date | null | string;
  sparkline_in_7d?: any; // Consider defining a more specific type if possible
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_14d_in_currency?: number | null;
  price_change_percentage_30d_in_currency?: number | null;
  price_change_percentage_200d_in_currency?: number | null;
  price_change_percentage_1y_in_currency?: number | null;
  platform?: string | null;
  usdStableMarketInfoId: number;
  tokenomicsId?: number | null;
};
  
  export type StablecoinData = {
    id: number;
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
  