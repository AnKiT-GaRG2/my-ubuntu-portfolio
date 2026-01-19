import { Mail, MapPin, Github, Linkedin, Twitter, Globe, Code, Briefcase, GraduationCap } from 'lucide-react';

export function AboutMe() {
  return (
    <div className="h-full bg-ubuntu-window overflow-auto">
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-6xl shadow-lg">
            👨‍💻
          </div>
          <h1 className="text-3xl font-bold text-foreground">Developer Name</h1>
          <p className="text-xl text-primary mt-2">Full Stack Developer</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-foreground/80 text-center">
            Passionate developer with 5+ years of experience building web applications.
            I love creating elegant solutions to complex problems and contributing to open source.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Code className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">50+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">5+</div>
            <div className="text-sm text-muted-foreground">Years Exp</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">B.Tech</div>
            <div className="text-sm text-muted-foreground">CS Degree</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Tailwind CSS', 'GraphQL'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Connect With Me</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <a href="#" className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground/80 text-sm">developer@example.com</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-foreground/80 text-sm">myportfolio.dev</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <Github className="w-5 h-5 text-foreground" />
              <span className="text-foreground/80 text-sm">github.com/username</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <Linkedin className="w-5 h-5 text-blue-500" />
              <span className="text-foreground/80 text-sm">linkedin.com/in/username</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors col-span-2">
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-foreground/80 text-sm">twitter.com/username</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
