export function HelpCommand() {
  return (
    <div className="text-white whitespace-pre">
{`Available commands:
  about       - Display information about me
  skills      - List my technical skills
  projects    - Show my projects
  education   - View my education
  contact     - Display contact information
  social      - Show social media links
  stats       - View coding statistics
  reviews     - Show all reviews
  add-review  - Open Add Review application
  clear       - Clear the terminal
  welcome     - Display welcome message
  echo        - Echo a message
  date        - Show current date and time
  whoami      - Display current user
  pwd         - Print working directory
  ls          - List directory contents
  cd          - Change directory
  cat         - Display file contents
  history     - Show command history
  mkdir       - Create a new directory
  code        - Open VS Code
  chrome      - Open Chrome browser
  open        - Open an application
  sudo        - Try using sudo (just for fun)
  exit        - Close terminal (use window controls)`}
    </div>
  );
}
