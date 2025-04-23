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

        const capitalizedKey = capitalizedWords.join("-");

        // Format the base URL without extension
        const baseUrl = `https://images.stockx.com/images/${capitalizedKey}`;

        // Define all possible image sources to try in sequence
        const tryImageSources = () => {
            // Try loading JPG first
            const jpgSrc = `${baseUrl}.jpg`;
            const img1 = new Image();

            img1.onload = () => {
                setImgSrc(jpgSrc);
                setIsLoading(false);
            };

            img1.onerror = () => {
                // If JPG fails, try PNG
                const pngSrc = `${baseUrl}.png`;
                const img2 = new Image();

                img2.onload = () => {
                    setImgSrc(pngSrc);
                    setIsLoading(false);
                };

                img2.onerror = () => {
                    // If PNG fails, try 360 view pattern
                    const threeSixtyViewSrc = `https://images.stockx.com/360/${capitalizedKey}/Images/${capitalizedKey}/Lv2/img01.jpg`;
                    const img3 = new Image();

                    img3.onload = () => {
                        setImgSrc(threeSixtyViewSrc);
                        setIsLoading(false);
                    };

                    img3.onerror = () => {
                        // Set fallback or empty string if all formats fail
                        setImgSrc("");
                        setIsLoading(false);
                    };

                    img3.src = threeSixtyViewSrc;
                };

                img2.src = pngSrc;
            };

            img1.src = jpgSrc;
        };

        tryImageSources();
    }, [urlKey]);

    if (isLoading) return null;
    return <AvatarImage src={imgSrc} alt={alt} />;
};

export default FallbackImage;
