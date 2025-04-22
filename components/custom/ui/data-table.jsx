"use client";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CustomPagination, PaginationInfo } from "./custom-pagination";

export function DataTable({ columns, data, isLoading = false, pagination }) {
    const {
        totalDocs = 0,
        limit = 10,
        totalPages = 1,
        currentPage = 1,
        hasNextPage = false,
        hasPrevPage = false,
        onPageChange = () => {},
    } = pagination ?? {};

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-background/50">
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    <p className="text-sm">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="rounded-md border border-border">
                <ScrollArea className="w-full whitespace-nowrap h-[500px]">
                    <div className="min-w-full">
                        <Table>
                            <TableHeader className="sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="bg-muted font-semibold text-primary"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody className="overflow-y-auto">
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="hover:bg-muted/50 transition-colors"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="py-3"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
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
                                            className="h-32 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <p>No results found</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Try adjusting your search or
                                                    filters
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <PaginationInfo
                        totalDocs={totalDocs}
                        currentPage={currentPage}
                        itemsPerPage={limit}
                    />

                    <div className="flex items-center space-x-6">
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            hasPrevPage={hasPrevPage}
                            hasNextPage={hasNextPage}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
