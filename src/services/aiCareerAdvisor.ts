// AI Career Advisor Service - Mock AI system for generating career guidance
export interface CareerQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  isAiGenerated?: boolean;
}

// Enhanced career knowledge base for generating contextual responses
const careerFields = {
  // Tech Fields
  'software development': {
    category: 'Tech',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'databases', 'Git', 'APIs'],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional', 'Microsoft Azure'],
    entry_roles: ['Junior Developer', 'Software Engineer I', 'Frontend/Backend Developer'],
    salary_range: '$60,000 - $120,000',
    growth_path: 'Junior → Mid-level → Senior → Lead → Principal Engineer'
  },
  'cybersecurity': {
    category: 'Tech', 
    skills: ['network security', 'ethical hacking', 'risk assessment', 'incident response', 'Python'],
    certifications: ['CompTIA Security+', 'CISSP', 'CEH', 'CISM'],
    entry_roles: ['SOC Analyst', 'Security Specialist', 'Cybersecurity Intern'],
    salary_range: '$55,000 - $140,000',
    growth_path: 'Analyst → Specialist → Engineer → Architect → CISO'
  },
  'data science': {
    category: 'Tech',
    skills: ['Python', 'R', 'SQL', 'machine learning', 'statistics', 'data visualization'],
    certifications: ['Google Data Analytics', 'Microsoft Azure Data Scientist', 'AWS ML Specialty'],
    entry_roles: ['Data Analyst', 'Junior Data Scientist', 'Business Intelligence Analyst'],
    salary_range: '$70,000 - $150,000',
    growth_path: 'Analyst → Data Scientist → Senior Data Scientist → Principal Data Scientist'
  },
  'web development': {
    category: 'Tech',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'responsive design', 'APIs'],
    certifications: ['Meta Front-End Developer', 'Google UX Design', 'freeCodeCamp'],
    entry_roles: ['Junior Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    salary_range: '$50,000 - $110,000',
    growth_path: 'Junior → Mid-level → Senior → Lead → Engineering Manager'
  },
  'cloud computing': {
    category: 'Tech',
    skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'infrastructure as code', 'networking'],
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'Google Cloud Engineer'],
    entry_roles: ['Cloud Support Engineer', 'Junior Cloud Engineer', 'DevOps Engineer'],
    salary_range: '$65,000 - $140,000',
    growth_path: 'Support → Engineer → Senior Engineer → Cloud Architect → Director'
  },
  
  // Business Fields
  'accounting': {
    category: 'Business',
    skills: ['financial reporting', 'tax preparation', 'auditing', 'QuickBooks', 'Excel', 'GAAP', 'bookkeeping'],
    certifications: ['CPA', 'CMA', 'CIA', 'QuickBooks Certified'],
    entry_roles: ['Staff Accountant', 'Junior Accountant', 'Accounts Payable/Receivable Clerk'],
    salary_range: '$45,000 - $95,000',
    growth_path: 'Staff Accountant → Senior Accountant → Accounting Manager → Controller → CFO'
  },
  'finance': {
    category: 'Business',
    skills: ['financial analysis', 'modeling', 'Excel', 'Bloomberg', 'valuation', 'risk management', 'investment analysis'],
    certifications: ['CFA', 'CFP', 'FRM', 'Series 7'],
    entry_roles: ['Financial Analyst', 'Junior Analyst', 'Investment Banking Analyst'],
    salary_range: '$55,000 - $120,000',
    growth_path: 'Analyst → Senior Analyst → Associate → VP → Director → Managing Director'
  },
  'digital marketing': {
    category: 'Business',
    skills: ['SEO', 'Google Ads', 'social media', 'content marketing', 'analytics', 'email marketing'],
    certifications: ['Google Ads', 'HubSpot', 'Facebook Blueprint', 'Google Analytics'],
    entry_roles: ['Marketing Coordinator', 'Digital Marketing Specialist', 'Social Media Manager'],
    salary_range: '$40,000 - $100,000',
    growth_path: 'Coordinator → Specialist → Manager → Director → VP Marketing'
  },
  'project management': {
    category: 'Business',
    skills: ['planning', 'stakeholder management', 'risk assessment', 'Agile', 'Scrum', 'budgeting'],
    certifications: ['PMP', 'Scrum Master', 'Prince2', 'Agile PM'],
    entry_roles: ['Project Coordinator', 'Assistant Project Manager', 'Scrum Master'],
    salary_range: '$55,000 - $120,000',
    growth_path: 'Coordinator → Project Manager → Senior PM → Program Manager → PMO Director'
  },
  'human resources': {
    category: 'Business',
    skills: ['recruitment', 'employee relations', 'benefits administration', 'HRIS systems', 'labor law', 'training'],
    certifications: ['PHR', 'SPHR', 'SHRM-CP', 'SHRM-SCP'],
    entry_roles: ['HR Coordinator', 'Recruiter', 'HR Generalist'],
    salary_range: '$45,000 - $95,000',
    growth_path: 'Coordinator → HR Generalist → HR Manager → HR Director → CHRO'
  },
  'sales': {
    category: 'Business',
    skills: ['prospecting', 'negotiation', 'CRM software', 'presentation', 'relationship building', 'closing'],
    certifications: ['Certified Sales Professional', 'Sandler Sales', 'Challenger Sale'],
    entry_roles: ['Sales Development Rep', 'Account Executive', 'Inside Sales Rep'],
    salary_range: '$40,000 - $150,000+ (with commission)',
    growth_path: 'SDR → AE → Senior AE → Sales Manager → VP Sales → CRO'
  },
  'consulting': {
    category: 'Business',
    skills: ['problem solving', 'data analysis', 'presentation', 'strategy', 'stakeholder management', 'Excel'],
    certifications: ['MBA', 'PMP', 'Six Sigma', 'Industry-specific certs'],
    entry_roles: ['Analyst', 'Associate Consultant', 'Junior Consultant'],
    salary_range: '$60,000 - $140,000',
    growth_path: 'Analyst → Consultant → Senior Consultant → Manager → Partner'
  },
  'business analysis': {
    category: 'Business',
    skills: ['requirements gathering', 'process mapping', 'SQL', 'data analysis', 'stakeholder management', 'Agile'],
    certifications: ['CBAP', 'PMI-PBA', 'Agile Analysis Certification'],
    entry_roles: ['Junior Business Analyst', 'Business Analyst', 'Data Analyst'],
    salary_range: '$50,000 - $100,000',
    growth_path: 'Junior BA → Business Analyst → Senior BA → Lead BA → Product Manager'
  },
  
  // Healthcare Fields
  'nursing': {
    category: 'Healthcare',
    skills: ['patient care', 'medical procedures', 'documentation', 'critical thinking', 'communication'],
    certifications: ['RN License', 'BLS', 'ACLS', 'Specialty Certifications'],
    entry_roles: ['Staff Nurse', 'Graduate Nurse', 'Clinical Nurse'],
    salary_range: '$60,000 - $90,000',
    growth_path: 'Staff Nurse → Charge Nurse → Nurse Manager → Director of Nursing'
  },
  'healthcare administration': {
    category: 'Healthcare',
    skills: ['healthcare systems', 'regulations', 'finance', 'leadership', 'quality improvement'],
    certifications: ['CHAM', 'FACHE', 'CCS', 'RHIA'],
    entry_roles: ['Administrative Assistant', 'Healthcare Coordinator', 'Operations Specialist'],
    salary_range: '$45,000 - $110,000',
    growth_path: 'Coordinator → Manager → Director → Administrator → CEO'
  },
  'medical assistant': {
    category: 'Healthcare',
    skills: ['patient intake', 'vital signs', 'medical records', 'scheduling', 'basic clinical procedures'],
    certifications: ['CMA', 'RMA', 'CCMA', 'BLS'],
    entry_roles: ['Medical Assistant', 'Clinical Assistant', 'Patient Care Technician'],
    salary_range: '$30,000 - $45,000',
    growth_path: 'Medical Assistant → Lead MA → Office Manager → Practice Administrator'
  },
  'pharmacy': {
    category: 'Healthcare',
    skills: ['medication dispensing', 'drug interactions', 'patient counseling', 'inventory management', 'pharmacology'],
    certifications: ['PharmD', 'Pharmacy Technician Certification', 'State License'],
    entry_roles: ['Pharmacy Technician', 'Pharmacy Intern', 'Clinical Pharmacist'],
    salary_range: '$35,000 - $130,000',
    growth_path: 'Technician → Pharmacist → Clinical Pharmacist → Pharmacy Manager → Director'
  },
  
  // Arts & Design Fields
  'ux design': {
    category: 'Arts',
    skills: ['user research', 'wireframing', 'prototyping', 'Figma', 'Adobe XD', 'usability testing'],
    certifications: ['Google UX Design Certificate', 'Nielsen Norman Group UX', 'HFI CUA'],
    entry_roles: ['UX Designer', 'UI Designer', 'Product Designer'],
    salary_range: '$55,000 - $130,000',
    growth_path: 'Designer → Senior Designer → Lead Designer → Design Manager'
  },
  'graphic design': {
    category: 'Arts',
    skills: ['Adobe Creative Suite', 'typography', 'branding', 'layout design', 'color theory', 'illustration'],
    certifications: ['Adobe Certified Professional', 'Graphic Design Certification'],
    entry_roles: ['Junior Graphic Designer', 'Graphic Designer', 'Production Artist'],
    salary_range: '$38,000 - $75,000',
    growth_path: 'Junior Designer → Designer → Senior Designer → Art Director → Creative Director'
  },
  'content writing': {
    category: 'Arts',
    skills: ['copywriting', 'SEO writing', 'storytelling', 'editing', 'research', 'content strategy'],
    certifications: ['HubSpot Content Marketing', 'Google Analytics', 'Content Marketing Institute'],
    entry_roles: ['Content Writer', 'Copywriter', 'Junior Content Strategist'],
    salary_range: '$35,000 - $80,000',
    growth_path: 'Writer → Senior Writer → Content Manager → Content Director'
  },
  
  // Education & Training
  'teaching': {
    category: 'Business',
    skills: ['curriculum development', 'classroom management', 'assessment', 'communication', 'technology integration'],
    certifications: ['Teaching License', 'Subject-specific certifications', 'National Board Certification'],
    entry_roles: ['Student Teacher', 'Substitute Teacher', 'Classroom Teacher'],
    salary_range: '$40,000 - $70,000',
    growth_path: 'Teacher → Lead Teacher → Department Head → Principal → Superintendent'
  },
  'corporate training': {
    category: 'Business',
    skills: ['instructional design', 'LMS administration', 'facilitation', 'adult learning theory', 'e-learning development'],
    certifications: ['CPLP', 'ATD Master Trainer', 'CPTD'],
    entry_roles: ['Training Coordinator', 'Corporate Trainer', 'Instructional Designer'],
    salary_range: '$45,000 - $90,000',
    growth_path: 'Trainer → Senior Trainer → Training Manager → L&D Director'
  },
  
  // ===== MORE TECH FIELDS =====
  'mobile development': {
    category: 'Tech',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'iOS', 'Android', 'mobile UI/UX', 'API integration'],
    certifications: ['Google Associate Android Developer', 'iOS Developer Certification', 'Flutter Certification'],
    entry_roles: ['Junior Mobile Developer', 'iOS/Android Developer', 'Mobile Engineer'],
    salary_range: '$65,000 - $125,000',
    growth_path: 'Junior → Mobile Developer → Senior → Lead Mobile Engineer → Engineering Manager'
  },
  'artificial intelligence': {
    category: 'Tech',
    skills: ['machine learning', 'deep learning', 'neural networks', 'Python', 'TensorFlow', 'PyTorch', 'NLP'],
    certifications: ['TensorFlow Developer', 'AWS ML Specialty', 'Deep Learning Specialization'],
    entry_roles: ['ML Engineer', 'AI Research Assistant', 'NLP Engineer'],
    salary_range: '$90,000 - $180,000',
    growth_path: 'Engineer → Senior ML Engineer → AI Research Scientist → Principal Scientist'
  },
  'database administration': {
    category: 'Tech',
    skills: ['SQL', 'database design', 'performance tuning', 'backup/recovery', 'Oracle', 'PostgreSQL', 'MongoDB'],
    certifications: ['Oracle DBA', 'Microsoft SQL Server', 'MongoDB Certified DBA'],
    entry_roles: ['Junior DBA', 'Database Administrator', 'SQL Developer'],
    salary_range: '$60,000 - $120,000',
    growth_path: 'Junior DBA → DBA → Senior DBA → Database Architect'
  },
  'quality assurance': {
    category: 'Tech',
    skills: ['testing', 'automation', 'Selenium', 'JIRA', 'test planning', 'bug tracking', 'QA processes'],
    certifications: ['ISTQB', 'Certified Selenium Professional', 'CSTE'],
    entry_roles: ['QA Tester', 'Test Engineer', 'QA Analyst'],
    salary_range: '$50,000 - $100,000',
    growth_path: 'Tester → QA Engineer → Senior QA → QA Manager'
  },
  'network engineering': {
    category: 'Tech',
    skills: ['networking', 'Cisco', 'routing', 'switching', 'firewalls', 'network security', 'troubleshooting'],
    certifications: ['CCNA', 'CCNP', 'CompTIA Network+', 'JNCIA'],
    entry_roles: ['Network Technician', 'Junior Network Engineer', 'Network Administrator'],
    salary_range: '$55,000 - $110,000',
    growth_path: 'Technician → Network Engineer → Senior Engineer → Network Architect'
  },
  'systems administration': {
    category: 'Tech',
    skills: ['Linux', 'Windows Server', 'Active Directory', 'PowerShell', 'virtualization', 'system monitoring'],
    certifications: ['RHCSA', 'MCSA', 'CompTIA Server+', 'VMware VCP'],
    entry_roles: ['Junior Sysadmin', 'Systems Administrator', 'IT Support Specialist'],
    salary_range: '$50,000 - $95,000',
    growth_path: 'Junior Sysadmin → Sysadmin → Senior Sysadmin → Infrastructure Manager'
  },
  'game development': {
    category: 'Tech',
    skills: ['Unity', 'Unreal Engine', 'C++', 'C#', 'game design', '3D modeling', 'physics'],
    certifications: ['Unity Certified Developer', 'Unreal Engine Certification'],
    entry_roles: ['Junior Game Developer', 'Gameplay Programmer', 'Game Designer'],
    salary_range: '$50,000 - $110,000',
    growth_path: 'Junior Developer → Game Developer → Senior → Lead Developer → Game Director'
  },
  
  // ===== MORE BUSINESS FIELDS =====
  'product management': {
    category: 'Business',
    skills: ['product strategy', 'roadmapping', 'user research', 'Agile', 'data analysis', 'stakeholder management'],
    certifications: ['Product Management Certificate', 'Pragmatic Marketing', 'Scrum Product Owner'],
    entry_roles: ['Associate Product Manager', 'Product Analyst', 'Junior PM'],
    salary_range: '$70,000 - $150,000',
    growth_path: 'Associate PM → Product Manager → Senior PM → Director → VP Product'
  },
  'supply chain management': {
    category: 'Business',
    skills: ['logistics', 'procurement', 'inventory management', 'SAP', 'forecasting', 'vendor management'],
    certifications: ['CSCP', 'CPIM', 'CLTD', 'Six Sigma'],
    entry_roles: ['Supply Chain Analyst', 'Logistics Coordinator', 'Procurement Specialist'],
    salary_range: '$50,000 - $110,000',
    growth_path: 'Analyst → Supply Chain Manager → Director → VP Supply Chain'
  },
  'operations management': {
    category: 'Business',
    skills: ['process improvement', 'lean methodology', 'Six Sigma', 'project management', 'data analysis'],
    certifications: ['Six Sigma Black Belt', 'PMP', 'CPIM'],
    entry_roles: ['Operations Analyst', 'Operations Coordinator', 'Process Analyst'],
    salary_range: '$50,000 - $105,000',
    growth_path: 'Analyst → Operations Manager → Senior Manager → Director → VP Operations'
  },
  'real estate': {
    category: 'Business',
    skills: ['property valuation', 'market analysis', 'negotiation', 'contracts', 'client relations', 'marketing'],
    certifications: ['Real Estate License', 'Broker License', 'CCIM', 'CRS'],
    entry_roles: ['Real Estate Agent', 'Property Manager', 'Leasing Consultant'],
    salary_range: '$40,000 - $150,000+',
    growth_path: 'Agent → Senior Agent → Broker → Managing Broker → Firm Owner'
  },
  'insurance': {
    category: 'Business',
    skills: ['risk assessment', 'underwriting', 'claims processing', 'sales', 'policy knowledge', 'customer service'],
    certifications: ['Insurance License', 'CLU', 'CPCU', 'CIC'],
    entry_roles: ['Insurance Agent', 'Claims Adjuster', 'Underwriter'],
    salary_range: '$40,000 - $95,000',
    growth_path: 'Agent → Senior Agent → Agency Manager → Regional Manager'
  },
  'public relations': {
    category: 'Business',
    skills: ['media relations', 'writing', 'crisis management', 'social media', 'event planning', 'brand management'],
    certifications: ['APR', 'PRSA Certification', 'Digital Marketing Certification'],
    entry_roles: ['PR Coordinator', 'Communications Specialist', 'PR Assistant'],
    salary_range: '$40,000 - $90,000',
    growth_path: 'Coordinator → PR Manager → Senior Manager → Director → VP Communications'
  },
  'event planning': {
    category: 'Business',
    skills: ['event coordination', 'vendor management', 'budgeting', 'logistics', 'client relations', 'marketing'],
    certifications: ['CMP', 'CSEP', 'Wedding Planning Certification'],
    entry_roles: ['Event Coordinator', 'Event Assistant', 'Meeting Planner'],
    salary_range: '$35,000 - $75,000',
    growth_path: 'Coordinator → Event Planner → Senior Planner → Event Director'
  },
  
  // ===== MORE HEALTHCARE FIELDS =====
  'physician': {
    category: 'Healthcare',
    skills: ['diagnosis', 'patient care', 'medical procedures', 'clinical decision making', 'EMR systems'],
    certifications: ['Medical License', 'Board Certification', 'Specialty Certification'],
    entry_roles: ['Resident Physician', 'Fellow', 'Attending Physician'],
    salary_range: '$200,000 - $400,000+',
    growth_path: 'Resident → Attending → Department Head → Chief Medical Officer'
  },
  'physical therapy': {
    category: 'Healthcare',
    skills: ['rehabilitation', 'patient assessment', 'treatment planning', 'manual therapy', 'exercise prescription'],
    certifications: ['PT License', 'Board Specialization', 'Specialty Certifications'],
    entry_roles: ['Physical Therapist', 'PT Resident', 'Clinical PT'],
    salary_range: '$70,000 - $95,000',
    growth_path: 'PT → Senior PT → Clinical Specialist → Director of Rehabilitation'
  },
  'occupational therapy': {
    category: 'Healthcare',
    skills: ['patient assessment', 'treatment planning', 'adaptive equipment', 'activity analysis', 'documentation'],
    certifications: ['OT License', 'NBCOT Certification', 'Specialty Certifications'],
    entry_roles: ['Occupational Therapist', 'OT Resident', 'Clinical OT'],
    salary_range: '$70,000 - $95,000',
    growth_path: 'OT → Senior OT → Clinical Specialist → Director of OT Services'
  },
  'dental hygiene': {
    category: 'Healthcare',
    skills: ['teeth cleaning', 'patient education', 'x-rays', 'periodontal assessment', 'preventive care'],
    certifications: ['Dental Hygiene License', 'Local Anesthesia Certification', 'Radiology Certification'],
    entry_roles: ['Dental Hygienist', 'Clinical Hygienist'],
    salary_range: '$65,000 - $85,000',
    growth_path: 'Hygienist → Senior Hygienist → Clinical Coordinator → Practice Manager'
  },
  'radiologic technologist': {
    category: 'Healthcare',
    skills: ['x-ray imaging', 'patient positioning', 'radiation safety', 'equipment operation', 'PACS systems'],
    certifications: ['ARRT Certification', 'State License', 'Specialty Certifications'],
    entry_roles: ['Radiologic Technologist', 'X-Ray Technician', 'Imaging Technologist'],
    salary_range: '$50,000 - $75,000',
    growth_path: 'Technologist → Senior Technologist → Lead Tech → Radiology Manager'
  },
  'respiratory therapist': {
    category: 'Healthcare',
    skills: ['respiratory care', 'ventilator management', 'patient assessment', 'emergency response', 'pulmonary function testing'],
    certifications: ['RRT', 'CRT', 'ACLS', 'NRP'],
    entry_roles: ['Respiratory Therapist', 'Clinical RT', 'Staff RT'],
    salary_range: '$55,000 - $75,000',
    growth_path: 'RT → Senior RT → Clinical Specialist → RT Manager'
  },
  'veterinary medicine': {
    category: 'Healthcare',
    skills: ['animal care', 'diagnosis', 'surgery', 'client communication', 'medical procedures', 'pharmacology'],
    certifications: ['DVM License', 'Board Certification', 'Specialty Certifications'],
    entry_roles: ['Associate Veterinarian', 'Veterinary Intern', 'Staff Veterinarian'],
    salary_range: '$70,000 - $120,000',
    growth_path: 'Associate → Veterinarian → Senior DVM → Practice Owner'
  },
  'mental health counseling': {
    category: 'Healthcare',
    skills: ['therapy', 'assessment', 'diagnosis', 'treatment planning', 'crisis intervention', 'documentation'],
    certifications: ['LPC', 'LMHC', 'LCSW', 'State License'],
    entry_roles: ['Counseling Intern', 'Associate Counselor', 'Mental Health Counselor'],
    salary_range: '$40,000 - $75,000',
    growth_path: 'Associate → Counselor → Senior Counselor → Clinical Director'
  },
  'public health': {
    category: 'Healthcare',
    skills: ['epidemiology', 'health policy', 'community health', 'data analysis', 'program planning', 'research'],
    certifications: ['CPH', 'CHES', 'MPH'],
    entry_roles: ['Public Health Analyst', 'Community Health Worker', 'Epidemiologist'],
    salary_range: '$45,000 - $85,000',
    growth_path: 'Analyst → Program Manager → Director → Health Commissioner'
  },
  
  // ===== MORE ARTS & DESIGN FIELDS =====
  'video production': {
    category: 'Arts',
    skills: ['videography', 'editing', 'Adobe Premiere', 'Final Cut Pro', 'storytelling', 'cinematography'],
    certifications: ['Adobe Certified Video Specialist', 'Avid Certified'],
    entry_roles: ['Production Assistant', 'Video Editor', 'Videographer'],
    salary_range: '$35,000 - $80,000',
    growth_path: 'Production Assistant → Video Producer → Senior Producer → Creative Director'
  },
  'animation': {
    category: 'Arts',
    skills: ['2D/3D animation', 'After Effects', 'Maya', 'Blender', 'character design', 'motion graphics'],
    certifications: ['Adobe Certified', 'Autodesk Certified'],
    entry_roles: ['Junior Animator', 'Motion Graphics Designer', '3D Artist'],
    salary_range: '$45,000 - $95,000',
    growth_path: 'Junior Animator → Animator → Senior Animator → Animation Director'
  },
  'interior design': {
    category: 'Arts',
    skills: ['space planning', 'CAD software', 'color theory', 'materials', '3D rendering', 'client management'],
    certifications: ['NCIDQ', 'LEED AP', 'Interior Design Certification'],
    entry_roles: ['Junior Designer', 'Design Assistant', 'Interior Designer'],
    salary_range: '$40,000 - $85,000',
    growth_path: 'Junior Designer → Interior Designer → Senior Designer → Principal Designer'
  },
  'photography': {
    category: 'Arts',
    skills: ['camera operation', 'lighting', 'photo editing', 'Adobe Lightroom', 'Photoshop', 'composition'],
    certifications: ['Professional Photographers of America', 'Adobe Certified'],
    entry_roles: ['Assistant Photographer', 'Freelance Photographer', 'Studio Photographer'],
    salary_range: '$30,000 - $70,000',
    growth_path: 'Assistant → Photographer → Senior Photographer → Photography Director'
  },
  'fashion design': {
    category: 'Arts',
    skills: ['sketching', 'pattern making', 'sewing', 'textiles', 'fashion trends', 'Adobe Illustrator'],
    certifications: ['Fashion Design Certification', 'Technical Design Certification'],
    entry_roles: ['Fashion Design Assistant', 'Junior Designer', 'Pattern Maker'],
    salary_range: '$40,000 - $90,000',
    growth_path: 'Assistant → Fashion Designer → Senior Designer → Creative Director'
  },
  'music production': {
    category: 'Arts',
    skills: ['audio engineering', 'Pro Tools', 'mixing', 'mastering', 'music theory', 'sound design'],
    certifications: ['Pro Tools Certification', 'Audio Engineering Certification'],
    entry_roles: ['Assistant Engineer', 'Music Producer', 'Sound Designer'],
    salary_range: '$35,000 - $85,000',
    growth_path: 'Assistant → Producer → Senior Producer → Production Director'
  },
  
  // ===== ENGINEERING FIELDS =====
  'mechanical engineering': {
    category: 'Tech',
    skills: ['CAD', 'thermodynamics', 'mechanics', 'materials science', 'manufacturing', 'product design'],
    certifications: ['PE License', 'Six Sigma', 'SOLIDWORKS Certification'],
    entry_roles: ['Junior Engineer', 'Design Engineer', 'Manufacturing Engineer'],
    salary_range: '$60,000 - $100,000',
    growth_path: 'Junior Engineer → Mechanical Engineer → Senior Engineer → Engineering Manager'
  },
  'electrical engineering': {
    category: 'Tech',
    skills: ['circuit design', 'power systems', 'electronics', 'signal processing', 'control systems', 'PCB design'],
    certifications: ['PE License', 'Six Sigma', 'PMP'],
    entry_roles: ['Junior Electrical Engineer', 'Design Engineer', 'Test Engineer'],
    salary_range: '$65,000 - $110,000',
    growth_path: 'Junior Engineer → Electrical Engineer → Senior Engineer → Principal Engineer'
  },
  'civil engineering': {
    category: 'Tech',
    skills: ['structural design', 'AutoCAD', 'project management', 'surveying', 'construction management', 'geotechnical'],
    certifications: ['PE License', 'SE License', 'LEED AP'],
    entry_roles: ['Junior Civil Engineer', 'Design Engineer', 'Project Engineer'],
    salary_range: '$55,000 - $95,000',
    growth_path: 'Junior Engineer → Civil Engineer → Senior Engineer → Project Manager → Principal'
  },
  'chemical engineering': {
    category: 'Tech',
    skills: ['process design', 'thermodynamics', 'reaction engineering', 'process safety', 'materials', 'plant operations'],
    certifications: ['PE License', 'Six Sigma', 'Process Safety Certification'],
    entry_roles: ['Process Engineer', 'Junior Chemical Engineer', 'Production Engineer'],
    salary_range: '$65,000 - $115,000',
    growth_path: 'Process Engineer → Chemical Engineer → Senior Engineer → Plant Manager'
  },
  'biomedical engineering': {
    category: 'Tech',
    skills: ['medical devices', 'biomechanics', 'CAD', 'regulatory compliance', 'testing', 'research'],
    certifications: ['PE License', 'Clinical Engineering Certification'],
    entry_roles: ['Junior Biomedical Engineer', 'R&D Engineer', 'Clinical Engineer'],
    salary_range: '$60,000 - $105,000',
    growth_path: 'Junior Engineer → Biomedical Engineer → Senior Engineer → R&D Manager'
  },
  'industrial engineering': {
    category: 'Tech',
    skills: ['process optimization', 'lean manufacturing', 'Six Sigma', 'supply chain', 'data analysis', 'ergonomics'],
    certifications: ['PE License', 'Six Sigma Black Belt', 'Lean Certification'],
    entry_roles: ['Junior Industrial Engineer', 'Process Engineer', 'Manufacturing Engineer'],
    salary_range: '$60,000 - $100,000',
    growth_path: 'Junior Engineer → Industrial Engineer → Senior Engineer → Operations Manager'
  },
  'aerospace engineering': {
    category: 'Tech',
    skills: ['aerodynamics', 'propulsion', 'CAD', 'structural analysis', 'flight dynamics', 'systems engineering'],
    certifications: ['PE License', 'Six Sigma', 'PMP'],
    entry_roles: ['Junior Aerospace Engineer', 'Design Engineer', 'Systems Engineer'],
    salary_range: '$70,000 - $120,000',
    growth_path: 'Junior Engineer → Aerospace Engineer → Senior Engineer → Chief Engineer'
  },
  
  // ===== SCIENCE & RESEARCH =====
  'biology research': {
    category: 'Healthcare',
    skills: ['laboratory techniques', 'data analysis', 'research design', 'scientific writing', 'molecular biology', 'microscopy'],
    certifications: ['PhD', 'Lab Certifications', 'Safety Certifications'],
    entry_roles: ['Research Assistant', 'Lab Technician', 'Research Associate'],
    salary_range: '$40,000 - $85,000',
    growth_path: 'Research Assistant → Scientist → Senior Scientist → Principal Investigator'
  },
  'environmental science': {
    category: 'Healthcare',
    skills: ['environmental assessment', 'GIS', 'data analysis', 'field sampling', 'regulations', 'sustainability'],
    certifications: ['Environmental Professional', 'LEED AP', 'GIS Certification'],
    entry_roles: ['Environmental Technician', 'Environmental Specialist', 'Field Scientist'],
    salary_range: '$45,000 - $80,000',
    growth_path: 'Technician → Environmental Scientist → Senior Scientist → Environmental Manager'
  },
  'chemistry': {
    category: 'Healthcare',
    skills: ['analytical chemistry', 'lab techniques', 'instrumentation', 'data analysis', 'quality control', 'research'],
    certifications: ['ACS Certification', 'Lab Certifications', 'Safety Certifications'],
    entry_roles: ['Lab Technician', 'Analytical Chemist', 'Research Chemist'],
    salary_range: '$45,000 - $90,000',
    growth_path: 'Technician → Chemist → Senior Chemist → Lab Manager'
  },
  
  // ===== LAW & LEGAL =====
  'attorney': {
    category: 'Business',
    skills: ['legal research', 'writing', 'negotiation', 'litigation', 'contract law', 'client counseling'],
    certifications: ['JD Degree', 'Bar License', 'Specialty Certifications'],
    entry_roles: ['Associate Attorney', 'Junior Lawyer', 'Legal Associate'],
    salary_range: '$60,000 - $180,000+',
    growth_path: 'Associate → Senior Associate → Partner → Managing Partner'
  },
  'paralegal': {
    category: 'Business',
    skills: ['legal research', 'document preparation', 'case management', 'e-discovery', 'litigation support'],
    certifications: ['Paralegal Certificate', 'NALA Certification', 'State Certification'],
    entry_roles: ['Paralegal', 'Legal Assistant', 'Litigation Assistant'],
    salary_range: '$40,000 - $70,000',
    growth_path: 'Paralegal → Senior Paralegal → Paralegal Manager → Legal Operations Manager'
  },
  'compliance officer': {
    category: 'Business',
    skills: ['regulatory compliance', 'risk assessment', 'policy development', 'auditing', 'training', 'reporting'],
    certifications: ['CCEP', 'CRCM', 'CAMS'],
    entry_roles: ['Compliance Analyst', 'Compliance Coordinator', 'Junior Compliance Officer'],
    salary_range: '$50,000 - $100,000',
    growth_path: 'Analyst → Compliance Officer → Senior Officer → Chief Compliance Officer'
  },
  
  // ===== TRADES & SKILLED LABOR =====
  'electrician': {
    category: 'Tech',
    skills: ['electrical systems', 'wiring', 'troubleshooting', 'code compliance', 'safety', 'blueprints'],
    certifications: ['Journeyman License', 'Master Electrician', 'OSHA Certification'],
    entry_roles: ['Apprentice Electrician', 'Helper', 'Journeyman'],
    salary_range: '$40,000 - $80,000',
    growth_path: 'Apprentice → Journeyman → Master Electrician → Electrical Contractor'
  },
  'plumbing': {
    category: 'Tech',
    skills: ['pipe installation', 'troubleshooting', 'code compliance', 'water systems', 'drainage', 'gas lines'],
    certifications: ['Journeyman License', 'Master Plumber', 'Backflow Certification'],
    entry_roles: ['Apprentice Plumber', 'Helper', 'Journeyman Plumber'],
    salary_range: '$40,000 - $85,000',
    growth_path: 'Apprentice → Journeyman → Master Plumber → Plumbing Contractor'
  },
  'hvac': {
    category: 'Tech',
    skills: ['HVAC systems', 'refrigeration', 'troubleshooting', 'installation', 'maintenance', 'EPA certification'],
    certifications: ['EPA 608', 'NATE Certification', 'HVAC License'],
    entry_roles: ['HVAC Apprentice', 'HVAC Technician', 'Service Technician'],
    salary_range: '$40,000 - $75,000',
    growth_path: 'Apprentice → Technician → Master Technician → HVAC Contractor'
  },
  'welding': {
    category: 'Tech',
    skills: ['welding techniques', 'blueprint reading', 'metallurgy', 'safety', 'fabrication', 'inspection'],
    certifications: ['AWS Certification', 'Welding License', 'Safety Certifications'],
    entry_roles: ['Welder', 'Welding Apprentice', 'Junior Welder'],
    salary_range: '$35,000 - $70,000',
    growth_path: 'Welder → Certified Welder → Welding Supervisor → Welding Inspector'
  },
  'carpentry': {
    category: 'Tech',
    skills: ['woodworking', 'blueprint reading', 'framing', 'finishing', 'tool operation', 'measurements'],
    certifications: ['Journeyman Certificate', 'Master Carpenter', 'OSHA Certification'],
    entry_roles: ['Carpenter Apprentice', 'Helper', 'Journeyman Carpenter'],
    salary_range: '$35,000 - $70,000',
    growth_path: 'Apprentice → Journeyman → Master Carpenter → General Contractor'
  },
  'construction management': {
    category: 'Tech',
    skills: ['project planning', 'budgeting', 'scheduling', 'safety management', 'building codes', 'contract management'],
    certifications: ['CCM', 'PMP', 'OSHA 30', 'LEED AP'],
    entry_roles: ['Assistant Project Manager', 'Project Engineer', 'Field Engineer'],
    salary_range: '$55,000 - $110,000',
    growth_path: 'Assistant PM → Project Manager → Senior PM → Construction Manager → Director'
  },
  'automotive technician': {
    category: 'Tech',
    skills: ['diagnostics', 'engine repair', 'electrical systems', 'brake systems', 'computerized systems', 'customer service'],
    certifications: ['ASE Certification', 'Manufacturer Certifications', 'State License'],
    entry_roles: ['Automotive Technician', 'Service Technician', 'Mechanic Apprentice'],
    salary_range: '$35,000 - $65,000',
    growth_path: 'Technician → Master Technician → Service Manager → Shop Owner'
  },
  
  // ===== HOSPITALITY & CULINARY =====
  'culinary arts': {
    category: 'Business',
    skills: ['cooking techniques', 'menu planning', 'food safety', 'kitchen management', 'creativity', 'plating'],
    certifications: ['ServSafe', 'Culinary Degree', 'Specialty Certifications'],
    entry_roles: ['Line Cook', 'Prep Cook', 'Commis Chef'],
    salary_range: '$30,000 - $75,000',
    growth_path: 'Line Cook → Sous Chef → Executive Chef → Culinary Director'
  },
  'hotel management': {
    category: 'Business',
    skills: ['customer service', 'operations management', 'budgeting', 'staff management', 'hospitality software', 'sales'],
    certifications: ['CHA', 'CHE', 'Hospitality Degree'],
    entry_roles: ['Front Desk Agent', 'Assistant Manager', 'Department Supervisor'],
    salary_range: '$35,000 - $85,000',
    growth_path: 'Front Desk → Department Manager → Assistant GM → General Manager → Regional Director'
  },
  
  // ===== SOCIAL SERVICES =====
  'social work': {
    category: 'Healthcare',
    skills: ['case management', 'counseling', 'advocacy', 'crisis intervention', 'documentation', 'resource coordination'],
    certifications: ['MSW', 'LCSW', 'LMSW', 'State License'],
    entry_roles: ['Case Manager', 'Social Worker', 'Clinical Social Worker'],
    salary_range: '$40,000 - $70,000',
    growth_path: 'Case Manager → Social Worker → Clinical SW → Program Director'
  },
  'nonprofit management': {
    category: 'Business',
    skills: ['fundraising', 'grant writing', 'program management', 'volunteer coordination', 'budgeting', 'community outreach'],
    certifications: ['CFRE', 'Nonprofit Management Certificate', 'Grant Writing Certification'],
    entry_roles: ['Program Coordinator', 'Development Associate', 'Nonprofit Associate'],
    salary_range: '$40,000 - $85,000',
    growth_path: 'Coordinator → Program Manager → Director → Executive Director'
  },
  
  // ===== AGRICULTURE & ENVIRONMENTAL =====
  'agriculture': {
    category: 'Business',
    skills: ['crop management', 'soil science', 'farm equipment', 'pest management', 'sustainable practices', 'business management'],
    certifications: ['Certified Crop Adviser', 'Pesticide Applicator License', 'Organic Certification'],
    entry_roles: ['Farm Hand', 'Agricultural Technician', 'Farm Manager'],
    salary_range: '$30,000 - $70,000',
    growth_path: 'Farm Hand → Farm Manager → Agricultural Manager → Farm Owner'
  },
  'forestry': {
    category: 'Healthcare',
    skills: ['forest management', 'silviculture', 'GIS', 'wildlife management', 'conservation', 'timber assessment'],
    certifications: ['Certified Forester', 'GIS Certification', 'Wildlife Certifications'],
    entry_roles: ['Forestry Technician', 'Forest Ranger', 'Junior Forester'],
    salary_range: '$40,000 - $75,000',
    growth_path: 'Technician → Forester → Senior Forester → Forest Manager'
  },
  
  // ===== SPORTS & FITNESS =====
  'personal training': {
    category: 'Healthcare',
    skills: ['exercise science', 'program design', 'nutrition basics', 'motivation', 'client assessment', 'injury prevention'],
    certifications: ['NASM CPT', 'ACE', 'NSCA CSCS', 'First Aid/CPR'],
    entry_roles: ['Personal Trainer', 'Fitness Coach', 'Group Fitness Instructor'],
    salary_range: '$30,000 - $70,000',
    growth_path: 'Trainer → Senior Trainer → Fitness Director → Gym Owner'
  },
  'sports management': {
    category: 'Business',
    skills: ['event management', 'marketing', 'budgeting', 'facility management', 'contract negotiation', 'public relations'],
    certifications: ['Sports Management Degree', 'Event Management Certification'],
    entry_roles: ['Sports Coordinator', 'Facility Manager', 'Marketing Coordinator'],
    salary_range: '$35,000 - $80,000',
    growth_path: 'Coordinator → Manager → Director → General Manager'
  }
};

