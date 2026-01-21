import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { TerminalLine } from '@/types/ubuntu';

const COMMANDS = {
  help: `Available commands:
  about       - Display information about me
  skills      - List my technical skills
  projects    - Show my projects
  education   - View my education
  contact     - Display contact information
  social      - Show social media links
  stats       - View coding statistics
  reviews     - Show all reviews
  add-review  - Open Add Review application
  clear       - Clear the terminal
  welcome     - Display welcome message
  echo        - Echo a message
  date        - Show current date and time
  whoami      - Display current user
  pwd         - Print working directory
  ls          - List directory contents
  cd          - Change directory
  cat         - Display file contents
  history     - Show command history
  mkdir       - Create a new directory
  code        - Open VS Code
  chrome      - Open Chrome browser
  open        - Open an application
  sudo        - Try using sudo (just for fun)
  exit        - Close terminal (use window controls)`,

  about: `
──────────────────────────────────────────────────────────────
                     ANKIT GARG                               
──────────────────────────────────────────────────────────────
  🧑‍💻 ML Enthusiast + Full Stack Developer                     
  📍 Location: India                                          
                                                              
  Passionate Full Stack Developer with expertise in building  
  modern web applications. I love creating elegant solutions  
  to complex problems and contributing to open source         
  projects. With a strong foundation in both frontend and     
  backend technologies, I bring ideas to life through clean,  
  efficient code.                                             
                                                              
  When I'm not coding, you can find me exploring new          
  technologies, Listening Music, or Travelling. I believe in  
  continuous learning and staying updated with the latest     
  trends.                                                     
                                                              
  📊 Quick Stats:                                             
  ├── 10+ Projects Completed                                  
  ├── 6+ Hackathons Participated                              
  └── 8+ Certifications Earned                                
╰──────────────────────────────────────────────────────────────╯`,

  skills: `
──────────────────────────────────────────────────────────────
                    TECHNICAL SKILLS                          
──────────────────────────────────────────────────────────────
  💻 PROGRAMMING LANGUAGES                                    
  ├── C                      ████████████████░░░░  80%        
  ├── C++                    ███████████████████░  95%        
  ├── Python                 ██████████████████░░  90%        
  ├── JavaScript             ████████████░░░░░░░░  60%        
  └── SQL                    ███████████████░░░░░  75%        
                                                              
  🌐 WEB TECHNOLOGIES                                         
  ├── React.js               ██████████████████░░  90%        
  ├── Node.js                ██████████████████░░  90%        
  ├── Next.js                ████████████████░░░░  80%        
  ├── Express.js             █████████████████░░░  85%        
  ├── Bootstrap              ███████████████░░░░░  75%        
  ├── Tailwind CSS           ███████████████░░░░░  75%        
  ├── MongoDB                ███████████████░░░░░  75%        
  └── REST APIs              █████████████████░░░  85%        
                                                              
  🤖 ML/DATA TOOLS                                            
  ├── NumPy                  ███████████████████░  95%        
  ├── Pandas                 ███████████████████░  95%        
  ├── Scikit-learn           █████████████████░░░  85%        
  ├── TensorFlow             ████████████████░░░░  80%        
  ├── PyTorch                ████████████████░░░░  80%        
  ├── OpenCV                 ██████████████████░░  90%        
  └── Matplotlib             ██████████████████░░  90%        
                                                              
  ⚡ CS FUNDAMENTALS                                           
  ├── DSA                    ██████████████████░░  90% 
  ├── Computer Networks      █████████████████░░░  85%        
  ├── OOPs                   ██████████████████░░  92%        
  ├── GitHub                 ███████████████████░  95%        
  ├── DBMS                   █████████████████░░░  88%        
  ├── Operating Systems      █████████████████░░░  85%        
  └── NLP                    ████████████████░░░░  80%        
                                                              

╰──────────────────────────────────────────────────────────────╯`,

  projects: `
──────────────────────────────────────────────────────────────
                      MY PROJECTS                             
──────────────────────────────────────────────────────────────
                                                              
  1. 🖥️  Ubuntu Portfolio Website                             
     ├── Tech: React, TypeScript, Tailwind CSS, Vite          
     ├── Fully functional Ubuntu-themed portfolio with        
     │   interactive desktop environment                      
     ├── Live: [Current Website]                              
     └── github.com/AnKiT-GaRG2/my-ubuntu-portfolio          
                                                              
  2. 💹 Forex Prediction App                                   
     ├── Tech: Python, Machine Learning, TensorFlow, Flask    
     ├── ML application for forex market prediction with      
     │   real-time data analysis (92% accuracy)               
     ├── Live: forex-prediction-app.onrender.com             
     └── github.com/AnKiT-GaRG2/Forex-Prediction-App         
                                                              
  3. 💰 Loan Manager                                           
     ├── Tech: React, Node.js, MongoDB, Express, REST APIs    
     ├── Comprehensive loan management system with            
     │   tracking and payment management                      
     └── github.com/AnKiT-GaRG2/LoanManager                   
                                                              
  4. 🔍 Code Reviewer                                        
     ├── Tech: Python, AI/ML, NLP, React, FastAPI             
     ├── AI-powered code review tool for quality analysis     
     ├── Live: code-reviewer-frontend-mu.vercel.app           
     └── github.com/AnKiT-GaRG2/Code-Reviewer                 
                                                              
  5. ⚠️  Risk Management System                               
     ├── Tech: React, TypeScript, Node.js, PostgreSQL         
     ├── Enterprise-level risk management platform            
     ├── Live: risk-management-system-git-main-...vercel.app  
     └── github.com/AnKiT-GaRG2/Risk-Management-System        
           
  and many more.. 
  See all projects in my About Me section.                                                            
           
  Type 'open chrome' to view projects in browser              
──────────────────────────────────────────────────────────────`,

  education: `
──────────────────────────────────────────────────────────────
                       EDUCATION                              
──────────────────────────────────────────────────────────────
                                                              
  🎓 Bachelor of Technology in Computer Science               
     ├── Birla Institute Of Technology (BIT Mesra)            
     ├── 2023 - Present                                       
     ├── CGPA: 8.2/10                                         
     └── Strong foundation in software engineering, DSA,      
         operating systems, databases, and modern web         
         technologies, with hands-on project and              
         problem-solving experience.                          
                                                              
  🎓 Senior Secondary (12th)                                  
     ├── Grizzly Vidyalaya, Koderma                           
     ├── 2020 - 2022                                          
     ├── Score: 87.6% (CBSE)                                  
     └── Science stream with emphasis on Mathematics,         
         Computer Science, and analytical problem-solving.    
                                                              
  🎓 Secondary (10th)                                         
     ├── The Himalayan Public School, Dehradun                
     ├── 2018 - 2020                                          
     ├── Score: 91.6% (ICSE)                                  
     └── Built strong academic foundation with focus on       
         Mathematics, Science, and logical reasoning.         
╰──────────────────────────────────────────────────────────────╯`,

  stats: `
──────────────────────────────────────────────────────────────
                   CODING STATISTICS                          
──────────────────────────────────────────────────────────────
                                                              
  🏆 Competitive Programming                                  
  ├── Total Problems Solved: 800+                             
  ├── Codeforces Rating: 1365 (ankitGarG)                     
  ├── CodeChef Rating: 1632 (anki88520)                       
  └── LeetCode Rating: 1664 (anki88520)                       
                                                              
  🎯 Hackathons & Achievements                                
  ├── 6+ National-level Hackathons                            
  ├── Adobe India Hackathon 2025                              
  │   └── Dockerized OCR & RAG PDF Assistant                  
  ├── Runner-up: Hackaway-Robosaga                            
  ├── Regional Qualifier: Smart India Hackathon               
  └── Organized IEEE's CTF Event                              
                                                              
  💻 GitHub Activity                                          
  ├── Repositories: 20+                                       
  ├── Contributions: Active                                   
  └── Profile: github.com/AnKiT-GaRG2                         
╰──────────────────────────────────────────────────────────────╯`,

  contact: `
╭──────────────────────────────────────────────────────────────╮
│                    CONTACT INFORMATION                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  📧 Email      :  anki88520@gmail.com                        │
│  📱 Phone      :  +91 8852089989                             │
│  📍 Location   :  India                                      │
│  🌐 Portfolio  :  https://ankitgarg.dev                      │
│                                                              │
│  Feel free to reach out for collaborations or just to say hi!│
╰──────────────────────────────────────────────────────────────╯`,

  social: `
──────────────────────────────────────────────────────────────
                     SOCIAL MEDIA                             
──────────────────────────────────────────────────────────────
                                                              
  🐙 GitHub     :  github.com/AnKiT-GaRG2                     
  💼 LinkedIn   :  linkedin.com/in/ankitgarg-516b9b29a        
  🐦 Twitter    :  twitter.com/AnkitGarg357478                
                                                              
  💻 Coding Profiles:                                         
  ├── Codeforces :  codeforces.com/profile/ankitGarG         
  ├── CodeChef   :  codechef.com/users/anki88520             
  └── LeetCode   :  leetcode.com/anki88520                    
                                                              
╰──────────────────────────────────────────────────────────────╯`,

  reviews: `
──────────────────────────────────────────────────────────────
                     CLIENT REVIEWS                           
──────────────────────────────────────────────────────────────
                                                              
  ⭐ John Doe - Senior Developer at Tech Corp                 
  Rating: ⭐⭐⭐⭐⭐ (5/5)                                    
  "Excellent developer with great problem-solving skills.     
   Delivered projects on time and exceeded expectations."     
                                                              
  ⭐ Sarah Smith - Project Manager at StartupXYZ              
  Rating: ⭐⭐⭐⭐⭐ (5/5)                                    
  "Amazing team player! Great communication skills and        
   always willing to help others. Highly recommended!"        
                                                              
  ⭐ Mike Johnson - CTO at InnovateLabs                       
  Rating: ⭐⭐⭐⭐⭐ (5/5)                                    
  "Outstanding technical skills and creativity. Brought       
   innovative solutions to complex challenges."               
                                                              
  Want to add your review? Type 'add-review'                  
╰──────────────────────────────────────────────────────────────╯`,

welcome: `

                                                             
          █████╗ ███╗   ██╗██╗  ██╗██╗████████╗      ███████╗     
         ██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══╝      ██╔════╝     
         ███████║██╔██╗ ██║█████╔╝ ██║   ██║   █████╗███████╗     
         ██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║   ╚════╝╚════██║     
         ██║  ██║██║ ╚████║██║  ██╗██║   ██║         ███████║     
         ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝         ╚══════╝     
                                                                    
          ██╗   ██╗██████╗ ██╗   ██╗███╗   ██╗████████╗██╗   ██╗
          ██║   ██║██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██║   ██║
          ██║   ██║██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║   ██║
          ██║   ██║██╔══██╗██║   ██║██║╚██╗██║   ██║   ██║   ██║
          ╚██████╔╝██████╔╝╚██████╔╝██║ ╚████║   ██║   ╚██████╔╝
           ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝    ╚═════╝ 
                                                                    
  

  🚀 Welcome to Ankit's Ubuntu Interactive Portfolio! 🚀

  💻 ML Enthusiast + Full Stack Developer
  📍 India | 🎓 BIT Mesra | ⭐ 800+ Problems Solved

  Type 'help' to see available commands.
  Type 'about' to learn more about me.
  `,
};

