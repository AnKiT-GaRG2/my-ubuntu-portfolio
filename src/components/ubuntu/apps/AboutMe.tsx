import { useState } from 'react';
import { Code, GraduationCap, Lightbulb, FolderGit2, BookOpen, Star } from 'lucide-react';
import { AboutSection } from './about-sections/AboutSection';
import { EducationSection } from './about-sections/EducationSection';
import { SkillsSection } from './about-sections/SkillsSection';
import { ProjectsSection } from './about-sections/ProjectsSection';
import { ResumeSection } from './about-sections/ResumeSection';
import { ReviewsSection } from './about-sections/ReviewsSection';

interface AboutMeProps {
  initialSection?: string;
}

export function AboutMe({ initialSection = 'about' }: AboutMeProps) {
  const [activeTab, setActiveTab] = useState(initialSection);

  const tabs = [
    { id: 'about', label: 'About Me', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', icon: BookOpen },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'resume':
        return <ResumeSection />;
      case 'reviews':
        return <ReviewsSection />;
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
