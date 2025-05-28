"use client";

import { createContext, useContext } from "react";

// Create the token context
const TokenContext = createContext(undefined);

// Token provider component
export function TokenProvider({ children, token }) {
    return (
        <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
    );
}

// Custom hook to use the token context
export function useToken() {
    const context = useContext(TokenContext);

    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }

    return context;
}
