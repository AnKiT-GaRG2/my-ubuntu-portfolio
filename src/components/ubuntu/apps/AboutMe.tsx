import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Globe, Code, Briefcase, GraduationCap, Download, Star, Award, BookOpen, Lightbulb, Rocket, Sparkles, Zap, Database, Brain, Users, Terminal, FolderGit2, ExternalLink, GitBranch } from 'lucide-react';

export function AboutMe() {
  const [activeTab, setActiveTab] = useState('about');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const tabs = [
    { id: 'about', label: 'About Me', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', icon: BookOpen },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const projects = [
    {
      title: 'Ubuntu Portfolio Website',
      description: 'A fully functional Ubuntu-themed portfolio website built with React and TypeScript, featuring interactive desktop environment, window management, and custom applications.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/AnKiT-GaRG2/my-ubuntu-portfolio',
      live: '#',
      category: 'Web Development',
      image: '🖥️',
      featured: true,
    },
    {
      title: 'Forex Prediction App',
      description: 'Machine learning application for forex market prediction using advanced algorithms and real-time data analysis to forecast currency exchange rates.',
      technologies: ['Python', 'Machine Learning', 'TensorFlow', 'Flask', 'Pandas'],
      github: 'https://github.com/AnKiT-GaRG2/Forex-Prediction-App',
      live: 'https://forex-prediction-app.onrender.com/',
      category: 'Machine Learning',
      image: '💹',
      featured: true,
    },
    {
      title: 'Loan Manager',
      description: 'Comprehensive loan management system with features for tracking loans, calculating interest, managing payments, and generating reports.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
      github: 'https://github.com/AnKiT-GaRG2/LoanManager',
      live: '#',
      category: 'Full Stack',
      image: '�',
      featured: true,
    },
    {
      title: 'Code Reviewer',
      description: 'AI-powered code review tool that analyzes code quality, suggests improvements, detects bugs, and provides best practice recommendations.',
      technologies: ['Python', 'AI/ML', 'NLP', 'React', 'FastAPI'],
      github: 'https://github.com/AnKiT-GaRG2/Code-Reviewer',
      live: 'https://code-reviewer-frontend-mu.vercel.app/',
      category: 'AI/ML',
      image: '🔍',
      featured: true,
    },
    {
      title: 'Risk Management System',
      description: 'Enterprise-level risk management platform for identifying, assessing, and mitigating business risks with data-driven insights and reporting.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Data Analytics'],
      github: 'https://github.com/AnKiT-GaRG2/Risk-Management-System',
      live: 'https://risk-management-system-git-main-ankit-gargs-projects-9478362f.vercel.app/login',
      category: 'Enterprise',
      image: '⚠️',
      featured: true,
    },
    {
      title: 'Movie Recommender System',
      description: 'Intelligent movie recommendation system using collaborative filtering and content-based algorithms to suggest personalized movie choices.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'Streamlit'],
      github: 'https://github.com/AnKiT-GaRG2/Movie-recommender-',
      live: '#',
      category: 'Machine Learning',
      image: '🎬',
      featured: false,
    },
    {
      title: 'AFK Guardian System',
      description: 'Automated system to detect and manage AFK (Away From Keyboard) users in gaming environments using computer vision and behavior analysis.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Real-time Processing'],
      github: 'https://github.com/AnKiT-GaRG2/RoboSaga_Hackathon',
      live: '#',
      category: 'Computer Vision',
      image: '🎮',
      featured: false,
    },
    {
      title: 'Cat-Dog Detection',
      description: 'Deep learning model for binary image classification to accurately identify and distinguish between cats and dogs using CNN architecture.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Deep Learning'],
      github: 'https://github.com/AnKiT-GaRG2/cat-dog-detection',
      live: '#',
      category: 'Deep Learning',
      image: '🐱�',
      featured: false,
    },
    {
      title: 'PDF Outline Extraction Tool',
      description: 'Automated tool for extracting and analyzing document structure and outlines from PDF files with high accuracy and formatting preservation.',
      technologies: ['Python', 'PyPDF2', 'NLP', 'Document Processing', 'Text Analysis'],
      github: 'https://github.com/AnKiT-GaRG2/challenge-1a',
      live: '#',
      category: 'Data Processing',


      image: '',
      featured: false,
    },
  ];

  const skillsData = {
    languages: {
      title: 'Programming Languages',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'C', level: 80 },
        { name: 'C++', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 60 },
        { name: 'SQL', level: 75 },
      ],
    },
    web: {
      title: 'Web Technologies',
      icon: '🌐',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'Node.js', level: 90 },
        { name: 'Next.js', level: 80 },
        { name: 'Express.js', level: 85 },
        { name: 'Bootstrap', level: 75 },
        { name: 'Tailwind CSS', level: 75 },
        { name: 'MongoDB', level: 75 },
        { name: 'REST APIs', level: 85 },
      ],
    },
    ml: {
      title: 'ML/Data Tools',
      icon: '🤖',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'NumPy', level: 95 },
        { name: 'Pandas', level: 95 },
        { name: 'Scikit-learn', level: 85 },
        { name: 'TensorFlow', level: 80 },
        { name: 'PyTorch', level: 80 },
        { name: 'OpenCV', level: 90 },
        { name: 'Seaborn', level: 88 },
        { name: 'Matplotlib', level: 90 },
        { name: 'MS Excel', level: 65 },
        { name: 'Power BI', level: 30 },
      ],
    },
    fundamentals: {
      title: 'CS Fundamentals',
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Data Structures & Algorithms', level: 90 },
        { name: 'Computer Networks', level: 85 },
        { name: 'OOPs', level: 92 },
        { name: 'GitHub', level: 95 },
        { name: 'DBMS', level: 88 },
        { name: 'Operating Systems', level: 85 },
        { name: 'NLP', level: 80 },
      ],
    },
    soft: {
      title: 'Soft Skills',
      icon: '🎯',
      color: 'from-yellow-500 to-amber-500',
      skills: [
        { name: 'Collaborative', level: 95 },
        { name: 'Leadership', level: 90 },
        { name: 'Management', level: 88 },
        { name: 'Teamwork', level: 95 },
        { name: 'Critical Thinking', level: 92 },
        { name: 'Problem Solving', level: 95 },
      ],
    },
  };

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Birla Institute Of Technology',
    year: '2023 - Present',
    gpa: '8.2/10',
    description:
      'Strong foundation in software engineering, data structures & algorithms, operating systems, databases, and modern web technologies, with hands-on project and problem-solving experience.',
  },
  {
    degree: 'Senior Secondary (12th)',
    institution: 'Grizzly',
    year: '2020 - 2022',
    gpa: '87.6%',
    description:
      'Completed higher secondary education in Science stream with emphasis on Mathematics, Computer Science, and analytical problem-solving skills.',
  },
  {
    degree: 'Secondary (10th)',
    institution: 'The Himalayan Public School',
    year: '2018 - 2020',
    gpa: '91.6%',
    description:
      'Built a strong academic foundation with focus on Mathematics, Science, and logical reasoning, fostering early interest in technology and computing.',
  },
];


  const reviews = [
    {
      name: 'John Doe',
      role: 'Senior Developer at Tech Corp',
      rating: 5,
      comment: 'Excellent developer with great problem-solving skills. Delivered projects on time and exceeded expectations.',
      avatar: '👨‍💼',
    },
    {
      name: 'Sarah Smith',
      role: 'Project Manager at StartupXYZ',
      rating: 5,
      comment: 'Amazing team player! Great communication skills and always willing to help others. Highly recommended!',
      avatar: '👩‍💼',
    },
    {
      name: 'Mike Johnson',
      role: 'CTO at InnovateLabs',
      rating: 5,
      comment: 'Outstanding technical skills and creativity. Brought innovative solutions to complex challenges.',
      avatar: '👨‍💻',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-muted/30 rounded-lg border border-border">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg hover:scale-105 transition-transform duration-300">
                <img 
                  src="profilepic.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">Ankit Garg</h1>
                <p className="text-xl text-primary mb-3">ML Enthusiast + Full Stack Developer </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>India</span>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <a href="https://github.com/AnKiT-GaRG2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="mailto:anki88520@gmail.com" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                About Me
              </h2>
              
              <p className="text-foreground/80 leading-relaxed mb-4">
                Passionate Full Stack Developer with expertise in building modern web applications. 
                I love creating elegant solutions to complex problems and contributing to open source projects.
                With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean, efficient code.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, Listening Music, 
                or Travelling. I believe in continuous learning and staying 
                updated with the latest trends.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
                <Code className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
                <Briefcase className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-primary" />
              Educational Background
            </h2>
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:translate-x-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-primary mt-1">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {edu.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-foreground/80 font-medium">GPA: {edu.gpa}</span>
                </div>
                <p className="text-foreground/70">{edu.description}</p>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Technical Expertise
                <Sparkles className="w-8 h-8 text-primary" />
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Comprehensive skill set across multiple domains with hands-on experience in modern technologies
              </p>
            </div>
            
            {Object.entries(skillsData).map(([category, data], index) => (
              <div 
                key={category}
                className="p-6 bg-gradient-to-br from-muted/10 to-muted/5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">{data.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{data.title}</h3>
                    <div className={`h-1 w-24 bg-gradient-to-r ${data.color} rounded-full mt-1`}></div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {data.skills.length} skills
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.skills.map((skill, idx) => (
                    <div
                      key={skill.name}
                      className="group relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ animationDelay: `${(index * 100) + (idx * 30)}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className={`text-xs font-semibold transition-all duration-300 ${
                          hoveredSkill === skill.name 
                            ? 'text-primary scale-110' 
                            : 'text-muted-foreground'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${data.color} rounded-full transition-all duration-700 ease-out ${
                            hoveredSkill === skill.name ? 'shadow-lg' : ''
                          }`}
                          style={{
                            width: hoveredSkill === skill.name ? '100%' : `${skill.level}%`,
                            transition: 'width 0.7s ease-out, box-shadow 0.3s ease'
                          }}
                        ></div>
                      </div>
                      {hoveredSkill === skill.name && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Category Stats */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Average Proficiency: {Math.round(data.skills.reduce((acc, s) => acc + s.level, 0) / data.skills.length)}%</span>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Expert Level
                  </div>
                </div>
              </div>
            ))}

            {/* Overall Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-all duration-300">
                <Terminal className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <div className="text-3xl font-bold text-foreground mb-1">40+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-all duration-300">
                <Brain className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <div className="text-3xl font-bold text-foreground mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Domains</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:scale-105 transition-all duration-300">
                <Database className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <div className="text-3xl font-bold text-foreground mb-1">90%</div>
                <div className="text-sm text-muted-foreground">Avg Expertise</div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <FolderGit2 className="w-8 h-8 text-primary" />
                Featured Projects
                <Rocket className="w-8 h-8 text-primary" />
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Showcasing my best work across web development, machine learning, and data science
              </p>
            </div>

            {/* Featured Projects */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                Featured Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.filter(p => p.featured).map((project, index) => (
                  <div
                    key={project.title}
                    className="group p-6 bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted/40 text-foreground/80 rounded text-xs font-medium hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-muted/40 hover:bg-primary/20 text-foreground hover:text-primary rounded-lg transition-all hover:scale-105 text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all hover:scale-105 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Projects */}
            <div className="space-y-6 mt-8">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-primary" />
                More Projects
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {projects.filter(p => !p.featured).map((project, index) => (
                  <div
                    key={project.title}
                    className="group p-5 bg-muted/10 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:bg-muted/20"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h4>
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-muted/40 text-foreground/70 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-muted/40 hover:bg-primary/20 text-foreground hover:text-primary rounded-lg transition-all hover:scale-105 text-sm font-medium"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-all duration-300">
                <FolderGit2 className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <div className="text-3xl font-bold text-foreground mb-1">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:scale-105 transition-all duration-300">
                <Star className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <div className="text-3xl font-bold text-foreground mb-1">{projects.filter(p => p.featured).length}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-all duration-300">
                <Code className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {[...new Set(projects.flatMap(p => p.technologies))].length}
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center p-12 bg-muted/20 rounded-lg border border-border">
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Download className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Download My Resume</h2>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                Get a detailed overview of my professional experience, skills, and achievements.
              </p>
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg">
                Download PDF Resume
              </button>
            </div>

            {/* Experience Preview */}
            <div className="p-6 bg-muted/20 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Professional Experience</h3>
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-primary">
                  <h4 className="text-lg font-medium text-foreground">Full Stack Developer</h4>
                  <p className="text-primary text-sm">Company Name • 2022 - Present</p>
                  <p className="text-foreground/70 mt-2">
                    Developing and maintaining web applications using React, Node.js, and PostgreSQL. 
                    Led multiple projects from conception to deployment.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-muted-foreground">
                  <h4 className="text-lg font-medium text-foreground">Frontend Developer</h4>
                  <p className="text-muted-foreground text-sm">Previous Company • 2021 - 2022</p>
                  <p className="text-foreground/70 mt-2">
                    Built responsive user interfaces and improved application performance by 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-7 h-7 text-primary" />
              What People Say
            </h2>
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-ubuntu-window overflow-hidden flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-border bg-muted/10 px-6 pt-4 flex-shrink-0">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-ubuntu-window text-primary border-t-2 border-x-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
