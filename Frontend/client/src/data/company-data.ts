export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: string;
  education: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  useCases: string[];
  pricing: {
    startingPrice: string;
    pricingModel: string;
  };
  deliverables: string[];
  timeline: string;
  icon: string;
  gradient: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  technologies: string[];
  features: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  client: {
    name: string;
    industry: string;
    size: string;
  };
  challenges: string[];
  solutions: string[];
  gradient: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface CompanyStats {
  projectsCompleted: number;
  clientsSatisfied: number;
  efficiencyImprovement: number;
  systemUptime: number;
  teamMembers: number;
  yearsExperience: number;
  aiModelsDeployed: number;
  industriesServed: number;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  mission: string;
  vision: string;
  founded: string;
  headquarters: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  milestones: {
    year: string;
    achievement: string;
    description: string;
  }[];
}

// Company Information
export const companyInfo: CompanyInfo = {
  name: 'TRINTZ',
  tagline: 'AI Integration & Advanced Web Development',
  mission: 'To bridge the gap between artificial intelligence and practical business solutions, transforming how organizations operate through intelligent automation and cutting-edge web technologies.',
  vision: 'To become the global leader in AI integration services, empowering businesses of all sizes to harness the transformative power of artificial intelligence.',
  founded: '2019',
  headquarters: 'San Francisco, CA',
  values: [
    {
      title: 'Innovation-First Approach',
      description: 'We prioritize cutting-edge solutions and emerging technologies to stay ahead of industry trends.',
      icon: 'Rocket'
    },
    {
      title: 'Security & Reliability',
      description: 'Enterprise-grade security ensures your systems are always protected and available.',
      icon: 'Shield'
    },
    {
      title: 'Client-Centric Solutions',
      description: 'Every solution is tailored to meet specific client needs and grows with their business objectives.',
      icon: 'Users'
    },
    {
      title: 'Ethical AI Development',
      description: 'We ensure all AI implementations are transparent, fair, and aligned with ethical AI principles.',
      icon: 'Heart'
    }
  ],
  milestones: [
    {
      year: '2019',
      achievement: 'Company Founded',
      description: 'TRINTZ established with a focus on AI integration and web development.'
    },
    {
      year: '2020',
      achievement: 'First Enterprise Client',
      description: 'Secured first major enterprise contract for AI-powered analytics platform.'
    },
    {
      year: '2021',
      achievement: '10 Million Data Points Processed',
      description: 'Our AI systems successfully processed over 10 million data points for clients.'
    },
    {
      year: '2022',
      achievement: 'International Expansion',
      description: 'Expanded operations to serve clients across North America and Europe.'
    },
    {
      year: '2025',
      achievement: 'AI Excellence Award',
      description: 'Recognized for outstanding innovation in AI integration solutions.'
    },
    {
      year: '2024',
      achievement: 'Projects Delivered',
      description: 'Successfully completed AI integration and web development projects.'
    }
  ]
};

