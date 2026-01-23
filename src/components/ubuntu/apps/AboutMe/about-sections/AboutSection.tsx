import { Mail, MapPin, Github, Linkedin, Twitter, Code, Briefcase, Award, Rocket } from 'lucide-react';

export function AboutSection() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-muted/30 rounded-lg border border-border">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg hover:scale-105 transition-transform duration-300">
          <img 
            src="profilepic.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ankit Garg</h1>
          <p className="text-xl text-primary mb-3">ML Enthusiast + Full Stack Developer</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span>India</span>
          </div>
          <div className="flex gap-3 justify-center md:justify-start">
            <a href="https://github.com/AnKiT-GaRG2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:anki88520@gmail.com" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-muted/40 hover:bg-primary/20 rounded-lg transition-all hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-colors">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          About Me
        </h2>
        
        <p className="text-foreground/80 leading-relaxed mb-4">
          Passionate Full Stack Developer with expertise in building modern web applications. 
          I love creating elegant solutions to complex problems and contributing to open source projects.
          With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean, efficient code.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          When I'm not coding, you can find me exploring new technologies, Listening Music, 
          or Travelling. I believe in continuous learning and staying 
          updated with the latest trends.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
          <Code className="w-8 h-8 mx-auto mb-3 text-primary" />
          <div className="text-3xl font-bold text-foreground mb-1">10+</div>
          <div className="text-sm text-muted-foreground">Projects</div>
        </div>
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
          <Briefcase className="w-8 h-8 mx-auto mb-3 text-primary" />
          <div className="text-3xl font-bold text-foreground mb-1">6+</div>
          <div className="text-sm text-muted-foreground">Hackathons</div>
        </div>
        <div className="text-center p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300">
          <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
          <div className="text-3xl font-bold text-foreground mb-1">8+</div>
          <div className="text-sm text-muted-foreground">Certificates</div>
        </div>
      </div>
    </div>
  );
}
