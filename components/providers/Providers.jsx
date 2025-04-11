"use client";

import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "./react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { TranslationsProvider } from "./translations-context";

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
          <TranslationsProvider>
            <Toaster position="top-center" />
            {children}
          </TranslationsProvider>
        </ThemeProvider>
      </TanstackProvider>
    </SessionProvider>
  );
};

export default Providers;
