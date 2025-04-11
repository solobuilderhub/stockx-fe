// app/dashboard/components/period-filter.jsx
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function PeriodFilter({
  currentPeriodType = 'month',
  currentYear,
  currentMonth,
  currentStartDate,
  currentEndDate,
  onPeriodChange
}) {
  const [periodType, setPeriodType] = useState(currentPeriodType);
  const [year, setYear] = useState(currentYear || new Date().getFullYear());
  const [month, setMonth] = useState(currentMonth || new Date().getMonth() + 1);
  const [startDate, setStartDate] = useState(currentStartDate ? new Date(currentStartDate) : new Date());
  const [endDate, setEndDate] = useState(currentEndDate ? new Date(currentEndDate) : new Date());
  
  // Generate years for dropdown (last 5 years)
  const currentYear2 = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear2 - i);
  
  // Month names for dropdown
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];
  
  const handleApplyFilter = () => {
    const filters = { periodType };
    
    if (periodType === 'month') {
      filters.year = year;
      filters.month = month;
    } else if (periodType === 'custom') {
      filters.startDate = startDate.toISOString();
      filters.endDate = endDate.toISOString();
    }
    
    onPeriodChange(filters);
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <Tabs defaultValue={periodType} onValueChange={setPeriodType} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="custom">Custom Range</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="month" className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="year" className="text-sm mb-1 block">Year</Label>
                <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
                  <SelectTrigger id="year" className="w-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-1/2">
                <Label htmlFor="month" className="text-sm mb-1 block">Month</Label>
                <Select value={month.toString()} onValueChange={(value) => setMonth(parseInt(value))}>
                  <SelectTrigger id="month" className="w-full">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Label htmlFor="startDate" className="text-sm mb-1 block">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM d, yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="w-full sm:w-1/2">
                <Label htmlFor="endDate" className="text-sm mb-1 block">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM d, yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="all-time">
            <p className="text-sm text-muted-foreground">Showing data for all time periods.</p>
          </TabsContent>
          
          <Button 
            onClick={handleApplyFilter} 
            className="w-full mt-4"
          >
            Apply Filter
          </Button>
        </Tabs>
      </CardContent>
    </Card>
  );
}