const careerKeywords = {
  tech: ['software', 'programming', 'coding', 'developer', 'engineer', 'engineering', 'data', 'cybersecurity', 'ai', 'artificial intelligence', 'machine learning', 'web development', 'mobile app', 'frontend', 'backend', 'fullstack', 'devops', 'cloud', 'javascript', 'python', 'react', 'node', 'aws', 'azure', 'kubernetes', 'docker', 'database', 'dba', 'qa', 'quality assurance', 'testing', 'network', 'sysadmin', 'systems', 'game dev', 'unity', 'unreal', 'mechanical', 'electrical', 'civil', 'chemical', 'biomedical', 'industrial', 'aerospace', 'electrician', 'plumber', 'plumbing', 'hvac', 'welder', 'welding', 'carpenter', 'carpentry', 'construction', 'automotive', 'mechanic', 'technician'],
  business: ['marketing', 'sales', 'finance', 'accounting', 'accountant', 'cpa', 'bookkeeping', 'tax', 'audit', 'consulting', 'consultant', 'management', 'manager', 'leadership', 'entrepreneur', 'startup', 'business analyst', 'project manager', 'product manager', 'operations', 'strategy', 'digital marketing', 'seo', 'social media', 'hr', 'human resources', 'recruiter', 'financial analyst', 'supply chain', 'logistics', 'procurement', 'real estate', 'realtor', 'broker', 'insurance', 'agent', 'underwriter', 'public relations', 'pr', 'communications', 'event planning', 'event coordinator', 'lawyer', 'attorney', 'paralegal', 'legal', 'compliance', 'nonprofit', 'fundraising', 'grant writing', 'culinary', 'chef', 'cooking', 'hotel', 'hospitality', 'restaurant', 'sports management', 'agriculture', 'farming'],
  healthcare: ['nurse', 'nursing', 'doctor', 'physician', 'medical', 'healthcare', 'hospital', 'clinic', 'therapy', 'therapist', 'physical therapy', 'pt', 'occupational therapy', 'ot', 'counseling', 'counselor', 'mental health', 'lpc', 'lcsw', 'pharmacy', 'pharmacist', 'dentistry', 'dental', 'dental hygiene', 'hygienist', 'veterinary', 'vet', 'veterinarian', 'public health', 'epidemiology', 'medical assistant', 'radiologic', 'radiology', 'x-ray', 'respiratory', 'rt', 'social work', 'social worker', 'biology', 'research', 'scientist', 'lab', 'environmental science', 'chemistry', 'chemist', 'forestry', 'forester', 'personal training', 'fitness', 'trainer'],
  arts: ['design', 'designer', 'graphic design', 'ux', 'ui', 'creative', 'artist', 'writer', 'writing', 'content', 'copywriter', 'photography', 'photographer', 'video', 'videographer', 'animation', 'animator', 'illustrator', 'musician', 'actor', 'filmmaker', 'interior design', 'fashion', 'fashion design', 'music production', 'audio', 'sound design'],
  education: ['teacher', 'teaching', 'educator', 'professor', 'training', 'trainer', 'curriculum', 'instruction', 'academic', 'school', 'university', 'learning', 'development', 'counselor', 'school counselor', 'higher education', 'instructional design'],
  general: ['career change', 'salary', 'interview', 'resume', 'linkedin', 'networking', 'skills', 'certification', 'promotion', 'work life balance', 'remote work', 'freelance']
};

