// app/categories/page.jsx
import { CategoryUI } from "./components/category-ui";
import { auth } from "@/app/(auth)/auth";
import { PageHeader } from "@/components/custom/dashboard/page-header";

export default async function CategoriesPage(props) {
  const session = await auth();
  const { accessToken } = session;

  // Parse search params
  const searchParams = props.searchParams;
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  const breadcrumbItems = [
    { label: "Admin", href: "/super" },
    { label: "Categories", current: true },
  ];

  return (
    <div>
      <PageHeader items={breadcrumbItems} />
      <div className="space-y-6 p-6">
        <CategoryUI token={accessToken} />
      </div>
    </div>
  );
}
