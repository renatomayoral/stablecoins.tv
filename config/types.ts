export type Payment = {
    id: number;
    name: string;
    symbol: string;
    market_time: string;
    chain: string;
    price: number;
    price_percent_change_1h: number;
    price_percent_change_24h: number;
    price_percent_change_7d: number;
    price_percent_change_30d: number;
    price_percent_change_60d: number;
    price_percent_change_90d: number;
    market_cap: number;
    amount: number;
    skynet_score: number;
  };