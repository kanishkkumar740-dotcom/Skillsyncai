// OpenAI Integration for SKILLSYNC AI
// This module handles real-time AI-powered career guidance using OpenAI's GPT models

// DEMO MODE: Set to true to use mock AI responses (no OpenAI API calls, no billing required)
const DEMO_MODE = true;

// For Figma Make environment: Use hardcoded key (remove before production)
const OPENAI_API_KEY = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENAI_API_KEY
  ? import.meta.env.VITE_OPENAI_API_KEY 
  : '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Debug logging (remove in production)
if (typeof window !== 'undefined') {
  console.log('🔑 OpenAI API Key Status:', {
    exists: !!OPENAI_API_KEY,
    isString: typeof OPENAI_API_KEY === 'string',
    startsWithSk: OPENAI_API_KEY?.startsWith('sk-'),
    length: OPENAI_API_KEY?.length || 0,
    firstChars: OPENAI_API_KEY?.substring(0, 7) || 'none'
  });
}

export interface AIResponse {
  answer: string;
  isAiGenerated: boolean;
  category: string;
}

/**
 * Generates career guidance using OpenAI GPT (or Demo Mode)
 * @param question - The user's career question
 * @returns Promise containing the AI-generated response
 */
export async function generateCareerAdvice(question: string): Promise<AIResponse> {
  // DEMO MODE: Generate mock AI responses without calling OpenAI
  if (DEMO_MODE) {
    return generateDemoResponse(question);
  }

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
 * Generates demo AI responses (no API calls required)
 * Enhanced with comprehensive career knowledge across 70+ fields
 */
async function generateDemoResponse(question: string): Promise<AIResponse> {
  // Simulate API delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const category = detectCategory(question);
  const lowerQ = question.toLowerCase();
  
  // Analyze question for specific keywords and context
  const keywords = extractKeywords(lowerQ);
  const answer = generateComprehensiveAnswer(lowerQ, keywords, category);
  
  return {
    answer,
    isAiGenerated: true,
    category
  };
}

/**
 * Extract relevant keywords from the question
 */
function extractKeywords(question: string): string[] {
  const techKeywords = ['software', 'developer', 'programming', 'code', 'web', 'app', 'data', 'analytics', 'science', 'cybersecurity', 'security', 'cloud', 'ai', 'artificial intelligence', 'machine learning', 'ml', 'devops', 'network', 'database', 'frontend', 'backend', 'fullstack', 'mobile', 'ios', 'android', 'blockchain', 'game'];
  const businessKeywords = ['marketing', 'business', 'sales', 'finance', 'accounting', 'hr', 'human resources', 'management', 'consulting', 'entrepreneur', 'startup', 'mba', 'project manager', 'product manager', 'analyst', 'strategy', 'operations', 'supply chain', 'real estate', 'investment', 'banking'];
  const healthKeywords = ['health', 'medical', 'nurse', 'nursing', 'doctor', 'physician', 'therapy', 'therapist', 'pharmacy', 'pharmacist', 'dental', 'dentist', 'mental health', 'psychology', 'counseling', 'social work', 'public health', 'epidemiology', 'medical assistant', 'emt', 'paramedic', 'radiology', 'surgery'];
  const artsKeywords = ['design', 'designer', 'ux', 'ui', 'graphic', 'art', 'artist', 'creative', 'animation', 'video', 'film', 'photography', 'illustration', 'fashion', 'interior', 'architecture', 'music', 'writing', 'content', 'copywriting', 'media'];
  const educationKeywords = ['teacher', 'teaching', 'education', 'professor', 'tutor', 'instructor', 'academic', 'school', 'university', 'college', 'degree', 'bachelor', 'master', 'phd', 'certification', 'training', 'learning'];
  const tradeKeywords = ['electrician', 'plumber', 'hvac', 'mechanic', 'carpenter', 'welder', 'construction', 'trade', 'technician', 'repair', 'maintenance', 'contractor'];
  const legalKeywords = ['law', 'lawyer', 'attorney', 'legal', 'paralegal', 'court', 'judge', 'compliance', 'policy', 'regulation'];
  const scienceKeywords = ['science', 'research', 'scientist', 'biology', 'chemistry', 'physics', 'laboratory', 'lab', 'biotech', 'pharmaceutical', 'environmental', 'engineering', 'engineer'];
  
  const allKeywords = [...techKeywords, ...businessKeywords, ...healthKeywords, ...artsKeywords, ...educationKeywords, ...tradeKeywords, ...legalKeywords, ...scienceKeywords];
  
  return allKeywords.filter(keyword => question.includes(keyword));
}

/**
 * Generate comprehensive, multi-option career guidance
 */
function generateComprehensiveAnswer(question: string, keywords: string[], category: string): string {
  // TECH CAREERS
  if (keywords.some(k => ['software', 'developer', 'programming', 'code', 'web', 'app', 'frontend', 'backend', 'fullstack'].includes(k))) {
    return `Excellent question about software development! Let me provide comprehensive guidance across multiple paths:\n\n**🎯 Career Options:**\n\n**1. Frontend Developer** ($65K-$110K)\n- Focus: User interfaces, visual design, user experience\n- Key Skills: HTML/CSS/JavaScript, React/Vue/Angular, responsive design\n- Degrees: Computer Science, Web Development, or self-taught\n- Timeline: 6-12 months bootcamp or 2-4 years degree\n\n**2. Backend Developer** ($70K-$120K)\n- Focus: Server logic, databases, APIs, security\n- Key Skills: Python/Java/Node.js, SQL/NoSQL, RESTful APIs\n- Degrees: CS, Software Engineering, or coding bootcamp\n- Timeline: Similar to frontend, with focus on data structures\n\n**3. Full-Stack Developer** ($75K-$130K)\n- Focus: Complete application development (front + back)\n- Key Skills: Combination of above + DevOps basics\n- Degrees: CS degree or comprehensive bootcamp\n- Timeline: 1-2 years intensive learning\n\n**4. Mobile Developer** ($70K-$125K)\n- Focus: iOS (Swift) or Android (Kotlin) applications\n- Key Skills: Platform-specific languages, mobile UX, app store deployment\n- Degrees: CS or self-taught with portfolio\n- Timeline: 8-15 months focused study\n\n**📚 Education Paths:**\n- **Traditional**: BS Computer Science (4 years) - Most comprehensive\n- **Bootcamps**: 12-24 weeks intensive ($10K-$20K) - Fast entry\n- **Self-Taught**: 6-18 months with discipline - Most affordable\n- **Associate Degree**: 2 years - Good balance\n\n**🚀 Getting Started Steps:**\n1. Choose one language (Python or JavaScript recommended)\n2. Complete 2-3 beginner courses (freeCodeCamp, Codecademy)\n3. Build 5+ portfolio projects (showcase problem-solving)\n4. Learn Git/GitHub (essential for collaboration)\n5. Contribute to open source (builds credibility)\n6. Apply for internships or junior positions\n\n**💼 Career Progression:**\nJunior Dev → Mid-Level Dev (2-3 yrs) → Senior Dev (5-7 yrs) → Lead/Architect (8+ yrs) → Engineering Manager or Staff Engineer\n\n**🎓 Certifications Worth Considering:**\n- AWS Certified Developer\n- Microsoft Certified: Azure Developer\n- Oracle Certified Java Programmer\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['data', 'analytics', 'science', 'machine learning', 'ml', 'ai'].includes(k))) {
    return `Great question about data careers! This is one of the fastest-growing fields. Here's a comprehensive breakdown:\n\n**🎯 Career Paths:**\n\n**1. Data Analyst** ($60K-$90K)\n- Focus: Interpreting data, creating reports, business insights\n- Key Skills: SQL, Excel, Tableau/Power BI, basic statistics\n- Degrees: Any analytical degree (Math, Economics, Business Analytics)\n- Entry Point: Easiest to break into, great stepping stone\n\n**2. Data Scientist** ($90K-$140K)\n- Focus: Predictive modeling, machine learning, statistical analysis\n- Key Skills: Python/R, ML algorithms, statistics, data visualization\n- Degrees: MS in Data Science, Statistics, CS, or Math preferred\n- Entry Point: Requires stronger technical foundation\n\n**3. Machine Learning Engineer** ($110K-$160K)\n- Focus: Building and deploying ML models at scale\n- Key Skills: Python, TensorFlow/PyTorch, MLOps, cloud platforms\n- Degrees: CS or Engineering + ML specialization\n- Entry Point: Most technical, often requires advanced degree\n\n**4. Business Intelligence Analyst** ($65K-$95K)\n- Focus: Dashboards, reporting, business metrics\n- Key Skills: SQL, BI tools, data warehousing, business acumen\n- Degrees: Business, MIS, or Data Analytics\n- Entry Point: Business-focused, less programming-heavy\n\n**5. Data Engineer** ($95K-$135K)\n- Focus: Building data pipelines, infrastructure, ETL processes\n- Key Skills: SQL, Python, Spark, Airflow, cloud platforms\n- Degrees: CS or Engineering background\n- Entry Point: Requires solid programming skills\n\n**📚 Education Options:**\n- **Bachelor's**: Statistics, Math, CS, Economics (4 years)\n- **Master's**: Data Science, Analytics, CS (1-2 years) - Highly valued\n- **Bootcamps**: Data Science bootcamps (3-6 months) - Quick start\n- **Self-Study**: Online courses + portfolio projects (6-12 months)\n\n**🛠️ Essential Skills by Priority:**\n1. **SQL** - Absolutely critical, learn first\n2. **Python** - Industry standard (Pandas, NumPy)\n3. **Statistics** - Foundation of all analysis\n4. **Visualization** - Tableau, Power BI, or Matplotlib\n5. **Machine Learning** - Scikit-learn basics\n6. **Cloud Platforms** - AWS, Azure, or GCP\n\n**📊 Learning Roadmap:**\nWeek 1-4: SQL + Excel mastery\nWeek 5-12: Python programming + Pandas\nWeek 13-20: Statistics + probability\nWeek 21-28: ML fundamentals + practice\nWeek 29-36: Portfolio projects + job applications\n\n**🎯 Portfolio Project Ideas:**\n- Customer churn prediction model\n- Sales forecasting dashboard\n- Sentiment analysis of social media\n- Recommendation system\n- A/B test analysis\n\n**📜 Valuable Certifications:**\n- Google Data Analytics Certificate\n- IBM Data Science Professional Certificate\n- Microsoft Certified: Data Analyst Associate\n- AWS Certified Machine Learning\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['cybersecurity', 'security', 'network'].includes(k))) {
    return `Cybersecurity is critical and in massive demand! Here's your complete guide:\n\n**🎯 Specialized Career Paths:**\n\n**1. Security Analyst** ($70K-$100K)\n- Focus: Monitoring threats, incident response, security tools\n- Entry-level friendly, great starting point\n- Certifications: CompTIA Security+, CEH\n\n**2. Penetration Tester (Ethical Hacker)** ($85K-$130K)\n- Focus: Finding vulnerabilities, security testing\n- Exciting, hands-on work\n- Certifications: OSCP, CEH, GPEN\n\n**3. Security Engineer** ($95K-$140K)\n- Focus: Building secure systems, architecture\n- Requires programming skills\n- Certifications: CISSP, CISM\n\n**4. SOC Analyst** ($60K-$85K)\n- Focus: Security Operations Center monitoring\n- Great entry point, 24/7 operations\n- Certifications: Security+, CySA+\n\n**5. Cloud Security Specialist** ($100K-$150K)\n- Focus: AWS/Azure/GCP security\n- High demand, cloud-focused\n- Certifications: AWS Security Specialty, Azure Security\n\n**📚 Education Paths:**\n- BS Cybersecurity/IT (4 years)\n- Associate + Certifications (2 years)\n- Self-taught + Certifications (6-12 months)\n- Military background (veterans highly sought)\n\n**🎓 Must-Have Certifications (in order):**\n1. **CompTIA A+** - IT fundamentals\n2. **CompTIA Network+** - Networking basics\n3. **CompTIA Security+** - Entry-level security (REQUIRED)\n4. **CEH** - Ethical hacking\n5. **CISSP** - Advanced (5 years experience needed)\n\n**🛠️ Essential Skills:**\n- Networking (TCP/IP, firewalls, VPNs)\n- Operating Systems (Linux, Windows)\n- Programming (Python, Bash scripting)\n- Security tools (Wireshark, Metasploit, Nmap)\n- Cloud platforms (AWS, Azure)\n- Incident response\n- Risk assessment\n\n**🚀 Getting Started (Free Resources):**\n- TryHackMe (hands-on learning)\n- HackTheBox (practice labs)\n- Cybrary (free courses)\n- SANS Cyber Aces (tutorials)\n- Professor Messer (Security+ prep)\n\n**💼 Career Progression:**\nJunior SOC Analyst → Security Analyst → Senior Security Engineer → Security Architect → CISO (Chief Information Security Officer)\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['cloud', 'devops', 'aws', 'azure'].includes(k))) {
    return `Cloud and DevOps are transforming IT! Here's your comprehensive roadmap:\n\n**🎯 Career Paths:**\n\n**1. Cloud Engineer** ($90K-$130K)\n- Focus: Designing and managing cloud infrastructure\n- Platforms: AWS, Azure, or Google Cloud\n- High demand, excellent job security\n\n**2. DevOps Engineer** ($95K-$140K)\n- Focus: CI/CD, automation, infrastructure as code\n- Skills: Docker, Kubernetes, Jenkins, Terraform\n- Bridges development and operations\n\n**3. Site Reliability Engineer (SRE)** ($110K-$160K)\n- Focus: System reliability, performance, automation\n- Google-pioneered role, software approach to operations\n- Requires strong programming skills\n\n**4. Cloud Architect** ($120K-$180K)\n- Focus: Designing complex cloud solutions\n- Senior role, requires extensive experience\n- Strategic planning and cost optimization\n\n**📚 Education & Learning Path:**\n- Traditional degree helpful but NOT required\n- Hands-on experience > credentials\n- Start with AWS/Azure free tier\n- Build projects and document them\n\n**🎓 Essential Certifications (Choose Your Platform):**\n\n**AWS Track:**\n1. AWS Certified Cloud Practitioner (beginner)\n2. AWS Solutions Architect Associate\n3. AWS DevOps Engineer Professional\n\n**Azure Track:**\n1. Azure Fundamentals (AZ-900)\n2. Azure Administrator (AZ-104)\n3. Azure DevOps Engineer Expert (AZ-400)\n\n**🛠️ Critical Skills:**\n- **Scripting**: Python, Bash, PowerShell\n- **Containers**: Docker, Kubernetes\n- **IaC**: Terraform, CloudFormation, ARM templates\n- **CI/CD**: Jenkins, GitLab CI, GitHub Actions\n- **Monitoring**: Prometheus, Grafana, CloudWatch\n- **Version Control**: Git (essential)\n\n**🚀 6-Month Learning Plan:**\nMonth 1-2: Linux fundamentals + Python scripting\nMonth 3: Cloud platform basics (choose AWS or Azure)\nMonth 4: Docker + containerization\nMonth 5: Kubernetes + orchestration\nMonth 6: CI/CD pipelines + certification prep\n\n**💡 Project Ideas:**\n- Deploy 3-tier web app on AWS/Azure\n- Create CI/CD pipeline with automated testing\n- Build Infrastructure as Code templates\n- Set up monitoring and alerting system\n- Implement auto-scaling application\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // BUSINESS CAREERS
  if (keywords.some(k => ['marketing', 'social media', 'content', 'seo'].includes(k))) {
    return `Marketing offers incredible variety! Here's a comprehensive breakdown of options:\n\n**🎯 Marketing Career Paths:**\n\n**1. Digital Marketing Specialist** ($50K-$80K)\n- Focus: SEO, SEM, social media, email marketing\n- Entry-level friendly, versatile role\n- Certifications: Google Ads, HubSpot, Meta Blueprint\n\n**2. Content Marketing Manager** ($60K-$95K)\n- Focus: Blog posts, videos, podcasts, content strategy\n- Creative + strategic thinking required\n- Strong writing skills essential\n\n**3. Social Media Manager** ($45K-$75K)\n- Focus: Social platforms, community engagement, influencer partnerships\n- Trend-savvy, creative, data-driven\n- Portfolio of campaigns important\n\n**4. SEO Specialist** ($55K-$90K)\n- Focus: Search engine optimization, keyword research, technical SEO\n- Technical + creative balance\n- Tools: Ahrefs, SEMrush, Google Search Console\n\n**5. Product Marketing Manager** ($85K-$130K)\n- Focus: Product launches, positioning, go-to-market strategy\n- Requires business acumen + technical understanding\n- Often works with product teams\n\n**6. Marketing Analyst** ($60K-$90K)\n- Focus: Data analysis, campaign performance, attribution\n- Analytics-heavy, requires SQL/Excel skills\n- Bridge between marketing and data science\n\n**7. Growth Marketer** ($70K-$110K)\n- Focus: User acquisition, retention, experimentation\n- Startup-focused, performance-driven\n- A/B testing and data analysis critical\n\n**8. Brand Manager** ($70K-$105K)\n- Focus: Brand strategy, positioning, consistency\n- Creative + strategic leadership\n- Often at established companies\n\n**📚 Education Options:**\n- **Bachelor's in Marketing** (traditional path)\n- **Communications/Business** degree (flexible)\n- **Digital Marketing Bootcamps** (3-6 months)\n- **Self-taught** + portfolio (increasingly common)\n- **MBA** for senior positions\n\n**🎓 Free Certifications (Great for Resume):**\n- Google Digital Marketing & E-commerce Certificate\n- HubSpot Content Marketing\n- Meta Social Media Marketing\n- Google Analytics Individual Qualification\n- Hootsuite Social Marketing\n\n**🛠️ Essential Skills:**\n- **Analytics**: Google Analytics, data interpretation\n- **Tools**: HubSpot, Mailchimp, Hootsuite, Canva\n- **Writing**: Copywriting, storytelling\n- **SEO/SEM**: Search marketing fundamentals\n- **Social Media**: Platform expertise\n- **Project Management**: Organization, deadlines\n\n**🚀 Building Your Portfolio:**\n1. Start a niche blog or YouTube channel\n2. Manage social media for local business\n3. Run small ad campaigns (use your own budget)\n4. Create case studies showing ROI\n5. Document metrics and results\n\n**💼 Career Progression:**\nMarketing Coordinator → Marketing Specialist → Marketing Manager → Senior Marketing Manager → Director of Marketing → CMO\n\n**💡 Hot Trends (2024+):**\n- AI-powered marketing automation\n- Video content (TikTok, YouTube Shorts)\n- Influencer marketing\n- Community-led growth\n- Privacy-first analytics\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['finance', 'accounting', 'investment', 'banking'].includes(k))) {
    return `Finance and accounting offer stable, lucrative careers! Here's your complete guide:\n\n**🎯 Career Options:**\n\n**1. Financial Analyst** ($65K-$95K)\n- Focus: Financial modeling, forecasting, investment research\n- Entry point: Strong analytical skills needed\n- Degree: Finance, Economics, Accounting\n\n**2. Accountant/CPA** ($55K-$85K early, $100K+ with CPA)\n- Focus: Tax preparation, auditing, financial statements\n- Stable career, always in demand\n- Certification: CPA (Certified Public Accountant) essential\n\n**3. Investment Banker** ($100K-$200K+ with bonuses)\n- Focus: Mergers, acquisitions, raising capital\n- Demanding hours, high compensation\n- Top universities preferred, MBA helps\n\n**4. Corporate Finance Manager** ($85K-$130K)\n- Focus: Budgeting, financial planning, analysis\n- Work-life balance better than investment banking\n- MBA or CMA beneficial\n\n**5. Financial Planner/Advisor** ($60K-$150K, commission-based)\n- Focus: Helping individuals with wealth management\n- Client-facing, relationship-building\n- Certification: CFP (Certified Financial Planner)\n\n**6. Risk Analyst** ($70K-$105K)\n- Focus: Identifying financial risks, compliance\n- Growing field post-2008 crisis\n- Certifications: FRM, CFA helpful\n\n**7. Actuary** ($80K-$130K+)\n- Focus: Statistical analysis of financial risks (insurance)\n- Math-intensive, excellent job security\n- Exams: Series of actuarial exams (SOA or CAS)\n\n**8. Treasury Analyst** ($65K-$95K)\n- Focus: Cash management, liquidity, debt\n- Corporate finance role\n- Less stressful than investment banking\n\n**📚 Education Requirements:**\n- **Bachelor's**: Finance, Accounting, Economics (required)\n- **MBA**: Helpful for senior roles (not always needed)\n- **Master's in Finance**: Alternative to MBA\n- **Certifications**: Often more important than advanced degrees\n\n**🎓 Key Certifications:**\n1. **CPA** - For accounting (4 exams, 150 credit hours)\n2. **CFA** - For investment management (3 levels, very challenging)\n3. **CFP** - For financial planning\n4. **FRM** - For risk management\n5. **CMA** - For management accounting\n\n**🛠️ Essential Skills:**\n- **Excel**: Advanced (pivot tables, VBA, modeling)\n- **Financial Modeling**: Building DCF models, LBO models\n- **Accounting Principles**: GAAP, financial statements\n- **Bloomberg Terminal**: For investment roles\n- **SQL**: Increasingly important for data analysis\n- **Communication**: Presenting findings to non-finance people\n\n**📊 Specializations to Consider:**\n- **Forensic Accounting**: Investigating fraud\n- **Tax Accounting**: Tax strategy and compliance\n- **Auditing**: Internal or external auditing\n- **Valuation**: Business and asset valuation\n- **Portfolio Management**: Investment strategy\n\n**🚀 Career Progression Examples:**\n\n**Accounting Path:**\nStaff Accountant → Senior Accountant → Accounting Manager → Controller → CFO\n\n**Finance Path:**\nFinancial Analyst → Senior Analyst → Finance Manager → Director of Finance → VP Finance → CFO\n\n**Investment Banking Path:**\nAnalyst → Associate → VP → Director → Managing Director\n\n**💡 Breaking In Tips:**\n- Internships are CRITICAL (especially for investment banking)\n- Target schools matter for investment banking\n- Network extensively (finance is relationship-driven)\n- Get Excel certified (many free courses)\n- Consider Big 4 accounting firms for experience\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['project manager', 'product manager', 'management'].includes(k))) {
    return `Management careers offer leadership and impact! Here's comprehensive guidance:\n\n**🎯 Management Career Paths:**\n\n**1. Project Manager** ($75K-$110K)\n- Focus: Planning, executing, closing projects\n- Industry-agnostic (every industry needs PMs)\n- Certification: PMP (Project Management Professional)\n- Timeline: Can start with 2-3 years experience\n\n**2. Product Manager** ($90K-$150K)\n- Focus: Product strategy, roadmap, user needs\n- Tech-focused, cross-functional leadership\n- Background: Often former engineers or designers\n- Timeline: Typically requires 3-5 years domain experience\n\n**3. Program Manager** ($95K-$135K)\n- Focus: Managing multiple related projects\n- Strategic oversight, resource allocation\n- More senior than project manager\n- Timeline: 5+ years project management experience\n\n**4. Operations Manager** ($70K-$105K)\n- Focus: Day-to-day business operations, efficiency\n- Process optimization, team management\n- Industry: Manufacturing, retail, logistics\n- Timeline: 3-5 years operational experience\n\n**5. General Manager** ($85K-$140K)\n- Focus: Overall business unit performance\n- P&L responsibility, strategic decisions\n- Mini-CEO role\n- Timeline: 7-10 years progressive experience\n\n**📚 Education Paths:**\n- **Bachelor's**: Business, Engineering, or relevant field\n- **MBA**: Very helpful for senior management (but not required)\n- **Certifications**: PMP, Agile, Six Sigma\n- **Experience**: Often matters more than degrees\n\n**🎓 Essential Certifications:**\n\n**Project Management:**\n- **PMP** (Project Management Professional) - Gold standard\n- **CAPM** (Certified Associate in PM) - Entry-level\n- **Agile/Scrum Master** - For software projects\n- **Six Sigma** (Green/Black Belt) - Process improvement\n\n**Product Management:**\n- Product Management certifications (Pragmatic Institute, Product School)\n- Agile Product Owner certification\n- Google Project Management Certificate (beginner-friendly)\n\n**🛠️ Critical Skills:**\n- **Leadership**: Influencing without authority\n- **Communication**: Stakeholder management\n- **Planning**: Gantt charts, roadmaps, timelines\n- **Risk Management**: Identifying and mitigating risks\n- **Budgeting**: Financial planning and tracking\n- **Tools**: Jira, Asana, MS Project, Trello\n- **Agile/Scrum**: Modern project methodologies\n\n**📊 Project vs Product Management:**\n\n**Project Manager:**\n- Manages temporary initiatives\n- Focus on delivery, timeline, budget\n- Cross-industry applicability\n- Process-oriented\n\n**Product Manager:**\n- Owns product vision and roadmap\n- Focus on user needs, market fit\n- Typically tech/software companies\n- Strategy-oriented\n- Often called \"mini-CEO of the product\"\n\n**🚀 How to Transition In:**\n\nFrom Engineering:\n- Lead technical projects\n- Take on PM responsibilities gradually\n- Get Scrum Master certification\n- Transition to Technical PM, then Product Manager\n\nFrom Business Analyst:\n- Showcase project leadership\n- Get PMP certification\n- Volunteer for PM roles\n- Take Project Coordinator positions\n\nFrom Any Field:\n- Demonstrate project leadership\n- Get certifications (CAPM, Google PM Certificate)\n- Manage side projects with measurable outcomes\n- Network with PMs and hiring managers\n\n**💼 Career Progression:**\n\n**Project Management Track:**\nProject Coordinator → Project Manager → Senior PM → Program Manager → Director of PMO → VP of Operations\n\n**Product Management Track:**\nAssociate Product Manager → Product Manager → Senior PM → Group PM → Director of Product → VP of Product → Chief Product Officer\n\n**💡 Success Tips:**\n- Master stakeholder communication\n- Learn to manage conflict\n- Develop business acumen\n- Stay organized (critical!)\n- Build relationships across teams\n- Document everything\n- Be comfortable with ambiguity\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // HEALTHCARE CAREERS
  if (keywords.some(k => ['nurse', 'nursing', 'rn'].includes(k))) {
    return `Nursing is one of the most rewarding healthcare careers! Here's your complete roadmap:\n\n**🎯 Nursing Career Paths:**\n\n**1. Registered Nurse (RN)** ($60K-$85K)\n- Most common nursing role, versatile\n- Multiple specialization options\n- Degree: ADN (2 years) or BSN (4 years)\n- License: Pass NCLEX-RN exam\n\n**2. Nurse Practitioner (NP)** ($100K-$125K)\n- Advanced practice, can diagnose and prescribe\n- More autonomy, similar to physician in some states\n- Degree: Master's (MSN) or Doctorate (DNP)\n- Timeline: 6-8 years total education\n\n**3. Certified Nurse Anesthetist (CRNA)** ($160K-$200K)\n- Highest-paid nursing role\n- Administers anesthesia independently\n- Degree: Master's or Doctorate required\n- Very competitive, requires ICU experience\n\n**4. Clinical Nurse Specialist** ($85K-$110K)\n- Expert in specific area (cardiac, oncology, etc.)\n- Focus on improving patient outcomes, staff education\n- Degree: Master's degree required\n\n**5. Nurse Midwife** ($95K-$115K)\n- Women's health, prenatal care, deliveries\n- Holistic approach to childbirth\n- Degree: Master's degree + certification\n\n**📚 Education Pathways:**\n\n**Fast Track (2-3 years):**\n- ADN (Associate Degree in Nursing) - 2 years\n- Pass NCLEX-RN\n- Work as RN while pursuing BSN online\n\n**Traditional Path (4 years):**\n- BSN (Bachelor of Science in Nursing) - 4 years\n- Pass NCLEX-RN\n- Better job prospects, required for many hospitals\n\n**Accelerated BSN (12-18 months):**\n- For those with bachelor's in another field\n- Intensive but fast\n- Expensive but quick entry\n\n**Advanced Practice (6-8 years total):**\n- BSN → 2-3 years RN experience → MSN or DNP\n- Specialization: NP, CRNA, CNS, or Nurse Midwife\n\n**🏥 Nursing Specializations:**\n- **Emergency/Trauma**: Fast-paced, critical care\n- **ICU/Critical Care**: Complex patients, high acuity\n- **Pediatrics**: Working with children\n- **Oncology**: Cancer care\n- **Labor & Delivery**: Childbirth\n- **Psychiatric/Mental Health**: Mental health nursing\n- **Operating Room**: Surgical nursing\n- **Public Health**: Community-based care\n- **School Nursing**: Working in schools\n- **Travel Nursing**: Short-term contracts ($80K-$120K+)\n\n**🎓 Required Licenses & Certifications:**\n- **NCLEX-RN**: Required for all RNs (must pass)\n- **State Licensure**: Must be licensed in state where you practice\n- **BLS/ACLS**: Basic/Advanced Cardiac Life Support\n- **Specialty Certifications**: Additional certs for specialties\n\n**🛠️ Essential Skills:**\n- Clinical skills (IV insertion, wound care, medications)\n- Critical thinking and quick decision-making\n- Compassion and emotional intelligence\n- Communication with patients and families\n- Time management (managing multiple patients)\n- Physical stamina (12-hour shifts, on your feet)\n- Stress management\n\n**💼 Career Progression:**\nNew Grad RN → Experienced RN (2-5 yrs) → Charge Nurse → Nurse Manager → Director of Nursing → Chief Nursing Officer\n\nOR\n\nRN → Advanced Practice (NP, CRNA) → Lead NP → Medical Director\n\n**💰 Salary by Experience:**\n- New Grad RN: $55K-$65K\n- 3-5 years: $65K-$80K\n- 10+ years: $80K-$95K\n- Travel Nurse: $80K-$120K+ (with bonuses)\n- Nurse Practitioner: $100K-$125K\n- CRNA: $160K-$200K+\n\n**🚀 Getting Started:**\n1. Research ADN vs BSN programs in your area\n2. Complete prerequisite courses (anatomy, chemistry, etc.)\n3. Apply to nursing programs (competitive!)\n4. Consider CNA certification while applying (gets you experience)\n5. Shadow nurses in different specialties\n6. Volunteer at hospitals\n\n**💡 Pros & Cons:**\n\n**Pros:**\n- Job security (always in demand)\n- Flexible schedules (12-hour shifts, 3-4 days/week)\n- Multiple career paths and specializations\n- Opportunity to make real difference\n- Can work anywhere in the country\n- Good salary and benefits\n\n**Cons:**\n- Physically and emotionally demanding\n- Shift work (nights, weekends, holidays)\n- Exposure to illness and injury\n- High stress situations\n- Dealing with difficult patients/families\n- Nursing school is challenging\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  if (keywords.some(k => ['doctor', 'physician', 'medical', 'medicine'].includes(k))) {
    return `Becoming a physician is a significant commitment! Here's everything you need to know:\n\n**🎯 Physician Career Paths:**\n\n**Primary Care:**\n- **Family Medicine** ($200K-$250K): All ages, general care\n- **Internal Medicine** ($210K-$260K): Adult medicine\n- **Pediatrics** ($180K-$230K): Children's medicine\n\n**Specialties (Higher Pay, More Training):**\n- **Surgery** ($300K-$500K+): Various surgical specialties\n- **Anesthesiology** ($320K-$450K): Anesthesia management\n- **Radiology** ($350K-$450K): Imaging interpretation\n- **Dermatology** ($350K-$500K): Skin conditions (lifestyle + pay)\n- **Orthopedic Surgery** ($400K-$600K): Bone/joint surgery\n- **Cardiology** ($350K-$500K): Heart specialist\n- **Emergency Medicine** ($280K-$380K): ER physician\n- **Psychiatry** ($220K-$300K): Mental health\n\n**📚 Education Timeline (11-15+ years):**\n\n**Undergraduate (4 years):**\n- Pre-med track (biology, chemistry, physics)\n- High GPA essential (3.7+)\n- Volunteer, research, clinical experience\n- Take MCAT exam (score 510+)\n\n**Medical School (4 years):**\n- Years 1-2: Classroom learning\n- Years 3-4: Clinical rotations\n- Take USMLE Step 1, Step 2 exams\n- Cost: $200K-$400K in loans typical\n\n**Residency (3-7 years, PAID):**\n- Primary Care: 3 years\n- Most Specialties: 4-5 years\n- Surgery: 5-7 years\n- Salary: $55K-$65K (long hours)\n\n**Fellowship (Optional, 1-3 years):**\n- Sub-specialization\n- Example: Cardiology after Internal Medicine\n\n**Total Timeline by Specialty:**\n- Family Medicine: 11 years\n- Internal Medicine: 11 years\n- Surgery: 13 years\n- Cardiology: 14 years (IM + fellowship)\n- Neurosurgery: 15+ years\n\n**💰 Financial Considerations:**\n\n**Medical School Debt:**\n- Average: $200K-$300K\n- Some students: $400K+\n- Federal loans with income-driven repayment\n- Loan forgiveness programs available\n\n**Salary Timeline:**\n- Residency: $55K-$65K (ages 26-29)\n- Attending: $200K-$500K+ (age 30+)\n- Loans paid off typically in 5-10 years\n\n**🎓 Alternative Physician Paths:**\n\n**1. Doctor of Osteopathic Medicine (DO)**\n- Similar to MD, holistic approach\n- Same residencies and specialties\n- Slightly easier admission than MD\n\n**2. International Medical Graduate (IMG)**\n- Study medicine abroad (Caribbean, etc.)\n- Must pass USMLE and match into US residency\n- More challenging path, less competitive\n\n**🛠️ Essential Qualities:**\n- Extremely strong academic ability\n- Commitment to 10+ years of training\n- Emotional resilience\n- Empathy and compassion\n- Excellent communication skills\n- Ability to handle stress and death\n- Physical stamina (long shifts)\n- Continuous learning mindset\n\n**📊 Lifestyle by Specialty:**\n\n**Best Work-Life Balance:**\n- Dermatology (outpatient, regular hours)\n- Psychiatry (outpatient, flexible)\n- Radiology (reading scans, predictable)\n- Anesthesiology (good pay + schedule)\n\n**Most Demanding:**\n- Surgery (long hours, on-call)\n- Obstetrics (unpredictable deliveries)\n- Emergency Medicine (shift work)\n- Neurosurgery (extremely demanding)\n\n**🚀 Getting Started (High School/Early College):**\n1. Excel academically (GPA is critical)\n2. Take challenging science courses\n3. Volunteer at hospitals/clinics (100+ hours)\n4. Shadow physicians in different specialties\n5. Join pre-med clubs and organizations\n6. Conduct research (looks great on applications)\n7. Prepare for MCAT (study 3-6 months)\n\n**🎯 Medical School Application:**\n- Apply through AMCAS (MD) or AACOMAS (DO)\n- Need: High GPA (3.7+), MCAT (510+), experiences\n- Write personal statement\n- Get letters of recommendation\n- Interview at schools\n- Acceptance rate: ~40% of applicants\n\n**💡 Alternatives to Consider:**\n\nIf you want healthcare but less commitment:\n- **Physician Assistant** (PA) - 3 years total, $100K-$120K\n- **Nurse Practitioner** (NP) - 6-7 years, $100K-$125K\n- **Optometry** - 8 years, $120K-$180K\n- **Dentistry** - 8 years, $150K-$200K\n- **Pharmacy** - 8 years, $120K-$140K\n\nAll offer good income with less time investment.\n\n**🎓 Is It Worth It?**\n\n**YES if:**\n- Passionate about medicine and patient care\n- Willing to delay gratification 10+ years\n- Comfortable with high-stress environments\n- Want intellectual challenge\n- Interested in continuous learning\n\n**Consider alternatives if:**\n- Not sure about commitment\n- Want work-life balance sooner\n- Concerned about debt\n- Don't love academics\n- Want faster entry to career\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // ARTS & DESIGN CAREERS
  if (keywords.some(k => ['ux', 'ui', 'designer', 'design', 'user experience'].includes(k))) {
    return `UX/UI Design is a fantastic creative + technical career! Here's your comprehensive guide:\n\n**🎯 Design Career Paths:**\n\n**1. UX Designer** ($70K-$110K)\n- Focus: User research, wireframes, user flows, prototypes\n- Psychology meets design\n- Tools: Figma, Sketch, Adobe XD\n\n**2. UI Designer** ($65K-$105K)\n- Focus: Visual design, interfaces, design systems\n- Aesthetics and pixel-perfect execution\n- Tools: Figma, Sketch, Adobe Creative Suite\n\n**3. UX/UI Designer** ($75K-$115K)\n- Combined role (most common)\n- Both research and visual design\n- Full design process ownership\n\n**4. Product Designer** ($85K-$130K)\n- UX/UI + business strategy\n- Works closely with product managers\n- End-to-end product thinking\n\n**5. UX Researcher** ($80K-$120K)\n- Focus on user research exclusively\n- Interviews, surveys, usability testing\n- Data-driven insights\n\n**6. Interaction Designer** ($75K-$115K)\n- Focus on animations, micro-interactions\n- Motion design for interfaces\n- Technical + creative\n\n**7. Design Systems Designer** ($90K-$130K)\n- Creating and maintaining design systems\n- Component libraries, documentation\n- Senior role, scale-focused\n\n**📚 Education Paths:**\n\n**Option 1: Traditional (4 years)**\n- Degree in Graphic Design, HCI, or related field\n- Solid foundation but expensive\n- Not required for most positions\n\n**Option 2: UX Bootcamp (3-6 months) ⭐ POPULAR**\n- Designlab, General Assembly, Springboard\n- $5K-$15K investment\n- Career-focused, portfolio-driven\n- Fastest path to employment\n\n**Option 3: Self-Taught (6-12 months)**\n- Online courses (Coursera, Udemy, YouTube)\n- Most affordable ($0-$1K)\n- Requires discipline and self-direction\n- Portfolio is EVERYTHING\n\n**Option 4: Career Switcher**\n- Google UX Design Certificate (Coursera)\n- 6 months, part-time, $240\n- Great for career changers\n\n**🛠️ Essential Skills:**\n\n**UX Skills:**\n- User research methods\n- Personas and user journeys\n- Information architecture\n- Wireframing and prototyping\n- Usability testing\n- Accessibility (WCAG standards)\n\n**UI Skills:**\n- Visual design principles\n- Color theory\n- Typography\n- Layout and composition\n- Design systems\n- Responsive design\n\n**Tools You Must Know:**\n- **Figma** (industry standard) ⭐ CRITICAL\n- **Adobe XD** or **Sketch** (alternatives)\n- **Photoshop/Illustrator** (image editing)\n- **Prototyping**: Figma, Principle, ProtoPie\n- **Collaboration**: Miro, FigJam\n\n**💼 Building Your Portfolio:**\n\nYour portfolio is MORE IMPORTANT than your degree!\n\n**What to Include (3-5 Projects):**\n1. **Redesign Project**: Improve existing app/website\n2. **Passion Project**: Design something you care about\n3. **Case Study**: Full UX process start to finish\n4. **Mobile App**: Show mobile design skills\n5. **Web Design**: Responsive website design\n\n**Case Study Structure:**\n- Problem statement\n- Research process\n- User personas\n- Wireframes/iterations\n- Final designs\n- Results/learnings\n\n**Portfolio Platforms:**\n- Behance (free, great for discovery)\n- Dribbble (portfolio + community)\n- Personal website (Webflow, Framer)\n- Notion (easy case study format)\n\n**🚀 Learning Roadmap (6 Months):**\n\n**Month 1: Foundations**\n- Design thinking principles\n- Basic visual design\n- Learn Figma basics\n- Study great designs\n\n**Month 2: UX Process**\n- User research methods\n- Creating user personas\n- User flows and journeys\n- Wireframing\n\n**Month 3: UI Design**\n- Visual design principles\n- Color theory and typography\n- Design systems\n- Components and patterns\n\n**Month 4: Prototyping**\n- Interactive prototypes in Figma\n- Usability testing\n- Iteration based on feedback\n\n**Month 5-6: Portfolio Projects**\n- Complete 3 full case studies\n- Build portfolio website\n- Start applying to jobs\n\n**💡 Free Learning Resources:**\n- **Figma**: Free tutorials on Figma's YouTube\n- **Laws of UX**: Principles every designer should know\n- **Daily UI Challenge**: 100 days of UI design\n- **UX Design courses**: Coursera, Interaction Design Foundation\n- **Design Systems**: Study Shopify Polaris, Material Design\n\n**📊 Career Progression:**\nJunior UX/UI Designer → Mid-Level Designer (2-3 yrs) → Senior Designer (5-7 yrs) → Lead Designer (7-10 yrs) → Design Director → VP of Design/Chief Design Officer\n\n**💰 Salary Growth:**\n- Junior: $55K-$75K\n- Mid-level: $75K-$105K\n- Senior: $105K-$140K\n- Lead: $130K-$170K\n- Director: $150K-$220K+\n\n**🎯 Specializations to Consider:**\n- **Voice/Conversational UI**: Alexa, chatbots\n- **AR/VR Design**: Emerging field\n- **Accessibility**: Inclusive design\n- **Design Systems**: Scale and consistency\n- **Service Design**: End-to-end experiences\n\n**💡 Getting Your First Job:**\n\n**Tips:**\n- Portfolio quality > everything else\n- Network on LinkedIn (comment, engage)\n- Join design communities (Designer Hangout, ADPList)\n- Get portfolio feedback before applying\n- Apply to startups (more willing to hire juniors)\n- Do freelance projects for experience\n- Reach out to designers for coffee chats\n\n**Where to Apply:**\n- Startups (more opportunities)\n- Agencies (learn fast, variety)\n- Product companies (depth, stability)\n- Freelance (flexibility, portfolio building)\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // EDUCATION CAREERS
  if (keywords.some(k => ['teacher', 'teaching', 'education'].includes(k))) {
    return `Teaching is an incredibly impactful career! Here's your complete guide:\n\n**🎯 Teaching Career Paths:**\n\n**1. Elementary School Teacher** ($45K-$65K)\n- Grades K-5, all subjects\n- Building foundational skills\n- Close relationships with students\n- Degree: Bachelor's in Elementary Education\n\n**2. Middle School Teacher** ($48K-$68K)\n- Grades 6-8, subject-specific\n- Challenging age group\n- Degree: Bachelor's + subject certification\n\n**3. High School Teacher** ($50K-$72K)\n- Grades 9-12, specialized subjects\n- College prep focused\n- Degree: Bachelor's in subject + teaching credential\n\n**4. Special Education Teacher** ($50K-$75K)\n- Students with disabilities\n- Individualized education plans (IEPs)\n- High demand, specialized training\n- Degree: Special Education credential required\n\n**5. College Professor** ($60K-$120K+)\n- Teaching at community college or university\n- Research component at universities\n- Degree: Master's (community college) or PhD (university)\n- Timeline: 6-10 years of higher education\n\n**6. ESL Teacher** ($45K-$70K)\n- English as Second Language\n- Can teach domestically or abroad\n- Certification: TESOL/TEFL for international\n\n**📚 Education Requirements:**\n\n**Public School (K-12):**\n- Bachelor's degree (4 years)\n- Teaching credential program (1-2 years or integrated)\n- Student teaching experience\n- Pass state exams (Praxis, CBEST, CSET)\n- Background check and fingerprinting\n\n**Alternative Certification:**\n- Some states offer alternative routes\n- Teach while getting certified\n- Programs like Teach for America\n\n**Private School:**\n- Requirements vary by school\n- Some don't require state certification\n- Bachelor's degree typically required\n\n**Higher Education:**\n- Community College: Master's degree minimum\n- University: PhD required for tenure-track\n- Timeline: 6-10 years of higher education\n\n**💼 Career Progression:**\n\n**K-12 Track:**\nNew Teacher → Experienced Teacher (3+ yrs) → Department Head → Assistant Principal → Principal → District Administrator\n\n**Higher Education:**\nAdjunct Professor → Assistant Professor → Associate Professor → Full Professor → Department Chair → Dean\n\n**💰 Realistic Salary Expectations:**\n\n**By Experience (K-12):**\n- Year 1-3: $40K-$55K\n- Year 4-10: $50K-$68K\n- Year 10-20: $60K-$80K\n- Year 20+: $70K-$90K\n\n**By Location (matters a LOT):**\n- High-paying states: CA, NY, MA ($70K-$90K+)\n- Lower-paying states: MS, SD, WV ($35K-$50K)\n- Urban districts: Generally pay more\n\n**Additional Income:**\n- Summer school: +$3K-$8K\n- Coaching/clubs: +$2K-$10K\n- Tutoring: $30-$75/hour\n- Master's degree: +$5K-$10K annually\n\n**🛠️ Essential Skills:**\n- Classroom management\n- Curriculum development\n- Patience and empathy\n- Communication (students, parents, admin)\n- Adaptability\n- Organization\n- Technology integration\n- Differentiated instruction\n- Assessment and grading\n\n**🎓 Certifications & Credentials:**\n- State Teaching License (required for public schools)\n- Subject-specific certifications\n- National Board Certification (salary boost)\n- ESL/ELL certification (English learners)\n- Special Education endorsement\n- Gifted Education certification\n\n**📊 Specializations:**\n- **STEM Education**: High demand, sometimes bonuses\n- **Special Education**: Always needed, higher pay\n- **Bilingual Education**: Valuable in many areas\n- **Reading Specialist**: Literacy intervention\n- **Instructional Coach**: Teacher development\n- **Curriculum Designer**: Creating educational materials\n\n**💡 Pros & Cons:**\n\n**Pros:**\n- Make meaningful impact on young lives\n- Summers off (2-3 months)\n- Job security and stability\n- Pension and benefits (in many states)\n- Every day is different\n- Strong sense of purpose\n- Schedule matches children's school schedule\n\n**Cons:**\n- Relatively low pay\n- Long hours (grading, planning after school)\n- Emotional exhaustion\n- Dealing with difficult parents\n- Standardized testing pressure\n- Lack of autonomy in curriculum\n- Out-of-pocket expenses for classroom supplies\n\n**🚀 Alternative Education Careers:**\n\nIf you're interested in education but not traditional classroom:\n\n**1. Corporate Trainer** ($60K-$90K)\n- Training employees in business settings\n- Better pay, adult learners\n\n**2. Instructional Designer** ($65K-$95K)\n- Creating online courses and learning materials\n- Ed-tech field, remote-friendly\n\n**3. Education Administrator** ($70K-$120K)\n- Principal, assistant principal, district roles\n- Leadership and management\n\n**4. School Counselor** ($55K-$75K)\n- Student support, college/career guidance\n- Master's degree required\n\n**5. Education Technology Specialist** ($60K-$85K)\n- Integrating technology in schools\n- Tech skills + education background\n\n**6. Curriculum Developer** ($55K-$85K)\n- Creating educational materials\n- Publishing or ed-tech companies\n\n**💼 Breaking Into Teaching:**\n\n**Traditional Path:**\n1. Get Bachelor's in Education (4 years)\n2. Complete student teaching\n3. Pass state exams\n4. Apply for teaching positions\n\n**Career Changer Path:**\n1. Get teaching credential (1-2 years)\n2. Alternative certification program\n3. Some programs let you teach while training\n\n**International Path:**\n1. Get TEFL/TESOL certification (online, 4-6 weeks)\n2. Teach English abroad\n3. Explore teaching internationally\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // TRADES CAREERS
  if (keywords.some(k => ['electrician', 'plumber', 'hvac', 'trade', 'mechanic', 'welder'].includes(k))) {
    return `Skilled trades offer excellent careers with no college debt! Here's your complete guide:\n\n**🎯 Top Skilled Trades:**\n\n**1. Electrician** ($50K-$80K+)\n- Residential, commercial, or industrial wiring\n- High demand, excellent job security\n- Apprenticeship: 4-5 years\n- License required in all states\n\n**2. Plumber** ($50K-$85K+)\n- Water systems, pipes, fixtures\n- Can start own business easily\n- Apprenticeship: 4-5 years\n- High earning potential with experience\n\n**3. HVAC Technician** ($45K-$75K+)\n- Heating, ventilation, air conditioning\n- Year-round work\n- Training: 6 months to 2 years\n- EPA certification required\n\n**4. Welder** ($40K-$70K+)\n- Industrial, construction, manufacturing\n- Specialized skills in high demand\n- Training: 7 months to 2 years\n- Certifications boost pay significantly\n\n**5. Automotive Technician** ($40K-$70K)\n- Car repair and maintenance\n- Specializations: diagnostics, electric vehicles\n- Training: 2 years technical school\n- ASE certifications important\n\n**6. Heavy Equipment Operator** ($45K-$75K)\n- Operating bulldozers, cranes, excavators\n- Construction industry\n- Training: 1-3 months to 2 years\n- Union jobs pay very well\n\n**7. Carpenter** ($40K-$70K+)\n- Framing, finish carpentry, cabinetmaking\n- Can specialize or start own business\n- Apprenticeship: 3-4 years\n\n**8. Elevator Mechanic** ($75K-$100K+)\n- Installing and maintaining elevators\n- One of highest-paid trades\n- Apprenticeship: 4 years\n- Strong union presence\n\n**📚 Education & Training Paths:**\n\n**Apprenticeship (Most Common) ⭐:**\n- 3-5 years on-the-job training\n- Earn while you learn ($15-$25/hr starting)\n- Classroom component (evening/weekend)\n- Graduate as journeyman\n- NO student debt\n\n**Trade/Technical School:**\n- 6 months to 2 years\n- Focused training\n- Cost: $5K-$33K\n- Faster entry than apprenticeship\n\n**Community College:**\n- Associate degree (2 years)\n- More comprehensive education\n- Cost: $3K-$15K\n- Can transfer to 4-year if interests change\n\n**Military:**\n- Learn trade while serving\n- Get paid + benefits\n- GI Bill for further education\n- Excellent pathway\n\n**💰 Realistic Earning Potential:**\n\n**Apprentice (Learning):**\n- Year 1: $15-$20/hour ($30K-$40K)\n- Year 2: $20-$25/hour ($40K-$50K)\n- Year 3: $25-$30/hour ($50K-$60K)\n- Year 4: $30-$35/hour ($60K-$70K)\n\n**Journeyman (Licensed):**\n- $25-$45/hour ($50K-$90K)\n- Varies by trade and location\n\n**Master/Business Owner:**\n- $80K-$150K+\n- Owning business multiplies earnings\n- Some tradespeople earn $200K+\n\n**Overtime & Premium Pay:**\n- Overtime (1.5x pay) very common\n- Weekend work (double pay)\n- Emergency calls (premium rates)\n- Many trades earn $70K-$100K with OT\n\n**🛠️ Highest-Paying Trades:**\n1. **Elevator Mechanic**: $85K average, $100K+ with OT\n2. **Power Line Worker**: $80K-$100K+\n3. **Boilermaker**: $70K-$90K\n4. **Electrician** (Industrial): $70K-$95K\n5. **Plumber** (Commercial): $65K-$90K\n6. **HVAC** (Commercial): $60K-$85K\n\n**📊 Pros & Cons:**\n\n**Pros:**\n- NO student loan debt\n- Earn while learning\n- High demand (skilled labor shortage)\n- Can't be outsourced or automated easily\n- Physical, hands-on work\n- Start your own business more easily\n- Overtime opportunities\n- Job security\n- Respected, essential work\n\n**Cons:**\n- Physically demanding\n- Weather exposure (some trades)\n- Injury risk (safety training helps)\n- Peak earnings lower than some professions\n- Early morning starts common\n- May require travel\n- Body wear and tear over time\n\n**🎓 Required Licenses/Certifications:**\n\n**Electrician:**\n- Apprentice license\n- Journeyman license (after apprenticeship)\n- Master electrician (advanced)\n\n**Plumber:**\n- Apprentice license\n- Journeyman plumber\n- Master plumber\n\n**HVAC:**\n- EPA Section 608 (refrigerant handling)\n- State/local HVAC license\n- Specialized certifications\n\n**Welder:**\n- AWS certifications (American Welding Society)\n- Multiple specializations available\n\n**🚀 How to Get Started:**\n\n**Step 1: Research Trades**\n- Shadow tradespeople\n- Ask about day-to-day work\n- Consider physical demands\n\n**Step 2: Find Training**\n- Union apprenticeships (best pay/benefits)\n- Trade schools\n- Community colleges\n- Non-union apprenticeships\n\n**Step 3: Apply**\n- Union halls (in-person applications)\n- ABC (Associated Builders and Contractors)\n- Trade schools (rolling admissions)\n- Employers offering apprenticeships\n\n**Step 4: Get Basic Tools**\n- Most apprenticeships provide list\n- Initial investment: $200-$1000\n- Build tool collection over time\n\n**💼 Career Progression:**\n\nHelper/Laborer → Apprentice → Journeyman → Master/Foreman → Contractor/Business Owner\n\nOR\n\nApprentice → Journeyman → Superintendent → Project Manager → Business Owner\n\n**🏢 Union vs. Non-Union:**\n\n**Union:**\n- Better pay and benefits\n- Pension plans\n- Structured apprenticeships\n- Job placement assistance\n- Stronger worker protections\n\n**Non-Union:**\n- More flexibility\n- Easier to start own business\n- Direct negotiation with employers\n- May have lower starting pay\n\n**💡 Starting Your Own Business:**\n\nMany tradespeople become business owners:\n- Get licensed (journeyman/master)\n- Work 3-5 years for experience\n- Get business license and insurance\n- Start with small jobs\n- Hire apprentices as you grow\n- Earning potential: $100K-$300K+\n\n**🎯 Job Outlook:**\n\nAll trades have EXCELLENT job outlook:\n- Aging workforce (many retiring)\n- Not enough young people entering\n- Construction boom\n- Infrastructure investment\n- Can't be outsourced\n- Job security very high\n\n*Demo Mode Active. Enable OpenAI for personalized guidance.*`;
  }
  
  // GENERAL/FALLBACK - Comprehensive Career Exploration
  return `Thank you for your career question! Let me provide comprehensive guidance across multiple perspectives:\n\n**🎯 Key Career Fields to Consider:**\n\n**Technology** ($60K-$150K+)\n- Software Development\n- Data Science & Analytics\n- Cybersecurity\n- Cloud Computing\n- UX/UI Design\n*Pros*: High pay, remote work, continuous learning\n*Cons*: Fast-changing, requires constant skill updates\n*Entry*: Bootcamps, degrees, or self-taught\n\n**Healthcare** ($50K-$250K+)\n- Nursing (RN, NP)\n- Physician/Surgeon\n- Healthcare Administration\n- Medical Technology\n- Mental Health Counseling\n*Pros*: Job security, meaningful impact, high demand\n*Cons*: Stressful, long education, emotional toll\n*Entry*: Requires specific degrees and licenses\n\n**Business** ($45K-$150K+)\n- Marketing & Sales\n- Finance & Accounting\n- Human Resources\n- Project Management\n- Business Analysis\n*Pros*: Versatile, transferable skills, advancement opportunities\n*Cons*: Competitive, may require MBA for top roles\n*Entry*: Bachelor's degree, certifications helpful\n\n**Skilled Trades** ($40K-$100K+)\n- Electrician\n- Plumber\n- HVAC Technician\n- Welder\n- Carpenter\n*Pros*: No student debt, earn while learning, own business potential\n*Cons*: Physically demanding, body wear over time\n*Entry*: Apprenticeships, technical schools\n\n**Education** ($40K-$90K)\n- K-12 Teacher\n- College Professor\n- Instructional Designer\n- School Counselor\n- Corporate Trainer\n*Pros*: Impact lives, summers off, job stability\n*Cons*: Moderate pay, emotional labor\n*Entry*: Bachelor's + teaching credential\n\n**Creative Fields** ($40K-$120K+)\n- UX/UI Designer\n- Graphic Designer\n- Content Creator\n- Videographer\n- Copywriter\n*Pros*: Creative expression, portfolio-based, flexible\n*Cons*: Competitive, freelance instability, subjective\n*Entry*: Portfolio > degree\n\n**📚 Choosing the Right Path:**\n\n**Ask Yourself:**\n1. **What are my natural strengths?** (analytical, creative, interpersonal)\n2. **What do I value most?** (money, impact, flexibility, stability)\n3. **How much education can I pursue?** (time, finances)\n4. **What lifestyle do I want?** (work-life balance, travel)\n5. **What problems interest me?** (technical, human, creative)\n\n**Career Decision Framework:**\n\n**High Priority on Income:**\n→ Tech (Software, Data), Finance, Medicine (Physician, Dentist), Engineering\n\n**High Priority on Work-Life Balance:**\n→ UX Design, Some Tech roles, Education, Government\n\n**High Priority on Helping People:**\n→ Healthcare, Education, Social Work, Counseling\n\n**Don't Want College Debt:**\n→ Skilled Trades, Coding Bootcamp → Tech, Military → Various\n\n**Want to Be Own Boss:**\n→ Trades (Contractor), Design (Freelance), Consulting, Real Estate\n\n**🛠️ Actionable Next Steps:**\n\n**Step 1: Self-Assessment (This Week)**\n- Take career assessments (Myers-Briggs, StrengthsFinder)\n- List your skills, interests, values\n- Identify deal-breakers\n\n**Step 2: Research (Weeks 2-3)**\n- Read job descriptions in fields of interest\n- Watch \"day in the life\" videos\n- Check salary data (Bureau of Labor Statistics)\n- Review education requirements\n\n**Step 3: Informational Interviews (Weeks 3-4)**\n- Connect with professionals on LinkedIn\n- Ask for 15-minute coffee chats\n- Prepare thoughtful questions\n- Learn about day-to-day realities\n\n**Step 4: Try Before You Commit (Month 2)**\n- Take online courses (Coursera, Udemy)\n- Volunteer in the field\n- Shadow professionals\n- Freelance/side projects\n\n**Step 5: Make Decision & Plan (Month 3)**\n- Choose 1-2 paths to pursue\n- Map out education/training needed\n- Set timeline and milestones\n- Identify first concrete step\n\n**💡 Education Options by Timeline:**\n\n**Fast Entry (3-12 months):**\n- Coding bootcamp → Tech jobs\n- Digital marketing courses → Marketing\n- Google Career Certificates\n- Trade apprenticeships (start earning immediately)\n\n**Medium Term (2-4 years):**\n- Associate degree\n- Bachelor's degree\n- Nursing (ADN or BSN)\n- UX design bootcamp + portfolio\n\n**Long Term (5-10+ years):**\n- Medicine (11-15 years)\n- Law (7 years)\n- PhD/Academia\n- Master's + experience for senior roles\n\n**💰 Salary vs. Education Investment:**\n\n**Best ROI (Return on Investment):**\n- Software Engineering (bootcamp/self-taught)\n- Skilled Trades (apprenticeship, no debt)\n- Nursing (2-4 years → good salary)\n- UX Design (bootcamp → $70K+)\n\n**High ROI but Longer:**\n- Medicine (expensive but $200K+)\n- Engineering (4 years → $70K-$90K start)\n- Finance (4 years → career growth potential)\n\n**🎯 Hot Careers for 2024-2030:**\n- AI/Machine Learning Engineers\n- Cybersecurity Specialists\n- Data Scientists\n- Cloud Architects\n- Renewable Energy Technicians\n- Healthcare (aging population)\n- Skilled Trades (labor shortage)\n\n**Remember:** \n- Career paths are rarely linear\n- Most people change careers 5-7 times\n- Start somewhere and iterate\n- Skills are transferable\n- It's never too late to change\n\n*Demo Mode Active. Enable OpenAI for personalized guidance based on your specific situation.*`;
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