const responseTemplates = {
  careerStart: {
    intro: "Starting a career in {field} requires a strategic approach. Here's how to get started:",
    steps: [
      "Build foundational skills through online courses, bootcamps, or formal education",
      "Create a portfolio showcasing relevant projects and accomplishments", 
      "Network with professionals in the field through LinkedIn and industry events",
      "Apply for entry-level positions, internships, or apprenticeships",
      "Stay current with industry trends and continuously develop your skills"
    ]
  },
  skillDevelopment: {
    intro: "To develop {skills} effectively, focus on these key areas:",
    steps: [
      "Identify the specific skills most valued in your target role",
      "Practice regularly through real-world projects and challenges",
      "Seek feedback from mentors or experienced professionals",
      "Consider formal training or certification programs",
      "Join professional communities to learn from others"
    ]
  },
  careerChange: {
    intro: "Transitioning to {field} from your current career requires careful planning:",
    steps: [
      "Identify transferable skills from your current experience",
      "Research the requirements and expectations in your target field",
      "Network with professionals who've made similar transitions", 
      "Consider taking on freelance projects to build relevant experience",
      "Prepare for potential salary adjustments during the transition period"
    ]
  },
  interview: {
    intro: "Succeeding in {field} interviews requires thorough preparation:",
    steps: [
      "Research the company culture, values, and recent developments",
      "Prepare specific examples that demonstrate your relevant skills",
      "Practice answering common interview questions for your field",
      "Prepare thoughtful questions about the role and company",
      "Follow up professionally after the interview"
    ]
  },
  salary: {
    intro: "Negotiating salary in {field} requires market knowledge and strategy:",
    steps: [
      "Research salary ranges for your role and experience level",
      "Document your achievements and value proposition",
      "Practice your negotiation conversation beforehand",
      "Consider the full compensation package, not just base salary",
      "Be prepared to walk away if the offer doesn't meet your needs"
    ]
  }
};

