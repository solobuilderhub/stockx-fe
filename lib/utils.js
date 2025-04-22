import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

/**
 * Formats a number as currency
 *
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - The ISO currency code (e.g., 'USD', 'EUR', 'BDT')
 * @param {string} locale - The locale to use for formatting (defaults to 'en-US')
 * @returns {string} The formatted currency string
 */
export function formatCurrency(amount, currencyCode = "BDT", locale = "en-US") {
    // Handle undefined or null amounts
    if (amount === undefined || amount === null) {
        return "";
    }

    // Special case for BDT (Bangladeshi Taka)
    if (currencyCode === "BDT") {
        // Always use the Taka symbol directly for BDT
        return `৳${amount.toLocaleString(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })}`;
    }

    // For all other currencies, use the Intl.NumberFormat
    const currencyOptions = {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    };

    try {
        return new Intl.NumberFormat(locale, currencyOptions).format(amount);
    } catch (error) {
        // Fallback in case of any errors
        return `${amount.toLocaleString(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })} ${currencyCode}`;
    }
}

// Format file size
export const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";

    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Get file extension from URL or mime type
export const getFileExtension = (file) => {
    if (!file) return "";

    if (file.media?.url) {
        const urlParts = file.media.url.split(".");
        if (urlParts.length > 1) {
            return urlParts[urlParts.length - 1].toUpperCase();
        }
    }

    if (file.media?.mimeType) {
        const mimeType = file.media.mimeType;
        if (mimeType.includes("zip") || mimeType.includes("x-zip"))
            return "ZIP";
        if (mimeType.includes("pdf")) return "PDF";
        if (mimeType.includes("image")) return "IMG";
        if (mimeType.includes("audio")) return "AUDIO";
        if (mimeType.includes("video")) return "VIDEO";
        if (mimeType.includes("text")) return "TXT";
    }

    return "FILE";
};

export const urlKeyToImage = (urlKey) => {
    if (!urlKey) return "";

    // Split the URL key by hyphens
    const words = urlKey.split("-");

    // Capitalize each word
    const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // Join the words with hyphens and add the base URL and extension
    const imageUrl = `https://images.stockx.com/images/${capitalizedWords.join(
        "-"
    )}.jpg`;
    return imageUrl;
};
