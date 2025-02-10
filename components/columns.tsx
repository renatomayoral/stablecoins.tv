"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "CMC ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
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
    accessorKey: "market_time",
    header: "Market Time",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("market_time")}</div>
    ),
  },
  {
    accessorKey: "chain",
    header: "Chain",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("chain")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "price_percent_change_1h",
    header: "% 1H",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_1h")}
      </div>
    ),
  },
  {
    accessorKey: "price_percent_change_24h",
    header: "% 24H",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_24h")}
      </div>
    ),
  },
  {
    accessorKey: "price_percent_change_7d",
    header: "% 7D",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_7d")}
      </div>
    ),
  },
  {
    accessorKey: "price_percent_change_30d",
    header: "% 30D",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_30d")}
      </div>
    ),
  },
  {
    accessorKey: "price_percent_change_60d",
    header: "% 60D",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_60d")}
      </div>
    ),
  },
  {
    accessorKey: "price_percent_change_90d",
    header: "% 90D",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("price_percent_change_90d")}
      </div>
    ),
  },
  {
    accessorKey: "market_cap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Cap
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("market_cap")}</div>
    ),
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

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
