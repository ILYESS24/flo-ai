import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ArrowRight, Bot, Plus, FolderOpen, Settings, Import, Cpu } from 'lucide-react';
import { useDesignerStore } from '@/store/designerStore';

interface LandingPageProps {
  onStartDesigning: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartDesigning }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addNode } = useDesignerStore();

  const examplePrompts = [
    "Create a customer support agent that can handle product inquiries, complaints, and order tracking",
    "Build a content writing team with a researcher, writer, and editor that work together",
    "Design a data analysis workflow with agents for data cleaning, analysis, and report generation",
    "Make a coding assistant team with a planner, developer, and tester for software development"
  ];

  const parsePromptAndCreateAgents = async (userPrompt: string) => {
    setIsGenerating(true);

    // Simulation d'analyse du prompt (dans un vrai projet, cela utiliserait une API IA)
    setTimeout(() => {
      const agents = extractAgentsFromPrompt(userPrompt);

      // Créer les nœuds d'agents sur le canvas
      agents.forEach((agent, index) => {
        const nodeId = `agent_${index + 1}`;
        addNode({
          id: nodeId,
          type: 'agent',
          position: {
            x: 100 + (index * 300),
            y: 200
          },
          data: {
            agent: {
              id: nodeId,
              name: agent.name,
              role: agent.role,
              job: agent.description,
              model: {
                provider: 'openai',
                name: 'gpt-4o-mini'
              },
              settings: {
                temperature: 0.7
              }
            }
          }
        });
      });

      setIsGenerating(false);
      onStartDesigning();
    }, 2000);
  };

  const extractAgentsFromPrompt = (prompt: string): Array<{name: string, role: string, description: string}> => {
    // Logique simple d'extraction d'agents depuis le prompt
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('customer support') || lowerPrompt.includes('support')) {
      return [
        {
          name: 'Support Agent',
          role: 'Customer Support Specialist',
          description: 'Handles customer inquiries, complaints, and provides product information'
        },
        {
          name: 'Order Tracker',
          role: 'Order Management Agent',
          description: 'Tracks orders, provides shipping updates, and handles order modifications'
        }
      ];
    }

    if (lowerPrompt.includes('content writing') || lowerPrompt.includes('writing')) {
      return [
        {
          name: 'Researcher',
          role: 'Content Researcher',
          description: 'Researches topics and gathers information for content creation'
        },
        {
          name: 'Writer',
          role: 'Content Writer',
          description: 'Creates engaging content based on research and requirements'
        },
        {
          name: 'Editor',
          role: 'Content Editor',
          description: 'Reviews and polishes content for quality and accuracy'
        }
      ];
    }

    if (lowerPrompt.includes('data analysis') || lowerPrompt.includes('analysis')) {
      return [
        {
          name: 'Data Cleaner',
          role: 'Data Preparation Agent',
          description: 'Cleans and prepares data for analysis'
        },
        {
          name: 'Data Analyst',
          role: 'Data Analysis Agent',
          description: 'Performs statistical analysis and generates insights'
        },
        {
          name: 'Report Generator',
          role: 'Report Creation Agent',
          description: 'Creates comprehensive reports from analysis results'
        }
      ];
    }

    if (lowerPrompt.includes('coding') || lowerPrompt.includes('development')) {
      return [
        {
          name: 'Planner',
          role: 'Project Planner',
          description: 'Plans development tasks and creates implementation strategies'
        },
        {
          name: 'Developer',
          role: 'Software Developer',
          description: 'Writes and implements code according to specifications'
        },
        {
          name: 'Tester',
          role: 'Quality Assurance Agent',
          description: 'Tests code functionality and identifies issues'
        }
      ];
    }

    // Default fallback
    return [
      {
        name: 'AI Assistant',
        role: 'General Purpose Agent',
        description: 'A versatile AI assistant ready to help with various tasks'
      }
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      parsePromptAndCreateAgents(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header - Inspired by Orchids */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-indigo-600" />
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
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            The AI Agent Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build AI agents and workflows with natural language
          </p>
        </div>

        {/* Main Prompt Input */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What would you like to build?
            </h2>
            <p className="text-gray-600">
              Describe your AI workflow and we'll create it for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Textarea
                placeholder="e.g., Create a customer support team that handles inquiries, processes orders, and manages complaints..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-24 text-base resize-none border-2 border-gray-300 focus:border-indigo-500 rounded-xl bg-white shadow-sm"
                disabled={isGenerating}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={!prompt.trim() || isGenerating}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Building your agents...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5" />
                    <span>Build Agents</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Examples Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Try these examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-left p-4 bg-white border border-gray-200 hover:border-indigo-300 rounded-lg transition-all duration-200 hover:shadow-md"
                disabled={isGenerating}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{example}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* My Projects Section - Inspired by Orchids */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FolderOpen className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h4>
            <p className="text-gray-600 mb-4">
              Start building your first AI workflow above, or import an existing one
            </p>
            <Button variant="outline">
              <Import className="w-4 h-4 mr-2" />
              Import Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
