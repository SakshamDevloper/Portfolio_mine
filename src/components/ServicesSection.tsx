import React from 'react';
import { FadeIn } from './Reusable/FadeIn';

interface ServiceItem {
  num: string;
  name: string;
  description: string;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      num: '01',
      name: 'GenAI & Agentic Workflows',
      description: 'Building autonomous multi-agent systems using LangGraph, custom tool integrations, and prompt engineering to automate complex reasoning and processes.',
    },
    {
      num: '02',
      name: 'Custom LLMs & Fine-Tuning',
      description: 'Adapting open-source LLMs (like Llama, Mistral) using PEFT techniques like LoRA and QLoRA for domain-specific tasks and low-latency production deployments.',
    },
    {
      num: '03',
      name: 'RAG & Vector Search',
      description: 'Developing advanced Retrieval-Augmented Generation pipelines using LangChain, ChromaDB, and FAISS for semantic search and document question-answering.',
    },
    {
      num: '04',
      name: 'AI/ML Model Training',
      description: 'Designing and training predictive models using PyTorch and Scikit-learn, featuring custom feature engineering, ARIMA time-series, and evaluation metrics.',
    },
    {
      num: '05',
      name: 'MLOps & API Deployment',
      description: 'Deploying model endpoints as scalable FastAPI REST APIs, packaged with Docker containers, and hosted on Streamlit, AWS, or HuggingFace Spaces.',
    },
  ];

  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full text-[#0C0C0C] relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C] select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>

        {/* Services List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {services.map((service, index) => (
            <FadeIn
              key={service.num}
              delay={index * 0.1}
              y={30}
              className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 flex items-center justify-between gap-6 sm:gap-10 md:gap-16 w-full text-left"
            >
              {/* Left Side: Huge Number */}
              <div 
                className="font-black text-[#0C0C0C] select-none leading-none flex-shrink-0 w-[80px] sm:w-[120px] md:w-[160px]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.num}
              </div>

              {/* Right Side: Name & Description Stacked Vertically */}
              <div className="flex flex-col justify-center flex-grow">
                <h3 
                  className="font-medium uppercase text-[#0C0C0C] mb-2 leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p 
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
