import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ShaderAnimation } from '@/components/shader-animation';

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
    <div className="relative min-h-screen w-full overflow-hidden">
      <ShaderAnimation />
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-12 px-4 py-20">
        {/* Logo + Tagline */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-semibold tracking-tight text-white drop-shadow-lg">
            aurion
          </h1>
          <p className="text-base md:text-lg text-gray-100/80 tracking-[0.25em] uppercase drop-shadow-md">
            Plus besoin de builder des workflows, un seul prompt suffit
          </p>
        </div>

        {/* Prompt Card */}
        <div className="w-full rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl px-6 py-6 sm:px-8 sm:py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Textarea
              placeholder="Créez votre application en quelques secondes..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] text-lg text-white placeholder:text-gray-300 resize-none border border-white/20 bg-white/10 rounded-2xl shadow-inner focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            />

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-white/90 px-8 text-base font-semibold text-gray-900 hover:bg-white"
              >
                Générer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
