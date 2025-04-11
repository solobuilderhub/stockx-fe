// components/form-utils/form-textarea.jsx
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
import { Textarea } from "@/components/ui/textarea";

const FormTextarea = ({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  className,
  labelClassName,
  textareaClassName,
  rows = 3,
  onValueChange,
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
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(textareaClassName)}
              rows={rows}
              onChange={(e) => {
                field.onChange(e);
                onValueChange?.(e.target.value);
              }}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;