interface TerminalProps {
  onOpenApp?: (id: string) => void;
  onCreateFolder?: (name: string) => void;
}

export function Terminal({ onOpenApp, onCreateFolder }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: COMMANDS.welcome },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [currentDirName, setCurrentDirName] = useState('root');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const childDirectories: { [key: string]: string[] } = {
    root: ["projects", "skills", "education", "about-me", "contact"],
    projects: ["ubuntu-portfolio", "react-apps", "web-projects"],
    skills: ["frontend", "backend", "tools"],
    frontend: ["React.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    backend: ["Node.js", "Express.js", "Python", "Django"],
    tools: ["Git", "Docker", "VS Code", "Linux"],
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync cursor position with input ref
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ').filter(Boolean);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);
    const rest = args.join(' ');

    // Add to history
    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, cmd]);
    }

    let output = '';

    switch (command) {
      case 'help':
        output = COMMANDS.help;
        break;
      case 'about':
        output = COMMANDS.about;
        break;
      case 'skills':
        output = COMMANDS.skills;
        break;
      case 'projects':
        output = COMMANDS.projects;
        break;
      case 'education':
        output = COMMANDS.education;
        break;
      case 'stats':
        output = COMMANDS.stats;
        break;
      case 'contact':
        output = COMMANDS.contact;
        break;
      case 'social':
        output = COMMANDS.social;
        break;
      case 'reviews':
        output = COMMANDS.reviews;
        break;
      case 'add-review':
        onOpenApp?.('review');
        output = 'Opening Add Review...';
        break;
      case 'welcome':
        output = COMMANDS.welcome;
        break;
      case 'clear':
        setLines([]);
        return;
      case 'echo':
        output = rest || '';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'Ankit@ubuntu-portfolio';
        break;
      case 'pwd':
        output = currentDirectory.replace('~', '/home/ankit');
        break;
      case 'cd':
        if (args.length === 0 || rest === '') {
          setCurrentDirectory('~');
          setCurrentDirName('root');
        } else if (args.length > 1) {
          output = 'cd: too many arguments';
        } else if (rest === '.' || rest === './') {
          // Stay in current directory
        } else if (rest === '..' || rest === '../') {
          if (currentDirectory !== '~') {
            const parts = currentDirectory.split('/');
            parts.pop();
            const newDir = parts.length > 0 ? parts.join('/') : '~';
            setCurrentDirectory(newDir === '' ? '~' : newDir);
            setCurrentDirName(parts[parts.length - 1] || 'root');
          }
        } else if (childDirectories[currentDirName]?.includes(rest)) {
          setCurrentDirectory(currentDirectory + '/' + rest);
          setCurrentDirName(rest);
        } else {
          output = `cd: ${rest}: No such file or directory`;
        }
        break;
      case 'ls': {
        const target = args[0] || currentDirName;
        if (args.length > 1) {
          output = 'ls: too many arguments';
        } else if (target in childDirectories) {
          output = childDirectories[target].map(f => `  ${f}`).join('\n');
        } else if (currentDirName in childDirectories) {
          output = childDirectories[currentDirName].map(f => `  ${f}`).join('\n');
        } else {
          output = `ls: cannot access '${target}': No such file or directory`;
        }
        break;
      }
      case 'cat':
        if (args.length === 0) {
          output = 'cat: no file specified';
        } else if (args[0] === 'readme.txt' || args[0] === 'readme' || args[0] === 'README.md') {
          output = 'Welcome to Ankit\'s portfolio! Type "help" for available commands.';
        } else {
          output = `cat: ${args[0]}: No such file or directory`;
        }
        break;
      case 'history':
        output = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || 'No commands in history';
        break;
      case 'mkdir':
        if (args.length === 0) {
          output = 'mkdir: missing operand';
        } else if (args.length > 1) {
          output = 'mkdir: too many arguments, please create one folder at a time';
        } else {
          const folderName = args[0];
          if (folderName.includes('/') || folderName.includes('\\')) {
            output = 'mkdir: invalid folder name, no slashes allowed';
          } else if (folderName.length > 50) {
            output = 'mkdir: folder name too long (max 50 characters)';
          } else {
            onCreateFolder?.(folderName);
            output = `Created directory: ${folderName}`;
          }
        }
        break;
      case 'code':
        if (args.length === 0 || rest === '.') {
          onOpenApp?.('vscode');
          output = 'Opening VS Code...';
        } else {
          output = `code: ${rest}: No such file or directory`;
        }
        break;
      case 'chrome':
        if (args.length === 0 || rest === '.') {
          onOpenApp?.('chrome');
          output = 'Opening Chrome...';
        } else {
          output = 'chrome: command not found with arguments';
        }
        break;
      case 'open':
        if (args.length === 0) {
          output = 'open: no application specified';
        } else if (args[0] === 'vscode' || args[0] === 'code') {
          onOpenApp?.('vscode');
          output = 'Opening VS Code...';
        } else if (args[0] === 'chrome' || args[0] === 'browser') {
          onOpenApp?.('chrome');
          output = 'Opening Chrome...';
        } else if (args[0] === 'files') {
          onOpenApp?.('files');
          output = 'Opening Files...';
        } else if (args[0] === 'settings') {
          onOpenApp?.('settings');
          output = 'Opening Settings...';
        } else if (args[0] === 'about') {
          onOpenApp?.('about');
          output = 'Opening About Me...';
        } else if (args[0] === 'calculator') {
          onOpenApp?.('calculator');
          output = 'Opening Calculator...';
        } else if (args[0] === 'contact') {
          onOpenApp?.('contact');
          output = 'Opening Contact Me...';
        } else if (args[0] === 'review' || args[0] === 'add-review') {
          onOpenApp?.('review');
          output = 'Opening Add Review...';
        } else if (args[0] === 'chatbot' || args[0] === 'ankitalk') {
          onOpenApp?.('chatbot');
          output = 'Opening AnkiTalk...';
        } else {
          output = `open: ${args[0]}: Application not found`;
        }
        break;
      case 'sudo':
        output = "Nice try! But you don't have sudo privileges here 😄\n[sudo] password for ankit: ";
        break;
      case 'exit':
      case 'quit':
        output = "This terminal cannot be closed using 'exit'. Use the window controls.";
        break;
      case '':
        break;
      default:
        output = `Command not found: ${command}\nType 'help' for available commands.`;
    }

    if (output) {
      setLines((prev) => [
        ...prev,
        { type: 'input', content: cmd },
        { type: 'output', content: output },
      ]);
    } else if (command) {
      setLines((prev) => [...prev, { type: 'input', content: cmd }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCurrentInput('');
      setCursorPosition(0);
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const newCommand = commandHistory[commandHistory.length - 1 - newIndex] || '';
        setCurrentInput(newCommand);
        setCursorPosition(newCommand.length);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const newCommand = commandHistory[commandHistory.length - 1 - newIndex] || '';
        setCurrentInput(newCommand);
        setCursorPosition(newCommand.length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
        setCursorPosition(0);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCursorPosition((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCursorPosition((prev) => Math.min(currentInput.length, prev + 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCursorPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCursorPosition(currentInput.length);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(COMMANDS);
      const matches = commands.filter((c) => c.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
        setCursorPosition(matches[0].length);
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (cursorPosition > 0) {
        const newInput = currentInput.slice(0, cursorPosition - 1) + currentInput.slice(cursorPosition);
        setCurrentInput(newInput);
        setCursorPosition(cursorPosition - 1);
      }
    } else if (e.key === 'Delete') {
      e.preventDefault();
      if (cursorPosition < currentInput.length) {
        const newInput = currentInput.slice(0, cursorPosition) + currentInput.slice(cursorPosition + 1);
        setCurrentInput(newInput);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      const newInput = currentInput.slice(0, cursorPosition) + e.key + currentInput.slice(cursorPosition);
      setCurrentInput(newInput);
      setCursorPosition(cursorPosition + 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="h-full bg-[#300a24] p-4 overflow-y-auto font-ubuntu-mono text-sm cursor-text"
      onClick={handleContainerClick}
    >
      {lines.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line.type === 'input' ? (
            <div className="flex gap-1">
              <span className="text-green-400">Ankit@Dell</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">{currentDirectory}</span>
              <span className="text-white">$</span>
              <span className="text-white ml-1">{line.content}</span>
            </div>
          ) : (
            <div className="text-white">{line.content}</div>
          )}
        </div>
      ))}
      <div className="flex gap-1 items-center">
        <span className="text-green-400">Ankit@Dell</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">{currentDirectory}</span>
        <span className="text-white">$</span>
        <div className="flex-1 relative flex items-center ml-1">
          <span className="text-white">
            {currentInput.slice(0, cursorPosition)}
            <span className="inline-block w-[0.6em] h-[1.2em] bg-white/80 terminal-cursor"></span>
            {currentInput.slice(cursorPosition)}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
              setCursorPosition(e.target.selectionStart || 0);
            }}
            onKeyDown={handleKeyDown}
            onSelect={(e) => {
              setCursorPosition((e.target as HTMLInputElement).selectionStart || 0);
            }}
            className="absolute inset-0 opacity-0 cursor-default"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}