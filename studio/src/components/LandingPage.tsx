import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowRight, Zap, Bot, Workflow } from 'lucide-react';
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
            label: agent.name,
            description: agent.description,
            type: 'agent',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Sparkles className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Aurora AI Studio</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your AI workflow in natural language, and we'll create it for you instantly.
          </p>
        </div>

        {/* Main Input Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              <span>What would you like to build?</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Describe your AI agents and workflow, and we'll generate them automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., Create a customer support team that handles inquiries, processes orders, and manages complaints..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 text-lg resize-none border-2 border-indigo-200 focus:border-indigo-500 rounded-xl"
                disabled={isGenerating}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!prompt.trim() || isGenerating}
                  className="px-8 py-3 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating your workflow...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Workflow</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Example Prompts */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4 text-center">Try these examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg transition-colors text-sm"
                    disabled={isGenerating}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <Bot className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">AI Agents</h3>
            <p className="text-sm text-gray-600">Create specialized agents with different roles and capabilities</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <Workflow className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Visual Workflows</h3>
            <p className="text-sm text-gray-600">Design and connect your agents in an intuitive drag-and-drop interface</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Generation</h3>
            <p className="text-sm text-gray-600">Describe what you need in natural language and watch it come to life</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
