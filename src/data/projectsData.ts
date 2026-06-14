export interface Project {
  id: string;
  num: string;
  name: string;
  category: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  liveUrl: string;
}

export const projectsData: Project[] = [
  {
    id: 'rag-ai-assistant',
    num: '01',
    name: 'RAG-Powered AI Assistant',
    category: 'GenAI & LangChain',
    col1Image1: '/code_visual.png',
    col1Image2: '/server_rack.png',
    col2Image: '/rag_showcase.png',
    liveUrl: 'https://github.com/SakshamDevloper/RAG-Powered-AI-Assistant',
  },
  {
    id: 'plant-disease-detection',
    num: '02',
    name: 'Plant Disease Detection',
    category: 'Computer Vision & CNN',
    col1Image1: '/neural_net.png',
    col1Image2: '/code_visual.png',
    col2Image: '/plant_disease_cv.png',
    liveUrl: 'https://github.com/SakshamDevloper/Plant-Disease-Detection',
  },
  {
    id: 'sales-forecasting-system',
    num: '03',
    name: 'Sales Forecasting System',
    category: 'Time-Series & ARIMA',
    col1Image1: '/server_rack.png',
    col1Image2: '/neural_net.png',
    col2Image: '/sales_forecast.png',
    liveUrl: 'https://github.com/SakshamDevloper/Sales-Forecasting',
  },
];