// Company Statistics
export const companyStats: CompanyStats = {
  projectsCompleted: 52,
  clientsSatisfied: 28,
  efficiencyImprovement: 315,
  systemUptime: 99.9,
  teamMembers: 12,
  yearsExperience: 5,
  aiModelsDeployed: 18,
  industriesServed: 8
};

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'AI Engineering Lead',
    bio: 'PhD in Machine Learning with 8+ years of experience in neural network architecture and deep learning systems. Specializes in computer vision and natural language processing.',
    avatar: 'AC',
    skills: ['TensorFlow', 'PyTorch', 'Python', 'Neural Networks', 'Deep Learning', 'Computer Vision'],
    experience: '8+ years',
    education: 'PhD in Machine Learning, Stanford University',
    social: {
      linkedin: 'https://linkedin.com/in/alex-chen-ai',
      github: 'https://github.com/alexchen-ai',
      twitter: 'https://twitter.com/alexchen_ai'
    }
  },
  {
    id: 'sarah-rodriguez',
    name: 'Sarah Rodriguez',
    role: 'Full-Stack Developer',
    bio: 'Expert in React, Node.js, and cloud architecture with a passion for creating scalable web applications. Specializes in modern frontend frameworks and serverless architectures.',
    avatar: 'SR',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
    experience: '6+ years',
    education: 'MS in Computer Science, UC Berkeley',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-rodriguez-dev',
      github: 'https://github.com/srodriguez-dev',
      website: 'https://sarahrodriguez.dev'
    }
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    role: 'Data Scientist',
    bio: 'Specializes in predictive modeling and statistical analysis with extensive experience in Python and R. Expert in data pipeline engineering and machine learning operations.',
    avatar: 'MJ',
    skills: ['Python', 'R', 'SQL', 'Apache Spark', 'MLOps', 'Statistical Analysis'],
    experience: '7+ years',
    education: 'PhD in Statistics, MIT',
    social: {
      linkedin: 'https://linkedin.com/in/marcus-johnson-data',
      github: 'https://github.com/mjohnson-data',
      website: 'https://marcusjohnson.data'
    }
  },
  {
    id: 'emma-thompson',
    name: 'Emma Thompson',
    role: 'UX Designer',
    bio: 'Creates intuitive user experiences with a focus on accessibility and human-centered design principles. Specializes in design systems and user research.',
    avatar: 'ET',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
    experience: '5+ years',
    education: 'BA in Design, RISD',
    social: {
      linkedin: 'https://linkedin.com/in/emma-thompson-ux',
      website: 'https://emmathompson.design',
      twitter: 'https://twitter.com/emma_ux'
    }
  },
  {
    id: 'david-kumar',
    name: 'David Kumar',
    role: 'DevOps Engineer',
    bio: 'Ensures seamless deployment and scaling with expertise in Kubernetes, Docker, and cloud infrastructure. Specializes in CI/CD pipelines and infrastructure as code.',
    avatar: 'DK',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins', 'Monitoring'],
    experience: '6+ years',
    education: 'MS in Systems Engineering, Carnegie Mellon',
    social: {
      linkedin: 'https://linkedin.com/in/david-kumar-devops',
      github: 'https://github.com/dkumar-devops',
      website: 'https://davidkumar.cloud'
    }
  }
];

