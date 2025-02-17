"use client";
import React from "react";
import { ColumnDef, SortingFn } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Coin } from "@/config/types";

const usdPriceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});

const usdMarketCapFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("symbol")}</div>
    ),
  },
  {
    accessorKey: "platform",
    header: "Chain",
    cell: ({ row }) => {
      const platform = row.original.platform;
      return (
        <div className="capitalize">
          {platform ? `${platform.name} (${platform.symbol})` : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      return (
        <div className="capitalize">
          {usd_quote ? usdPriceFormatter.format(usd_quote.price) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_1h",
    header: "% 1H",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_1h : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_1h / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_24h",
    header: "% 24H",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_24h : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_24h / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_7d",
    header: "% 7D",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_7d : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_7d / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_30d",
    header: "% 30D",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_30d : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_30d / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_60d",
    header: "% 60D",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_60d : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_60d / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_90d",
    header: "% 90D",
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      const percentChange = usd_quote ? usd_quote.percent_change_90d : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize ${textColor}`}>
          {usd_quote
            ? percentFormatter.format(usd_quote.percent_change_90d / 100)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "market_cap",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Market Cap
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.original.usd_quote?.market_cap || 0;
      const b = rowB.original.usd_quote?.market_cap || 0;
      return a - b;
    },
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      return (
        <div className="capitalize">
          {usd_quote
            ? usdMarketCapFormatter.format(usd_quote.market_cap)
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "market_cap_dominance",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Stable Market Dominance
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const usd_quote = row.original.usd_quote;
      return (
        <div className="capitalize">
          {usd_quote ? `${usd_quote.market_cap_dominance}` : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "skynet_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Skynet Score
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("skynet_score")}</div>
    ),
  },
];
