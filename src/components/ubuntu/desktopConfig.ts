export const desktopApps = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', position: { row: 0, col: 0 }, type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', position: { row: 1, col: 0 }, type: 'image' },
  { id: 'contact', icon: '/icons/contactMe.jpg', name: 'Contact Me', position: { row: 2, col: 0 }, type: 'image' },
  { id: 'review', icon: '/icons/reviewapp.jpg', name: 'Add Review', position: { row: 3, col: 0 }, type: 'image' },
  { id: 'chatbot', icon: '/icons/assistant.png', name: 'AnkiTalk', position: { row: 4, col: 0 }, type: 'image' },
  { id: 'github', icon: '/icons/github.jpg', name: 'GitHub', position: { row: 5, col: 0 }, type: 'image', isExternal: true, externalUrl: 'https://github.com/AnKiT-GaRG2' },
];

export type DesktopApp = typeof desktopApps[number];
