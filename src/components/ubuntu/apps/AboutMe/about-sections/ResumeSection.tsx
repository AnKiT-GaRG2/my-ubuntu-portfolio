import { Download, ExternalLink, BookOpen, Briefcase, Brain, Award } from 'lucide-react';

export function ResumeSection() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* PDF Preview */}
      <div className="bg-muted/20 rounded-xl border border-border overflow-hidden">
        <div className="bg-muted/30 px-6 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Resume Preview
          </h3>
          <span className="text-xs text-muted-foreground">Software_engineering_internL.pdf</span>
        </div>
        <div className="p-4 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="/files/Software_engineering_internL.pdf"
              className="w-full h-[600px] border-0"
              title="Resume Preview"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            💡 Tip: Use the buttons above to download or open in a new tab for better viewing
          </p>
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center p-8 bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl border border-border">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <Download className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-3">My Resume</h2>
        <p className="text-foreground/70 mb-6 max-w-md mx-auto">
          Download my complete resume with detailed information about my experience, skills, and achievements.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/files/Software_engineering_internL.pdf"
            download="Ankit_Garg_Resume.pdf"
            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
          <a
            href="/files/Software_engineering_internL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-muted/40 hover:bg-muted/60 text-foreground rounded-lg font-medium transition-all hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            Open in New Tab
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-all duration-300">
          <Briefcase className="w-8 h-8 mx-auto mb-3 text-blue-500" />
          <div className="text-2xl font-bold text-foreground mb-1">Full Stack</div>
          <div className="text-sm text-muted-foreground">Developer</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-all duration-300">
          <Brain className="w-8 h-8 mx-auto mb-3 text-purple-500" />
          <div className="text-2xl font-bold text-foreground mb-1">ML</div>
          <div className="text-sm text-muted-foreground">Enthusiast</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:scale-105 transition-all duration-300">
          <Award className="w-8 h-8 mx-auto mb-3 text-green-500" />
          <div className="text-2xl font-bold text-foreground mb-1">B.Tech</div>
          <div className="text-sm text-muted-foreground">CS Student</div>
        </div>
      </div>
    </div>
  );
}