// Services
export const services: Service[] = [
  {
    id: 'ai-model-integration',
    title: 'AI Model Integration',
    description: 'Seamlessly integrate cutting-edge AI models into your existing workflows. From natural language processing to computer vision, we make AI accessible and practical.',
    longDescription: 'Our AI Model Integration service transforms your business processes by incorporating state-of-the-art artificial intelligence capabilities. We specialize in deploying production-ready AI models that integrate seamlessly with your existing systems, ensuring minimal disruption while maximizing value.',
    features: ['Custom model training', 'API development & deployment', 'Performance optimization', 'Real-time inference', 'Model monitoring', 'A/B testing frameworks'],
    technologies: ['TensorFlow', 'PyTorch', 'Hugging Face', 'OpenAI API', 'AWS SageMaker', 'Google AI Platform'],
    useCases: [
      'Document processing and classification',
      'Customer sentiment analysis',
      'Predictive maintenance systems',
      'Fraud detection algorithms',
      'Recommendation engines',
      'Computer vision applications'
    ],
    pricing: {
      startingPrice: '$15,000',
      pricingModel: 'Project-based with ongoing support options'
    },
    deliverables: [
      'Trained and optimized AI models',
      'Integration APIs and documentation',
      'Performance benchmarks and reports',
      'Deployment and monitoring setup',
      'Training materials for your team'
    ],
    timeline: '4-8 weeks',
    icon: 'Brain',
    gradient: 'from-electric to-electric/70'
  },
  {
    id: 'web-development',
    title: 'Advanced Web Applications',
    description: 'Build sophisticated web applications with modern frameworks, responsive design, and performance optimization that scales with your business growth.',
    longDescription: 'We create high-performance web applications using the latest technologies and best practices. Our development approach focuses on scalability, security, and user experience, ensuring your application can grow with your business needs.',
    features: ['React, Vue, Angular expertise', 'Progressive web apps', 'Cloud deployment & scaling', 'Responsive design', 'Performance optimization', 'Security implementation'],
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    useCases: [
      'Enterprise web applications',
      'E-commerce platforms',
      'Data visualization dashboards',
      'Real-time collaboration tools',
      'Progressive web applications',
      'API development and integration'
    ],
    pricing: {
      startingPrice: '$25,000',
      pricingModel: 'Fixed price or time & materials'
    },
    deliverables: [
      'Fully functional web application',
      'Source code and documentation',
      'Deployment pipeline setup',
      'Performance optimization report',
      'User training and support materials'
    ],
    timeline: '6-12 weeks',
    icon: 'Code',
    gradient: 'from-sandstone-400 to-sandstone-500'
  },
  {
    id: 'data-pipeline',
    title: 'Data Pipeline Engineering',
    description: 'Transform raw data into actionable insights with automated pipelines, real-time processing, and intelligent visualization dashboards.',
    longDescription: 'Our Data Pipeline Engineering service creates robust, scalable data infrastructure that processes, transforms, and analyzes your data in real-time. We build end-to-end solutions that turn your data into competitive advantages.',
    features: ['ETL/ELT pipeline design', 'Real-time data streaming', 'Interactive dashboards', 'Data quality monitoring', 'Automated alerting', 'Scalable architecture'],
    technologies: ['Apache Spark', 'Apache Kafka', 'Snowflake', 'BigQuery', 'Tableau', 'Power BI', 'Python', 'SQL'],
    useCases: [
      'Business intelligence dashboards',
      'Real-time analytics platforms',
      'Data warehouse modernization',
      'Customer data platforms',
      'IoT data processing',
      'Financial reporting automation'
    ],
    pricing: {
      startingPrice: '$20,000',
      pricingModel: 'Project-based with maintenance packages'
    },
    deliverables: [
      'Automated data pipelines',
      'Interactive dashboards',
      'Data quality frameworks',
      'Documentation and training',
      'Monitoring and alerting setup'
    ],
    timeline: '5-10 weeks',
    icon: 'ChartLine',
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    id: 'automation-process',
    title: 'Automation Process',
    description: 'Streamline operations with intelligent automation solutions that reduce manual work and increase efficiency while maintaining quality and compliance.',
    longDescription: 'We design and implement intelligent automation solutions that eliminate repetitive tasks, reduce errors, and free up your team to focus on high-value activities. Our automation solutions are built with scalability and maintainability in mind.',
    features: ['Workflow automation', 'Document processing', 'Quality assurance', 'Compliance monitoring', 'Exception handling', 'Integration capabilities'],
    technologies: ['RPA Tools', 'Python', 'Node.js', 'Zapier', 'Microsoft Power Automate', 'AWS Lambda', 'REST APIs'],
    useCases: [
      'Invoice processing automation',
      'Customer onboarding workflows',
      'Inventory management systems',
      'Report generation automation',
      'Email marketing automation',
      'Quality control processes'
    ],
    pricing: {
      startingPrice: '$12,000',
      pricingModel: 'Per process or monthly subscription'
    },
    deliverables: [
      'Automated workflow systems',
      'Process documentation',
      'Training materials',
      'Monitoring dashboards',
      'Support and maintenance plan'
    ],
    timeline: '3-6 weeks',
    icon: 'Bot',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'ai-strategy',
    title: 'AI Strategy Consulting',
    description: 'Navigate the AI landscape with strategic guidance, implementation roadmaps, and best practices tailored to your industry and business objectives.',
    longDescription: 'Our AI Strategy Consulting service helps organizations develop comprehensive AI adoption strategies. We assess your current capabilities, identify opportunities, and create actionable roadmaps for successful AI implementation.',
    features: ['AI readiness assessment', 'Implementation roadmap', 'Training & support', 'ROI analysis', 'Risk assessment', 'Technology selection'],
    technologies: ['Various AI/ML platforms', 'Cloud services', 'Data platforms', 'Analytics tools'],
    useCases: [
      'AI transformation strategy',
      'Technology vendor selection',
      'Change management planning',
      'Team capability building',
      'Proof of concept development',
      'AI governance frameworks'
    ],
    pricing: {
      startingPrice: '$8,000',
      pricingModel: 'Consulting days or retainer'
    },
    deliverables: [
      'AI strategy document',
      'Implementation roadmap',
      'Technology recommendations',
      'Training plan',
      'ROI projections'
    ],
    timeline: '2-4 weeks',
    icon: 'Lightbulb',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'maintenance-support',
    title: 'System Maintenance & Support',
    description: 'Ensure optimal performance with proactive monitoring, regular updates, and 24/7 support for all your AI and web applications.',
    longDescription: 'Our comprehensive maintenance and support service ensures your systems remain secure, performant, and up-to-date. We provide proactive monitoring, regular maintenance, and rapid response to any issues.',
    features: ['24/7 monitoring', 'Performance optimization', 'Security updates', 'Backup management', 'Incident response', 'Capacity planning'],
    technologies: ['Monitoring tools', 'Security platforms', 'Cloud services', 'DevOps tools'],
    useCases: [
      'Application performance monitoring',
      'Security vulnerability management',
      'System optimization',
      'Disaster recovery',
      'Capacity planning',
      'Incident response'
    ],
    pricing: {
      startingPrice: '$2,500/month',
      pricingModel: 'Monthly subscription based on system complexity'
    },
    deliverables: [
      'Monitoring setup and dashboards',
      'Monthly performance reports',
      'Security update schedule',
      'Incident response procedures',
      'Optimization recommendations'
    ],
    timeline: 'Ongoing service',
    icon: 'Wrench',
    gradient: 'from-orange-500 to-orange-600'
  }
];

