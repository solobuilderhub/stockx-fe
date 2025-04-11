// components/categories/form/fields/category-image-field.jsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { ImageUploader } from './image-uploader'

export default function ImageField({ label, control, existingImage, form }) { // Added form prop
  return (
    <FormField
      control={control}
      name="image"
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ImageUploader 
              form={form} // Pass the form prop
              existingImage={existingImage} 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}