"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CreateOrganizationForm from "./create-organization-form";

export default function OrganizationInfo({ token }) {
    const [visibleSecrets, setVisibleSecrets] = useState({});
    const [copyStatus, setCopyStatus] = useState({});

    // Use React Query to fetch organization data
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["organization"],
        queryFn: async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/organization/mine`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (
                    response.status === 403 ||
                    data.message?.includes("Forbidden")
                ) {
                    throw new Error(
                        "Forbidden: You do not have access to this resource"
                    );
                }
                throw new Error(
                    data.message || "Failed to fetch organization data"
                );
            }

            if (data.status === "success" && data.data) {
                return data.data;
            } else if (
                data.status === "error" &&
                data.message === "Organization not found"
            ) {
                throw new Error("Organization not found");
            } else {
                throw new Error(
                    data.message || "Failed to fetch organization data"
                );
            }
        },
        retry: (failureCount, error) => {
            // Don't retry for "Organization not found" or "Forbidden" errors
            if (
                error.message === "Organization not found" ||
                error.message.includes("Forbidden")
            ) {
                return false;
            }
            return failureCount < 3;
        },
        enabled: !!token,
    });

    const toggleSecretVisibility = (secretId) => {
        setVisibleSecrets((prev) => ({
            ...prev,
            [secretId]: !prev[secretId],
        }));
    };

    const copyToClipboard = (text, secretId) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyStatus((prev) => ({
                    ...prev,
                    [secretId]: true,
                }));

                setTimeout(() => {
                    setCopyStatus((prev) => ({
                        ...prev,
                        [secretId]: false,
                    }));
                }, 2000);

                toast.success("Copied to clipboard");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
                toast.error("Failed to copy to clipboard");
            });
    };

    if (isLoading) {
        return (
            <div className="rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">
                    Organization Information
                </h3>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    // Show create form if organization not found or user doesn't have access
    if (isError) {
        // Check if the error is due to not having an organization or forbidden access
        if (
            error.message === "Organization not found" ||
            error.message.includes("Forbidden")
        ) {
            return (
                <div className="rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Create Organization
                    </h3>
                    <CreateOrganizationForm token={token} />
                </div>
            );
        }

        // For other errors, show error message
        return (
            <div className="rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">
                    Organization Information
                </h3>
                <div className="text-red-500">
                    Error loading organization data. Please try again later.
                </div>
            </div>
        );
    }

    const org = data;

    return (
        <div className="rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">
                Organization Information
            </h3>

            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <h4 className="text-lg font-medium mb-2">
                                {org.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                ID: {org._id}
                            </p>
                            <p className="text-sm text-gray-500">
                                Created:{" "}
                                {new Date(org.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* StockX Configuration */}
                        <div>
                            <h5 className="font-medium mb-2">
                                StockX Configuration
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Client ID
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 truncate">
                                            {org.stockx_config?.clientId ||
                                                "N/A"}
                                        </p>
                                        {org.stockx_config?.clientId && (
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        org.stockx_config
                                                            .clientId,
                                                        `clientId-${org._id}`
                                                    )
                                                }
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                {copyStatus[
                                                    `clientId-${org._id}`
                                                ] ? (
                                                    <Check
                                                        size={16}
                                                        className="text-green-500"
                                                    />
                                                ) : (
                                                    <Copy size={16} />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Client Secret
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 truncate">
                                            {visibleSecrets[
                                                `clientSecret-${org._id}`
                                            ]
                                                ? org.stockx_config
                                                      ?.clientSecret || "N/A"
                                                : org.stockx_config
                                                      ?.clientSecret
                                                ? "••••••••••••••••"
                                                : "N/A"}
                                        </p>
                                        {org.stockx_config?.clientSecret && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        toggleSecretVisibility(
                                                            `clientSecret-${org._id}`
                                                        )
                                                    }
                                                    className="p-1 hover:bg-gray-100 rounded-full"
                                                >
                                                    {visibleSecrets[
                                                        `clientSecret-${org._id}`
                                                    ] ? (
                                                        <EyeOff size={16} />
                                                    ) : (
                                                        <Eye size={16} />
                                                    )}
                                                </button>
                                                {visibleSecrets[
                                                    `clientSecret-${org._id}`
                                                ] && (
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                org
                                                                    .stockx_config
                                                                    .clientSecret,
                                                                `clientSecret-${org._id}-copy`
                                                            )
                                                        }
                                                        className="p-1 hover:bg-gray-100 rounded-full"
                                                    >
                                                        {copyStatus[
                                                            `clientSecret-${org._id}-copy`
                                                        ] ? (
                                                            <Check
                                                                size={16}
                                                                className="text-green-500"
                                                            />
                                                        ) : (
                                                            <Copy size={16} />
                                                        )}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Refresh Token
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 truncate">
                                            {visibleSecrets[
                                                `refreshToken-${org._id}`
                                            ]
                                                ? org.stockx_config
                                                      ?.refreshToken || "N/A"
                                                : org.stockx_config
                                                      ?.refreshToken
                                                ? "••••••••••••••••"
                                                : "N/A"}
                                        </p>
                                        {org.stockx_config?.refreshToken && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        toggleSecretVisibility(
                                                            `refreshToken-${org._id}`
                                                        )
                                                    }
                                                    className="p-1 hover:bg-gray-100 rounded-full"
                                                >
                                                    {visibleSecrets[
                                                        `refreshToken-${org._id}`
                                                    ] ? (
                                                        <EyeOff size={16} />
                                                    ) : (
                                                        <Eye size={16} />
                                                    )}
                                                </button>
                                                {visibleSecrets[
                                                    `refreshToken-${org._id}`
                                                ] && (
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                org
                                                                    .stockx_config
                                                                    .refreshToken,
                                                                `refreshToken-${org._id}-copy`
                                                            )
                                                        }
                                                        className="p-1 hover:bg-gray-100 rounded-full"
                                                    >
                                                        {copyStatus[
                                                            `refreshToken-${org._id}-copy`
                                                        ] ? (
                                                            <Check
                                                                size={16}
                                                                className="text-green-500"
                                                            />
                                                        ) : (
                                                            <Copy size={16} />
                                                        )}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Last Token Refresh
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {org.stockx_config?.lastTokenRefresh
                                            ? new Date(
                                                  org.stockx_config.lastTokenRefresh
                                              ).toLocaleString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* GOAT Configuration */}
                        <div>
                            <h5 className="font-medium mb-2">
                                GOAT Configuration
                            </h5>
                            <div>
                                <p className="text-sm font-medium">
                                    Authorization
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-600 truncate">
                                        {visibleSecrets[`goatAuth-${org._id}`]
                                            ? org.goat_config?.authorization ||
                                              "N/A"
                                            : org.goat_config?.authorization
                                            ? "••••••••••••••••"
                                            : "N/A"}
                                    </p>
                                    {org.goat_config?.authorization && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    toggleSecretVisibility(
                                                        `goatAuth-${org._id}`
                                                    )
                                                }
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                {visibleSecrets[
                                                    `goatAuth-${org._id}`
                                                ] ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                            {visibleSecrets[
                                                `goatAuth-${org._id}`
                                            ] && (
                                                <button
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            org.goat_config
                                                                .authorization,
                                                            `goatAuth-${org._id}-copy`
                                                        )
                                                    }
                                                    className="p-1 hover:bg-gray-100 rounded-full"
                                                >
                                                    {copyStatus[
                                                        `goatAuth-${org._id}-copy`
                                                    ] ? (
                                                        <Check
                                                            size={16}
                                                            className="text-green-500"
                                                        />
                                                    ) : (
                                                        <Copy size={16} />
                                                    )}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Inventory Sheet Configuration */}
                        <div>
                            <h5 className="font-medium mb-2">
                                Inventory Sheet Configuration
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Sheet ID
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 truncate">
                                            {org.inventory_sheet_config
                                                ?.sheetId || "N/A"}
                                        </p>
                                        {org.inventory_sheet_config
                                            ?.sheetId && (
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        org
                                                            .inventory_sheet_config
                                                            .sheetId,
                                                        `sheetId-${org._id}`
                                                    )
                                                }
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                {copyStatus[
                                                    `sheetId-${org._id}`
                                                ] ? (
                                                    <Check
                                                        size={16}
                                                        className="text-green-500"
                                                    />
                                                ) : (
                                                    <Copy size={16} />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Sheet Name
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {org.inventory_sheet_config
                                            ?.sheetName || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
