import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Grid, List, Folder, FileText, Image, Music, Video, Download, FileCode, X, FileType } from 'lucide-react';
import { desktopApps } from '../desktopConfig';
import { useDesktop } from '@/hooks/useDesktop';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: 'folder' | 'document' | 'image' | 'music' | 'video' | 'download' | 'code' | 'pdf' | 'certificates';
  size?: string;
  modified?: string;
  filePath?: string; // Actual file path for opening
  customIcon?: string; // Custom icon path
  appId?: string; // Desktop app ID for clickable apps
  isExternal?: boolean; // Is external link
  externalUrl?: string; // External URL
}

const folders: Record<string, FileItem[]> = {
  '/home/guest': [
    { name: 'Desktop', type: 'folder', icon: 'folder' },
    { name: 'Documents', type: 'folder', icon: 'folder' },
    { name: 'Downloads', type: 'folder', icon: 'download' },
    { name: 'Music', type: 'folder', icon: 'music' },
    { name: 'Pictures', type: 'folder', icon: 'image' },
    { name: 'Projects', type: 'folder', icon: 'code' },
    { name: 'Videos', type: 'folder', icon: 'video' },
  ],
  // Desktop folder will be generated dynamically from desktopApps
  '/home/guest/Documents': [
    { name: 'Certificates', type: 'folder', icon: 'certificates', customIcon: '/icons/folder-documents.png' },
    { name: 'Software_engineering_internL.pdf', type: 'file', icon: 'pdf', size: '156 KB', modified: 'Jan 15', filePath: '/files/Software_engineering_internL.pdf' },
    { name: 'cover-letter.docx', type: 'file', icon: 'document', size: '24 KB', modified: 'Jan 10' },
    { name: 'notes.txt', type: 'file', icon: 'document', size: '4 KB', modified: 'Dec 20' },
  ],
  '/home/guest/Documents/Certificates': [
    { name: 'Academics', type: 'folder', icon: 'folder' },
    { name: 'Extracurricular', type: 'folder', icon: 'folder' },
  ],
  '/home/guest/Documents/Certificates/Academics': [
    { name: 'Adobe.pdf', type: 'file', icon: 'pdf', size: '1.2 MB', modified: 'Jan 2024', filePath: '/files/certificates/Academics/Adobe.pdf' },
    { name: 'Meta Hacker Cup.pdf', type: 'file', icon: 'pdf', size: '856 KB', modified: 'Dec 2023', filePath: '/files/certificates/Academics/Meta Hacker Cup.pdf' },
    { name: 'SIH.pdf', type: 'file', icon: 'pdf', size: '945 KB', modified: 'Sep 2023', filePath: '/files/certificates/Academics/SIH.pdf' },
    { name: 'hackaway.pdf', type: 'file', icon: 'pdf', size: '678 KB', modified: 'Nov 2023', filePath: '/files/certificates/Academics/hackaway.pdf' },
    { name: 'ideathon.pdf', type: 'file', icon: 'pdf', size: '734 KB', modified: 'Oct 2023', filePath: '/files/certificates/Academics/ideathon.pdf' },
    { name: 'nstse.pdf', type: 'file', icon: 'pdf', size: '512 KB', modified: 'May 2023', filePath: '/files/certificates/Academics/nstse.pdf' },
    { name: 'sankalp.pdf', type: 'file', icon: 'pdf', size: '623 KB', modified: 'Aug 2023', filePath: '/files/certificates/Academics/sankalp.pdf' },
  ],
  '/home/guest/Documents/Certificates/Extracurricular': [
    { name: 'Badminton State.pdf', type: 'file', icon: 'pdf', size: '1.5 MB', modified: 'Mar 2023', filePath: '/files/certificates/Extracurricular/Badminton State.pdf' },
    { name: 'Badminton district_U16.pdf', type: 'file', icon: 'pdf', size: '1.3 MB', modified: 'Feb 2023', filePath: '/files/certificates/Extracurricular/Badminton district_U16.pdf' },
    { name: 'Badminton_district_u-13.pdf', type: 'file', icon: 'pdf', size: '1.2 MB', modified: 'Jan 2023', filePath: '/files/certificates/Extracurricular/Badminton_district_u-13.pdf' },
    { name: 'Craft_competition.pdf', type: 'file', icon: 'pdf', size: '890 KB', modified: 'Apr 2023', filePath: '/files/certificates/Extracurricular/Craft_competition.pdf' },
    { name: 'painting.pdf', type: 'file', icon: 'pdf', size: '967 KB', modified: 'Jun 2023', filePath: '/files/certificates/Extracurricular/painting.pdf' },
  ],
  '/home/guest/Projects': [
    { name: 'ubuntu-portfolio', type: 'folder', icon: 'code' },
    { name: 'react-app', type: 'folder', icon: 'code' },
    { name: 'api-server', type: 'folder', icon: 'code' },
  ],
  '/home/guest/Pictures': [
    { name: 'vacation-2023', type: 'folder', icon: 'folder' },
    { name: 'screenshots', type: 'folder', icon: 'folder' },
    { name: 'profile.jpg', type: 'file', icon: 'image', size: '2.4 MB', modified: 'Jan 5' },
  ],
  '/home/guest/Downloads': [
    { name: 'nodejs-installer.deb', type: 'file', icon: 'download', size: '23 MB', modified: 'Today' },
    { name: 'vscode.deb', type: 'file', icon: 'download', size: '78 MB', modified: 'Yesterday' },
  ],
};

const iconMap = {
  folder: Folder,
  document: FileText,
  image: Image,
  music: Music,
  video: Video,
  download: Download,
  code: FileCode,
  pdf: FileType,
  certificates: Folder, // Default, will use custom icon
};

