// components/form-utils/form-input.jsx
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
import { Input } from "@/components/ui/input";

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  type = "text",
  className,
  labelClassName,
  inputClassName,
  IconLeft,
  IconRight,
  onValueChange,
  transform,
  ...props
}) => {
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
            </div>
          )}
          <FormControl>
            <div className="relative">
              {IconLeft && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {IconLeft}
                </div>
              )}
              <Input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                className={cn(
                  IconLeft && "pl-9",
                  IconRight && "pr-9",
                  inputClassName
                )}
                onChange={(e) => {
                  const value = transform?.output 
                    ? transform.output(e.target.value) 
                    : e.target.value;
                  field.onChange(value);
                  onValueChange?.(value);
                }}
                value={transform?.input ? transform.input(field.value) : field.value}
                {...props}
              />
              {IconRight && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {IconRight}
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;