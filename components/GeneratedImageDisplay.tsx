
import React from 'react';
import { LoadingSpinner, SparklesIcon } from './icons';

interface GeneratedImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ generatedImage, isLoading }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Generated Image
      </label>
      <div className="relative w-full aspect-square bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col items-center justify-center z-10">
            <LoadingSpinner className="h-12 w-12 text-indigo-400" />
            <p className="mt-4 text-gray-300">Generating your image...</p>
          </div>
        )}
        {generatedImage ? (
          <img
            src={`data:image/png;base64,${generatedImage}`}
            alt="Generated result"
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-center text-gray-500">
            <SparklesIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm">Your translated image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
