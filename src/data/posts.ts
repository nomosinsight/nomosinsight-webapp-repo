import type { BlogPost } from '../types/blog';

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Implementing RAG-based LLM Solutions for Enterprise',
    slug: 'implementing-rag-llm-solutions',
    excerpt: 'Discover how Nomos Insights implements Retrieval-Augmented Generation (RAG) with Large Language Models to enhance enterprise applications and improve decision-making processes.',
    content: `# Implementing RAG-based LLM Solutions for Enterprise

Large Language Models (LLMs) have revolutionized how businesses handle information and automation. At Nomos Insights, we've developed a sophisticated approach to implementing RAG-based solutions that combine the power of LLMs with enterprise-specific knowledge bases.

## Understanding RAG Architecture

RAG (Retrieval-Augmented Generation) is a hybrid architecture that combines:
- Information retrieval from existing knowledge bases
- Dynamic content generation using LLMs
- Context-aware response synthesis

## Benefits for Enterprise

Our implementation provides several key advantages:
1. Improved accuracy through domain-specific knowledge
2. Reduced hallucination in AI responses
3. Better compliance with enterprise policies
4. Enhanced security and data privacy

## Real-world Applications

We've successfully deployed RAG solutions across various use cases:
- Customer support automation
- Internal knowledge management
- Technical documentation
- Policy compliance checking

Contact us to learn how we can implement RAG-based solutions for your enterprise.`,
    author: {
      id: '1',
      name: 'Raj Patel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      role: 'AI Solutions Architect'
    },
    publishedAt: '2024-03-15T10:00:00Z',
    readingTime: '8 min read',
    category: {
      id: '1',
      name: 'Artificial Intelligence',
      slug: 'ai'
    },
    tags: ['AI', 'LLM', 'Enterprise', 'RAG'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop'
  },
  {
    id: '2',
    title: 'Cloud Migration Success Story: Healthcare Provider',
    slug: 'healthcare-cloud-migration',
    excerpt: 'Learn how Nomos Insights helped a major healthcare provider modernize their infrastructure through a seamless cloud migration to AWS.',
    content: `# Cloud Migration Success Story: Healthcare Provider

## The Challenge

Our client, a leading healthcare provider in Gujarat, needed to modernize their infrastructure while ensuring HIPAA compliance and zero downtime. They were running legacy systems that were becoming increasingly difficult to maintain and scale.

## Our Solution

We developed a comprehensive cloud migration strategy that included:

### Phase 1: Assessment and Planning
- Infrastructure audit
- Compliance requirements mapping
- Risk assessment
- Migration roadmap development

### Phase 2: Implementation
- Gradual migration using the strangler pattern
- Custom security implementations
- Automated deployment pipelines
- Real-time monitoring setup

### Phase 3: Optimization
- Performance tuning
- Cost optimization
- Staff training
- Documentation

## Results

The migration resulted in:
- 40% reduction in operational costs
- 99.99% uptime
- Improved security posture
- Better scalability

Contact us to learn how we can help with your cloud migration journey.`,
    author: {
      id: '2',
      name: 'Priya Shah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      role: 'Cloud Solutions Architect'
    },
    publishedAt: '2024-03-10T10:00:00Z',
    readingTime: '6 min read',
    category: {
      id: '3',
      name: 'Cloud Computing',
      slug: 'cloud'
    },
    tags: ['AWS', 'Healthcare', 'Cloud Migration', 'DevOps'],
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'
  },
  {
    id: '3',
    title: 'Building Scalable E-commerce with React and FastAPI',
    slug: 'scalable-ecommerce-react-fastapi',
    excerpt: 'Explore our modern e-commerce architecture using React for the frontend and FastAPI for a high-performance backend.',
    content: `# Building Scalable E-commerce with React and FastAPI

## Modern E-commerce Architecture

At Nomos Insights, we've developed a powerful e-commerce architecture that combines React's frontend capabilities with FastAPI's high-performance backend. Here's how we build scalable solutions:

### Frontend Architecture
- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- PWA support
- Optimized performance

### Backend Implementation
- FastAPI for high-performance APIs
- PostgreSQL for reliable data storage
- Redis for caching
- Elasticsearch for search
- RabbitMQ for order processing

## Performance Optimizations

Our implementation focuses on:
1. Code splitting
2. Lazy loading
3. Image optimization
4. API response caching
5. Database query optimization

## Results
- 300ms average page load time
- 99.9% uptime
- 100K+ concurrent users support

Contact us to discuss your e-commerce project.`,
    author: {
      id: '3',
      name: 'Amit Patel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      role: 'Senior Full Stack Developer'
    },
    publishedAt: '2024-03-05T10:00:00Z',
    readingTime: '7 min read',
    category: {
      id: '2',
      name: 'Web Development',
      slug: 'web-dev'
    },
    tags: ['React', 'FastAPI', 'E-commerce', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=630&fit=crop'
  }
];

