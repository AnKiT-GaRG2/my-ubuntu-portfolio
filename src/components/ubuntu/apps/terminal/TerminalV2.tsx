import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { TerminalLine } from '@/types/ubuntu';
import {
  HelpCommand,
  AboutCommand,
  SkillsCommand,
  ProjectsCommand,
  EducationCommand,
  StatsCommand,
  ContactCommand,
  SocialCommand,
  ReviewsCommand,
  WelcomeCommand,
} from '.';

interface TerminalProps {
  onOpenApp?: (id: string) => void;
  onCreateFolder?: (name: string) => void;
  initialCommand?: string;
  onClose?: () => void;
  autoClose?: boolean;
}

export function TerminalV2({ onOpenApp, onCreateFolder, initialCommand, onClose, autoClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: <WelcomeCommand /> },
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

  // List of available commands for autocomplete
  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'education', 'stats',
    'contact', 'social', 'reviews', 'add-review', 'welcome', 'clear',
    'echo', 'date', 'whoami', 'pwd', 'ls', 'cd', 'cat', 'history',
    'mkdir', 'code', 'chrome', 'open', 'sudo', 'exit'
  ];

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

    let output: string | React.ReactNode = '';

    switch (command) {
      case 'help':
        output = <HelpCommand />;
        break;
      case 'about':
        output = <AboutCommand />;
        break;
      case 'skills':
        output = <SkillsCommand />;
        break;
      case 'projects':
        output = <ProjectsCommand />;
        break;
      case 'education':
        output = <EducationCommand />;
        break;
      case 'stats':
        output = <StatsCommand />;
        break;
      case 'contact':
        output = <ContactCommand />;
        break;
      case 'social':
        output = <SocialCommand />;
        break;
      case 'reviews':
        output = <ReviewsCommand />;
        break;
      case 'add-review':
        onOpenApp?.('review');
        output = 'Opening Add Review...';
        break;
      case 'welcome':
        output = <WelcomeCommand />;
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
          output = 'Opening Ankit 2.0...';
        } else {
          output = `open: ${args[0]}: Application not found`;
        }
        break;
      case 'sudo':
        output = "Nice try! But you don't have sudo privileges here 😄\n[sudo] password for ankit: ";
        break;
      case 'exit':
      case 'quit':
        if (onClose) {
          onClose();
          return;
        } else {
          output = "This terminal cannot be closed using 'exit'. Use the window controls.";
        }
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

  // Execute initial command if provided
  useEffect(() => {
    if (initialCommand) {
      // Small delay to ensure terminal is ready
      setTimeout(() => {
        processCommand(initialCommand);
        // Auto-close terminal after command execution if autoClose is enabled
        if (autoClose && onClose) {
          setTimeout(() => {
            onClose();
          }, 1500); // Wait 1.5s to show the output before closing
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCommand]);

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
      const matches = availableCommands.filter((c) => c.startsWith(currentInput.toLowerCase()));
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