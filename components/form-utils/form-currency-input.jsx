// components/form-utils/form-currency-input.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { cn, convertToCents, convertToDollars } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import FormInput from "./form-input";

const FormCurrencyInput = ({
  control,
  name,
  label,
  placeholder = "",
  description,
  required,
  disabled,
  className,
  labelClassName,
  inputClassName,
  Icon,
  onValueChange,
  ...props
}) => {
  // Connect to react-hook-form for the given field name.
  // The field value will be stored in cents.
  const { field } = useController({ name, control });

  // Local state for the dollars string that the user sees/edits.
  // This allows us to let the user type naturally (e.g. including a trailing ".")
  const [localValue, setLocalValue] = useState("");

  // Whenever the form value (in cents) changes externally, update the display.
  useEffect(() => {
    // When the form value is defined (including 0), convert to dollars.
    if (field.value || field.value === 0) {
      setLocalValue(convertToDollars(field.value));
    }
  }, [field.value]);

  // Update local state on every keystroke.
  const handleInputChange = (e) => {
    setLocalValue(e.target.value);
  };

  // When the input loses focus, convert the display value to a number (in cents)
  // and update react-hook-form. Also, reformat the display to show two decimals.
  const handleBlur = (e) => {
    let val = localValue;

    // If the user left a trailing dot (e.g. "12."), append a zero so that it parses correctly.
    if (val.endsWith(".")) {
      val += "0";
    }

    // Remove any unwanted characters (only digits and dot)
    const sanitized = val.replace(/[^0-9.]/g, "");
    const numberValue = parseFloat(sanitized) || 0;
    const centsValue = convertToCents(numberValue);

    // Update react-hook-form value (cents)
    field.onChange(centsValue);
    // Notify any external change handler
    onValueChange?.(centsValue);
    // Reformat the display value (always two decimals)
    setLocalValue(convertToDollars(centsValue));

    // Mark the field as touched
    field.onBlur();
    props.onBlur && props.onBlur(e);
  };

  return (
    <FormInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      description={description}
      required={required}
      disabled={disabled}
      className={className}
      labelClassName={labelClassName}
      inputClassName={cn("text-right", inputClassName)}
      IconLeft={<DollarSign className="h-4 w-4" />}
      IconRight={Icon}
      {...props}
      onChange={handleInputChange}
      onBlur={handleBlur}
      value={localValue}
    />
  );
};

export default FormCurrencyInput;
