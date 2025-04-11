"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxInput = ({ control, name, item, disabled }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          key={item.id}
          className="flex flex-row items-start space-x-3 space-y-0 "
        >
          <FormControl>
            <Checkbox
              disabled={disabled}
              checked={field.value?.includes(item.id)}
              onCheckedChange={(checked) => {
                return checked
                  ? field.onChange([...field.value, item.id])
                  : field.onChange(
                      field.value?.filter((value) => value !== item.id)
                    );
              }}
            />
          </FormControl>

          <FormLabel className="text-sm font-normal">{item.label}</FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxInput;
