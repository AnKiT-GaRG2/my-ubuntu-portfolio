/**
 * Certificate Information Database
 * Contains details about all certificates including name, date, category, and file path
 */

export interface Certificate {
  name: string;
  displayName: string;
  category: 'academic' | 'extracurricular';
  date: string;
  description: string;
  filePath: string;
  keywords: string[];
}

export const CERTIFICATES: Certificate[] = [
  // Academic Certificates
  {
    name: 'hackaway',
    displayName: 'Hackaway Certificate',
    category: 'academic',
    date: '2025',
    description: 'Secured Second Position in Hackaway 2025, a 16-hour hackathon organized by Robolution, BIT Mesra. Competed as part of Team 4 Pointers, showcasing effective teamwork, rapid prototyping, and innovative problem-solving under strict time constraints.',
    filePath: '/files/certificates/Academics/hackaway.pdf',
    keywords: ['hackaway', 'hackathon', 'hack away']
  },
  {
    name: 'adobe',
    displayName: 'Adobe Certificate',
    category: 'academic',
    date: '2025',
    description: 'Participated in Round 1 (Online MCQ Assessment + Coding) of the Adobe India Hackathon, organized by Adobe. Worked as part of Team WiWiWi, demonstrating strong problem-solving skills, programming fundamentals, and aptitude for competitive technical assessments at a national level.',
    filePath: '/files/certificates/Academics/Adobe.pdf',
    keywords: ['adobe', 'adobe certificate']
  },
  {
    name: 'meta_hacker_cup',
    displayName: 'Meta Hacker Cup Certificate',
    category: 'academic',
    date: '2025',
    description: 'Qualified for Round 2 of the Meta Hacker Cup 2025, an international competitive programming contest organized by Meta. Achieved a 780th rank in Round 1 and 1,180th rank in Round 2, demonstrating strong algorithmic thinking, coding efficiency, and competitive programming skills at a global scale.',
    filePath: '/files/certificates/Academics/Meta Hacker Cup.pdf',
    keywords: ['meta', 'hacker cup', 'meta hacker cup', 'facebook']
  },
  {
    name: 'sih',
    displayName: 'Smart India Hackathon (SIH) Certificate',
    category: 'academic',
    date: '8th September 2024',
    description: 'Participated in the Smart India Hackathon 2024 (Internal Hackathon) held at Birla Institute of Technology, Mesra, Ranchi. Represented Team BITSPACE, gaining hands-on experience in collaborative development, innovation challenges, and solution presentation under the national SIH framework.',
    filePath: '/files/certificates/Academics/SIH.pdf',
    keywords: ['sih', 'smart india hackathon', 'smart india']
  },
  {
    name: 'ideathon',
    displayName: 'Ideathon Certificate',
    category: 'academic',
    date: '2024',
    description: 'Participated in SBI Life IdeationX 2.0 as a member of Team 3Pointers, representing Birla Institute of Technology, Mesra. Contributed to ideation and solution development for real-world problem statements, emphasizing creativity, analytical thinking, and business-oriented innovation.',
    filePath: '/files/certificates/Academics/ideathon.pdf',
    keywords: ['ideathon', 'idea thon']
  },
  {
    name: 'nstse',
    displayName: 'NSTSE Certificate',
    category: 'academic',
    date: '2nd February 2014',
    description: 'Participated in the National Level Science Talent Search Examination (NSTSE 2014), conducted nationwide by Unified Council. Secured 53% marks with a performance rating of “Good”, reflecting early aptitude in science and analytical reasoning during primary education.',
    filePath: '/files/certificates/Academics/nstse.pdf',
    keywords: ['nstse', 'science talent', 'national science']
  },
  {
    name: 'sankalp',
    displayName: 'Sankalp Certificate',
    category: 'academic',
    date: '2024',
    description: 'Actively participated in India’s First 2D Virtual Hackathon – Sankalp 101, organized by the TrishulX Community. Demonstrated enthusiasm, creativity, and technical skills while collaborating in a virtual hackathon environment focused on innovation and problem-solving.',
    filePath: '/files/certificates/Academics/sankalp.pdf',
    keywords: ['sankalp']
  },
  
  // Extracurricular Certificates
  {
    name: 'badminton_state',
    displayName: 'Badminton State Level Certificate',
    category: 'extracurricular',
    date: '20th October 2019',
    description: 'Participated in a State-Level Badminton Tournament held in Dehradun, organized by Shree Sports Academy. Gained exposure to high-level competition, enhancing match experience, endurance, and tactical gameplay at the state level.',
    filePath: '/files/certificates/Extacurricular/Badminton State.pdf',
    keywords: ['badminton', 'state', 'badminton state']
  },
  {
    name: 'badminton_district_u16',
    displayName: 'Badminton District U-16 Certificate',
    category: 'extracurricular',
    date: '24 June 2017',
    description: 'Secured 2nd position in the District-Level Badminton Tournament (Under-16) conducted by Shree Sports Academy. Showcased consistent athletic performance, competitive resilience, and advanced badminton skills against higher age-group participants.',
    filePath: '/files/certificates/Extacurricular/Badminton district_U16.pdf',
    keywords: ['badminton', 'district', 'u16', 'under 16', 'u-16']
  },
  {
    name: 'badminton_district_u13',
    displayName: 'Badminton District U-13 Certificate',
    category: 'extracurricular',
    date: '24 June 2017',
    description: 'Participated in the District-Level Badminton Tournament (Under-13) organized by Shree Sports Academy. Achieved 1st position, demonstrating early competitive sportsmanship, discipline, and strong performance in badminton at the district level.',
    filePath: '/files/certificates/Extacurricular/Badminton_district_u-13.pdf',
    keywords: ['badminton', 'district', 'u13', 'under 13', 'u-13']
  },
  {
    name: 'craft_competition',
    displayName: 'Craft Competition Certificate',
    category: 'extracurricular',
    date: '8 November 2016',
    description: 'Won First Position in the Kalash & Pooja Thali Making Competition organized by The Himalayan Public School. Demonstrated creativity, artistic precision, and attention to detail in a school-level craft competition',
    filePath: '/files/certificates/Extacurricular/Craft_competition.pdf',
    keywords: ['craft', 'craft competition', 'art']
  },
  {
    name: 'painting',
    displayName: 'Painting Certificate',
    category: 'extracurricular',
    date: '25 November 2012',
    description: 'Awarded for excellent performance in Painting at a competition organized by Indira Gandhi Rashtriya Gyanpeeth, Aurangabad. Recognized for creativity and artistic expression during early academic years.',
    filePath: '/files/certificates/Extacurricular/painting.pdf',
    keywords: ['painting', 'art', 'drawing']
  }
];

