// app/profile/my-orders/page.jsx
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import { getQueryClient } from "@/lib/get-query-client";
import { Suspense } from "react";
import { InventoryUi } from "./components/inventory-ui";

export default async function InventoryPage(props) {
    const session = await auth();
    const { accessToken } = session;

    // Parse and validate search params
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const status = searchParams.status || "";

    const queryClient = getQueryClient();

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Inventory", current: true },
    ];

    return (
        <div>
            <PageHeader items={breadcrumbItems} />
            <div className="space-y-6 p-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <InventoryUi
                        token={accessToken}
                        initialPage={page}
                        initialStatus={status}
                    />
                </Suspense>
            </div>
        </div>
    );
}
