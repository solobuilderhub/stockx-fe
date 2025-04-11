// app/dashboard/components/wallet-summary.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function WalletSummary({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Wallet Summary</CardTitle>
        <Wallet className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(data.available)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{formatCurrency(data.pending)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">On Hold</p>
            <p className="text-xl font-semibold">{formatCurrency(data.onHold)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
            <p className="text-xl font-semibold">{formatCurrency(data.withdrawalPending)}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(data.lifetimeEarnings)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Withdrawals</p>
              <p className="text-xl font-bold text-amber-600">{formatCurrency(data.lifetimeWithdrawals)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}