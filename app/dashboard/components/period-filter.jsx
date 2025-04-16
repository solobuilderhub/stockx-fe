// app/dashboard/components/period-filter.jsx
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [isOpen, setIsOpen] = useState(false);
  
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
    setIsOpen(false);
  };
  
  const getDisplayValue = () => {
    if (periodType === 'month') {
      const monthName = months.find(m => m.value === month)?.label;
      return `${monthName} ${year}`;
    } else if (periodType === 'custom') {
      return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
    } else {
      return 'All Time';
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          <span>{getDisplayValue()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <div className="space-y-3">
          <RadioGroup
            value={periodType}
            onValueChange={setPeriodType}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month">Monthly</Label>
            </div>
            
            {periodType === 'month' && (
              <div className="ml-6 flex gap-2">
                <Select value={month.toString()} onValueChange={(value) => setMonth(parseInt(value))}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Range</Label>
            </div>
            
            {periodType === 'custom' && (
              <div className="ml-6 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Label className="w-10 text-xs">From:</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-8 justify-start text-left text-xs py-0 px-2">
                        {startDate ? format(startDate, "MMM d, yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex gap-2 items-center">
                  <Label className="w-10 text-xs">To:</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-8 justify-start text-left text-xs py-0 px-2">
                        {endDate ? format(endDate, "MMM d, yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all-time" id="all-time" />
              <Label htmlFor="all-time">All Time</Label>
            </div>
          </RadioGroup>
          
          <Button onClick={handleApplyFilter} className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}