const additionalPosts: BlogPost[] = [
  {
    id: '4',
    title: 'Building RAG Applications with OpenAI: A Practical Guide',
    slug: 'rag-openai-guide',
    excerpt: 'Learn how to implement Retrieval-Augmented Generation (RAG) using OpenAI APIs to create more accurate and context-aware AI applications.',
    content: `# Building RAG Applications with OpenAI: A Practical Guide

## Understanding RAG Architecture

Retrieval-Augmented Generation (RAG) combines the power of large language models with custom knowledge bases to provide accurate, contextual responses. Here's how to implement it effectively:

### Key Components

1. Vector Database Setup
- Using Pinecone for vector storage
- Document chunking strategies
- Efficient embedding generation

2. OpenAI Integration
- API configuration
- Prompt engineering
- Context window optimization

3. Retrieval Strategy
- Semantic search implementation
- Relevance scoring
- Context merging techniques

## Implementation Steps

\`\`\`typescript
// Example RAG implementation
async function generateResponse(query: string) {
  // 1. Generate embeddings for the query
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query
  });

  // 2. Retrieve relevant documents
  const relevantDocs = await vectorDb.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 3
  });

  // 3. Generate response with context
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Use the following context to answer the question." },
      { role: "user", content: \`Context: \${relevantDocs.join('\\n')}\\n\\nQuestion: \${query}\` }
    ]
  });

  return completion.choices[0].message.content;
}
\`\`\`

## Best Practices

- Implement proper error handling
- Cache frequently accessed embeddings
- Use streaming responses for better UX
- Monitor token usage and costs

Contact us to implement RAG in your applications.`,
    author: {
      id: '4',
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      role: 'AI Engineer'
    },
    publishedAt: '2024-03-18T10:00:00Z',
    readingTime: '10 min read',
    category: {
      id: '1',
      name: 'Artificial Intelligence',
      slug: 'ai'
    },
    tags: ['OpenAI', 'RAG', 'Vector Database', 'LLM'],
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop'
  },
  {
    id: '5',
    title: 'Custom E-commerce Solutions for MSMEs: A Complete Guide',
    slug: 'msme-ecommerce-solutions',
    excerpt: 'Discover how small businesses can leverage custom e-commerce solutions with integrated payment gateways to boost their online presence.',
    content: `# Custom E-commerce Solutions for MSMEs: A Complete Guide

## Understanding MSME Requirements

Small businesses need cost-effective yet scalable solutions. Here's our approach:

### Core Features

1. Payment Integration
- Multiple payment gateway support
- UPI integration
- International payment handling

2. Inventory Management
- Real-time stock tracking
- Low stock alerts
- Bulk import/export

3. Order Processing
- Automated order confirmation
- Invoice generation
- Shipping integration

## Technical Implementation

\`\`\`typescript
// Example payment integration
interface PaymentGateway {
  initialize(): Promise<void>;
  processPayment(order: Order): Promise<PaymentResult>;
  handleWebhook(payload: any): Promise<void>;
}

class RazorpayGateway implements PaymentGateway {
  async processPayment(order: Order) {
    const options = {
      amount: order.total * 100,
      currency: "INR",
      receipt: order.id
    };
    return await razorpay.orders.create(options);
  }
}
\`\`\`

## Cost Optimization

- Pay-as-you-grow pricing
- Essential features first
- Cloud resource optimization

Contact us for a custom e-commerce solution tailored to your business.`,
    author: {
      id: '5',
      name: 'Deepak Kumar',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      role: 'Solutions Architect'
    },
    publishedAt: '2024-03-20T10:00:00Z',
    readingTime: '8 min read',
    category: {
      id: '2',
      name: 'Web Development',
      slug: 'web-dev'
    },
    tags: ['E-commerce', 'MSME', 'Payment Gateway', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop'
  },
  {
    id: '6',
    title: 'Integrating AI Chatbots in E-commerce: Boost Sales and Support',
    slug: 'ecommerce-ai-chatbot',
    excerpt: 'Learn how to integrate AI-powered chatbots to enhance customer experience and automate support in your e-commerce platform.',
    content: `# Integrating AI Chatbots in E-commerce: Boost Sales and Support

## Benefits of AI Chatbots

Modern e-commerce platforms can significantly benefit from AI chatbots:

### Key Features

1. Customer Support
- 24/7 availability
- Instant response
- Multi-language support

2. Sales Assistance
- Product recommendations
- Price comparisons
- Stock availability

## Implementation Guide

\`\`\`typescript
// Example chatbot integration
interface ChatbotResponse {
  message: string;
  suggestions?: string[];
  products?: Product[];
}

class EcommerceChatbot {
  async handleQuery(
    query: string,
    context: UserContext
  ): Promise<ChatbotResponse> {
    // Analyze intent
    const intent = await this.nlp.analyze(query);
    
    switch(intent.type) {
      case 'product_search':
        return await this.handleProductSearch(query);
      case 'support':
        return await this.handleSupport(query);
      case 'order_status':
        return await this.handleOrderStatus(context.userId);
    }
  }
}
\`\`\`

## Best Practices

- Start with common use cases
- Implement fallback to human support
- Continuously train the model
- Monitor user satisfaction

Contact us to enhance your e-commerce platform with AI chatbots.`,
    author: {
      id: '6',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      role: 'AI Product Manager'
    },
    publishedAt: '2024-03-22T10:00:00Z',
    readingTime: '9 min read',
    category: {
      id: '1',
      name: 'Artificial Intelligence',
      slug: 'ai'
    },
    tags: ['Chatbot', 'E-commerce', 'Customer Support', 'AI'],
    coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=630&fit=crop'
  }
];

const allPosts = [...posts, ...additionalPosts];

export const getAllPosts = (): BlogPost[] => {
  return allPosts;
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  return allPosts.find(post => post.slug === slug) || null;
};