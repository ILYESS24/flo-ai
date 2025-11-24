import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShaderAnimation } from '@/components/shader-animation';
import { Typewriter } from '@/components/ui/typewriter';
import { Link2, CornerDownLeft } from 'lucide-react';

interface LandingPageProps {
  onStartDesigning: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartDesigning }) => {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartDesigning();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ShaderAnimation />
      <div className="relative z-10 w-full max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center space-y-12 px-4">
        {/* Logo + Tagline */}
        <div className="text-center space-y-4">
          <Typewriter
            text={[
              'Stop building complex workflows, one prompt is enough',
              'Describe what you want, we build it for you',
            ]}
            loop
            speed={80}
            deleteSpeed={40}
            delay={1600}
            className="block text-lg md:text-xl font-semibold text-gray-100/90 drop-shadow-md"
          />
        </div>

        {/* Prompt Bar (like screenshot) */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="flex items-center gap-4 rounded-3xl bg-neutral-900 border border-neutral-800 px-6 py-3">
            {/* Left icons */}
            <div className="flex items-center gap-4 text-neutral-400">
              <button
                type="button"
                onClick={handleFileClick}
                className="hover:text-neutral-200 transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFilesChange}
              />
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

        {files.length > 0 && (
          <div className="w-full max-w-3xl text-xs text-neutral-300/80 mt-2">
            {files.length === 1
              ? `1 fichier ajouté : ${files[0].name}`
              : `${files.length} fichiers ajoutés`}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
