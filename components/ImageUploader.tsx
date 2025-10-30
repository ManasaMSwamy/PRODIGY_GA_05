
import React from 'react';
import { UploadedImage } from '../types';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  uploadedImage: UploadedImage | null;
  onImageUpload: (image: UploadedImage) => void;
  onImageRemove: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedImage, onImageUpload, onImageRemove }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (base64String) {
          onImageUpload({ base64: base64String, mimeType: file.type });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="image-upload" className="block text-sm font-medium text-gray-400 mb-2">
        Source Image
      </label>
      <div className="relative w-full aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center transition-all hover:border-indigo-500 hover:bg-gray-700">
        {uploadedImage ? (
          <>
            <img
              src={`data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`}
              alt="Uploaded preview"
              className="object-contain w-full h-full rounded-lg"
            />
            <button
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
          </div>
        )}
        <input
          id="image-upload"
          name="image-upload"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
