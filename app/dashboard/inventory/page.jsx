// app/profile/my-orders/page.jsx
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import { Suspense } from "react";
import { InventoryUi } from "./components/inventory-ui";
import { InventoryProvider } from "./components/InventoryProvider";

export const dynamic = "force-dynamic"; // Force dynamic rendering to ensure fresh data

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
    const searchParams = props.searchParams;
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 50; // Set default limit to 50

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Inventory", current: true },
    ];

    return (
        <div>
            <PageHeader items={breadcrumbItems} />
            <div className="space-y-6 p-6">
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center h-64">
                            Loading inventory...
                        </div>
                    }
                >
                    <InventoryProvider>
                        <InventoryUi
                            token={accessToken}
                            initialPage={page}
                            initialLimit={limit}
                        />
                    </InventoryProvider>
                </Suspense>
            </div>
        </div>
    );
}
