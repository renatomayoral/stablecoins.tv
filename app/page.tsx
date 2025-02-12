"use client";
import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import { columns } from "@/components/columns";
import { Badge } from "@/components/ui/badge";
import Clipboard from "@/components/copy-button";
import { values } from "../components/wallet-adress";
import { Payment } from "@/config/types";
import Link from "next/link";
import Image from "next/image";

export const data: Payment[] = [
  {
    id: 23,
    name: "USDT",
    symbol: "usdt",
    market_time: "new Date()",
    chain: "ethereum",
    price: 1.00042,
    price_percent_change_1h: 0.0001,
    price_percent_change_24h: 0.0002,
    price_percent_change_7d: 0.0003,
    price_percent_change_30d: 0.0004,
    price_percent_change_60d: 0.0005,
    price_percent_change_90d: 0.0006,
    market_cap: 1000000000,
    amount: 1000000000,
    skynet_score: 0.97,
  },
  {
    id: 23124,
    name: "USDC",
    symbol: "usdc",
    market_time: "new Date()",
    chain: "arbitrum",
    price: 1.04042,
    price_percent_change_1h: 0.0021,
    price_percent_change_24h: 0.02302,
    price_percent_change_7d: 0.00033,
    price_percent_change_30d: 0.00234,
    price_percent_change_60d: 0.00055,
    price_percent_change_90d: 0.00556,
    market_cap: 7000000,
    amount: 7000000,
    skynet_score: 0.96,
  },
  {
    id: 132,
    name: "USDX",
    symbol: "usdx",
    market_time: "new Date()",
    chain: "base",
    price: 1.000242,
    price_percent_change_1h: 0.0041,
    price_percent_change_24h: 0.0202,
    price_percent_change_7d: 0.0503,
    price_percent_change_30d: 0.0704,
    price_percent_change_60d: 0.0005,
    price_percent_change_90d: 0.0006,
    market_cap: 9000000,
    amount: 9000000,
    skynet_score: 0.98,
  },
];

export default function Home() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <main>
      <div className="w-full max-w mx-auto p-4">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter tokens..."
            value={
              (table.getColumn("symbol")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("symbol")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              <div className="flex justify-center space-x-2 mb-2">
                <Badge>1% de-pegged </Badge>
                <Badge variant="secondary">3% de-pegged</Badge>
                <Badge variant="destructive">5% de-pegged</Badge>
              </div>
            </TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-center align-middle"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-evenly space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        <div>
          <Link
            href="/"
            className=" flex justify-center items-center md:space-x-2"
          >
            <div className="flex items-center">
              <Image
                src={"/Stablecoins.TV-Logo.svg"}
                alt="Stablecoins TV Logo"
                width={150}
                height={50}
              />
            </div>
          </Link>
        </div>
        <div className="flex justify-center text-center">
          <div className="flex-col justify-center space-y-1 w-[450px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="p-4 font-bold text-center text-2xl">
                    Don
                    <Heart className="inline-block size-4 text-red-500 fill-red-500" />
                    tion
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Donations priority is for improving API calls with
                    professionals providers until reaching the goal of update
                    market data every second.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {values.map((item, index) => (
              <Clipboard
                key={index}
                wallet_adress={item.wallet_adress}
                logo={item.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
