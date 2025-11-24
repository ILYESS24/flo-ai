import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LandingPageProps {
  onStartDesigning: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartDesigning }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartDesigning();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-10">
        {/* Logo + Tagline */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
            aurion
          </h1>
          <p className="text-sm text-gray-500 tracking-[0.25em] uppercase">
            Générez du code professionnel
          </p>
        </div>

        {/* Prompt Card */}
        <div className="w-full rounded-3xl border border-gray-200 bg-gray-50 shadow-sm px-6 py-5 sm:px-8 sm:py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Créez votre application en quelques secondes..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px] text-base resize-none border-0 bg-white rounded-2xl shadow-inner focus-visible:ring-0 focus-visible:outline-none"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-gray-300 px-4"
                >
                  Tools
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-gray-300 px-4"
                >
                  Import
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  DeepSeek V3
                </button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-gray-900"
                >
                  Générer
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
