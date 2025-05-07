"use client";

import { ListingBucketProvider } from "@/app/context/listing-bucket-context";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "./react-query";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }) => {
    return (
        <SessionProvider>
            <TanstackProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ListingBucketProvider>
                        <Toaster position="top-center" />
                        {children}
                    </ListingBucketProvider>
                </ThemeProvider>
            </TanstackProvider>
        </SessionProvider>
    );
};

export default Providers;
