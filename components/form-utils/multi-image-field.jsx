// components/form-utils/image-field.jsx
"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MultiImageField = ({
  control,
  name,
  label,
  description,
  required,
  maxImages = 4,
  className,
  onRemoveServerImage,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <ImageUpload
              images={field.value || []}
              onChange={field.onChange}
              maxImages={maxImages}
              onRemoveServerImage={onRemoveServerImage}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ImageUpload = ({ images = [], onChange, maxImages = 4, onRemoveServerImage }) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const remainingSlots = maxImages - images.length;
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      if (filesToUpload.length === 0) {
        toast.error(`You can only upload up to ${maxImages} images`);
        return;
      }

      let newImages = [...images];

      for (const file of filesToUpload) {
        const preview = URL.createObjectURL(file);
        newImages.push({
          file,
          preview,
          name: file.name,
        });
      }

      onChange(newImages);
    },
    [images, maxImages, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages,
  });

  const removeImage = (index) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];

    // If the removed image is a server image (string URL)
    if (typeof removedImage === "string") {
      onRemoveServerImage?.(removedImage);
    } else if (removedImage.preview) {
      URL.revokeObjectURL(removedImage.preview);
    }

    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Images ({images.length}/{maxImages})
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border border-border group"
          >
            <Image
              src={typeof image === "string" ? image : image.preview}
              alt={`Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg aspect-square 
              flex flex-col items-center justify-center
              cursor-pointer hover:border-primary/50 transition-colors
              ${isDragActive ? "border-primary" : "border-border"}
            `}
          >
            <input {...getInputProps()} />
            <ImageIcon className="h-6 w-6 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              {isDragActive ? "Drop images here" : "Drag & drop or click to upload"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageField;