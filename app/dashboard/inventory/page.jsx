// app/profile/my-orders/page.jsx
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import { getQueryClient } from "@/lib/get-query-client";
import { Suspense } from "react";
import { InventoryUi } from "./components/inventory-ui";

export default async function InventoryPage(props) {
    let accessToken = "";

    try {
        // Try to get the session, but don't fail if we can't
        const session = await auth();
        accessToken = session?.accessToken || "";
    } catch (error) {
        console.error("Error getting session:", error);
        // Continue with empty token, will use dummy data
    }

    // Parse and validate search params
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const status = searchParams.status || "";
    const limit = 50; // Set default limit to 50

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
                        initialLimit={limit}
                    />
                </Suspense>
            </div>
        </div>
    );
}
