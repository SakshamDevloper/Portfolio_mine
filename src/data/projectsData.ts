export interface Project {
  id: string;
  num: string;
  name: string;
  category: string;
  description: string;
  details: string[];
  tools: string[];
  image: string;
  liveUrl: string;
}

export const projectsData: Project[] = [
  {
    id: 'rag-ai-assistant',
    num: '01',
    name: 'RAG-Powered AI Assistant',
    category: 'GenAI & LangChain',
    description: 'An end-to-end Retrieval-Augmented Generation pipeline with conversation history management, built for real-time document Q&A.',
    details: [
      'Built RAG pipeline using LangChain, FAISS vector store, and OpenAI API',
      'Implemented Buffer Memory for conversation history management',
      'Deployed as live web app on HuggingFace Spaces with Streamlit',
      'Optimized for real-time response streaming',
    ],
    tools: ['Python', 'LangChain', 'FAISS', 'OpenAI API', 'Streamlit', 'HuggingFace'],
    image: '/project-1.jpg',
    liveUrl: 'https://github.com/SakshamDevloper/RAG-Powered-AI-Assistant',
  },
  {
    id: 'plant-disease-detection',
    num: '02',
    name: 'Plant Disease Detection',
    category: 'Computer Vision & CNN',
    description: 'A CNN-based computer vision model using transfer learning to classify 10+ foliage conditions with 82%+ accuracy.',
    details: [
      'Engineered CNN architecture with MobileNetV2 transfer learning',
      'Applied data augmentation for robust classification',
      'Classifies 10+ distinct foliage conditions',
      'Deployed on HuggingFace Spaces via Streamlit interface',
    ],
    tools: ['Python', 'PyTorch', 'OpenCV', 'MobileNetV2', 'Streamlit', 'HuggingFace'],
    image: '/project-3.jpg',
    liveUrl: 'https://github.com/SakshamDevloper/Plant-Disease-Detection',
  },
  {
    id: 'sales-forecasting-system',
    num: '03',
    name: 'Sales Forecasting System',
    category: 'Time-Series & ARIMA',
    description: 'An end-to-end time-series forecasting pipeline using ARIMA with custom feature engineering, achieving 12% MAPE.',
    details: [
      'Developed ARIMA-based forecasting pipeline with custom features',
      'Engineered rolling averages and lag features for accuracy',
      'Achieved 12% Mean Absolute Percentage Error (MAPE)',
      'Applied on retail transaction datasets',
    ],
    tools: ['Python', 'Scikit-learn', 'Statsmodels', 'Pandas', 'Matplotlib'],
    image: '/project-2.jpg',
    liveUrl: 'https://github.com/SakshamDevloper/Sales-Forecasting',
  },
];
