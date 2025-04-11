"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import { updateSellerProfile } from "../actions";
import FormInput from "@/components/form-utils/form-input";
import FormTextarea from "@/components/form-utils/form-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SellerProfileClient({ initialData }) {
  const router = useRouter();
  const { update } = useSession();

  const methods = useForm({
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      businessInfo: {
        name: initialData.businessInfo?.name || "",
        description: initialData.businessInfo?.description || "",
        whatsappNumber: initialData.businessInfo?.whatsappNumber || "",
        address: initialData.businessInfo?.address || "",
      },
      
    }
  });

  const onSubmit = async (formData) => {
    try {
      const response = await updateSellerProfile(initialData._id, formData);

      if (response.success) {
        // Update session with new user data
        await update({
          user: {
            ...initialData,
            ...response.data,
          },
        });
        toast.success("Profile updated successfully");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      // You might want to show an error toast/notification here
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl mb-2">Seller Profile</h2>
      </div>
      
      <div className=" p-6 animate-scale-in">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className=" rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
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
                <FormInput
                  name="address"
                  label="Address"
                />
              </div>
            </div>

            {/* Business Information Section */}
            <div className=" rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="businessInfo.name"
                  label="Business Name"
                  required
                />
                <FormInput
                  name="businessInfo.whatsappNumber"
                  label="WhatsApp Number"
                  required
                />
                <FormTextarea
                  name="businessInfo.description"
                  label="Business Description"
                  className="md:col-span-2"
                />
                <FormInput
                  name="businessInfo.address"
                  label="Business Address"
                  className="md:col-span-2"
                />
              </div>
            </div>

           
            
            <div className="pt-6 flex justify-end">
              <Button 
                type="submit" 
                className="px-8"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
} 