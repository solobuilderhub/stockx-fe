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

        // Capitalize each word
        const capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );

        // Format the base URL without extension
        const baseUrl = `https://images.stockx.com/images/${capitalizedWords.join(
            "-"
        )}`;

        // Try loading JPG first
        const jpgSrc = `${baseUrl}.jpg`;
        const img = new Image();

        img.onload = () => {
            setImgSrc(jpgSrc);
            setIsLoading(false);
        };

        img.onerror = () => {
            // If JPG fails, try PNG
            const pngSrc = `${baseUrl}.png`;
            setImgSrc(pngSrc);
            setIsLoading(false);
        };

        img.src = jpgSrc;
    }, [urlKey]);

    if (isLoading) return null;
    return <AvatarImage src={imgSrc} alt={alt} />;
};

export default FallbackImage;
