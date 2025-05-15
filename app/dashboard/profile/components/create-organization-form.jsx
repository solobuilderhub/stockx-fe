"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, "Organization name must be at least 2 characters"),
    stockx_config: z.object({
        clientId: z.string().min(1, "Client ID is required"),
        clientSecret: z.string().min(1, "Client Secret is required"),
        refreshToken: z.string().min(1, "Refresh Token is required"),
    }),
    goat_config: z.object({
        authorization: z.string().min(1, "Authorization is required"),
    }),
    inventory_sheet_config: z.object({
        sheetId: z.string().min(1, "Sheet ID is required"),
        sheetName: z.string().min(1, "Sheet Name is required"),
        columnMap: z.object({
            id: z.string().min(1, "Column is required"),
            stockx_sku: z.string().min(1, "Column is required"),
            goat_sku: z.string().min(1, "Column is required"),
            stockx_size: z.string().min(1, "Column is required"),
            retail_price: z.string().min(1, "Column is required"),
            brand_wholesale: z.string().min(1, "Column is required"),
            inventory_added_at: z.string().min(1, "Column is required"),
            location_1: z.string().min(1, "Column is required"),
            location_2: z.string().min(1, "Column is required"),
            location_3: z.string().min(1, "Column is required"),
            qty: z.string().min(1, "Column is required"),
            goat_size_unit: z.string().min(1, "Column is required"),
            goat_size: z.string().min(1, "Column is required"),
        }),
    }),
});

const CreateOrganizationForm = ({ token }) => {
    const queryClient = useQueryClient();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            stockx_config: {
                clientId: "",
                clientSecret: "",
                refreshToken: "",
            },
            goat_config: {
                authorization: "",
            },
            inventory_sheet_config: {
                sheetId: "",
                sheetName: "",
                columnMap: {
                    id: "A",
                    stockx_sku: "C",
                    goat_sku: "D",
                    stockx_size: "E",
                    retail_price: "F",
                    brand_wholesale: "G",
                    inventory_added_at: "H",
                    location_1: "I",
                    location_2: "J",
                    location_3: "K",
                    qty: "Q",
                    goat_size_unit: "R",
                    goat_size: "S",
                },
            },
        },
    });

    // Use React Query mutation for form submission
    const createOrganizationMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/organization`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to create organization"
                );
            }

            if (result.status !== "success") {
                throw new Error(
                    result.message || "Failed to create organization"
                );
            }

            return result.data;
        },
        onSuccess: () => {
            toast.success("Organization created successfully!");

            // Invalidate the organization query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["organization"] });

            // Reload the page to show the new organization
            window.location.reload();
        },
        onError: (error) => {
            console.error("Error creating organization:", error);
            toast.error(error.message || "Failed to create organization");
        },
    });

    const onSubmit = (data) => {
        createOrganizationMutation.mutate(data);
    };

    const columnFields = [
        { key: "id", label: "ID Column", defaultValue: "A" },
        { key: "stockx_sku", label: "StockX SKU Column", defaultValue: "C" },
        { key: "goat_sku", label: "GOAT SKU Column", defaultValue: "D" },
        { key: "stockx_size", label: "StockX Size Column", defaultValue: "E" },
        {
            key: "retail_price",
            label: "Retail Price Column",
            defaultValue: "F",
        },
        {
            key: "brand_wholesale",
            label: "Brand Wholesale Column",
            defaultValue: "G",
        },
        {
            key: "inventory_added_at",
            label: "Inventory Added At Column",
            defaultValue: "H",
        },
        { key: "location_1", label: "Location 1 Column", defaultValue: "I" },
        { key: "location_2", label: "Location 2 Column", defaultValue: "J" },
        { key: "location_3", label: "Location 3 Column", defaultValue: "K" },
        { key: "qty", label: "Quantity Column", defaultValue: "Q" },
        {
            key: "goat_size_unit",
            label: "GOAT Size Unit Column",
            defaultValue: "R",
        },
        { key: "goat_size", label: "GOAT Size Column", defaultValue: "S" },
    ];

    return (
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Organization Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* StockX Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                StockX Configuration
                            </h3>

                            <FormField
                                control={form.control}
                                name="stockx_config.clientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stockx_config.clientSecret"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client Secret</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stockx_config.refreshToken"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Refresh Token</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* GOAT Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                GOAT Configuration
                            </h3>

                            <FormField
                                control={form.control}
                                name="goat_config.authorization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Authorization</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Inventory Sheet Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Inventory Sheet Configuration
                            </h3>

                            <FormField
                                control={form.control}
                                name="inventory_sheet_config.sheetId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sheet ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="inventory_sheet_config.sheetName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sheet Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Column Mapping */}
                            <div className="space-y-4">
                                <h4 className="text-md font-medium">
                                    Column Mapping
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Specify which column in your spreadsheet
                                    corresponds to each data field
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {columnFields.map((columnField) => (
                                        <FormField
                                            key={columnField.key}
                                            control={form.control}
                                            name={`inventory_sheet_config.columnMap.${columnField.key}`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {columnField.label}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={createOrganizationMutation.isPending}
                        >
                            {createOrganizationMutation.isPending
                                ? "Creating..."
                                : "Create Organization"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateOrganizationForm;
