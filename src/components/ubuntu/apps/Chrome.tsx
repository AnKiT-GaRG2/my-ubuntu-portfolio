import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Star, MoreVertical, Plus, X } from 'lucide-react';

interface Tab {
  id: string;
  title: string;
  url: string;
}

export function Chrome() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'GitHub - Portfolio', url: 'https://github.com/username' },
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [inputUrl, setInputUrl] = useState('https://github.com/username');

  const activeTabData = tabs.find((t) => t.id === activeTab);

  const addTab = () => {
    const newTab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'about:blank',
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setInputUrl('');
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((t) => t.id !== id);
    if (newTabs.length === 0) {
      addTab();
      return;
    }
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#202124]">
      {/* Tab Bar */}
      <div className="h-9 bg-[#35363a] flex items-end px-2 gap-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setInputUrl(tab.url);
            }}
            className={`h-8 max-w-[200px] flex items-center gap-2 px-3 cursor-pointer rounded-t-lg group ${
              activeTab === tab.id ? 'bg-[#202124]' : 'bg-[#292a2d] hover:bg-[#3c3d41]'
            }`}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt=""
              className="w-4 h-4"
            />
            <span className="text-xs text-foreground/80 truncate flex-1">
              {tab.title}
            </span>
            <button
              onClick={(e) => closeTab(tab.id, e)}
              className="w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/10"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <Plus className="w-4 h-4 text-foreground/60" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="h-11 bg-[#202124] flex items-center gap-2 px-3">
        <button className="p-2 rounded-full hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 text-foreground/50" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <ArrowRight className="w-4 h-4 text-foreground/50" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <RotateCw className="w-4 h-4 text-foreground/60" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <Home className="w-4 h-4 text-foreground/60" />
        </button>

        {/* URL Bar */}
        <div className="flex-1 flex items-center bg-[#35363a] rounded-full px-4 py-1.5">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground/80"
            placeholder="Search or enter URL"
          />
          <Star className="w-4 h-4 text-foreground/50" />
        </div>

        <button className="p-2 rounded-full hover:bg-white/10">
          <MoreVertical className="w-4 h-4 text-foreground/60" />
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-[#0d1117] overflow-auto">
        {/* Simulated GitHub Page */}
        <div className="bg-[#161b22] border-b border-[#30363d]">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Developer Name</h1>
                <p className="text-foreground/60">Full Stack Developer | Open Source Enthusiast</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <div className="text-foreground/80">
                <p className="text-sm">🏢 Working @TechCompany</p>
                <p className="text-sm">📍 San Francisco, CA</p>
                <p className="text-sm">🔗 myportfolio.dev</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Organizations</h3>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-xs">ORG</div>
                  <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-xs">OS</div>
                </div>
              </div>
            </div>

            {/* Repositories */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Pinned Repositories</h2>
              
              {[
                { name: 'ubuntu-portfolio', desc: 'Ubuntu-themed portfolio website', lang: 'TypeScript', stars: 128 },
                { name: 'react-components', desc: 'Collection of reusable React components', lang: 'JavaScript', stars: 256 },
                { name: 'api-starter', desc: 'REST API boilerplate with Node.js', lang: 'JavaScript', stars: 89 },
                { name: 'ml-projects', desc: 'Machine learning experiments and projects', lang: 'Python', stars: 64 },
              ].map((repo) => (
                <div key={repo.name} className="border border-[#30363d] rounded-lg p-4 hover:bg-[#161b22] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-medium">{repo.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363d] text-foreground/50">
                      Public
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60 mt-1">{repo.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-foreground/50">
                    <span className="flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full ${repo.lang === 'TypeScript' ? 'bg-blue-400' : repo.lang === 'Python' ? 'bg-yellow-400' : 'bg-yellow-300'}`} />
                      {repo.lang}
                    </span>
                    <span>⭐ {repo.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Contribution Activity</h2>
            <div className="grid grid-cols-52 gap-1">
              {Array.from({ length: 365 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    Math.random() > 0.7
                      ? Math.random() > 0.5
                        ? 'bg-green-700'
                        : 'bg-green-500'
                      : Math.random() > 0.8
                      ? 'bg-green-400'
                      : 'bg-[#161b22]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