// Projects
export const projects: Project[] = [
  {
    id: 'ecommerce-ai',
    title: 'AI-Powered E-commerce Platform',
    description: 'Intelligent product recommendations and automated inventory management system.',
    longDescription: 'A comprehensive e-commerce platform that leverages machine learning to provide personalized product recommendations, optimize inventory levels, and automate customer service operations. The system processes over 1 million product interactions daily and has increased conversion rates by 45%.',
    category: 'E-commerce',
    tags: ['React', 'TensorFlow', 'AWS'],
    technologies: ['React', 'Node.js', 'TensorFlow', 'AWS SageMaker', 'DynamoDB', 'Lambda'],
    features: [
      'Personalized product recommendations',
      'Automated inventory optimization',
      'Real-time customer analytics',
      'A/B testing framework',
      'Multi-language support',
      'Mobile-responsive design'
    ],
    results: [
      { metric: 'Conversion Rate Increase', value: '45%', description: 'Improved through personalized recommendations' },
      { metric: 'Inventory Turnover', value: '3.2x', description: 'Faster inventory movement' },
      { metric: 'Customer Satisfaction', value: '92%', description: 'Based on post-purchase surveys' },
      { metric: 'Revenue Growth', value: '38%', description: 'Year-over-year improvement' }
    ],
    timeline: {
      start: 'January 2024',
      end: 'April 2024',
      duration: '3 months'
    },
    client: {
      name: 'RetailTech Solutions',
      industry: 'E-commerce',
      size: '500+ employees'
    },
    challenges: [
      'Handling high-volume product catalog with real-time updates',
      'Implementing personalization without compromising user privacy',
      'Integrating with legacy inventory management systems',
      'Ensuring sub-second response times for recommendations'
    ],
    solutions: [
      'Implemented microservices architecture for scalability',
      'Used federated learning for privacy-preserving personalization',
      'Built custom APIs for legacy system integration',
      'Optimized ML models for edge deployment'
    ],
    gradient: 'from-blue-500 to-purple-600',
    testimonial: {
      quote: 'TRINTZ transformed our e-commerce platform beyond our expectations. The AI recommendations have dramatically improved our customer engagement and sales.',
      author: 'Jennifer Martinez',
      position: 'CTO, RetailTech Solutions'
    }
  },
  {
    id: 'healthcare-analytics',
    title: 'Healthcare Analytics Dashboard',
    description: 'Real-time patient monitoring and predictive health analytics system.',
    longDescription: 'An advanced healthcare analytics platform that provides real-time patient monitoring, predictive health insights, and automated risk assessment. The system integrates with multiple medical devices and EHR systems to provide comprehensive patient care management.',
    category: 'Healthcare',
    tags: ['Vue.js', 'Python', 'Azure'],
    technologies: ['Vue.js', 'Python', 'Azure ML', 'FHIR', 'PostgreSQL', 'Docker'],
    features: [
      'Real-time patient monitoring',
      'Predictive risk assessment',
      'Clinical decision support',
      'HIPAA-compliant data handling',
      'Multi-device integration',
      'Automated reporting'
    ],
    results: [
      { metric: 'Early Risk Detection', value: '78%', description: 'Improvement in early risk identification' },
      { metric: 'Clinical Efficiency', value: '35%', description: 'Reduction in manual data entry' },
      { metric: 'Patient Outcomes', value: '22%', description: 'Improvement in treatment outcomes' },
      { metric: 'Cost Reduction', value: '$2.3M', description: 'Annual operational cost savings' }
    ],
    timeline: {
      start: 'September 2025',
      end: 'February 2024',
      duration: '5 months'
    },
    client: {
      name: 'Metro Health System',
      industry: 'Healthcare',
      size: '1000+ employees'
    },
    challenges: [
      'Ensuring HIPAA compliance across all system components',
      'Integrating with diverse medical device protocols',
      'Managing high-velocity streaming medical data',
      'Providing real-time alerts without alert fatigue'
    ],
    solutions: [
      'Implemented end-to-end encryption and audit logging',
      'Built universal device integration framework',
      'Used Apache Kafka for real-time data streaming',
      'Developed intelligent alert prioritization algorithms'
    ],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'fintech-trading',
    title: 'Financial Trading Automation',
    description: 'Algorithmic trading platform with machine learning risk assessment.',
    longDescription: 'A sophisticated algorithmic trading platform that uses machine learning for market analysis, risk assessment, and automated trade execution. The system processes millions of market data points in real-time and executes trades with microsecond precision.',
    category: 'Finance',
    tags: ['Angular', 'PyTorch', 'GCP'],
    technologies: ['Angular', 'Python', 'PyTorch', 'Google Cloud', 'BigQuery', 'Kubernetes'],
    features: [
      'Real-time market analysis',
      'Automated trade execution',
      'Risk management algorithms',
      'Portfolio optimization',
      'Regulatory compliance',
      'Performance analytics'
    ],
    results: [
      { metric: 'Trading Accuracy', value: '87%', description: 'Successful trade prediction rate' },
      { metric: 'Risk Reduction', value: '42%', description: 'Decrease in portfolio volatility' },
      { metric: 'Execution Speed', value: '12μs', description: 'Average trade execution time' },
      { metric: 'ROI Improvement', value: '156%', description: 'Compared to manual trading' }
    ],
    timeline: {
      start: 'May 2025',
      end: 'November 2025',
      duration: '6 months'
    },
    client: {
      name: 'Quantum Capital',
      industry: 'Financial Services',
      size: '200+ employees'
    },
    challenges: [
      'Processing high-frequency market data with minimal latency',
      'Implementing robust risk management protocols',
      'Ensuring regulatory compliance across multiple jurisdictions',
      'Maintaining system stability during market volatility'
    ],
    solutions: [
      'Built low-latency microservices architecture',
      'Implemented multi-layer risk management framework',
      'Developed compliance monitoring and reporting system',
      'Created fault-tolerant distributed system design'
    ],
    gradient: 'from-yellow-500 to-orange-600'
  }
];

// Contact Information
export const contactInfo = {
  email: {
    general: 'hello@trintz.com',
    support: 'support@trintz.com',
    careers: 'careers@trintz.com'
  },
  phone: {
    main: '+91 63830 93272',
    support: '+91 63830 93272'
  },
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States'
  },
  businessHours: {
    weekdays: '9:00 AM - 6:00 PM PST',
    saturday: '10:00 AM - 4:00 PM PST',
    sunday: 'Closed'
  },
  social: {
    linkedin: 'https://linkedin.com/company/trintz',
    twitter: 'https://twitter.com/trintz_ai',
    github: 'https://github.com/trintz',
    youtube: 'https://youtube.com/trintz'
  }
};

// Technology Stack
export const technologyStack = {
  frontend: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'Express.js', 'FastAPI'],
  ai_ml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'OpenAI', 'LangChain'],
  cloud: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'BigQuery', 'Snowflake'],
  tools: ['Git', 'Jenkins', 'Grafana', 'Prometheus', 'Sentry', 'DataDog']
};

// Export all data
export const companyData = {
  info: companyInfo,
  stats: companyStats,
  team: teamMembers,
  services,
  projects: projects,
  contact: contactInfo,
  technology: technologyStack
};

export default companyData;