interface FilesProps {
  initialPath?: string;
  onOpenApp?: (appId: string, metadata?: Record<string, string | number | boolean>) => void;
}

export function Files({ initialPath = '/home/guest', onOpenApp }: FilesProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const { userFolders } = useDesktop();

  // Generate Desktop folder dynamically from desktopApps and userFolders
  const desktopFiles = useMemo((): FileItem[] => {
    const appFiles = desktopApps.map(app => ({
      name: app.name,
      type: 'file' as const,
      icon: 'image' as const,
      size: '--',
      modified: 'Today',
      customIcon: app.icon,
      appId: app.id,
      isExternal: app.isExternal,
      externalUrl: app.externalUrl,
    }));

    const folderFiles = userFolders.map(folder => ({
      name: folder.name,
      type: 'folder' as const,
      icon: 'folder' as const,
      size: '--',
      modified: 'Today',
    }));

    return [...appFiles, ...folderFiles];
  }, [userFolders]);

  // Merge static folders with dynamic desktop
  const allFolders = useMemo(() => ({
    ...folders,
    '/home/guest/Desktop': desktopFiles,
  }), [desktopFiles]);

  const currentFiles = allFolders[currentPath] || [];

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(`${currentPath}/${item.name}`);
    } else if (item.type === 'file') {
      // Handle desktop app clicks
      if (item.appId) {
        if (item.isExternal && item.externalUrl) {
          // Open external link in new tab
          window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
        } else if (onOpenApp) {
          // Open app window
          onOpenApp(item.appId);
        }
      }
      // Handle PDF files
      else if (item.icon === 'pdf' && item.filePath) {
        // Open PDF in iframe viewer
        setPdfUrl(item.filePath);
        setShowPdfViewer(true);
      }
    }
  };

  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full flex flex-col bg-ubuntu-window">
      {/* Toolbar */}
      <div className="h-12 bg-ubuntu-window-header flex items-center gap-2 px-3 border-b border-border">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-2 rounded hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/70" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-2 rounded hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5 text-foreground/70" />
        </button>

        {/* Breadcrumb */}
        <div className="flex-1 flex items-center gap-1 bg-muted/30 rounded px-3 py-1.5 mx-2">
          {pathParts.map((part, i) => (
            <span key={i} className="flex items-center gap-1 text-sm">
              <button
                onClick={() => navigateTo('/' + pathParts.slice(0, i + 1).join('/'))}
                className="text-foreground/70 hover:text-foreground"
              >
                {part}
              </button>
              {i < pathParts.length - 1 && <ChevronRight className="w-3 h-3 text-foreground/30" />}
            </span>
          ))}
        </div>

        <button className="p-2 rounded hover:bg-white/10">
          <Search className="w-5 h-5 text-foreground/70" />
        </button>

        <div className="flex items-center border-l border-border pl-2 ml-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <Grid className="w-4 h-4 text-foreground/70" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <List className="w-4 h-4 text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-muted/10 border-r border-border p-3 space-y-1">
          <div className="text-xs uppercase text-muted-foreground font-medium mb-2">Places</div>
          {[
            { name: 'Home', path: '/home/guest' },
            { name: 'Desktop', path: '/home/guest/Desktop' },
            { name: 'Documents', path: '/home/guest/Documents' },
            { name: 'Downloads', path: '/home/guest/Downloads' },
            { name: 'Pictures', path: '/home/guest/Pictures' },
          ].map((place) => (
            <button
              key={place.path}
              onClick={() => navigateTo(place.path)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left ${
                currentPath === place.path ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:bg-white/5'
              }`}
            >
              <Folder className="w-4 h-4" />
              {place.name}
            </button>
          ))}
        </div>

        {/* File Grid/List */}
        <div className="flex-1 p-4 overflow-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {currentFiles.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={item.name}
                    onDoubleClick={() => handleItemClick(item)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/5 focus:bg-white/10 transition-colors"
                  >
                    {item.customIcon ? (
                      <img src={item.customIcon} alt={item.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <Icon className={`w-12 h-12 ${
                        item.type === 'folder' ? 'text-yellow-500' : 
                        item.icon === 'pdf' ? 'text-red-500' : 
                        'text-foreground/60'
                      }`} />
                    )}
                    <span className="text-sm text-foreground/80 text-center line-clamp-2">{item.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs text-muted-foreground uppercase">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Size</div>
                <div className="col-span-3">Modified</div>
              </div>
              {currentFiles.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={item.name}
                    onDoubleClick={() => handleItemClick(item)}
                    className="w-full grid grid-cols-12 gap-4 px-3 py-2 rounded hover:bg-white/5 text-left"
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      {item.customIcon ? (
                        <img src={item.customIcon} alt={item.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <Icon className={`w-5 h-5 ${
                          item.type === 'folder' ? 'text-yellow-500' : 
                          item.icon === 'pdf' ? 'text-red-500' : 
                          'text-foreground/60'
                        }`} />
                      )}
                      <span className="text-sm text-foreground/80">{item.name}</span>
                    </div>
                    <div className="col-span-3 text-sm text-foreground/60">{item.size || '--'}</div>
                    <div className="col-span-3 text-sm text-foreground/60">{item.modified || '--'}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-muted/10 border-t border-border flex items-center px-3 text-xs text-muted-foreground">
        {currentFiles.length} items
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-ubuntu-window rounded-lg w-[95%] h-[95%] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 bg-ubuntu-window-header border-b border-border">
              <div className="flex items-center gap-2">
                <FileType className="w-5 h-5 text-red-500" />
                <h3 className="text-foreground font-medium">{pdfUrl.split('/').pop()}</h3>
              </div>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>
            
            {/* PDF Iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Resume PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
