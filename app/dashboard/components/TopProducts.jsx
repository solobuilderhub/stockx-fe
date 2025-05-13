"use client";

export function TopProducts() {
    const products = [
        {
            id: "01",
            name: "Home Decor Range",
            styleNo: "HD-101",
            popularity: 85,
            quantity: "100",
            color: "bg-orange",
        },
        {
            id: "02",
            name: "Disney Princess Dress",
            styleNo: "DPD-202",
            popularity: 65,
            quantity: "90",
            color: "bg-teal",
        },
        {
            id: "03",
            name: "Bathroom Essentials",
            styleNo: "BE-303",
            popularity: 50,
            quantity: "80",
            color: "bg-blue",
        },
        {
            id: "04",
            name: "Apple Smartwatch",
            styleNo: "AS-404",
            popularity: 25,
            quantity: "70",
            color: "bg-purple",
        },
        {
            id: "05",
            name: "Home Decor Range",
            styleNo: "HD-101",
            popularity: 85,
            quantity: "100",
            color: "bg-orange",
        },
        {
            id: "06",
            name: "Disney Princess Dress",
            styleNo: "DPD-202",
            popularity: 65,
            quantity: "90",
            color: "bg-teal",
        },
        {
            id: "07",
            name: "Bathroom Essentials",
            styleNo: "BE-303",
            popularity: 50,
            quantity: "80",
            color: "bg-blue",
        },
        {
            id: "08",
            name: "Apple Smartwatch",
            styleNo: "AS-404",
            popularity: 25,
            quantity: "70",
            color: "bg-purple",
        },
    ];

    return (
        <div
            className="dashboard-card animate-fade-in"
            style={{ animationDelay: "0.1s" }}
        >
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold">Top Products</h2>
            </div>

            <div className="overflow-x-auto">
                <div className="max-h-[250px] overflow-y-auto">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-card z-10">
                            <tr className="text-left text-muted-foreground text-sm border-b border-muted/30">
                                <th className="pb-3 font-medium">#</th>
                                <th className="pb-3 font-medium">Item Name</th>
                                <th className="pb-3 font-medium">SKU</th>
                                <th className="pb-3 font-medium text-right">
                                    Qty
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-muted/20 last:border-0"
                                >
                                    <td className="py-3 text-sm">
                                        {product.id}
                                    </td>
                                    <td className="py-3 text-sm">
                                        {product.name}
                                    </td>
                                    <td className="py-3 text-sm">
                                        {product.styleNo.length > 15
                                            ? `${product.styleNo.substring(
                                                  0,
                                                  15
                                              )}...`
                                            : product.styleNo}
                                    </td>
                                    <td className="py-3 text-sm text-right">
                                        {product.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
