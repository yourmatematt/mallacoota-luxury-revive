import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface BlogImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImage?: string;
  slug?: string;
}

export const BlogImageUpload = ({ onImageSelect, currentImage, slug }: BlogImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, JPEG, PNG, or WebP)');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFileName(file.name);
      onImageSelect(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setFileName("");
    const input = document.getElementById('blog-image-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="blog-image-upload">Blog Hero Image</Label>
        <div className="mt-2">
          <Input
            id="blog-image-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <Label
            htmlFor="blog-image-upload"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Choose Image
          </Label>
          {fileName && (
            <span className="ml-3 text-sm text-gray-600">{fileName}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Accepted formats: JPG, JPEG, PNG, WebP
        </p>
      </div>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Blog preview"
            className="w-full max-w-md h-48 object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};