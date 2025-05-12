"use client";

import { createContext, useContext, useState } from "react";

const ListingBucketContext = createContext();

export function ListingBucketProvider({ children }) {
    const [bucketItems, setBucketItems] = useState([]);

    const addToBucket = (item) => {
        // Check if item already exists in bucket
        const itemExists = bucketItems.some(
            (bucketItem) => bucketItem.listingId === item.listingId
        );

        if (!itemExists) {
            const newBucketItems = [...bucketItems, item];
            setBucketItems(newBucketItems);
            // Log to console for debugging
            console.log("Listing bucket updated:", newBucketItems);
        } else {
            console.log("Item already exists in bucket:", item);
        }
    };

    const removeFromBucket = (idOrListingId) => {
        // Support removal by both id and listingId
        const newBucketItems = bucketItems.filter(
            (item) =>
                item.id !== idOrListingId && item.listingId !== idOrListingId
        );
        setBucketItems(newBucketItems);
        console.log(
            "Item removed from bucket. Updated bucket:",
            newBucketItems
        );
    };

    const clearBucket = () => {
        setBucketItems([]);
        console.log("Listing bucket cleared");
    };

    return (
        <ListingBucketContext.Provider
            value={{ bucketItems, addToBucket, removeFromBucket, clearBucket }}
        >
            {children}
        </ListingBucketContext.Provider>
    );
}

export function useListingBucket() {
    const context = useContext(ListingBucketContext);
    if (!context) {
        throw new Error(
            "useListingBucket must be used within a ListingBucketProvider"
        );
    }
    return context;
}
