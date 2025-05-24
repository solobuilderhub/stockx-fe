"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

// This component is no longer used as market data is now shown directly in the variant accordion
export function MarketDataDialog({ open, onOpenChange, variant }) {
    if (!variant) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-neutral-900 text-white border-0 p-0">
                <div className="p-6">
                    <header className="flex items-center justify-between mb-1">
                        <div>
                            <DialogTitle className="text-white text-lg font-medium m-0">
                                Market Data for Size {variant.size}
                            </DialogTitle>
                            <p className="text-xs text-gray-400">
                                This dialog is deprecated. Market data is now
                                shown directly in the variant accordion.
                            </p>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </header>
                </div>
            </DialogContent>
        </Dialog>
    );
}
