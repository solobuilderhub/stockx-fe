"use client"
import { cn } from "@/lib/utils"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

const SelectInput = ({
  control,
  items = [],
  name,
  label,
  placeholder = "Select option",
  allOption,
  description,
  required,
  disabled,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  Icon,
  valueKey = "value",
  displayKey = "label",
  onValueChange,
  value: propValue,
  defaultOpen,
  position,
}) => {
  // Create a new array with the "All" option if provided
  const displayItems = allOption ? [allOption, ...items] : items
  
  // For direct usage without React Hook Form
  const [localValue, setLocalValue] = useState(propValue || "")
  
  // Update local value when prop value changes
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue)
    }
  }, [propValue])
  
  // Handle direct value changes (without React Hook Form)
  const handleDirectValueChange = (newValue) => {
    setLocalValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  // If control is provided, use React Hook Form
  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          // Debug the incoming value
          console.log(`SelectInput ${name} field value:`, field.value)

          // Ensure value is a string and never undefined
          const value = field.value?.toString() || ""

          return (
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
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue)
                  onValueChange?.(newValue)
                }}
                value={value}
                disabled={disabled}
                defaultOpen={defaultOpen}
              >
                <FormControl>
                  <SelectTrigger className={cn("w-full", triggerClassName)}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className={contentClassName} position={position}>
                  {displayItems.length === 0 ? (
                    <div className="py-2 px-2 text-sm text-muted-foreground">No options available</div>
                  ) : (
                    displayItems.map((item, idx) => (
                      <SelectItem
                        key={idx}
                        value={item[valueKey]?.toString() || `item-${idx}`}
                        className={cn("cursor-pointer", itemClassName)}
                        disabled={item.disabled}
                      >
                        {item[displayKey]}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )
        }}
      />
    )
  }
  
  // Direct usage without React Hook Form
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <div className={cn("text-sm font-medium flex-grow", labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
          {Icon && <span className="text-gray-500 flex-shrink-0">{Icon}</span>}
        </div>
      )}
      <Select
        onValueChange={handleDirectValueChange}
        value={localValue}
        disabled={disabled}
        defaultOpen={defaultOpen}
      >
        <SelectTrigger className={cn("w-full", triggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName} position={position}>
          {displayItems.length === 0 ? (
            <div className="py-2 px-2 text-sm text-muted-foreground">No options available</div>
          ) : (
            displayItems.map((item, idx) => (
              <SelectItem
                key={idx}
                value={item[valueKey]?.toString() || `item-${idx}`}
                className={cn("cursor-pointer", itemClassName)}
                disabled={item.disabled}
              >
                {item[displayKey]}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
    </div>
  )
}

export default SelectInput

