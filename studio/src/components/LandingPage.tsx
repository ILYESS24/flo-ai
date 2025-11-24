import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const LandingPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const examplePrompts = [
    "Create a customer support agent that can handle product inquiries, complaints, and order tracking",
    "Build a content writing team with a researcher, writer, and editor that work together",
    "Design a data analysis workflow with agents for data cleaning, analysis, and report generation",
    "Make a coding assistant team with a planner, developer, and tester for software development"
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">Aurora AI</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Tools
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Import
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Auto
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              New Project
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Try these examples</h2>
        </div>

        {/* Prompt Input */}
        <div className="mb-8">
          <Textarea
            placeholder="Describe your AI workflow..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-24 text-base resize-none border border-gray-300 focus:border-indigo-500 rounded-lg bg-white"
          />
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 gap-3 mb-12">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              {example}
            </button>
          ))}
        </div>

        {/* My Projects Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Import
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                New Project
              </Button>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <h4 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h4>
            <p className="text-gray-600 mb-4">
              Start building your first AI workflow above, or import an existing one
            </p>
            <Button variant="outline">
              Import Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
