import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { TerminalLine } from '@/types/ubuntu';

const COMMANDS = {
  help: `Available commands:
  about       - Display information about me
  skills      - List my technical skills
  projects    - Show my projects
  education   - View my education
  experience  - View my work experience
  contact     - Display contact information
  social      - Show social media links
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
╭──────────────────────────────────────────────────────────────╮
│                        ABOUT ME                              │
├──────────────────────────────────────────────────────────────┤
│  Hi! I'm a passionate Full-Stack Developer based in the      │
│  digital realm of creativity and innovation.                 │
│                                                              │
│  🚀 I love building elegant solutions to complex problems    │
│  💡 Always learning and exploring new technologies           │
│  🎯 Focused on creating impactful user experiences           │
│                                                              │
│  When I'm not coding, you'll find me exploring open-source   │
│  projects, contributing to the developer community, and      │
│  staying up-to-date with the latest tech trends.             │
╰──────────────────────────────────────────────────────────────╯`,

  skills: `
╭──────────────────────────────────────────────────────────────╮
│                    TECHNICAL SKILLS                          │
├──────────────────────────────────────────────────────────────┤
│  LANGUAGES                                                   │
│  ├── JavaScript/TypeScript  ████████████████████  Expert     │
│  ├── Python                 ████████████████░░░░  Advanced   │
│  ├── Java                   ████████████░░░░░░░░  Proficient │
│  └── C/C++                  ████████░░░░░░░░░░░░  Familiar   │
│                                                              │
│  FRONTEND                                                    │
│  ├── React.js               ████████████████████  Expert     │
│  ├── Vue.js                 ████████████████░░░░  Advanced   │
│  ├── HTML/CSS               ████████████████████  Expert     │
│  └── Tailwind CSS           ████████████████████  Expert     │
│                                                              │
│  BACKEND                                                     │
│  ├── Node.js                ████████████████████  Expert     │
│  ├── Express.js             ████████████████░░░░  Advanced   │
│  └── Django                 ████████████░░░░░░░░  Proficient │
│                                                              │
│  DATABASE                                                    │
│  ├── PostgreSQL             ████████████████░░░░  Advanced   │
│  ├── MongoDB                ████████████████░░░░  Advanced   │
│  └── Redis                  ████████████░░░░░░░░  Proficient │
│                                                              │
│  TOOLS & PLATFORMS                                           │
│  ├── Git/GitHub             ████████████████████  Expert     │
│  ├── Docker                 ████████████████░░░░  Advanced   │
│  ├── AWS                    ████████████░░░░░░░░  Proficient │
│  └── Linux                  ████████████████░░░░  Advanced   │
╰──────────────────────────────────────────────────────────────╯`,

  projects: `
╭──────────────────────────────────────────────────────────────╮
│                      MY PROJECTS                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 🖥️  Ubuntu Portfolio                                     │
│     ├── Tech: React, TypeScript, Tailwind CSS                │
│     ├── A unique portfolio simulating Ubuntu Desktop         │
│     └── github.com/username/ubuntu-portfolio                 │
│                                                              │
│  2. 🛒  E-Commerce Platform                                  │
│     ├── Tech: Next.js, Node.js, PostgreSQL                   │
│     ├── Full-featured online shopping platform               │
│     └── github.com/username/ecommerce                        │
│                                                              │
│  3. 💬  Real-time Chat App                                   │
│     ├── Tech: React, Socket.io, MongoDB                      │
│     ├── Instant messaging with group support                 │
│     └── github.com/username/chat-app                         │
│                                                              │
│  4. 📊  Analytics Dashboard                                  │
│     ├── Tech: React, D3.js, Python, FastAPI                  │
│     ├── Data visualization and analytics tool                │
│     └── github.com/username/analytics                        │
│                                                              │
│  Type 'open <project-number>' for more details               │
╰──────────────────────────────────────────────────────────────╯`,

  education: `
╭──────────────────────────────────────────────────────────────╮
│                       EDUCATION                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🎓 Bachelor of Technology in Computer Science               │
│     ├── University Name                                      │
│     ├── 2019 - 2023                                          │
│     ├── GPA: 3.8/4.0                                         │
│     └── Relevant Coursework:                                 │
│         • Data Structures & Algorithms                       │
│         • Database Management Systems                        │
│         • Computer Networks                                  │
│         • Machine Learning                                   │
│         • Software Engineering                               │
│                                                              │
│  📜 Certifications                                           │
│     ├── AWS Certified Developer Associate                    │
│     ├── Meta Frontend Developer Certificate                  │
│     └── Google Cloud Professional                            │
╰──────────────────────────────────────────────────────────────╯`,

  experience: `
╭──────────────────────────────────────────────────────────────╮
│                    WORK EXPERIENCE                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  💼 Senior Software Engineer                                 │
│     ├── Tech Company Inc.                                    │
│     ├── Jan 2023 - Present                                   │
│     └── • Led development of microservices architecture      │
│         • Mentored junior developers                         │
│         • Reduced system latency by 40%                      │
│                                                              │
│  💼 Full Stack Developer                                     │
│     ├── Startup XYZ                                          │
│     ├── Jun 2021 - Dec 2022                                  │
│     └── • Built scalable web applications                    │
│         • Implemented CI/CD pipelines                        │
│         • Integrated third-party APIs                        │
│                                                              │
│  💼 Software Development Intern                              │
│     ├── Innovation Labs                                      │
│     ├── Jan 2021 - May 2021                                  │
│     └── • Developed RESTful APIs                             │
│         • Wrote unit tests for critical modules              │
│         • Collaborated in Agile environment                  │
╰──────────────────────────────────────────────────────────────╯`,

  contact: `
╭──────────────────────────────────────────────────────────────╮
│                    CONTACT INFORMATION                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  📧 Email      :  developer@example.com                      │
│  📱 Phone      :  +1 (555) 123-4567                          │
│  📍 Location   :  San Francisco, CA                          │
│  🌐 Website    :  https://myportfolio.dev                    │
│                                                              │
│  Feel free to reach out for collaborations or just to say hi!│
╰──────────────────────────────────────────────────────────────╯`,

  social: `
╭──────────────────────────────────────────────────────────────╮
│                     SOCIAL MEDIA                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🐙 GitHub     :  github.com/username                        │
│  💼 LinkedIn   :  linkedin.com/in/username                   │
│  🐦 Twitter    :  twitter.com/username                       │
│  📸 Instagram  :  instagram.com/username                     │
│  ✍️  Medium     :  medium.com/@username                       │
│  📘 Dev.to     :  dev.to/username                            │
│                                                              │
╰──────────────────────────────────────────────────────────────╯`,

  welcome: `
   _   _ _                 _         ____            _    _              
  | | | | |               | |       |  _ \\          | |  | |             
  | | | | |__  _   _ _ __ | |_ _   _| |_) | ___  ___| | _| |_ ___  _ __  
  | | | | '_ \\| | | | '_ \\| __| | | |  _ < / _ \\/ __| |/ / __/ _ \\| '_ \\ 
  | |_| | |_) | |_| | | | | |_| |_| | |_) |  __/\\__ \\   <| || (_) | |_) |
   \\___/|_.__/ \\__,_|_| |_|\\__|\\__,_|____/ \\___||___/_|\\_\\\\__\\___/| .__/ 
                                                                  | |    
                                                                  |_|    

  Welcome to Ankit's interactive portfolio!

  Type 'help' to see available commands.
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
      case 'experience':
        output = COMMANDS.experience;
        break;
      case 'contact':
        output = COMMANDS.contact;
        break;
      case 'social':
        output = COMMANDS.social;
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
        output = 'guest@ubuntu-portfolio';
        break;
      case 'pwd':
        output = currentDirectory.replace('~', '/home/guest');
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
        } else {
          output = `open: ${args[0]}: Application not found`;
        }
        break;
      case 'sudo':
        output = "Nice try! But you don't have sudo privileges here 😄\n[sudo] password for guest: ";
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
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(COMMANDS);
      const matches = commands.filter((c) => c.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
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
        <span className="text-green-400">guest@Dell</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">{currentDirectory}</span>
        <span className="text-white">$</span>
        <div className="flex-1 relative flex items-center ml-1">
          <span className="text-white">{currentInput}</span>
          <span className="inline-block w-2 h-4 bg-white terminal-cursor ml-0.5"></span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 cursor-default"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
