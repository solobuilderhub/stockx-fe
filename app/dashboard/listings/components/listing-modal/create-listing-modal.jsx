"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

export function CreateListingModal({ isOpen, onClose, platform }) {
    const form = useForm({
        defaultValues: {
            amount: "",
            variantId: "98e2e748-8000-45bf-a624-5531d6a68318",
            currencyCode: "USD",
            expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
            active: true,
        },
    });

    const handleSubmit = (data) => {
        console.log("Form submitted:", data);
        // Handle the submission logic here
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Listing on {platform}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="variantId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Variant ID</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="currencyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiresAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Expires At</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            value={
                                                field.value
                                                    ? format(
                                                          field.value,
                                                          "yyyy-MM-dd"
                                                      )
                                                    : format(
                                                          new Date(),
                                                          "yyyy-MM-dd"
                                                      )
                                            }
                                            onChange={(e) => {
                                                const date = new Date(
                                                    e.target.value
                                                );
                                                field.onChange(date);
                                            }}
                                            className="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Active</FormLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(value === "true")
                                        }
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="true">
                                                True
                                            </SelectItem>
                                            <SelectItem value="false">
                                                False
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300"
                            >
                                List Now
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