function detectCategory(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  for (const [category, keywords] of Object.entries(careerKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return category === 'general' ? 'Business' : 
             category === 'tech' ? 'Tech' :
             category === 'healthcare' ? 'Healthcare' :
             category === 'arts' ? 'Arts' :
             category === 'education' ? 'Business' : 'Business';
    }
  }
  return 'Business';
}

function detectQuestionType(query: string): keyof typeof responseTemplates {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('start') || lowerQuery.includes('begin') || lowerQuery.includes('get into')) {
    return 'careerStart';
  }
  if (lowerQuery.includes('skill') || lowerQuery.includes('learn') || lowerQuery.includes('improve')) {
    return 'skillDevelopment';
  }
  if (lowerQuery.includes('change') || lowerQuery.includes('transition') || lowerQuery.includes('switch')) {
    return 'careerChange';
  }
  if (lowerQuery.includes('interview') || lowerQuery.includes('job interview')) {
    return 'interview';
  }
  if (lowerQuery.includes('salary') || lowerQuery.includes('negotiate') || lowerQuery.includes('pay')) {
    return 'salary';
  }
  
  return 'skillDevelopment'; // Default
}

function extractFieldFromQuery(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // ===== TECH FIELDS (Most specific first) =====
  if (lowerQuery.includes('data science') || lowerQuery.includes('data scientist')) return 'data science';
  if (lowerQuery.includes('artificial intelligence') || lowerQuery.includes('ai engineer')) return 'artificial intelligence';
  if (lowerQuery.includes('machine learning') || lowerQuery.includes('ml engineer')) return 'artificial intelligence';
  if (lowerQuery.includes('web development') || lowerQuery.includes('web developer')) return 'web development';
  if (lowerQuery.includes('cloud computing') || lowerQuery.includes('cloud engineer') || lowerQuery.includes('aws') || lowerQuery.includes('azure')) return 'cloud computing';
  if (lowerQuery.includes('mobile dev') || lowerQuery.includes('ios') || lowerQuery.includes('android') || lowerQuery.includes('react native') || lowerQuery.includes('flutter')) return 'mobile development';
  if (lowerQuery.includes('game dev') || lowerQuery.includes('unity') || lowerQuery.includes('unreal')) return 'game development';
  if (lowerQuery.includes('database') || lowerQuery.includes('dba') || lowerQuery.includes('sql')) return 'database administration';
  if (lowerQuery.includes('qa') || lowerQuery.includes('quality assurance') || lowerQuery.includes('testing') || lowerQuery.includes('tester')) return 'quality assurance';
  if (lowerQuery.includes('network engineer') || lowerQuery.includes('ccna') || lowerQuery.includes('networking')) return 'network engineering';
  if (lowerQuery.includes('sysadmin') || lowerQuery.includes('system admin') || lowerQuery.includes('linux admin')) return 'systems administration';
  if (lowerQuery.includes('software') || lowerQuery.includes('programming') || lowerQuery.includes('developer')) return 'software development';
  if (lowerQuery.includes('cybersecurity') || lowerQuery.includes('security analyst') || lowerQuery.includes('infosec')) return 'cybersecurity';
  
  // Engineering fields
  if (lowerQuery.includes('mechanical engineer')) return 'mechanical engineering';
  if (lowerQuery.includes('electrical engineer')) return 'electrical engineering';
  if (lowerQuery.includes('civil engineer')) return 'civil engineering';
  if (lowerQuery.includes('chemical engineer')) return 'chemical engineering';
  if (lowerQuery.includes('biomedical engineer')) return 'biomedical engineering';
  if (lowerQuery.includes('industrial engineer')) return 'industrial engineering';
  if (lowerQuery.includes('aerospace engineer')) return 'aerospace engineering';
  
  // Trades
  if (lowerQuery.includes('electrician')) return 'electrician';
  if (lowerQuery.includes('plumber') || lowerQuery.includes('plumbing')) return 'plumbing';
  if (lowerQuery.includes('hvac')) return 'hvac';
  if (lowerQuery.includes('welder') || lowerQuery.includes('welding')) return 'welding';
  if (lowerQuery.includes('carpenter') || lowerQuery.includes('carpentry')) return 'carpentry';
  if (lowerQuery.includes('construction manag') || lowerQuery.includes('general contractor')) return 'construction management';
  if (lowerQuery.includes('mechanic') || lowerQuery.includes('automotive tech')) return 'automotive technician';
  
  // ===== BUSINESS FIELDS =====
  if (lowerQuery.includes('accounting') || lowerQuery.includes('accountant') || lowerQuery.includes('cpa') || lowerQuery.includes('bookkeep')) return 'accounting';
  if (lowerQuery.includes('finance') || lowerQuery.includes('financial analyst') || lowerQuery.includes('cfa')) return 'finance';
  if (lowerQuery.includes('product manag') || lowerQuery.includes('product owner')) return 'product management';
  if (lowerQuery.includes('supply chain') || lowerQuery.includes('logistics') || lowerQuery.includes('procurement')) return 'supply chain management';
  if (lowerQuery.includes('operations manag')) return 'operations management';
  if (lowerQuery.includes('digital marketing') || lowerQuery.includes('seo') || lowerQuery.includes('social media marketing')) return 'digital marketing';
  if (lowerQuery.includes('marketing')) return 'digital marketing';
  if (lowerQuery.includes('sales') || lowerQuery.includes('account executive') || lowerQuery.includes('business development')) return 'sales';
  if (lowerQuery.includes('human resources') || lowerQuery.includes('hr') || lowerQuery.includes('recruiter')) return 'human resources';
  if (lowerQuery.includes('consulting') || lowerQuery.includes('management consultant')) return 'management consulting';
  if (lowerQuery.includes('business analyst')) return 'business analyst';
  if (lowerQuery.includes('project manag')) return 'project management';
  if (lowerQuery.includes('real estate') || lowerQuery.includes('realtor') || lowerQuery.includes('broker')) return 'real estate';
  if (lowerQuery.includes('insurance') || lowerQuery.includes('underwriter')) return 'insurance';
  if (lowerQuery.includes('public relations') || lowerQuery.includes('pr') || lowerQuery.includes('communications')) return 'public relations';
  if (lowerQuery.includes('event plan') || lowerQuery.includes('event coordinat')) return 'event planning';
  if (lowerQuery.includes('corporate train') || lowerQuery.includes('instructional design')) return 'corporate training';
  if (lowerQuery.includes('teaching') || lowerQuery.includes('teacher') || lowerQuery.includes('classroom')) return 'teaching';
  if (lowerQuery.includes('higher education') || lowerQuery.includes('professor') || lowerQuery.includes('lecturer')) return 'higher education';
  
  // Legal
  if (lowerQuery.includes('attorney') || lowerQuery.includes('lawyer')) return 'attorney';
  if (lowerQuery.includes('paralegal')) return 'paralegal';
  if (lowerQuery.includes('compliance officer') || lowerQuery.includes('compliance analyst')) return 'compliance officer';
  
  // Hospitality & Culinary
  if (lowerQuery.includes('chef') || lowerQuery.includes('cook') || lowerQuery.includes('culinary')) return 'culinary arts';
  if (lowerQuery.includes('hotel') || lowerQuery.includes('hospitality manag')) return 'hotel management';
  
  // Nonprofit & Social
  if (lowerQuery.includes('nonprofit') || lowerQuery.includes('fundraising') || lowerQuery.includes('grant writing')) return 'nonprofit management';
  
  // Agriculture & Environment
  if (lowerQuery.includes('agriculture') || lowerQuery.includes('farming') || lowerQuery.includes('farm')) return 'agriculture';
  if (lowerQuery.includes('forestry') || lowerQuery.includes('forester')) return 'forestry';
  
  // Sports & Fitness
  if (lowerQuery.includes('personal train') || lowerQuery.includes('fitness coach')) return 'personal training';
  if (lowerQuery.includes('sports manag')) return 'sports management';
  
  // ===== HEALTHCARE FIELDS =====
  if (lowerQuery.includes('physician') || lowerQuery.includes('doctor') || lowerQuery.includes('md')) return 'physician';
  if (lowerQuery.includes('nursing') || lowerQuery.includes('nurse') || lowerQuery.includes('rn')) return 'nursing';
  if (lowerQuery.includes('physical therap') || lowerQuery.includes('pt ') || lowerQuery.includes(' pt')) return 'physical therapy';
  if (lowerQuery.includes('occupational therap') || lowerQuery.includes('ot ') || lowerQuery.includes(' ot')) return 'occupational therapy';
  if (lowerQuery.includes('dental hygien')) return 'dental hygiene';
  if (lowerQuery.includes('radiologic') || lowerQuery.includes('radiology') || lowerQuery.includes('x-ray tech')) return 'radiologic technologist';
  if (lowerQuery.includes('respiratory therap')) return 'respiratory therapist';
  if (lowerQuery.includes('veterinar') || lowerQuery.includes('vet ') || lowerQuery.includes(' vet')) return 'veterinary medicine';
  if (lowerQuery.includes('mental health') || lowerQuery.includes('counselor') || lowerQuery.includes('therapist') || lowerQuery.includes('lpc') || lowerQuery.includes('lmhc')) return 'mental health counseling';
  if (lowerQuery.includes('social work') || lowerQuery.includes('lcsw') || lowerQuery.includes('msw')) return 'social work';
  if (lowerQuery.includes('public health') || lowerQuery.includes('epidemiolog')) return 'public health';
  if (lowerQuery.includes('healthcare admin') || lowerQuery.includes('hospital admin')) return 'healthcare administration';
  if (lowerQuery.includes('medical assistant')) return 'medical assistant';
  if (lowerQuery.includes('pharmacy') || lowerQuery.includes('pharmacist')) return 'pharmacy';
  
  // Science & Research
  if (lowerQuery.includes('biology') || lowerQuery.includes('biologist') || lowerQuery.includes('research scientist')) return 'biology research';
  if (lowerQuery.includes('environmental science') || lowerQuery.includes('environmental scientist')) return 'environmental science';
  if (lowerQuery.includes('chemistry') || lowerQuery.includes('chemist')) return 'chemistry';
  
  // ===== ARTS & DESIGN FIELDS =====
  if (lowerQuery.includes('ux') || lowerQuery.includes('ui') || lowerQuery.includes('user experience')) return 'ux design';
  if (lowerQuery.includes('graphic design')) return 'graphic design';
  if (lowerQuery.includes('content writ') || lowerQuery.includes('copywriter')) return 'content writing';
  if (lowerQuery.includes('video product') || lowerQuery.includes('videographer')) return 'video production';
  if (lowerQuery.includes('animation') || lowerQuery.includes('animator')) return 'animation';
  if (lowerQuery.includes('interior design')) return 'interior design';
  if (lowerQuery.includes('photograph')) return 'photography';
  if (lowerQuery.includes('fashion design')) return 'fashion design';
  if (lowerQuery.includes('music product') || lowerQuery.includes('audio engineer')) return 'music production';
  
  return 'your chosen field';
}

