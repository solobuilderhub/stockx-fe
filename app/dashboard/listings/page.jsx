// app/profile/my-orders/page.jsx
import { Suspense } from "react";
import { getQueryClient } from "@/lib/get-query-client";
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import { ListingsUI } from "./components/listings-ui";

export default async function ListingsPage(props) {
  const session = await auth();
  const { accessToken } = session;
  
  // Parse and validate search params
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const status =  searchParams.status || "";

  const queryClient = getQueryClient();

  // Prefetch orders data if needed
  // queryClient.prefetchQuery({
  //   queryKey: ["customer-orders", { page, status }],
  //   queryFn: () => getCustomerOrders({ page, status, token: accessToken }),
  // });

  const breadcrumbItems = [
    { label: "Profile", href: "/profile" },
    { label: "My Orders", current: true },
  ];

  return (
    <div>
      <PageHeader items={breadcrumbItems} />
      <div className="space-y-6 p-6">
        <Suspense fallback={<div>Loading...</div>}>
          {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <ListingsUI token={accessToken} initialPage={page} initialStatus={status} />
          {/* </HydrationBoundary> */}
        </Suspense>
      </div>
    </div>
  );
}