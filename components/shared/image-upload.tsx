"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { imageToBase64 } from "@/lib/utils";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setIsLoading(true);
    try {
      const base64 = await imageToBase64(file);
      onChange(base64);
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!value ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Uploading..." : "Upload Image"}
          </Button>
        ) : (
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="max-w-full max-h-64 rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
