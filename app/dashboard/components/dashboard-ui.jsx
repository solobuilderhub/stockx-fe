// app/dashboard/components/dashboard-ui.jsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import HeaderSection from "@/components/custom/dashboard/header-section";
import { BarChart3 } from "lucide-react";
import PeriodFilter from "./period-filter";
import { SummaryCards } from "./SummaryCards";
import { TopProducts } from "./TopProducts";
import { MonthlyTarget } from "./MonthlyTarget";
import { SalesChart } from "./SalesChart";
import { ActionItems } from "./ActionItems";
// import { OrderFulfillment } from "./OrderFulfillment";

export default function DashboardUI({
  data,
  error,
  periodType = "month",
  year,
  month,
  startDate,
  endDate,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePeriodChange = (newFilters) => {
    const params = new URLSearchParams();

    if (
      newFilters.periodType === "month" &&
      newFilters.year &&
      newFilters.month
    ) {
      params.set("periodType", "month");
      params.set("year", newFilters.year.toString());
      params.set("month", newFilters.month.toString());
    } else if (
      newFilters.periodType === "custom" &&
      newFilters.startDate &&
      newFilters.endDate
    ) {
      params.set("periodType", "custom");
      params.set("startDate", newFilters.startDate);
      params.set("endDate", newFilters.endDate);
    } else if (newFilters.periodType === "all-time") {
      params.set("periodType", "all-time");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Error loading dashboard data</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { wallet, orders, withdrawals, transactions, period } = data;

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Dashboard"
        description="Overview of your store performance and financial status"
        icon={BarChart3}
      />

      <ErrorBoundaryWrapper>
        <PeriodFilter
          currentPeriodType={periodType}
          currentYear={year}
          currentMonth={month}
          currentStartDate={startDate}
          currentEndDate={endDate}
          onPeriodChange={handlePeriodChange}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopProducts />
              <MonthlyTarget />
            </div>

            <SalesChart />
          </div>

          <div className="space-y-8">
            <ActionItems />
            {/* <OrderFulfillment /> */}
          </div>
        </div>
      </ErrorBoundaryWrapper>
    </div>
  );
}
