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
import { useState } from "react";
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
    }),
});

const CreateOrganizationForm = ({ token }) => {
    const [loading, setLoading] = useState(false);

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
            },
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
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

            if (response.ok && result.success) {
                toast.success("Organization created successfully!");
                // Reload the page to show the new organization
                window.location.reload();
            } else {
                throw new Error(
                    result.message || "Failed to create organization"
                );
            }
        } catch (error) {
            console.error("Error creating organization:", error);
            toast.error(error.message || "Failed to create organization");
        } finally {
            setLoading(false);
        }
    };

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
                                        <Input
                                            placeholder="My Store"
                                            {...field}
                                        />
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
                                            <Input
                                                placeholder="6SjOHpVc2TdGQZOtHwy2rhFnS3sDr2UK"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="ulZ4bIb8t5orBt5HryvrWAksnwV_IbuXa15kdSuRof0_XyjofTVXuy-dKuyRS9Mx"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="k3c4c8lwj_dlJwZIyMrKrR5hZpUfkdeOR_yxry0yzRSmK"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="goatapi_VmggURPj0N9UJRFy8w2CfJebibBhjiRa1vvzYJ"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="1pg6Wb2fggeysJr0_EosdO5gPWyB1bpGv4LsmO8yR-Fg"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="inventory sheet"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Organization"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateOrganizationForm;
