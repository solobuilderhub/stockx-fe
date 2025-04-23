"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

export function FilterModal({ open, onOpenChange, onApplyFilters }) {
    const [filters, setFilters] = useState({
        id: "",
        dateFrom: "",
        dateTo: "",
    });

    const handleReset = () => {
        setFilters({
            id: "",
            dateFrom: "",
            dateTo: "",
        });
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-[#121212] border-none text-white p-0"
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <SheetHeader className="text-left p-0">
                            <SheetTitle className="text-white text-xl">
                                Filters
                            </SheetTitle>
                        </SheetHeader>
                        <SheetClose className="rounded-full p-2 hover:bg-gray-800" />
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
                        {/* ID Filter */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">
                                    Filter by ID
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <Input
                                    type="number"
                                    placeholder="Enter Inventory ID"
                                    value={filters.id}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow numeric values
                                        if (
                                            value === "" ||
                                            /^[0-9]+$/.test(value)
                                        ) {
                                            setFilters({
                                                ...filters,
                                                id: value,
                                            });
                                        }
                                    }}
                                    className="w-full bg-background"
                                    onKeyDown={(e) => {
                                        // Prevent non-numeric input including 'e'
                                        if (
                                            !/[0-9]|\Backspace|\Tab|\Delete|\ArrowLeft|\ArrowRight|\Home|\End/.test(
                                                e.key
                                            )
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Date Range Filter */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">
                                    Filter by Inventory Added Date
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">
                                        From
                                    </label>
                                    <Input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                dateFrom: e.target.value,
                                            })
                                        }
                                        className="w-full bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">
                                        To
                                    </label>
                                    <Input
                                        type="date"
                                        value={filters.dateTo}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                dateTo: e.target.value,
                                            })
                                        }
                                        className="w-full bg-background"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            className="rounded-full bg-white text-black hover:bg-gray-200"
                            onClick={handleApplyFilters}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
