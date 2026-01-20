import { Star, FolderGit2, Rocket, GitBranch, Github, ExternalLink, Code } from 'lucide-react';

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
    image: '📈',
    featured: true,
  },
  {
    title: 'Loan Manager',
    description: 'Comprehensive loan management system with features for tracking loans, calculating interest, managing payments, and generating reports.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
    github: 'https://github.com/AnKiT-GaRG2/LoanManager',
    live: '#',
    category: 'Full Stack',
    image: '💵',
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
    description: 'Automated system to detect and manage AFK (Away From Keyboard) users in Working environments using computer vision and behavior analysis.',
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
    image: '🐱🐶',
    featured: false,
  },
  {
    title: 'PDF Outline Extraction Tool',
    description: 'Automated tool for extracting and analyzing document structure and outlines from PDF files with high accuracy and formatting preservation.',
    technologies: ['Python', 'PyPDF2', 'NLP', 'Document Processing', 'Text Analysis'],
    github: 'https://github.com/AnKiT-GaRG2/challenge-1a',
    live: '#',
    category: 'Data Processing',
    image: '📝',
    featured: false,
  },
];

export function ProjectsSection() {
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
}
