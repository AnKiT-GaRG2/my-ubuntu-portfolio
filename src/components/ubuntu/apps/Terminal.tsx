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
  cat         - Display file contents
  history     - Show command history`,

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
  
  Welcome to my interactive portfolio!
  
  Type 'help' to see available commands.
  `,
};

interface TerminalProps {
  onOpenApp?: (id: string) => void;
}

export function Terminal({ onOpenApp }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: COMMANDS.welcome },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

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
        output = args || '';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'guest@ubuntu-portfolio';
        break;
      case 'pwd':
        output = '/home/guest';
        break;
      case 'ls':
        output = 'Desktop  Documents  Downloads  Music  Pictures  Projects  Videos';
        break;
      case 'cat':
        if (args === 'readme.txt' || args === 'readme') {
          output = 'Welcome to my portfolio! Type "help" for available commands.';
        } else {
          output = `cat: ${args || 'no file specified'}: No such file or directory`;
        }
        break;
      case 'history':
        output = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || 'No commands in history';
        break;
      case 'open':
        if (args === 'vscode' || args === 'code') {
          onOpenApp?.('vscode');
          output = 'Opening Visual Studio Code...';
        } else if (args === 'chrome' || args === 'browser') {
          onOpenApp?.('chrome');
          output = 'Opening Google Chrome...';
        } else if (args === 'files') {
          onOpenApp?.('files');
          output = 'Opening Files...';
        } else {
          output = `open: ${args || 'no app specified'}: Application not found`;
        }
        break;
      case 'sudo':
        output = "Nice try! But you don't have sudo privileges here 😄";
        break;
      case 'exit':
      case 'quit':
        output = "This terminal cannot be closed using 'exit'. Use the window controls.";
        break;
      case '':
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
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
      className="h-full bg-ubuntu-terminal-bg p-4 overflow-y-auto font-ubuntu-mono text-sm cursor-text"
      onClick={handleContainerClick}
    >
      {lines.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line.type === 'input' ? (
            <div className="flex gap-2">
              <span className="text-ubuntu-terminal-text">guest@ubuntu-portfolio</span>
              <span className="text-blue-400">~</span>
              <span className="text-foreground/80">$ {line.content}</span>
            </div>
          ) : (
            <div className="text-foreground/80">{line.content}</div>
          )}
        </div>
      ))}
      <div className="flex gap-2 items-center">
        <span className="text-ubuntu-terminal-text">guest@ubuntu-portfolio</span>
        <span className="text-blue-400">~</span>
        <span className="text-foreground/80">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-foreground/80"
          autoFocus
          spellCheck={false}
        />
        <span className="terminal-cursor w-2 h-4 bg-foreground/80" />
      </div>
    </div>
  );
}
