
import React, { useState, useCallback } from 'react';
import { UploadedImage } from './types';
import { translateImage } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { SparklesIcon, LoadingSpinner } from './components/icons';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((image: UploadedImage) => {
    setUploadedImage(image);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleImageRemove = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt) {
      setError("Please upload an image and provide a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await translateImage(uploadedImage, prompt);
      setGeneratedImage(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = !uploadedImage || !prompt || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <SparklesIcon className="w-10 h-10 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Pix2Pix AI Image Translator
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Upload an image, describe the transformation you want, and let AI generate a new version.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Input Panel */}
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-6">
            <ImageUploader
              uploadedImage={uploadedImage}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
            />
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
                Transformation Prompt
              </label>
              <textarea
                id="prompt"
                name="prompt"
                rows={3}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="e.g., 'Turn this into a watercolor painting', 'make it a snowy winter scene', 'add a robot cat'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5" />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
             <GeneratedImageDisplay
                generatedImage={generatedImage}
                isLoading={isLoading}
             />
          </div>
        </main>
        
        {error && (
            <div className="mt-8 max-w-xl mx-auto bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini AI. This app simulates cGAN (pix2pix) functionality using generative AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
