// app/dashboard/page.jsx
import { auth } from "@/app/(auth)/auth";
import { getSellerDashboard } from "@/api/admin/seller-dashboard";
import { PageHeader } from "@/components/custom/dashboard/page-header";
import DashboardUI from "./components/dashboard-ui";

export default async function DashboardPage(props) {
  const session = await auth();
  const { accessToken } = session;
  const searchParams  = await props.searchParams;
  
  // Extract filter parameters from search params
  const year = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;
  const periodType = searchParams.periodType || 'month';
  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;
  const allTime = periodType === 'all-time';
  
  let dashboardData = null;
  let error = null;

  // console.log("accessToken", accessToken);
  
  try {
    dashboardData = await getSellerDashboard({
      token: accessToken,
      year,
      month,
      startDate,
      endDate,
      allTime
    });
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
    error = err.message || "Failed to load dashboard data";
  }
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Seller Dashboard", current: true },
  ];
  
  return (
    <div className="space-y-6">
      <PageHeader items={breadcrumbItems} />
      <div className="container px-4 py-6">
        <DashboardUI 
          data={dashboardData} 
          error={error} 
          periodType={periodType}
          year={year}
          month={month}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}