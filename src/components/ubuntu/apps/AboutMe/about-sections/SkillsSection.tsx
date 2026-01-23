import { useState } from 'react';
import { Sparkles, Zap, Terminal, Brain, Database } from 'lucide-react';

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

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
          <div className="text-3xl font-bold text-foreground mb-1">20+</div>
          <div className="text-sm text-muted-foreground">Technologies</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-all duration-300">
          <Brain className="w-8 h-8 mx-auto mb-3 text-purple-500" />
          <div className="text-3xl font-bold text-foreground mb-1">4+</div>
          <div className="text-sm text-muted-foreground">Domains</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:scale-105 transition-all duration-300">
          <Database className="w-8 h-8 mx-auto mb-3 text-green-500" />
          <div className="text-3xl font-bold text-foreground mb-1">75%</div>
          <div className="text-sm text-muted-foreground">Avg Expertise</div>
        </div>
      </div>
    </div>
  );
}
