import React, { ChangeEvent } from 'react';
import { Image, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  imagePreviewUrls: string[];
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  isSubmitting: boolean;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreviewUrls,
  onImageUpload,
  onRemoveImage,
  isSubmitting,
  error,
}) => {
  const maxImages = 3;
  const canAddMoreImages = imagePreviewUrls.length < maxImages;
  
  return (
    <div>
      <p className="form-label">Add images (optional)</p>
      
      {/* Image preview area */}
      {imagePreviewUrls.length > 0 && (
        <div className="mt-2 mb-3 grid grid-cols-3 gap-2">
          {imagePreviewUrls.map((url, index) => (
            <div 
              key={index} 
              className="relative rounded-md overflow-hidden border border-gray-200 aspect-square group"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                disabled={isSubmitting}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Trash2 className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload button */}
      {canAddMoreImages && (
        <div className="mt-2">
          <label 
            htmlFor="imageUpload" 
            className={`flex items-center justify-center border-2 border-dashed ${error ? 'border-accent-400' : 'border-gray-300'} rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            <div className="flex flex-col items-center">
              <Image className="h-6 w-6 text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">
                {imagePreviewUrls.length === 0 
                  ? 'Click to upload images' 
                  : `Add ${maxImages - imagePreviewUrls.length} more image${maxImages - imagePreviewUrls.length > 1 ? 's' : ''}`}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG or GIF (max {maxImages})
              </span>
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
              disabled={isSubmitting}
              className="hidden"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;