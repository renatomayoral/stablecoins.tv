import { ColumnDef } from '@tanstack/react-table';

// Define columns for UsdStableMarketInfo model
export const usdStableMarketInfoColumns: ColumnDef<UsdStableMarketInfo>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'category_id', header: 'Category ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'num_tokens', header: 'Number of Tokens' },
  { accessorKey: 'last_updated', header: 'Last Updated' },
  { accessorKey: 'avg_price_change', header: 'Average Price Change' },
  { accessorKey: 'market_cap', header: 'Market Cap' },
  { accessorKey: 'market_cap_change', header: 'Market Cap Change' },
  { accessorKey: 'volume', header: 'Volume' },
  { accessorKey: 'volume_change', header: 'Volume Change' },
];

// Define columns for Coin model
export const coinColumns: ColumnDef<Coin>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'cmc_id', header: 'CMC ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'symbol', header: 'Symbol' },
  { accessorKey: 'slug', header: 'Slug' },
  { accessorKey: 'num_market_pairs', header: 'Number of Market Pairs' },
  { accessorKey: 'date_added', header: 'Date Added' },
  { accessorKey: 'tags', header: 'Tags' },
  { accessorKey: 'max_supply', header: 'Max Supply' },
  { accessorKey: 'circulating_supply', header: 'Circulating Supply' },
  { accessorKey: 'total_supply', header: 'Total Supply' },
  { accessorKey: 'platformId', header: 'Platform ID' },
  { accessorKey: 'is_active', header: 'Is Active' },
  { accessorKey: 'infinite_supply', header: 'Infinite Supply' },
  { accessorKey: 'cmc_rank', header: 'CMC Rank' },
  { accessorKey: 'is_fiat', header: 'Is Fiat' },
  { accessorKey: 'last_updated', header: 'Last Updated' },
  { accessorKey: 'usdQuoteId', header: 'USD Quote ID' },
  { accessorKey: 'usdStablecMarketInfoId', header: 'USD Stable Market Info ID' },
  { accessorKey: 'tokenomicsId', header: 'Tokenomics ID' },
];

// Define columns for Platform model
export const platformColumns: ColumnDef<Platform>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'symbol', header: 'Symbol' },
  { accessorKey: 'token_address', header: 'Token Address' },
];

// Define columns for Quote model
export const quoteColumns: ColumnDef<Quote>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'volume_24h', header: 'Volume 24h' },
  { accessorKey: 'volume_change_24h', header: 'Volume Change 24h' },
  { accessorKey: 'percent_change_1h', header: 'Percent Change 1h' },
  { accessorKey: 'percent_change_24h', header: 'Percent Change 24h' },
  { accessorKey: 'percent_change_7d', header: 'Percent Change 7d' },
  { accessorKey: 'percent_change_30d', header: 'Percent Change 30d' },
  { accessorKey: 'percent_change_60d', header: 'Percent Change 60d' },
  { accessorKey: 'percent_change_90d', header: 'Percent Change 90d' },
  { accessorKey: 'market_cap', header: 'Market Cap' },
  { accessorKey: 'market_cap_dominance', header: 'Market Cap Dominance' },
  { accessorKey: 'fully_diluted_market_cap', header: 'Fully Diluted Market Cap' },
  { accessorKey: 'last_updated', header: 'Last Updated' },
];

// Define columns for Tokenomics model
export const tokenomicsColumns: ColumnDef<Tokenomics>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'overview', header: 'Overview' },
  { accessorKey: 'technology', header: 'Technology' },
  { accessorKey: 'tokenomics', header: 'Tokenomics' },
  { accessorKey: 'roadmap', header: 'Roadmap' },
  { accessorKey: 'community_and_team', header: 'Community and Team' },
];