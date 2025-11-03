// OpenAI Integration for SKILLSYNC AI
// This module handles real-time AI-powered career guidance using OpenAI's GPT models

const OPENAI_API_KEY = typeof import.meta !== 'undefined' && import.meta.env 
  ? import.meta.env.VITE_OPENAI_API_KEY 
  : undefined;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface AIResponse {
  answer: string;
  isAiGenerated: boolean;
  category: string;
}

/**
 * Generates career guidance using OpenAI GPT
 * @param question - The user's career question
 * @returns Promise containing the AI-generated response
 */
export async function generateCareerAdvice(question: string): Promise<AIResponse> {
  if (!OPENAI_API_KEY || typeof OPENAI_API_KEY !== 'string') {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env.local file.');
  }

  if (!OPENAI_API_KEY.startsWith('sk-')) {
    throw new Error('Invalid OpenAI API key format. The key should start with "sk-".');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are SKILLSYNC AI, an expert career guidance counselor and advisor. 

Your role is to provide personalized, actionable career advice across 70+ fields including:
- Tech (Software Development, Cybersecurity, Data Science, AI/ML, Cloud Computing, etc.)
- Business (Marketing, Finance, HR, Project Management, Sales, Consulting, etc.)
- Healthcare (Nursing, Physician, Pharmacy, Mental Health, Public Health, etc.)
- Arts & Design (UX/UI Design, Graphic Design, Video Production, Animation, etc.)
- Engineering (Mechanical, Electrical, Civil, Biomedical, etc.)
- Trades (Electrician, Plumbing, HVAC, Carpentry, etc.)
- Legal (Attorney, Paralegal, Compliance, etc.)

When answering questions:
1. Provide specific, actionable advice
2. Include relevant skills, certifications, and educational paths
3. Mention typical entry-level roles and career progression
4. Provide salary ranges when relevant
5. Be encouraging and supportive
6. Keep responses between 150-300 words for clarity
7. Use clear paragraphs and formatting

Always maintain a professional yet friendly tone.`
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}. ${
          errorData.error?.message || ''
        }`
      );
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from OpenAI');
    }

    const aiAnswer = data.choices[0].message.content.trim();
    
    // Detect category based on question content
    const category = detectCategory(question);

    return {
      answer: aiAnswer,
      isAiGenerated: true,
      category
    };
  } catch (error) {
    console.error('Error generating career advice:', error);
    throw error;
  }
}

/**
 * Detects the career category based on question content
 */
function detectCategory(question: string): string {
  const lowerQ = question.toLowerCase();
  
  // Tech keywords
  if (
    lowerQ.includes('software') || 
    lowerQ.includes('developer') || 
    lowerQ.includes('programming') ||
    lowerQ.includes('code') ||
    lowerQ.includes('tech') ||
    lowerQ.includes('data science') ||
    lowerQ.includes('cybersecurity') ||
    lowerQ.includes('cloud') ||
    lowerQ.includes('ai') ||
    lowerQ.includes('machine learning')
  ) {
    return 'Tech';
  }
  
  // Business keywords
  if (
    lowerQ.includes('marketing') ||
    lowerQ.includes('business') ||
    lowerQ.includes('sales') ||
    lowerQ.includes('finance') ||
    lowerQ.includes('accounting') ||
    lowerQ.includes('management') ||
    lowerQ.includes('hr') ||
    lowerQ.includes('consulting')
  ) {
    return 'Business';
  }
  
  // Healthcare keywords
  if (
    lowerQ.includes('health') ||
    lowerQ.includes('medical') ||
    lowerQ.includes('nurse') ||
    lowerQ.includes('doctor') ||
    lowerQ.includes('physician') ||
    lowerQ.includes('pharmacy') ||
    lowerQ.includes('therapy') ||
    lowerQ.includes('patient')
  ) {
    return 'Healthcare';
  }
  
  // Arts keywords
  if (
    lowerQ.includes('design') ||
    lowerQ.includes('art') ||
    lowerQ.includes('creative') ||
    lowerQ.includes('ux') ||
    lowerQ.includes('ui') ||
    lowerQ.includes('graphic') ||
    lowerQ.includes('video') ||
    lowerQ.includes('animation')
  ) {
    return 'Arts';
  }
  
  // Default to Business for general career questions
  return 'Business';
}

/**
 * Validates if the OpenAI API key is configured
 */
export function isOpenAIConfigured(): boolean {
  return !!OPENAI_API_KEY && typeof OPENAI_API_KEY === 'string' && OPENAI_API_KEY.startsWith('sk-');
}

/**
 * Gets a user-friendly error message for API errors
 */
export function getErrorMessage(error: any): string {
  if (error.message?.includes('API key')) {
    return 'OpenAI API key is not configured. Please check your environment settings.';
  }
  
  if (error.message?.includes('429')) {
    return 'Rate limit exceeded. Please try again in a moment.';
  }
  
  if (error.message?.includes('401')) {
    return 'Invalid API key. Please check your OpenAI configuration.';
  }
  
  if (error.message?.includes('network') || error.message?.includes('fetch')) {
    return 'Network error. Please check your internet connection.';
  }
  
  return 'Failed to generate AI response. Please try again.';
}
