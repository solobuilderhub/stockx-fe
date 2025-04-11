// app/profile/my-orders/page.jsx
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import SellerProfileClient from "./components/seller-profile-client";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/api/user-data";

export default async function ProfilePage(props) {
  const session = await auth();

  let user = null;
  try {
    const response = await getUser(session?.user?.email);
    user = response?.user;
  } catch (error) {
    console.error(error);
  }

  if (!user) {
    return <div>User not found</div>;
  }
  

  const breadcrumbItems = [
    { label: "Profile", href: "/profile" },
    { label: "My Profile", current: true },
  ];

  return (
    <div>
      <PageHeader items={breadcrumbItems} />
      <div className="space-y-6 p-6">
        <Suspense
        fallback={
          <div className="space-y-8">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        }
      >
        <SellerProfileClient 
          initialData={user} 
          token={session?.accessToken}
        />
      </Suspense>
      </div>
    </div>
  );
}