function generateAdvancedTips(field: string, questionType: string): string[] {
  const tips = [];
  
  switch (questionType) {
    case 'careerStart':
      tips.push(`Consider joining ${field} communities on Reddit, Discord, or Slack for peer support`);
      tips.push(`Look for mentorship opportunities through platforms like ADPList or industry organizations`);
      tips.push(`Start building your professional brand on LinkedIn with relevant content and insights`);
      break;
    case 'skillDevelopment':
      tips.push(`Set up a learning schedule with specific, measurable goals`);
      tips.push(`Document your learning journey to showcase growth to potential employers`);
      tips.push(`Find accountability partners or study groups to maintain motivation`);
      break;
    case 'careerChange':
      tips.push(`Consider informational interviews with professionals in your target field`);
      tips.push(`Update your LinkedIn profile gradually to reflect your transition`);
      tips.push(`Look for bridge roles that combine your current skills with new field requirements`);
      break;
  }
  
  return tips;
}

// Advanced question analysis for more contextual responses
function analyzeQuestion(query: string) {
  const lowerQuery = query.toLowerCase();
  
  // Detect specific career fields
  let detectedField = null;
  for (const [fieldName, fieldData] of Object.entries(careerFields)) {
    if (lowerQuery.includes(fieldName) || 
        fieldData.skills.some(skill => lowerQuery.includes(skill.toLowerCase())) ||
        fieldData.entry_roles.some(role => lowerQuery.includes(role.toLowerCase()))) {
      detectedField = { name: fieldName, ...fieldData };
      break;
    }
  }
  
  // Detect question intent
  const intents = {
    gettingStarted: ['start', 'begin', 'get into', 'break into', 'enter'],
    skillBuilding: ['skills', 'learn', 'improve', 'develop', 'master'],
    careerChange: ['change', 'transition', 'switch', 'pivot', 'move to'],
    salaryNegotiation: ['salary', 'negotiate', 'pay', 'compensation', 'money'],
    jobSearch: ['find job', 'apply', 'job search', 'hiring', 'interview'],
    advancement: ['promote', 'advance', 'grow', 'next level', 'senior'],
    workLife: ['remote', 'work life', 'balance', 'flexible', 'culture'],
    education: ['degree', 'certification', 'bootcamp', 'course', 'study']
  };
  
  let detectedIntent = 'general';
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      detectedIntent = intent;
      break;
    }
  }
  
  return { field: detectedField, intent: detectedIntent, query: lowerQuery };
}

