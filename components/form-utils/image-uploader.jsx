// components/categories/image-uploader.jsx
"use client"
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Image as ImageIcon, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

const MAX_FILE_SIZE = 5000000

export function ImageUploader({ form, existingImage }) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState(existingImage || null)

  useEffect(() => {
    setPreviewImage(existingImage)
  }, [existingImage])

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]
    
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size should be less than 5MB')
      return
    }

    const preview = URL.createObjectURL(file)
    setPreviewImage(preview)
    form.setValue('image', file)
    form.setValue('removeImage', false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp']
    },
    maxFiles: 1
  })

  const removeImage = () => {
    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage)
    }
    setPreviewImage(null)
    form.setValue('image', null)
    form.setValue('removeImage', true)
  }

  return (
    <div className="space-y-4">
      {previewImage ? (
        <PreviewImage 
          src={previewImage} 
          onRemove={removeImage} 
        />
      ) : (
        <DropZone 
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
      )}
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} className="h-1" />
      )}
    </div>
  )
}

function PreviewImage({ src, onRemove }) {
  return (
    <div className="relative aspect-square w-full max-w-[200px] rounded-lg overflow-hidden border border-border group">
      <div className="relative w-full h-full">
        <Image 
          src={src} 
          alt="Category preview" 
          fill
          sizes="200px"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function DropZone({ getRootProps, getInputProps, isDragActive }) {
  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg aspect-square w-full max-w-[200px]
        flex flex-col items-center justify-center
        cursor-pointer hover:border-primary/50 transition-colors
        ${isDragActive ? 'border-primary' : 'border-border'}
      `}
    >
      <input {...getInputProps()} />
      <ImageIcon className="h-6 w-6 mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground text-center">
        {isDragActive ? "Drop image here" : "Drag & drop or click to upload"}
      </p>
    </div>
  )
}