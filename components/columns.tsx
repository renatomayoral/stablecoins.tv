"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Coin } from "@/config/types";
import Image from "next/image";

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
    cell: ({ row }) => {
      const image = row.original.image;
      const name = row.original.name;
      return (
        <div className="capitalize flex items-center justify-center">
          <div className="mr-1">
            <Image
              src={image}
              alt={name}
              width={16}
              height={16}
              style={{ width: "auto", height: "auto" }} // Add style attribute
              className="rounded-full"
            />
          </div>
          <p className=" font-semibold">{name ? `${name}` : "N/A"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">
        {row.getValue("symbol")}
      </div>
    ),
  },
  /*  {
    accessorKey: "platform",
    header: "Chain",
    cell: ({ row }) => {
      const platform = row.original.platform;
      return (
        <div className="capitalize">{platform ? `${platform}` : "N/A"}</div>
      );
    },
  }, */
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const usd_quote = row.original.current_price;
      return (
        <div className="capitalize flex justify-center">
          {usd_quote ? usdPriceFormatter.format(usd_quote) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "ath",
    header: "ATH",
    cell: ({ row }) => {
      const ath = row.original.ath;
      return (
        <div className="capitalize flex justify-center">
          {ath ? usdPriceFormatter.format(ath) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "atl",
    header: "ATL",
    cell: ({ row }) => {
      const atl = row.original.atl;
      return (
        <div className="capitalize flex justify-center">
          {atl ? usdPriceFormatter.format(atl) : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_1h",
    header: "% 1H",
    cell: ({ row }) => {
      const price_change_percentage_1h_in_currency =
        row.original.price_change_percentage_1h_in_currency;
      const percentChange = price_change_percentage_1h_in_currency
        ? price_change_percentage_1h_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_1h_in_currency
            ? percentFormatter.format(
                price_change_percentage_1h_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_24h",
    header: "% 24H",
    cell: ({ row }) => {
      const price_change_percentage_24h_in_currency =
        row.original.price_change_percentage_24h_in_currency;
      const percentChange = price_change_percentage_24h_in_currency
        ? price_change_percentage_24h_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_24h_in_currency
            ? percentFormatter.format(
                price_change_percentage_24h_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_7d",
    header: "% 7D",
    cell: ({ row }) => {
      const price_change_percentage_7d_in_currency =
        row.original.price_change_percentage_7d_in_currency;
      const percentChange = price_change_percentage_7d_in_currency
        ? price_change_percentage_7d_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`flex justify-center capitalize ${textColor}`}>
          {price_change_percentage_7d_in_currency
            ? percentFormatter.format(
                price_change_percentage_7d_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_14d",
    header: "% 14D",
    cell: ({ row }) => {
      const price_change_percentage_14d_in_currency =
        row.original.price_change_percentage_14d_in_currency;
      const percentChange = price_change_percentage_14d_in_currency
        ? price_change_percentage_14d_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_14d_in_currency
            ? percentFormatter.format(
                price_change_percentage_14d_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_30d",
    header: "% 30D",
    cell: ({ row }) => {
      const price_change_percentage_30d_in_currency =
        row.original.price_change_percentage_30d_in_currency;
      const percentChange = price_change_percentage_30d_in_currency
        ? price_change_percentage_30d_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_30d_in_currency
            ? percentFormatter.format(
                price_change_percentage_30d_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_200d",
    header: "% 200D",
    cell: ({ row }) => {
      const price_change_percentage_200d_in_currency =
        row.original.price_change_percentage_200d_in_currency;
      const percentChange = price_change_percentage_200d_in_currency
        ? price_change_percentage_200d_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_200d_in_currency
            ? percentFormatter.format(
                price_change_percentage_200d_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "price_percent_change_1y",
    header: "% 1Y",
    cell: ({ row }) => {
      const price_change_percentage_1y_in_currency =
        row.original.price_change_percentage_1y_in_currency;
      const percentChange = price_change_percentage_1y_in_currency
        ? price_change_percentage_1y_in_currency
        : 0;
      const textColor =
        percentChange > 0
          ? "text-green-500"
          : percentChange < 0
          ? "text-red-500"
          : "";
      return (
        <div className={`capitalize flex justify-center ${textColor}`}>
          {price_change_percentage_1y_in_currency
            ? percentFormatter.format(
                price_change_percentage_1y_in_currency / 100
              )
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "market_cap_change_24h",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          24h Volume
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.total_volume || 0;
      const b = rowB.original.total_volume || 0;
      return Number(a) - Number(b);
    },
    cell: ({ row }) => {
      const total_volume = row.original.total_volume;
      return (
        <div className="capitalize flex justify-center">
          {total_volume ? usdMarketCapFormatter.format(total_volume) : ""}
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
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.market_cap || 0;
      const b = rowB.original.market_cap || 0;
      return Number(a) - Number(b);
    },
    cell: ({ row }) => {
      const market_cap = row.original.market_cap;
      return (
        <div className="flex justify-center capitalize">
          {market_cap ? usdMarketCapFormatter.format(market_cap) : "N/A"}
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