function generateContextualResponse(analysis: any): string {
  const { field, intent, query } = analysis;
  
  // If we have a specific field detected, use field-specific information
  if (field) {
    return generateFieldSpecificResponse(field, intent, query);
  }
  
  // Otherwise, generate a general response based on intent
  return generateGeneralResponse(intent, query);
}

function generateFieldSpecificResponse(field: any, intent: string, query: string): string {
  let response = '';
  
  switch (intent) {
    case 'gettingStarted':
      response = `Starting a career in ${field.name} is an exciting journey! Here's your roadmap:\n\n`;
      response += `**Essential Skills to Develop:**\n`;
      field.skills.forEach((skill: string, index: number) => {
        response += `${index + 1}. ${skill}\n`;
      });
      
      response += `\n**Entry-Level Positions to Target:**\n`;
      field.entry_roles.forEach((role: string) => {
        response += `• ${role}\n`;
      });
      
      response += `\n**Salary Expectations:** ${field.salary_range}\n`;
      response += `**Career Progression:** ${field.growth_path}\n\n`;
      
      response += `**Recommended Certifications:**\n`;
      field.certifications.forEach((cert: string) => {
        response += `• ${cert}\n`;
      });
      break;
      
    case 'skillBuilding':
      response = `To build expertise in ${field.name}, focus on these key areas:\n\n`;
      response += `**Core Skills Priority:**\n`;
      field.skills.slice(0, 4).forEach((skill: string, index: number) => {
        response += `${index + 1}. ${skill} - Start with fundamentals and build practical projects\n`;
      });
      
      response += `\n**Certification Path:**\n`;
      field.certifications.slice(0, 2).forEach((cert: string, index: number) => {
        response += `${index + 1}. ${cert} - Industry-recognized credential\n`;
      });
      
      response += `\n**Practical Learning Approach:**\n`;
      response += `• Build a portfolio with real-world projects\n`;
      response += `• Join ${field.name} communities and forums\n`;
      response += `• Find a mentor in the field\n`;
      response += `• Practice consistently (aim for 1-2 hours daily)\n`;
      break;
      
    case 'careerChange':
      response = `Transitioning to ${field.name} requires strategic planning:\n\n`;
      response += `**Step-by-Step Transition Plan:**\n`;
      response += `1. **Assess Transferable Skills** - Identify how your current experience applies\n`;
      response += `2. **Skill Gap Analysis** - Focus on: ${field.skills.slice(0, 3).join(', ')}\n`;
      response += `3. **Build Portfolio** - Create projects showcasing ${field.name} capabilities\n`;
      response += `4. **Network Strategically** - Connect with ${field.name} professionals\n`;
      response += `5. **Consider Bridge Roles** - Look for positions that combine your background with ${field.name}\n\n`;
      
      response += `**Timeline Expectations:**\n`;
      response += `• 3-6 months: Skill building and portfolio development\n`;
      response += `• 6-12 months: Networking and applying for roles\n`;
      response += `• Entry-level salary range: ${field.salary_range}\n`;
      break;
      
    case 'salaryNegotiation':
      response = `Salary negotiation in ${field.name}:\n\n`;
      response += `**Market Rate:** ${field.salary_range}\n\n`;
      response += `**Negotiation Strategy:**\n`;
      response += `1. **Research Thoroughly** - Use Glassdoor, PayScale, and industry reports\n`;
      response += `2. **Highlight Value** - Emphasize skills in: ${field.skills.slice(0, 3).join(', ')}\n`;
      response += `3. **Consider Total Package** - Benefits, equity, remote work options\n`;
      response += `4. **Timing Matters** - Best negotiated at offer stage, not during interviews\n`;
      response += `5. **Professional Approach** - Be confident but collaborative\n\n`;
      
      response += `**Leverage Points:**\n`;
      field.certifications.slice(0, 2).forEach((cert: string) => {
        response += `• ${cert} certification\n`;
      });
      response += `• Portfolio demonstrating practical skills\n`;
      response += `• Industry connections and recommendations\n`;
      break;
      
    default:
      response = `Here's comprehensive guidance for ${field.name}:\n\n`;
      response += `**Key Information:**\n`;
      response += `• **Salary Range:** ${field.salary_range}\n`;
      response += `• **Career Path:** ${field.growth_path}\n`;
      response += `• **Top Skills:** ${field.skills.slice(0, 4).join(', ')}\n`;
      response += `• **Entry Roles:** ${field.entry_roles.join(', ')}\n\n`;
      
      response += `**Success Factors:**\n`;
      response += `1. Continuous learning and skill development\n`;
      response += `2. Building a strong professional network\n`;
      response += `3. Staying current with industry trends\n`;
      response += `4. Developing both technical and soft skills\n`;
      break;
  }
  
  // Add field-specific resources
  response += `\n**Recommended Resources:**\n`;
  if (field.category === 'Tech') {
    response += `• GitHub for code portfolio and collaboration\n`;
    response += `• Stack Overflow for technical problem-solving\n`;
    response += `• freeCodeCamp, Coursera, or Udemy for skill development\n`;
    response += `• Tech meetups and conferences in your area\n`;
  } else if (field.category === 'Business') {
    response += `• LinkedIn Learning for professional development\n`;
    response += `• Harvard Business Review for industry insights\n`;
    response += `• Industry-specific conferences and networking events\n`;
    response += `• Professional associations in your field\n`;
  } else if (field.category === 'Healthcare') {
    response += `• Professional medical associations\n`;
    response += `• Continuing education programs\n`;
    response += `• Healthcare-specific job boards\n`;
    response += `• Medical journals and publications\n`;
  } else if (field.category === 'Arts') {
    response += `• Behance or Dribbble for portfolio showcase\n`;
    response += `• Adobe Creative Suite or Figma training\n`;
    response += `• Design communities and workshops\n`;
    response += `• Freelance platforms for building experience\n`;
  }
  
  return response;
}

function generateGeneralResponse(intent: string, query: string): string {
  const responses: { [key: string]: string } = {
    gettingStarted: `Starting a new career path requires strategic planning:\n\n1. **Self-Assessment** - Identify your strengths, interests, and values\n2. **Market Research** - Explore growing industries and in-demand skills\n3. **Skill Development** - Invest in learning relevant capabilities\n4. **Network Building** - Connect with professionals in your target field\n5. **Experience Gaining** - Seek internships, projects, or volunteer opportunities\n\n**Additional Tips:**\n• Create a professional LinkedIn profile\n• Build a portfolio showcasing your abilities\n• Consider informational interviews with industry professionals\n• Set realistic timelines and milestones`,
    
    salaryNegotiation: `Effective salary negotiation strategies:\n\n1. **Research Market Rates** - Use Glassdoor, PayScale, and industry reports\n2. **Document Your Value** - Prepare specific examples of your contributions\n3. **Consider Total Compensation** - Benefits, PTO, remote work, professional development\n4. **Practice Your Pitch** - Role-play the conversation beforehand\n5. **Time It Right** - Negotiate after receiving an offer, not during interviews\n\n**Key Phrases to Use:**\n• "Based on my research and experience..."\n• "I'm excited about this opportunity and would like to discuss..."\n• "Given my track record of..."\n• "I'm confident I can deliver significant value through..."`,
    
    workLife: `Achieving better work-life balance:\n\n1. **Set Clear Boundaries** - Define work hours and stick to them\n2. **Prioritize Tasks** - Focus on high-impact activities\n3. **Communicate Needs** - Discuss flexibility options with your manager\n4. **Use Technology Wisely** - Leverage tools for efficiency, not constant connectivity\n5. **Invest in Self-Care** - Regular exercise, hobbies, and relationships\n\n**Remote Work Best Practices:**\n• Create a dedicated workspace\n• Maintain regular schedules\n• Over-communicate with team members\n• Take regular breaks and avoid overworking`,
    
    general: `Here's comprehensive career guidance:\n\n1. **Continuous Learning** - Stay current with industry trends and skills\n2. **Professional Networking** - Build genuine relationships in your field\n3. **Personal Branding** - Develop a consistent professional presence\n4. **Goal Setting** - Create specific, measurable career objectives\n5. **Skill Diversification** - Develop both technical and soft skills\n\n**Career Development Resources:**\n• Professional associations in your industry\n• Industry conferences and workshops\n• Online learning platforms (Coursera, LinkedIn Learning)\n• Mentorship programs and professional coaching`
  };
  
  return responses[intent] || responses.general;
}

// Enhanced AI response generator with deeper analysis
function generateIntelligentResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  const analysis = analyzeQuestion(query);
  
  // If we have field-specific data, use it
  if (analysis.field) {
    return generateContextualResponse(analysis);
  }
  
  // Advanced intent-based response generation
  let response = '';
  
  // Handle "how to" questions comprehensively
  if (lowerQuery.includes('how to') || lowerQuery.includes('how do i') || lowerQuery.includes('how can i')) {
    response = generateHowToResponse(query, analysis.intent);
  }
  // Handle "what" questions
  else if (lowerQuery.includes('what') && (lowerQuery.includes('skills') || lowerQuery.includes('requirements'))) {
    response = generateSkillsResponse(query);
  }
  // Handle comparison questions
  else if (lowerQuery.includes('vs') || lowerQuery.includes('versus') || lowerQuery.includes('compared to')) {
    response = generateComparisonResponse(query);
  }
  // Handle "why" questions
  else if (lowerQuery.includes('why')) {
    response = generateWhyResponse(query);
  }
  // Handle timeline/duration questions
  else if (lowerQuery.includes('how long') || lowerQuery.includes('time') || lowerQuery.includes('duration')) {
    response = generateTimelineResponse(query);
  }
  // Handle best practices questions
  else if (lowerQuery.includes('best') || lowerQuery.includes('tips') || lowerQuery.includes('advice')) {
    response = generateBestPracticesResponse(query);
  }
  // Default comprehensive response
  else {
    response = generateContextualResponse(analysis);
  }
  
  return response || generateFallbackResponse(query);
}

