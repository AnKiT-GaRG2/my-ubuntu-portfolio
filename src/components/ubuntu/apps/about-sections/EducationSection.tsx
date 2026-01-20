import { GraduationCap, Star } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Birla Institute Of Technology',
    year: '2023 - Present',
    gpa: '8.2/10',
    description:
      'Strong foundation in software engineering, data structures & algorithms, operating systems, databases, and modern web technologies, with hands-on project and problem-solving experience.',
  },
  {
    degree: 'Senior Secondary (12th)',
    institution: 'Grizzly',
    year: '2020 - 2022',
    gpa: '87.6%',
    description:
      'Completed higher secondary education in Science stream with emphasis on Mathematics, Computer Science, and analytical problem-solving skills.',
  },
  {
    degree: 'Secondary (10th)',
    institution: 'The Himalayan Public School',
    year: '2018 - 2020',
    gpa: '91.6%',
    description:
      'Built a strong academic foundation with focus on Mathematics, Science, and logical reasoning, fostering early interest in technology and computing.',
  },
];

export function EducationSection() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <GraduationCap className="w-7 h-7 text-primary" />
        Educational Background
      </h2>
      {education.map((edu, index) => (
        <div 
          key={index} 
          className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:translate-x-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-primary mt-1">{edu.institution}</p>
            </div>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {edu.year}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-foreground/80 font-medium">GPA: {edu.gpa}</span>
          </div>
          <p className="text-foreground/70">{edu.description}</p>
        </div>
      ))}
    </div>
  );
}
