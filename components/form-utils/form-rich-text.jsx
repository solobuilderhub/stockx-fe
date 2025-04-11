// components/form-utils/form-rich-text.jsx
"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/custom/ui/rich-text-editor";
import { cn } from "@/lib/utils";

const FormRichText = ({
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
  labelClassName,
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
            <FormLabel className={cn(labelClassName)}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RichTextEditor
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              readOnly={disabled}
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

export default FormRichText;