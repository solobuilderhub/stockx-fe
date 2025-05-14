"use client";

import FormInput from "@/components/form-utils/form-input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import OrganizationInfo from "./organization-info";

export default function SellerProfileClient({ initialData, token }) {
    const router = useRouter();
    const { update } = useSession();

    // Form for personal information
    const personalMethods = useForm({
        defaultValues: {
            name: initialData.name || "",
            email: initialData.email || "",
            phone: initialData.phone || "",
            address: initialData.address || "",
        },
    });

    const onSubmitPersonalInfo = async (formData) => {
        try {
            console.log("Personal Information:", formData);
            // Uncomment when API is ready
            // const response = await updatePersonalProfile(initialData._id, formData);
            // if (response.success) {
            //     await update({
            //         user: {
            //             ...initialData,
            //             ...response.data,
            //         },
            //     });
            //     toast.success("Personal information updated successfully");
            // } else {
            //     throw new Error(response.error);
            // }
        } catch (error) {
            console.error("Failed to update personal information:", error);
            toast.error("Failed to update personal information");
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl mb-2">Your Profile</h2>
            </div>

            <div className="animate-scale-in">
                {/* Personal Information Form */}
                <div className="rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Personal Information
                    </h3>
                    <FormProvider {...personalMethods}>
                        <form
                            onSubmit={personalMethods.handleSubmit(
                                onSubmitPersonalInfo
                            )}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    name="name"
                                    label="Full Name"
                                    required
                                />
                                <FormInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    required
                                    disabled
                                />
                                <FormInput
                                    name="phone"
                                    label="Phone"
                                    required
                                />
                                <FormInput name="address" label="Address" />
                            </div>
                            <div className="pt-4">
                                <Button type="submit" className="px-8">
                                    Update Personal Info
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>

                {/* Organization Information Form Component */}
                <OrganizationInfo token={token} />
            </div>
        </div>
    );
}
