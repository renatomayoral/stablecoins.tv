"use client";
import React, { useEffect, useState } from "react";
import {
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
import { Coin } from "@/config/types";
import Link from "next/link";
import Image from "next/image";
import { SkeletonTable } from "@/components/skeleton-table";

export default function Home() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Coin[]>([]); // Initialize data as an empty array
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchCoins() {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch("/api/usd-stablecoins", {
          method: "GET",
        });
        const coinsData = await response.json();
        setData(coinsData);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchCoins();
    const intervalId = setInterval(fetchCoins, 600000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

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
    initialState: {
      pagination: {
        pageSize: 50, // Set the default number of rows to 50
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <main>
      <div className="w-full max-w mx-auto pb-4">
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
                height={100}
                priority
                style={{ width: "auto", height: "150px" }} // Add style attribute
              />
            </div>
          </Link>
        </div>
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
              {isLoading ? (
                <SkeletonTable columns={columns.length} />
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const currentPrice = row.original.current_price;
                  const percentageDifference =
                    Math.abs((currentPrice - 1) / 1) * 100;
                  let rowClassName = "";

                  if (percentageDifference > 0.5 && percentageDifference < 3) {
                    rowClassName = "bg-yellow-100";
                  } else if (percentageDifference >= 3) {
                    rowClassName = "bg-red-200";
                  }

                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={rowClassName}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
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
        <div className="flex justify-center text-center">
          <div className="flex-col justify-center space-y-1 w-[450px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className=" flex flex-col justify-center items-center font-bold text-center text-2xl">
                    <span className="p-4">
                      Don
                      <Heart className="inline-block size-4 text-red-500 fill-red-500" />
                      tion
                    </span>
                    <a
                      href="https://nowpayments.io/donation?api_key=S22MP6A-FYV4X73-N6YJ7S2-K3NDZSP"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Image
                        src="https://nowpayments.io/images/embeds/donation-button-white.svg"
                        alt="Cryptocurrency & Bitcoin donation button by NOWPayments"
                        width={150}
                        height={150}
                      />
                    </a>
                  </div>
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
          </div>
        </div>
      </div>
    </main>
  );
}
