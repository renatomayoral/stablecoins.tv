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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { Payment, columns } from "@/components/columns";
import { Badge } from "@/components/ui/badge";

const data: Payment[] = [
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
      <div className="flex justify-center p-4 ">
        <p className=" font-bold text-5xl text-white bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl p-2">
          USD Stablecoins
        </p>
      </div>
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
        <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </main>
  );
}
