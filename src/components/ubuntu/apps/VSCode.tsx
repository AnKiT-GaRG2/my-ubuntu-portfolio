import { useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen, Search, GitBranch, Play, Bug, Blocks } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  isOpen?: boolean;
}

const files: FileItem[] = [
  {
    name: 'portfolio-project',
    type: 'folder',
    isOpen: true,
    children: [
      {
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          { name: 'App.tsx', type: 'file', content: `import React from 'react';
import { Desktop } from './components/Desktop';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <Desktop />
    </div>
  );
}

export default App;` },
          { name: 'index.tsx', type: 'file', content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);` },
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'Desktop.tsx', type: 'file', content: `import React from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';

export function Desktop() {
  return (
    <div className="desktop">
      <TopBar />
      <WindowManager />
      <Dock />
    </div>
  );
}` },
              { name: 'Terminal.tsx', type: 'file', content: `import React, { useState } from 'react';

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleCommand = (cmd: string) => {
    // Process command
    setHistory([...history, cmd]);
    setInput('');
  };

  return (
    <div className="terminal">
      {/* Terminal implementation */}
    </div>
  );
}` },
            ],
          },
        ],
      },
      { name: 'package.json', type: 'file', content: `{
  "name": "ubuntu-portfolio",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}` },
      { name: 'README.md', type: 'file', content: `# Ubuntu Portfolio

A unique portfolio website that simulates the Ubuntu desktop experience.

## Features

- 🖥️ Ubuntu-like desktop environment
- 💻 Working terminal with custom commands
- 📁 File manager
- 🌐 Multiple applications

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Technologies

- React
- TypeScript
- Tailwind CSS
- Vite

## Author

Your Name - Developer` },
    ],
  },
];

export function VSCode() {
  const [openFiles, setOpenFiles] = useState<string[]>(['App.tsx']);
  const [activeFile, setActiveFile] = useState('App.tsx');
  const [fileTree, setFileTree] = useState(files);
  const [sidebarTab, setSidebarTab] = useState<'files' | 'search' | 'git' | 'debug' | 'extensions'>('files');

  const findFileContent = (items: FileItem[], name: string): string | undefined => {
    for (const item of items) {
      if (item.name === name && item.type === 'file') {
        return item.content;
      }
      if (item.children) {
        const found = findFileContent(item.children, name);
        if (found) return found;
      }
    }
    return undefined;
  };

  const currentContent = findFileContent(fileTree, activeFile) || '';

  const toggleFolder = (path: string[]) => {
    const toggle = (items: FileItem[], remainingPath: string[]): FileItem[] => {
      return items.map((item) => {
        if (item.name === remainingPath[0]) {
          if (remainingPath.length === 1) {
            return { ...item, isOpen: !item.isOpen };
          }
          return {
            ...item,
            children: item.children ? toggle(item.children, remainingPath.slice(1)) : undefined,
          };
        }
        return item;
      });
    };
    setFileTree(toggle(fileTree, path));
  };

  const openFile = (name: string) => {
    if (!openFiles.includes(name)) {
      setOpenFiles([...openFiles, name]);
    }
    setActiveFile(name);
  };

  const closeFile = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter((f) => f !== name);
    setOpenFiles(newOpenFiles);
    if (activeFile === name && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    }
  };

  const renderTree = (items: FileItem[], path: string[] = [], level = 0) => {
    return items.map((item) => {
      const currentPath = [...path, item.name];
      const isOpen = item.isOpen;

      if (item.type === 'folder') {
        return (
          <div key={currentPath.join('/')}>
            <button
              onClick={() => toggleFolder(currentPath)}
              className="w-full flex items-center gap-1 px-2 py-0.5 hover:bg-white/5 text-foreground/80 text-sm"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 shrink-0" />
              )}
              {isOpen ? (
                <FolderOpen className="w-4 h-4 text-yellow-500 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-yellow-500 shrink-0" />
              )}
              <span className="truncate">{item.name}</span>
            </button>
            {isOpen && item.children && (
              <div>{renderTree(item.children, currentPath, level + 1)}</div>
            )}
          </div>
        );
      }

      return (
        <button
          key={currentPath.join('/')}
          onClick={() => openFile(item.name)}
          className={`w-full flex items-center gap-1 px-2 py-0.5 hover:bg-white/5 text-sm ${
            activeFile === item.name ? 'bg-white/10 text-foreground' : 'text-foreground/70'
          }`}
          style={{ paddingLeft: `${level * 12 + 24}px` }}
        >
          <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="truncate">{item.name}</span>
        </button>
      );
    });
  };

  const highlightSyntax = (code: string) => {
    return code.split('\n').map((line, i) => {
      let highlighted = line
        .replace(/(import|from|export|default|function|const|let|var|return|if|else|for|while)/g, '<span class="syntax-keyword">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="syntax-string">$1</span>')
        .replace(/(\w+)(?=\()/g, '<span class="syntax-function">$1</span>')
        .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="syntax-comment">$1</span>')
        .replace(/(\d+)/g, '<span class="syntax-number">$1</span>');

      return (
        <div key={i} className="flex">
          <span className="w-12 pr-4 text-right text-muted-foreground select-none shrink-0">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Activity Bar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-12 bg-[#333] flex flex-col items-center py-2 gap-4 shrink-0">
          <button
            onClick={() => setSidebarTab('files')}
            className={`p-2 rounded ${sidebarTab === 'files' ? 'bg-white/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <FileCode className="w-5 h-5 text-foreground/70" />
          </button>
          <button
            onClick={() => setSidebarTab('search')}
            className={`p-2 rounded ${sidebarTab === 'search' ? 'bg-white/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <Search className="w-5 h-5 text-foreground/70" />
          </button>
          <button
            onClick={() => setSidebarTab('git')}
            className={`p-2 rounded ${sidebarTab === 'git' ? 'bg-white/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <GitBranch className="w-5 h-5 text-foreground/70" />
          </button>
          <button
            onClick={() => setSidebarTab('debug')}
            className={`p-2 rounded ${sidebarTab === 'debug' ? 'bg-white/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <Bug className="w-5 h-5 text-foreground/70" />
          </button>
          <button
            onClick={() => setSidebarTab('extensions')}
            className={`p-2 rounded ${sidebarTab === 'extensions' ? 'bg-white/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}
          >
            <Blocks className="w-5 h-5 text-foreground/70" />
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-56 bg-[#252526] border-r border-[#3c3c3c] overflow-y-auto shrink-0">
          <div className="p-2 text-xs uppercase text-foreground/50 font-medium">
            Explorer
          </div>
          {renderTree(fileTree)}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="h-9 bg-[#252526] flex items-end overflow-x-auto shrink-0">
            {openFiles.map((file) => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`h-full flex items-center gap-2 px-3 cursor-pointer border-r border-[#3c3c3c] group ${
                  activeFile === file
                    ? 'bg-[#1e1e1e] border-t-2 border-t-blue-400'
                    : 'bg-[#2d2d2d] hover:bg-[#2a2a2a]'
                }`}
              >
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-foreground/80">{file}</span>
                <button
                  onClick={(e) => closeFile(file, e)}
                  className="w-4 h-4 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/10"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto p-4 font-ubuntu-mono text-sm leading-6">
            {highlightSyntax(currentContent)}
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#007acc] flex items-center justify-between px-2 text-xs text-white shrink-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                main
              </span>
              <span>0 problems</span>
            </div>
            <div className="flex items-center gap-4">
              <span>TypeScript React</span>
              <span>UTF-8</span>
              <span>Ln 1, Col 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