/**
 * Get all certificates
 */
export function getAllCertificates(): Certificate[] {
  return CERTIFICATES;
}

/**
 * Get certificates by category
 */
export function getCertificatesByCategory(category: 'academic' | 'extracurricular'): Certificate[] {
  return CERTIFICATES.filter(cert => cert.category === category);
}

/**
 * Find a certificate by name or keywords
 */
export function findCertificate(query: string): Certificate | null {
  const lowerQuery = query.toLowerCase();
  
  // Try exact name match first
  let cert = CERTIFICATES.find(c => c.name.toLowerCase() === lowerQuery);
  if (cert) return cert;
  
  // Try display name match
  cert = CERTIFICATES.find(c => c.displayName.toLowerCase().includes(lowerQuery));
  if (cert) return cert;
  
  // Try keyword match
  cert = CERTIFICATES.find(c => 
    c.keywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(lowerQuery)
    )
  );
  
  return cert || null;
}

/**
 * Format certificate list for display
 */
export function formatCertificateList(): string {
  const academic = getCertificatesByCategory('academic');
  const extracurricular = getCertificatesByCategory('extracurricular');
  
  let output = '📜 **My Certificates**\n\n';
  
  output += '**🎓 Academic Certificates:**\n';
  academic.forEach((cert, index) => {
    output += `${index + 1}. ${cert.displayName} (${cert.date})\n`;
  });
  
  output += '\n**🏆 Extracurricular Certificates:**\n';
  extracurricular.forEach((cert, index) => {
    output += `${index + 1}. ${cert.displayName} (${cert.date})\n`;
  });
  
  output += '\n💡 Ask me to show any specific certificate!';
  
  return output;
}
