// components/form-utils/date-input.jsx
"use client";
import { format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CustomFormDescription = ({ children }) => {
  return (
    <div className="text-sm text-muted-foreground">
      {children}
    </div>
  );
};

const DateInput = ({
  control,
  name,
  label,
  description,
  placeholder = "Select date",
  required,
  disabled,
  className,
  labelClassName,
  buttonClassName,
  calendarClassName,
  minDate,
  maxDate,
  disabledDates,
  disabledDays,
  onValueChange,
  validateDate,
  clearErrors,
  descriptionComponent,
  allowClear = true,
  Icon, // Added to maintain consistency with other inputs
  transform = {
    input: (value) => (value ? new Date(value) : undefined),
    output: (date) => (date ? date.toISOString() : ""),
  },
}) => {
  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isValid(parsedDate) ? format(parsedDate, "PPP") : "";
  };

  const isDateDisabled = (date) => {
    if (!date || !isValid(date)) return true;
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDates?.includes(date)) return true;
    if (disabledDays?.includes(date.getDay())) return true;
    return false;
  };

  const handleDateSelect = (date, field) => {
    if (disabled) return;

    // If validation function exists, check if date is valid
    if (validateDate && !validateDate(date)) {
      return;
    }

    const transformedValue = transform.output(date);
    field.onChange(transformedValue);
    onValueChange?.(transformedValue);

    // Clear errors if specified
    if (clearErrors) {
      clearErrors(name);
    }
  };

  const handleClear = (field, e) => {
    e.stopPropagation(); // Prevent popover from opening
    field.onChange("");
    onValueChange?.("");
    if (clearErrors) {
      clearErrors(name);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <div className="flex items-center gap-2 mb-2">
              <FormLabel className={cn("flex-grow", labelClassName)}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              {Icon && <span className="text-gray-500 flex-shrink-0">{Icon}</span>}
            </div>
          )}
          
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Button
                    variant={field.value ? "outline" : "secondary"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      disabled && "cursor-not-allowed opacity-50",
                      field.value && allowClear && "pr-8",
                      buttonClassName
                    )}
                    disabled={disabled}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      formatDate(transform.input(field.value))
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                  {field.value && allowClear && !disabled && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                      onClick={(e) => handleClear(field, e)}
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      <span className="sr-only">Clear date</span>
                    </Button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent 
                className={cn("w-auto p-0", calendarClassName)} 
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={transform.input(field.value)}
                  onSelect={(date) => handleDateSelect(date, field)}
                  disabled={isDateDisabled}
                  initialFocus
                  {...(minDate && { fromDate: minDate })}
                  {...(maxDate && { toDate: maxDate })}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          {description && !descriptionComponent && (
            <FormDescription>{description}</FormDescription>
          )}
          
          {descriptionComponent && (
            <CustomFormDescription>
              {descriptionComponent}
            </CustomFormDescription>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;