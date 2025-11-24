import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShaderAnimation } from '@/components/shader-animation';
import { Typewriter } from '@/components/ui/typewriter';
import { Link2, Mic, CornerDownLeft } from 'lucide-react';

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
          <Typewriter
            text={[
              'Plus besoin de builder des workflows, un seul prompt suffit',
              'Décris ton idée, on s’occupe du reste',
            ]}
            loop
            speed={80}
            deleteSpeed={40}
            delay={1600}
            className="block text-base md:text-lg text-gray-100/80 tracking-[0.25em] uppercase drop-shadow-md"
          />
        </div>

        {/* Prompt Bar (like screenshot) */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="flex items-center gap-4 rounded-3xl bg-neutral-900 border border-neutral-800 px-6 py-3">
            {/* Left icons */}
            <div className="flex items-center gap-4 text-neutral-400">
              <Link2 className="w-4 h-4" />
              <Mic className="w-4 h-4" />
            </div>

            {/* Prompt input */}
            <input
              type="text"
              placeholder=""
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-base text-neutral-100"
            />

            {/* Send button */}
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-full bg-neutral-200 text-neutral-900 hover:bg-white shrink-0"
            >
              <CornerDownLeft className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
