// app/categories/components/category-form.jsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCategories } from "@/hooks/query/use-categories";
import { transformCategories } from "@/lib/helpers";
import FormInput from "@/components/form-utils/form-input";
import FormTextarea from "@/components/form-utils/form-textarea";
import SelectInput from "@/components/form-utils/select-input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  parent: z.string().nullable().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const availableTags = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New" },
  { id: "popular", label: "Popular" },
  { id: "trending", label: "Trending" },
];

export default function CategoryForm({ category, onSuccess, onCancel, token, allCategories }) {
  const { createCategory, updateCategory, isCreating, isUpdating } = useCategories();
  const isEdit = !!category?._id;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      parent: category?.parent || "",
      slug: category?.slug || "",
      description: category?.description || "",
      icon: category?.icon || "",
      tags: category?.tags || [],
    },
  });

  const onSubmit = (data) => {
    // Create a copy of the data to modify
    const formattedData = { ...data };
    
    // If parent is empty string, null, or "none", remove it from the payload
    if (!formattedData.parent || formattedData.parent === "none") {
      delete formattedData.parent;
    }
    if (!formattedData.slug || formattedData.slug === "") {
      delete formattedData.slug;
    }

    if (isEdit) {
      updateCategory({ 
        token, 
        id: category._id, 
        data: formattedData
      }, {
        onSuccess: () => onSuccess()
      });
    } else {
      createCategory({ 
        token, 
        data: formattedData
      }, {
        onSuccess: () => onSuccess()
      });
    }
  };

  // Filter out the current category and its children from parent options to prevent circular references
  const validParentOptions = isEdit 
    ? allCategories.filter(cat => cat._id !== category._id) 
    : allCategories;

  // Transform categories for hierarchical display
  const hierarchicalCategories = transformCategories(validParentOptions);

  // Prepare parent category options for SelectInput
  const prepareParentOptions = (categories, level = 0) => {
    return categories.flatMap(category => {
      const indent = "—".repeat(level);
      const prefix = level > 0 ? indent + " " : "";
      
      const options = [{
        value: category._id,
        label: prefix + category.name
      }];
      
      if (category.items && category.items.length > 0) {
        options.push(...prepareParentOptions(category.items, level + 1));
      }
      
      return options;
    });
  };

  // Create parent options with a proper "none" option
  const parentOptions = [
    { value: "none", label: "None (Root Category)" },
    ...prepareParentOptions(hierarchicalCategories)
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{isEdit ? "Edit Category" : "Add New Category"}</h2>
          <p className="text-muted-foreground">
            {isEdit ? "Update category details" : "Create a new category for your content"}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter category name"
            required
          />

          <SelectInput
            control={form.control}
            name="parent"
            label="Parent Category"
            placeholder="Select a parent category (optional)"
            items={parentOptions}
            valueKey="value"
            displayKey="label"
          />

          <FormInput
            control={form.control}
            name="slug"
            label="Slug"
            placeholder="category-slug"
            description="Leave empty to auto-generate from name"
          />

          <FormInput
            control={form.control}
            name="icon"
            label="Icon"
            placeholder="Icon name or URL"
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter a description for this category"
            rows={4}
          />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Tags</FormLabel>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {availableTags.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value || [], tag.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {tag.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}