function generateHowToResponse(query: string, intent: string): string {
  const topic = query.replace(/how (to|do i|can i)/gi, '').trim().replace(/\?/g, '');
  
  return `Here's a comprehensive guide to ${topic}:

**Step-by-Step Approach:**

1. **Research and Planning**
   • Understand the requirements and expectations in this area
   • Identify what skills and knowledge you currently have
   • Set realistic, measurable goals for your journey

2. **Skill Development**
   • Learn the fundamentals through online courses, books, or formal education
   • Practice regularly with hands-on projects and real-world applications
   • Seek feedback from mentors or experienced professionals in the field

3. **Build Your Portfolio/Experience**
   • Create tangible examples that demonstrate your capabilities
   • Start with small projects and gradually increase complexity
   • Document your work and learning process

4. **Network and Connect**
   • Join professional communities, forums, and social media groups
   • Attend industry events, workshops, and meetups
   • Reach out to people in your target field for informational interviews

5. **Apply and Iterate**
   • Look for opportunities to put your skills into practice
   • Be prepared for setbacks and use them as learning experiences
   • Continuously refine your approach based on feedback and results

**Key Success Factors:**
• Consistency and dedication over time
• Willingness to learn from mistakes and failures
• Building a support network of peers and mentors
• Staying current with industry trends and best practices
• Balancing theory with practical application

**Resources to Explore:**
• Online learning platforms (Coursera, Udemy, LinkedIn Learning)
• Professional certifications relevant to your goal
• Industry-specific communities and forums
• Books and podcasts from experts in the field
• Local meetups and professional organizations`;
}

function generateSkillsResponse(query: string): string {
  return `To excel in this area, you'll need to develop a well-rounded skill set:

**Technical/Hard Skills:**
• **Core Competencies** - Master the fundamental tools and technologies specific to this field
• **Analytical Abilities** - Develop problem-solving and critical thinking capabilities
• **Tool Proficiency** - Learn industry-standard software and platforms
• **Data Literacy** - Understand how to work with data and metrics relevant to your role

**Professional/Soft Skills:**
• **Communication** - Clearly articulate ideas to both technical and non-technical audiences
• **Collaboration** - Work effectively in team settings and across departments
• **Adaptability** - Stay flexible and embrace change in fast-moving environments
• **Time Management** - Prioritize tasks and meet deadlines consistently

**Learning Pathway:**

1. **Foundation Phase (Months 1-3)**
   • Focus on basic concepts and terminology
   • Complete introductory courses or tutorials
   • Join beginner-friendly communities

2. **Development Phase (Months 4-8)**
   • Dive deeper into specialized areas
   • Work on guided projects with increasing complexity
   • Seek mentorship and feedback

3. **Mastery Phase (Months 9-12)**
   • Build independent projects from scratch
   • Contribute to real-world applications
   • Begin teaching or mentoring others

**Skill Validation:**
• Industry certifications that demonstrate competency
• Portfolio projects showcasing your abilities
• Contributions to open source or community projects
• Positive testimonials and recommendations
• Continuous learning and professional development

**Important Note:**
Skills are developed over time through consistent practice and application. Focus on depth in your core competencies while maintaining breadth across related areas. The most successful professionals combine strong technical skills with excellent communication and interpersonal abilities.`;
}

function generateComparisonResponse(query: string): string {
  return `Let me help you understand the differences and make an informed decision:

**Key Comparison Factors:**

**Career Path & Growth:**
• Different trajectories and advancement opportunities
• Long-term potential and market demand
• Typical career progression timelines
• Exit opportunities and pivots

**Skills & Requirements:**
• Educational background needed
• Technical vs. soft skill emphasis
• Certification or licensing requirements
• Learning curve and development time

**Work Environment:**
• Typical day-to-day responsibilities
• Work-life balance considerations
• Remote work possibilities
• Team structure and collaboration style

**Compensation & Benefits:**
• Salary ranges at different experience levels
• Total compensation packages
• Job security and market stability
• Geographic location impact

**Making Your Decision:**

1. **Assess Your Priorities**
   • What matters most to you? (money, impact, creativity, stability)
   • What are your natural strengths and interests?
   • What lifestyle do you want to maintain?

2. **Research Thoroughly**
   • Read job descriptions for both paths
   • Connect with professionals in each field
   • Review salary data and market trends
   • Consider long-term industry outlook

3. **Test the Waters**
   • Try relevant side projects in each area
   • Take online courses to sample the work
   • Attend industry events for both fields
   • Seek informational interviews

4. **Consider Hybrid Opportunities**
   • Some roles combine aspects of both
   • You might be able to transition between them
   • Skills from one often transfer to the other

**Remember:** There's rarely a "wrong" choice - many skills are transferable, and career paths are increasingly non-linear. You can always pivot or combine approaches as you grow professionally.`;
}

function generateWhyResponse(query: string): string {
  return `This is an excellent question that deserves a thoughtful answer:

**Primary Reasons:**

1. **Market Demand & Opportunity**
   • Growing industries create more positions and opportunities
   • Strong demand typically leads to better compensation
   • Job security increases in high-demand fields
   • More options for specialization and advancement

2. **Skills Development & Growth**
   • Continuous learning keeps you competitive and engaged
   • New skills open doors to different career opportunities
   • Professional development increases your market value
   • Staying current prevents skill obsolescence

3. **Career Satisfaction & Impact**
   • Alignment with personal values drives fulfillment
   • Seeing tangible results from your work increases motivation
   • Making a positive impact provides purpose
   • Work-life balance affects overall life satisfaction

4. **Financial Considerations**
   • Compensation supports lifestyle goals and financial security
   • Total package includes benefits, equity, bonuses
   • Long-term earning potential varies by field
   • Market rates reflect supply and demand dynamics

**Strategic Perspective:**

**Short-Term Benefits:**
• Immediate skill acquisition and knowledge gain
• Expanded professional network
• Enhanced resume and marketability
• New opportunities and experiences

**Long-Term Impact:**
• Compound growth in expertise and reputation
• Increased career optionality and flexibility
• Higher earning potential over time
• Greater influence and leadership opportunities

**Important Considerations:**

• **Personal Fit** - Does this align with your strengths and interests?
• **Market Reality** - What do current trends and data show?
• **Timing** - Is now the right moment for this move?
• **Resources** - Do you have the time, money, and support needed?
• **Alternative Paths** - What other options should you consider?

**Bottom Line:**
The best career decisions balance personal passion with market realities, short-term needs with long-term goals, and financial considerations with quality of life. Take time to reflect on what truly matters to you while staying informed about industry trends and opportunities.`;
}

function generateTimelineResponse(query: string): string {
  return `Let me provide realistic timeline expectations:

**Typical Timeline Breakdown:**

**Phase 1: Foundation (3-6 months)**
• Learning basic concepts and terminology
• Completing introductory courses or training
• Building fundamental skills
• Networking and research
• Expected time investment: 10-20 hours/week

**Phase 2: Skill Development (6-12 months)**
• Deepening expertise in core areas
• Working on practice projects
• Earning relevant certifications
• Building a portfolio or body of work
• Expected time investment: 15-25 hours/week

**Phase 3: Job Search & Transition (3-6 months)**
• Refining resume and online presence
• Applying to positions
• Interviewing and negotiating
• Potentially continuing education
• Expected time investment: 20-30 hours/week

**Total Timeline: 12-24 months for significant career transition**

**Factors That Affect Duration:**

**Accelerating Factors:**
• Prior relevant experience or education
• Intensive bootcamp or full-time study
• Strong professional network
• High market demand in the field
• Financial resources for full-time focus

**Extending Factors:**
• Learning while employed full-time
• Need for formal degree or certification
• Competitive entry requirements
• Geographic or personal constraints
• Economic conditions and hiring cycles

**Timeline Optimization Strategies:**

1. **Set Clear Milestones**
   • Break down journey into measurable steps
   • Celebrate progress at each checkpoint
   • Adjust timeline based on real progress

2. **Maximize Learning Efficiency**
   • Focus on high-impact skills first
   • Use active learning techniques
   • Seek feedback and mentorship early
   • Apply knowledge through projects

3. **Start Applying Earlier Than You Think**
   • You don't need to know everything before applying
   • Interview experience is valuable learning
   • Some companies provide on-the-job training
   • Entry-level roles expect some learning curve

**Realistic Expectations:**
• Everyone's journey is unique - don't compare too much
• Progress isn't always linear - expect plateaus
• Part-time learning typically takes 2-3x longer
• Quality of learning matters more than speed
• Networking and soft skills take time to develop

**Remember:** Rushing through learning can lead to knowledge gaps, while moving too slowly can lead to frustration. Find a sustainable pace that allows for deep learning while maintaining momentum.`;
}

function generateBestPracticesResponse(query: string): string {
  return `Here are proven best practices and expert tips:

**Core Best Practices:**

**1. Strategic Approach**
• Set specific, measurable goals with clear timelines
• Research industry standards and requirements thoroughly
• Create a structured learning or development plan
• Track progress and adjust strategy as needed

**2. Skill Development**
• Focus on fundamentals before advanced topics
• Practice consistently rather than in sporadic bursts
• Learn by doing through real projects, not just theory
• Seek diverse learning sources (courses, books, mentors, practice)

**3. Professional Networking**
• Build genuine relationships, don't just collect contacts
• Provide value to others before asking for help
• Maintain active presence on professional platforms
• Attend industry events and engage in communities

**4. Personal Branding**
• Create a consistent professional presence across platforms
• Share insights and learnings publicly
• Build a portfolio showcasing your best work
• Cultivate a reputation for reliability and expertise

**Expert Tips from Successful Professionals:**

**Career Growth:**
• "Don't wait for permission - start the projects you want to work on"
• "Your network is your net worth - invest in relationships"
• "Learn in public - teaching others reinforces your knowledge"
• "Focus on impact, not just activity"

**Skill Mastery:**
• "Mastery comes from deliberate practice, not just experience"
• "Build something you can show, not just talk about"
• "Learn one thing deeply before adding breadth"
• "Real understanding comes from teaching others"

**Job Search:**
• "Apply even if you don't meet 100% of requirements"
• "Customize every application to show genuine interest"
• "Follow up professionally and persistently"
• "Treat every interaction as a potential opportunity"

**Work Performance:**
• "Underpromise and overdeliver consistently"
• "Communicate proactively, especially about challenges"
• "Document your wins for performance reviews"
• "Be the person who makes others' jobs easier"

**Common Pitfalls to Avoid:**

❌ Tutorial hell - watching tutorials without building projects
❌ Perfectionism - waiting to be "ready" before starting
❌ Isolation - trying to do everything alone
❌ Comparison - measuring your chapter 1 against others' chapter 20
❌ Scattered focus - jumping between too many topics

✅ Do This Instead:
• Build imperfect projects and iterate
• Start before you feel ready and learn as you go
• Join communities and find accountability partners
• Focus on your own growth trajectory
• Master core skills before adding new ones

**Action Items:**

**This Week:**
• Research 3-5 top practitioners in your field
• Join one active professional community
• Start one small project you can complete
• Reach out to one person for informational interview

**This Month:**
• Complete one course or certification module
• Publish one piece of content or project
• Attend one industry event or meetup
• Set up tracking system for your goals

**This Quarter:**
• Build 2-3 portfolio projects
• Establish mentorship relationship
• Contribute to community or open source
• Review and adjust your strategy

**Long-term Success Principles:**
• Consistency beats intensity - sustainable habits win
• Quality relationships > quantity of contacts
• Depth of knowledge > breadth in early stages
• Continuous learning is non-negotiable
• Help others succeed to accelerate your own growth`;
}

