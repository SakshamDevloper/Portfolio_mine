import React, { useEffect } from 'react';
import { X, FileText, ExternalLink, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0C0C0C] border border-[#D7E2EA]/15 rounded-3xl overflow-hidden shadow-2xl shadow-[#B600A8]/10">
        <div className="sticky top-0 bg-[#0C0C0C]/95 backdrop-blur-sm border-b border-[#D7E2EA]/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#B600A8]" />
            <h2 className="text-lg font-semibold text-[#D7E2EA] uppercase tracking-wider">Resume</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/16NPM10sRplKyVnAYxFYgwak9kAw8-vKW/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors px-3 py-1.5 rounded-lg border border-[#D7E2EA]/10 hover:border-[#B600A8]/40"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#D7E2EA]/40 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 text-[#D7E2EA] space-y-6" style={{ maxHeight: 'calc(85vh - 70px)' }}>
          <div className="border-b border-[#D7E2EA]/10 pb-6">
            <h1 className="text-2xl font-bold text-[#D7E2EA]">Saksham Sethi</h1>
            <p className="text-[#B600A8] font-medium mt-1">AI/ML Engineer</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-[#D7E2EA]/60">
              <span>sakshamsethi353@gmail.com</span>
              <span>+91-7889914194</span>
              <span>Jammu, India</span>
            </div>
          </div>

          <div className="bg-[#D7E2EA]/5 border-l-2 border-[#B600A8] p-4 rounded-r-xl">
            <p className="text-sm text-[#D7E2EA]/80 leading-relaxed">
              <strong className="text-[#D7E2EA]">Professional Summary:</strong> AI/ML Engineer with hands-on expertise in Python, Machine Learning, NLP, Computer Vision, and GenAI application development. Built and deployed production-grade projects including an LLM-powered Voice Assistant, Computer Vision disease detection model, and Time-Series Forecasting pipeline. Proficient in LangChain, HuggingFace, RAG pipelines, and REST API development.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              <div className="border border-[#D7E2EA]/10 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold">B.E. in Information Technology (Lateral Entry)</h4>
                    <p className="text-xs text-[#D7E2EA]/60 mt-0.5">Parul Institute of Engineering and Technology</p>
                  </div>
                  <span className="text-[10px] text-[#D7E2EA]/40 whitespace-nowrap">2024 – 2027 (Expected)</span>
                </div>
              </div>
              <div className="border border-[#D7E2EA]/10 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold">Diploma in Information Technology</h4>
                    <p className="text-xs text-[#D7E2EA]/60 mt-0.5">Government Polytechnic College, Jammu</p>
                  </div>
                  <span className="text-[10px] text-[#D7E2EA]/40 whitespace-nowrap">2021 – 2024</span>
                </div>
                <p className="text-xs text-green-400 mt-2">CGPA: 7.35/10</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-4">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Languages', content: 'Python, JavaScript, Java, C++, SQL' },
                { title: 'GenAI & LLMs', content: 'LangChain, LangGraph, RAG Pipelines, Prompt Engineering, Hugging Face Transformers, OpenAI API, Fine-Tuning (LoRA/QLoRA)' },
                { title: 'AI/ML', content: 'Scikit-learn, PyTorch, TensorFlow, NLP (spaCy, NLTK), Computer Vision (OpenCV), ARIMA, Feature Engineering' },
                { title: 'MLOps & Deployment', content: 'Docker, Streamlit, FastAPI, Hugging Face Spaces, REST APIs, Git, Linux' },
                { title: 'Backend & Databases', content: 'Node.js, Spring Boot, MongoDB, MySQL, Firebase, Chroma, FAISS Vector DB' },
                { title: 'Core CS', content: 'DSA (300+ LeetCode), OOP, DBMS, Operating Systems' },
              ].map((skill, i) => (
                <div key={i} className="bg-[#D7E2EA]/5 rounded-xl p-4 border border-[#D7E2EA]/5">
                  <h4 className="text-xs font-semibold text-[#D7E2EA]/80 mb-2 uppercase tracking-wider">{skill.title}</h4>
                  <p className="text-xs text-[#D7E2EA]/60 leading-relaxed">{skill.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-4">Professional Experience</h3>
            <div className="border border-[#D7E2EA]/10 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-semibold">Software Development Intern</h4>
                  <p className="text-xs text-[#0A66C2]">Cognifyz Technologies (Remote)</p>
                </div>
                <span className="text-[10px] text-[#D7E2EA]/40 whitespace-nowrap">Feb 2026 – Mar 2026</span>
              </div>
              <ul className="text-xs text-[#D7E2EA]/70 space-y-1.5 ml-4 list-disc">
                <li>Developed and optimized backend modules to improve system response times through structured code refactoring.</li>
                <li>Collaborated asynchronously with a distributed team, gaining hands-on exposure to Git, REST APIs, and Postman.</li>
              </ul>
              <span className="inline-block mt-2 text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Completion Certificate</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-4">Projects</h3>
            <div className="space-y-3">
              {[
                {
                  name: 'RAG-Powered AI Assistant',
                  subtitle: 'Embedded Software',
                  details: [
                    'Built an end-to-end Retrieval-Augmented Generation pipeline using LangChain, FAISS vector store, and OpenAI API.',
                    'Deployed as a live web application on HuggingFace Spaces using Streamlit for optimized real-time response streaming.',
                  ],
                  tools: 'Python, LangChain, FAISS, OpenAI API, Streamlit, HuggingFace',
                },
                {
                  name: 'Plant Disease Detection',
                  subtitle: 'Web Application',
                  details: [
                    'Engineered a CNN-based computer vision architecture utilizing transfer learning (MobileNetV2) and data augmentation.',
                    'Achieved 82%+ test accuracy before deploying onto HuggingFace Spaces using a Streamlit interface.',
                  ],
                  tools: 'Python, PyTorch, OpenCV, Streamlit, Hugging Face Spaces',
                },
                {
                  name: 'Sales Forecasting System',
                  subtitle: 'Embedded Software',
                  details: [
                    'Developed an end-to-end time-series forecasting pipeline using ARIMA models with custom feature engineering.',
                    'Delivered predictions yielding a 12% Mean Absolute Percentage Error (MAPE) on retail transaction datasets.',
                  ],
                  tools: 'Python, Scikit-learn, Statsmodels, Pandas, Matplotlib',
                },
              ].map((proj, i) => (
                <div key={i} className="border border-[#D7E2EA]/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold">{proj.name}</h4>
                    <span className="text-[10px] text-[#D7E2EA]/40">{proj.subtitle}</span>
                  </div>
                  <ul className="text-xs text-[#D7E2EA]/70 space-y-1 ml-4 list-disc mt-2">
                    {proj.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-[#D7E2EA]/40 mt-2 italic"><strong className="text-[#D7E2EA]/60 not-italic">Tools:</strong> {proj.tools}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-4">Achievements & Certifications</h3>
            <div className="space-y-2">
              {[
                'Solved 300+ DSA problems on LeetCode (Arrays, Trees, Graphs, DP)',
                'Currently building: LangGraph multi-agent system & LLM fine-tuning project (LoRA on Mistral-7B)',
                'AWS ML Engineer Associate & Data Engineering Foundations Certifications',
                'Graphs Camp AlgoUniversity Certification (2025) & AI for Techies Certification (2025)',
                'Computer Networks NPTEL (2024) & CIIIT - Tata Technologies (2024) Certifications',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#D7E2EA]/70">
                  <span className="text-[#B600A8] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4 border-t border-[#D7E2EA]/10">
            <a
              href="https://drive.google.com/file/d/16NPM10sRplKyVnAYxFYgwak9kAw8-vKW/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-sm font-medium px-6 py-3 rounded-full hover:shadow-[0_0_25px_rgba(182,0,168,0.4)] transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Resume PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
