// app/dashboard/components/transaction-summary.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function TransactionSummary({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const transactionTypeLabels = {
    order_payment: "Order Payments",
    platform_fee: "Platform Fees",
    referral_commission: "Referral Commissions",
    withdrawal: "Withdrawals",
    refund: "Refunds",
    adjustment: "Adjustments",
    deposit: "Deposits"
  };
  
  // Get transaction types that have non-zero counts
  const activeTransactionTypes = Object.entries(data.typeCounts)
    .filter(([_, count]) => count > 0)
    .map(([type]) => type);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Transaction Summary</CardTitle>
        <BarChart2 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeTransactionTypes.length > 0 ? (
            activeTransactionTypes.map(type => (
              <div key={type} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transactionTypeLabels[type]}</p>
                  <p className="text-sm text-muted-foreground">{data.typeCounts[type]} transactions</p>
                </div>
                <p className={`text-lg font-bold ${
                  type === 'withdrawal' || type === 'platform_fee' || type === 'refund' 
                    ? 'text-red-500' 
                    : 'text-green-500'
                }`}>
                  {type === 'withdrawal' || type === 'platform_fee' || type === 'refund' 
                    ? `-${formatCurrency(data.typeAmounts[type])}` 
                    : formatCurrency(data.typeAmounts[type])}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-6">No transactions in this period</p>
          )}
        </div>
        
        {activeTransactionTypes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Net Transaction Amount</p>
              <p className="text-xl font-bold">
                {formatCurrency(
                  Object.entries(data.typeAmounts).reduce((total, [type, amount]) => {
                    if (type === 'withdrawal' || type === 'platform_fee' || type === 'refund') {
                      return total - amount;
                    }
                    return total + amount;
                  }, 0)
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}