function generateFallbackResponse(query: string): string {
  return `Thank you for your question about "${query}". Let me provide comprehensive career guidance:

**Understanding Your Question:**

I'll help you explore this topic from multiple angles to give you a well-rounded perspective.

**Key Considerations:**

**1. Context & Background**
• Every career journey is unique and depends on individual circumstances
• Market conditions and industry trends play a significant role
• Your existing skills and experience create different starting points
• Geographic location and personal constraints affect options

**2. Practical Steps Forward**

**Research Phase:**
• Identify the specific area or role you're interested in
• Study job descriptions to understand requirements
• Research salary ranges and market demand
• Connect with professionals in the field

**Preparation Phase:**
• Assess your current skill gaps
• Create a learning plan with specific milestones
• Allocate time and resources for development
• Build a portfolio or evidence of capabilities

**Execution Phase:**
• Apply knowledge through real projects
• Network actively in your target industry
• Seek feedback and iterate on your approach
• Look for opportunities to gain experience

**3. Success Factors**

**Essential Skills:**
• Core technical or functional expertise in your domain
• Strong communication and interpersonal abilities
• Problem-solving and analytical thinking
• Adaptability and continuous learning mindset
• Professional ethics and reliability

**Career Development:**
• Set clear, specific goals with timelines
• Track your progress and celebrate milestones
• Seek mentorship and guidance
• Build relationships, not just contacts
• Stay current with industry developments

**4. Resources & Support**

**Learning Resources:**
• Online platforms: Coursera, Udemy, LinkedIn Learning
• Industry certifications and professional credentials
• Books, podcasts, and expert content
• Bootcamps or formal education programs

**Community & Networking:**
• LinkedIn for professional connections
• Industry-specific forums and communities
• Local meetups and professional organizations
• Conferences and workshops

**5. Timeline Expectations**

**Short Term (3-6 months):**
• Foundation building and initial learning
• Networking and relationship development
• Small projects and skill validation

**Medium Term (6-12 months):**
• Deeper expertise development
• Portfolio building and practical experience
• Active job searching or opportunity creation

**Long Term (1-2+ years):**
• Career establishment and growth
• Specialization and expertise recognition
• Leadership and advancement opportunities

**Important Reminders:**

• Progress isn't always linear - expect setbacks
• Everyone's journey is different - avoid comparison
• Quality matters more than speed
• Build sustainable habits for long-term success
• Seek help and mentorship along the way

**Next Steps:**

1. Clarify your specific goals and motivations
2. Research thoroughly and gather information
3. Create an action plan with clear milestones
4. Start taking small steps immediately
5. Build accountability through community or mentors

Would you like more specific guidance on any particular aspect? Feel free to ask more detailed questions about:
• Specific skills to develop
• Career paths and opportunities
• Salary expectations and negotiation
• Educational requirements
• Industry trends and outlook

Remember: The best time to start is now. Take action, learn continuously, and stay persistent in pursuing your career goals.`;
}

export function generateAIResponse(query: string): CareerQuestion {
  const category = detectCategory(query);
  const answer = generateIntelligentResponse(query);
  
  return {
    id: Date.now(),
    question: query,
    answer: answer.trim(),
    category,
    isAiGenerated: true
  };
}

// Enhanced search that combines existing questions with AI responses
// Extended sample questions for a more comprehensive experience
export const extendedSampleQuestions: CareerQuestion[] = [
  // Tech questions
  {
    id: 101,
    question: "How do I become a machine learning engineer?",
    answer: "Becoming a machine learning engineer requires a strong foundation in programming, mathematics, and data science. Start by mastering Python and key libraries like scikit-learn, TensorFlow, and PyTorch. Develop expertise in statistics, linear algebra, and calculus. Build projects showcasing different ML techniques like supervised learning, unsupervised learning, and deep learning. Consider pursuing a degree in computer science, mathematics, or a related field, or complete specialized ML bootcamps. Gain experience with cloud platforms (AWS, GCP, Azure) and MLOps tools. The typical salary range is $120,000-$180,000, with strong growth prospects in AI-driven industries.",
    category: "Tech",
    isAiGenerated: false
  },
  {
    id: 102,
    question: "What programming languages should I learn first?",
    answer: "For beginners, Python is often the best first language due to its readable syntax and versatility. It's widely used in web development, data science, automation, and AI. JavaScript is essential for web development and increasingly popular for full-stack development. If you're interested in mobile app development, consider Swift (iOS) or Kotlin (Android). For systems programming or game development, C++ or Rust are valuable. Java remains important for enterprise applications. Focus on mastering one language thoroughly before moving to others - the programming concepts you learn will transfer across languages.",
    category: "Tech",
    isAiGenerated: false
  },
  {
    id: 103,
    question: "How to get into DevOps engineering?",
    answer: "DevOps engineering combines development and operations to streamline software delivery. Start by learning Linux/Unix fundamentals and command-line tools. Master version control with Git and understand CI/CD pipelines using tools like Jenkins, GitLab CI, or GitHub Actions. Learn containerization with Docker and orchestration with Kubernetes. Gain expertise in cloud platforms (AWS, Azure, GCP) and infrastructure as code tools like Terraform or Ansible. Develop scripting skills in Python, Bash, or PowerShell. Understanding monitoring and logging tools (Prometheus, ELK stack) is crucial. Entry-level positions start around $70,000-$100,000, with senior roles reaching $150,000+.",
    category: "Tech",
    isAiGenerated: false
  },
  
  // Business questions
  {
    id: 201,
    question: "How to become a product manager?",
    answer: "Product management requires a unique blend of technical understanding, business acumen, and user empathy. Start by learning product management frameworks like Agile, Scrum, and Design Thinking. Develop skills in market research, user experience design, and data analysis. Master tools like Jira, Figma, and analytics platforms. Build a portfolio showcasing product case studies, even if they're personal projects. Consider pursuing an MBA or product management certification. Transition paths include marketing, engineering, consulting, or business analysis roles. Salary ranges from $90,000-$180,000 depending on experience and company size. The role offers excellent growth potential into senior leadership positions.",
    category: "Business",
    isAiGenerated: false
  },
  {
    id: 202,
    question: "What skills do data analysts need?",
    answer: "Data analysts need strong analytical thinking and proficiency in SQL for database querying. Excel mastery is essential for data manipulation and basic analysis. Learn statistical concepts and data visualization tools like Tableau, Power BI, or Python libraries (Matplotlib, Seaborn). Python or R programming skills are increasingly valuable for advanced analysis. Develop business acumen to translate data insights into actionable recommendations. Strong communication skills are crucial for presenting findings to stakeholders. Understanding of A/B testing and experimental design is beneficial. Entry-level positions start around $55,000-$75,000, with senior analysts earning $80,000-$120,000.",
    category: "Business",
    isAiGenerated: false
  },
  
  // Healthcare questions
  {
    id: 301,
    question: "How to become a physical therapist?",
    answer: "Becoming a physical therapist requires completing a Doctor of Physical Therapy (DPT) program, which typically takes 3 years after a bachelor's degree. Prerequisite courses include anatomy, physiology, biology, chemistry, and physics. Gain experience through volunteering or working in healthcare settings. The profession requires strong interpersonal skills, physical stamina, and problem-solving abilities. After graduation, pass the National Physical Therapy Examination (NPTE) to obtain licensure. Many states require continuing education for license renewal. Specializations include orthopedics, neurology, pediatrics, and sports medicine. Median salary is around $95,000, with excellent job growth prospects due to an aging population.",
    category: "Healthcare",
    isAiGenerated: false
  },
  {
    id: 302,
    question: "What does a medical scribe do?",
    answer: "Medical scribes assist physicians by documenting patient encounters in electronic health records (EHR) in real-time. They record medical histories, physical exam findings, diagnoses, and treatment plans while the physician focuses on patient care. Scribes need strong typing skills (60+ WPM), knowledge of medical terminology, and familiarity with EHR systems like Epic or Cerner. The role requires attention to detail, ability to work under pressure, and excellent listening skills. Many positions offer on-the-job training, though medical terminology or healthcare administration courses are beneficial. Entry-level positions start around $30,000-$40,000, with potential for growth into healthcare administration or clinical roles.",
    category: "Healthcare",
    isAiGenerated: false
  },
  
  // Arts questions
  {
    id: 401,
    question: "How to build a graphic design portfolio?",
    answer: "A strong graphic design portfolio should showcase your best work across different mediums and styles. Include 10-15 pieces that demonstrate various skills: branding, typography, web design, print design, and illustration. For each project, provide context about the client, objectives, and your design process. Use high-quality images and ensure consistent presentation. Create both a physical portfolio and an online version using platforms like Behance, Dribbble, or a personal website. Include personal projects if you lack client work - redesign existing brands, create fictional campaigns, or participate in design challenges. Update regularly and tailor your portfolio to specific job applications by highlighting relevant work.",
    category: "Arts",
    isAiGenerated: false
  },
  {
    id: 402,
    question: "What's the difference between UX and UI design?",
    answer: "UX (User Experience) design focuses on the overall experience and journey a user has with a product, while UI (User Interface) design concentrates on the visual and interactive elements. UX designers conduct user research, create personas, design wireframes and user flows, and test usability. They're concerned with how the product works and feels. UI designers focus on how the product looks - typography, color schemes, buttons, icons, and visual hierarchy. UX designers typically work earlier in the process, defining the structure and functionality, while UI designers polish the visual design. Many professionals work in both areas, especially at smaller companies. Both roles require creativity, problem-solving skills, and user empathy.",
    category: "Arts",
    isAiGenerated: false
  },
];

export function searchCareerQuestions(query: string, existingQuestions: CareerQuestion[]): CareerQuestion[] {
  if (!query.trim()) return existingQuestions;
  
  const lowerQuery = query.toLowerCase();
  
  // First, check if we have existing questions that match
  const matchingQuestions = existingQuestions.filter(q => 
    q.question.toLowerCase().includes(lowerQuery) ||
    q.answer.toLowerCase().includes(lowerQuery) ||
    q.category.toLowerCase().includes(lowerQuery)
  );
  
  // If we have matching questions, return them with some AI-generated variety
  if (matchingQuestions.length > 0) {
    // If query is topic-specific, also generate an AI response for more comprehensive results
    if (lowerQuery.includes('topic:') || matchingQuestions.length < 3) {
      const aiResponse = generateAIResponse(query);
      return [aiResponse, ...matchingQuestions];
    }
    return matchingQuestions;
  }
  
  // If no existing questions match, generate an AI response
  const aiResponse = generateAIResponse(query);
  return [aiResponse];
}