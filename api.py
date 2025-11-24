"""
Aurora AI API - FastAPI application for Render deployment
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import asyncio
from typing import Optional, Dict, Any
import json

# Aurora AI imports
from aurora_ai.builder.agent_builder import AgentBuilder
from aurora_ai.llm import OpenAI, Anthropic, Gemini
from aurora_ai.aurora import AuroraBuilder
from aurora_ai.models.agent import Agent
from aurora_ai.aurora.memory import MessageMemory

app = FastAPI(
    title="Aurora AI API",
    description="Aurora AI Agent Framework API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AgentRequest(BaseModel):
    prompt: str
    model: str = "gpt-4o-mini"
    provider: str = "openai"
    temperature: float = 0.7

class WorkflowRequest(BaseModel):
    yaml_config: str
    inputs: list[str]

class SimpleWorkflowRequest(BaseModel):
    task: str
    agents_config: Optional[Dict[str, Any]] = None

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Flo AI API is running!", "status": "healthy"}

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "providers": {
            "openai": bool(os.getenv("OPENAI_API_KEY")),
            "anthropic": bool(os.getenv("ANTHROPIC_API_KEY")),
            "gemini": bool(os.getenv("GOOGLE_API_KEY")),
        }
    }

@app.post("/agent/chat")
async def chat_with_agent(request: AgentRequest):
    """Simple agent chat endpoint"""
    try:
        # Create LLM based on provider
        llm = None
        if request.provider == "openai":
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise HTTPException(status_code=400, detail="OpenAI API key not configured")
            llm = OpenAI(model=request.model, temperature=request.temperature, api_key=api_key)
        elif request.provider == "anthropic":
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                raise HTTPException(status_code=400, detail="Anthropic API key not configured")
            llm = Anthropic(model=request.model, temperature=request.temperature, api_key=api_key)
        elif request.provider == "gemini":
            api_key = os.getenv("GOOGLE_API_KEY")
            if not api_key:
                raise HTTPException(status_code=400, detail="Google API key not configured")
            llm = Gemini(model=request.model, temperature=request.temperature, api_key=api_key)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported provider: {request.provider}")

        # Create agent
        agent = (
            AgentBuilder()
            .with_name("API Agent")
            .with_prompt("You are a helpful AI assistant.")
            .with_llm(llm)
            .build()
        )

        # Run agent
        response = await agent.run(request.prompt)
        return {"response": response, "status": "success"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/workflow/simple")
async def run_simple_workflow(request: SimpleWorkflowRequest):
    """Run a simple multi-agent workflow"""
    try:
        # Check API key
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=400, detail="OpenAI API key not configured")

        llm = OpenAI(model="gpt-4o-mini", api_key=api_key)

        # Default agents configuration
        default_config = {
            "planner": {
                "prompt": "You are a project planner. Create detailed plans with numbered steps.",
                "role": "planner"
            },
            "developer": {
                "prompt": "You are a software developer. Implement solutions based on plans.",
                "role": "developer"
            },
            "reviewer": {
                "prompt": "You are a code reviewer. Review and provide feedback on implementations.",
                "role": "reviewer"
            }
        }

        agents_config = request.agents_config or default_config

        # Create agents
        agents = []
        for name, config in agents_config.items():
            agent = Agent(
                name=name,
                system_prompt=config["prompt"],
                llm=llm
            )
            agents.append(agent)

        # Simple routing logic
        def simple_router(memory):
            messages = memory.get()
            if len(messages) < 2:
                return "developer"
            elif len(messages) < 4:
                return "reviewer"
            else:
                return "reviewer"  # End with reviewer

        # Build workflow
        workflow = (
            auroraBuilder()
            .add_agents(agents)
            .start_with(agents[0])  # Start with planner
            .add_edge(agents[0], agents[1:], simple_router)
            .end_with(agents[-1])  # End with reviewer
            .build()
        )

        # Run workflow
        result = await workflow.run([request.task])

        return {
            "result": result,
            "status": "success",
            "workflow_steps": len(agents)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/workflow/yaml")
async def run_yaml_workflow(request: WorkflowRequest):
    """Run workflow from YAML configuration"""
    try:
        # Create workflow from YAML
        workflow = auroraBuilder.from_yaml(yaml_str=request.yaml_config)

        # Run workflow
        result = await workflow.build_and_run(request.inputs)

        return {"result": result, "status": "success"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
