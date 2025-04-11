// app/dashboard/components/withdrawal-stats.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function WithdrawalStats({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const statusLabels = {
    pending: "Pending",
    approved: "Approved",
    processing: "Processing",
    completed: "Completed",
    rejected: "Rejected",
    cancelled: "Cancelled"
  };
  
  const statusIcons = {
    pending: <Clock className="h-4 w-4 text-amber-500" />,
    approved: <CheckCircle className="h-4 w-4 text-blue-500" />,
    processing: <RefreshCw className="h-4 w-4 text-blue-500" />,
    completed: <CheckCircle className="h-4 w-4 text-green-500" />,
    rejected: <XCircle className="h-4 w-4 text-red-500" />,
    cancelled: <XCircle className="h-4 w-4 text-gray-500" />
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Withdrawal Statistics</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Withdrawals</p>
            <p className="text-2xl font-bold">{data.totalWithdrawals}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Withdrawn</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(data.totalWithdrawnAmount)}</p>
          </div>
          
          <div className="space-y-1 col-span-2">
            <p className="text-sm text-muted-foreground">Average Withdrawal</p>
            <p className="text-xl font-semibold">{formatCurrency(data.avgWithdrawalAmount)}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-3">Withdrawal Status</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center space-x-2">
                {statusIcons[status]}
                <div>
                  <p className="text-sm font-medium">{statusLabels[status]}</p>
                  <p className="text-sm text-muted-foreground">{count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}