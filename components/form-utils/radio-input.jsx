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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioInput = ({
  control,
  name,
  label,
  description,
  choices,
  disabled,
  required,
  className,
  labelClassName,
  radioGroupClassName,
  radioItemClassName,
  orientation = "horizontal", // horizontal | vertical
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
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              defaultValue={field.value}
              className={cn(
                orientation === "horizontal" 
                  ? "flex flex-row space-x-4" 
                  : "flex flex-col space-y-2",
                radioGroupClassName
              )}
              {...props}
            >
              {choices.map((choice) => (
                <FormItem
                  key={choice.value}
                  className={cn(
                    "flex items-center space-x-2 space-y-0",
                    radioItemClassName
                  )}
                >
                  <FormControl>
                    <RadioGroupItem 
                      value={choice.value} 
                      disabled={disabled || choice.disabled}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {choice.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioInput;