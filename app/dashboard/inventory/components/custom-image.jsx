"use client";

import { AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const FallbackImage = ({ urlKey, alt }) => {
    const [imgSrc, setImgSrc] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!urlKey) {
            setIsLoading(false);
            return;
        }

        // Split the URL key by hyphens
        const words = urlKey.split("-");

        // Words that should remain lowercase (common articles, conjunctions, and prepositions)
        const lowercaseWords = [
            "and",
            "or",
            "the",
            "in",
            "on",
            "at",
            "by",
            "for",
            "with",
            "a",
            "an",
            "of",
        ];

        // Capitalize each word with special handling
        const capitalizedWords = words.map((word, index) => {
            // Keep specific connecting words lowercase (unless they're the first or last word)
            if (
                lowercaseWords.includes(word.toLowerCase()) &&
                index !== 0 &&
                index !== words.length - 1
            ) {
                return word.toLowerCase();
            }

            // Special case: if word is exactly 2 characters, capitalize both
            if (word.length === 2) {
                return word.toUpperCase();
            }

            // Special handling for Sk8 (specific to Vans)
            if (word.toLowerCase() === "sk8") {
                return "Sk8";
            }

            // Regular case: capitalize first letter only
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        const capitalizedKey = capitalizedWords.join("-");
        console.log(`Processing: ${urlKey} → ${capitalizedKey}`);

        // Format the base URL without extension
        const baseUrl = `https://images.stockx.com/images/${capitalizedKey}`;

        // Track if an image was successfully loaded
        let imageLoaded = false;

        // Add small delay between attempts to avoid race conditions
        const loadWithDelay = (url, nextStep) => {
            const img = new Image();

            img.onload = () => {
                console.log(`Success: ${url}`);
                imageLoaded = true;
                setImgSrc(url);
                setIsLoading(false);
            };

            img.onerror = () => {
                console.log(`Failed: ${url}`);
                if (!imageLoaded) {
                    // Add small delay before trying next format
                    setTimeout(nextStep, 150);
                }
            };

            // Set crossOrigin to anonymous to avoid CORS issues
            img.crossOrigin = "anonymous";
            img.src = url;
        };

        // Try all possible 360 view formats (with different folder structures and image indices)
        const try360Views = () => {
            // 360 view formats to try
            const formats = [
                // Standard format with Lv2 folder
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/Lv2/img01.jpg`,

                // Without Lv2 folder
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/img01.jpg`,

                // Different image indices with Lv2
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/Lv2/img.jpg`,
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/Lv2/img1.jpg`,

                // Different image indices without Lv2
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/img.jpg`,
                `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/img1.jpg`,

                // Direct 360 folder only
                `https://images.stockx.com/360/${capitalizedKey}.jpg`,

                // Last resort - empty string for fallback avatar
                "",
            ];

            // Try each format sequentially
            let formatIndex = 0;

            const tryNextFormat = () => {
                if (formatIndex >= formats.length - 1) {
                    // If we've tried all formats and none worked, use empty string
                    console.log(`All formats failed for ${urlKey}`);
                    setImgSrc("");
                    setIsLoading(false);
                    return;
                }

                const currentFormat = formats[formatIndex];
                console.log(
                    `Trying 360 format #${formatIndex + 1}: ${currentFormat}`
                );

                loadWithDelay(currentFormat, () => {
                    formatIndex++;
                    tryNextFormat();
                });
            };

            tryNextFormat();
        };

        // Define all possible image sources to try in sequence
        const tryImageSources = () => {
            // Try loading JPG first
            const jpgSrc = `${baseUrl}.jpg`;

            loadWithDelay(jpgSrc, () => {
                // If JPG fails, try PNG
                const pngSrc = `${baseUrl}.png`;

                loadWithDelay(pngSrc, () => {
                    // If PNG fails, try all possible 360 view formats
                    try360Views();
                });
            });
        };

        tryImageSources();

        // Clean up function to handle component unmounting
        return () => {
            // Cancel any pending operations if component unmounts
        };
    }, [urlKey]);

    if (isLoading) return null;
    return <AvatarImage src={imgSrc} alt={alt} />;
};

export default FallbackImage;
