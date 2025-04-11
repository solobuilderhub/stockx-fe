// components/form-utils/switch-input.jsx
"use client";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const SwitchInput = ({ 
  control, 
  name, 
  description, 
  label,
  labelPosition = "right", // 'right' or 'top'
  disabled,
  required,
  className,
  labelClassName,
  switchClassName,
  onValueChange,
  Icon,
  ...props 
}) => {
  const switchControl = (field) => (
    <Switch
      disabled={disabled}
      checked={field.value}
      onCheckedChange={(checked) => {
        field.onChange(checked);
        onValueChange?.(checked);
      }}
      className={cn(switchClassName)}
      {...props}
    />
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {labelPosition === "top" && label && (
            <div className="flex items-center gap-2 mb-2">
              <FormLabel className={cn("flex-grow", labelClassName)}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              {Icon && <span className="text-gray-500 flex-shrink-0">{Icon}</span>}
            </div>
          )}
          
          <FormControl>
            <div className={cn(
              "flex items-center",
              labelPosition === "right" ? "space-x-2" : ""
            )}>
              {switchControl(field)}
              {labelPosition === "right" && label && (
                <FormLabel className={cn(labelClassName)}>
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
              )}
            </div>
          </FormControl>
          
          {description && (
            <FormDescription className="mt-1">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchInput;