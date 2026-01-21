# Terminal V2 - Component-Based Architecture

## Overview

TerminalV2 is a refactored version of the Terminal component that uses a modular, component-based architecture for better code organization and maintainability.

## Architecture

### Command Components

Each terminal command output has been extracted into its own React component located in `src/components/ubuntu/apps/terminal/`:

```
terminal/
├── index.tsx           # Central export file
├── HelpCommand.tsx     # help command output
├── AboutCommand.tsx    # about command output
├── SkillsCommand.tsx   # skills command output
├── ProjectsCommand.tsx # projects command output
├── EducationCommand.tsx# education command output
├── StatsCommand.tsx    # stats command output
├── ContactCommand.tsx  # contact command output
├── SocialCommand.tsx   # social command output
├── ReviewsCommand.tsx  # reviews command output
└── WelcomeCommand.tsx  # welcome message
```

### Benefits

1. **Improved Readability**: Each command's output is in its own file, making it easy to find and edit
2. **Better Maintainability**: Changes to command outputs don't require editing a large COMMANDS object
3. **Type Safety**: Each component is properly typed with React.ReactNode
4. **Reusability**: Command components can be reused elsewhere if needed
5. **Separation of Concerns**: Logic (Terminal) is separated from presentation (Command components)
6. **Easier Testing**: Each command component can be tested independently

## Component Structure

### Command Component Example

```tsx
// HelpCommand.tsx
export function HelpCommand() {
  return (
    <div className="text-white whitespace-pre">
{`Available commands:
  about       - Display information about me
  skills      - List my technical skills
  projects    - Show my projects
  ...`}
    </div>
  );
}
```

### Usage in TerminalV2

```tsx
import {
  HelpCommand,
  AboutCommand,
  SkillsCommand,
  // ... other commands
} from './terminal';

// In processCommand function
switch (command) {
  case 'help':
    output = <HelpCommand />;
    break;
  case 'about':
    output = <AboutCommand />;
    break;
  // ... other cases
}
```

## Migration from Terminal.tsx to TerminalV2.tsx

### Old Approach (Terminal.tsx)
```tsx
const COMMANDS = {
  help: `Available commands: ...`,
  about: `Long multiline string ...`,
  // ... hundreds of lines of string content
};

// Usage
output = COMMANDS.help;
```

### New Approach (TerminalV2.tsx)
```tsx
import { HelpCommand, AboutCommand } from './terminal';

// Usage
output = <HelpCommand />;
output = <AboutCommand />;
```

## Files Modified/Created

### Created Files
- `src/components/ubuntu/apps/terminal/` (directory)
- `src/components/ubuntu/apps/terminal/index.tsx`
- `src/components/ubuntu/apps/terminal/HelpCommand.tsx`
- `src/components/ubuntu/apps/terminal/AboutCommand.tsx`
- `src/components/ubuntu/apps/terminal/SkillsCommand.tsx`
- `src/components/ubuntu/apps/terminal/ProjectsCommand.tsx`
- `src/components/ubuntu/apps/terminal/EducationCommand.tsx`
- `src/components/ubuntu/apps/terminal/StatsCommand.tsx`
- `src/components/ubuntu/apps/terminal/ContactCommand.tsx`
- `src/components/ubuntu/apps/terminal/SocialCommand.tsx`
- `src/components/ubuntu/apps/terminal/ReviewsCommand.tsx`
- `src/components/ubuntu/apps/terminal/WelcomeCommand.tsx`
- `src/components/ubuntu/apps/TerminalV2.tsx`

### Modified Files
- `src/types/ubuntu.ts` - Updated TerminalLine to support React.ReactNode

## How to Use

### Switch to TerminalV2

Update `Desktop.tsx` to use TerminalV2 instead of Terminal:

```tsx
// Import
import { TerminalV2 } from './apps/TerminalV2';

// In renderWindowContent
case 'terminal':
  return <TerminalV2 onOpenApp={openWindow} onCreateFolder={handleCreateFolder} />;
```

### Adding New Commands

1. Create a new command component in `terminal/` directory:

```tsx
// NewCommand.tsx
export function NewCommand() {
  return (
    <div className="text-white whitespace-pre">
{`Your command output here`}
    </div>
  );
}
```

2. Export it from `terminal/index.tsx`:

```tsx
export { NewCommand } from './NewCommand';
```

3. Import and use in TerminalV2:

```tsx
import { NewCommand } from './terminal';

// In processCommand
case 'newcommand':
  output = <NewCommand />;
  break;
```

### Updating Command Output

Simply edit the corresponding command component file. For example, to update the skills display, edit `terminal/SkillsCommand.tsx`.

## Features Preserved

All original Terminal features are preserved:
- ✅ Command history (Up/Down arrows)
- ✅ Cursor navigation (Left/Right, Home, End)
- ✅ Tab completion
- ✅ Multi-character input with proper cursor positioning
- ✅ Block cursor with blink animation
- ✅ Directory navigation (cd, pwd, ls)
- ✅ File operations (cat, mkdir)
- ✅ Application launching (open, code, chrome)
- ✅ All original commands

## Technical Details

### Type Updates

```typescript
// ubuntu.ts
export interface TerminalLine {
  type: 'input' | 'output';
  content: string | React.ReactNode;  // Now supports React components
}
```

### State Management

```tsx
const [lines, setLines] = useState<TerminalLine[]>([
  { type: 'output', content: <WelcomeCommand /> },  // Component instead of string
]);
```

### Rendering

```tsx
{lines.map((line, index) => (
  <div key={index} className="whitespace-pre-wrap">
    {line.type === 'input' ? (
      // Input line rendering
    ) : (
      <div className="text-white">{line.content}</div>  // Renders both strings and components
    )}
  </div>
))}
```

## Performance

No performance impact - React efficiently renders both string and component content. Components are only rendered when their command is executed.

## Future Enhancements

Possible improvements:
1. **Dynamic Content**: Command components can accept props for dynamic data
2. **Animations**: Add entry animations to command outputs
3. **Interactive Elements**: Commands could include clickable links or buttons
4. **Syntax Highlighting**: Easy to add color-coding per command
5. **Custom Styling**: Each command can have its own styling

## Example: Dynamic Command Component

```tsx
// SkillsCommand.tsx with props
interface SkillsCommandProps {
  filter?: string;
}

export function SkillsCommand({ filter }: SkillsCommandProps) {
  // Filter skills based on props
  return <div>...</div>;
}

// Usage in Terminal
output = <SkillsCommand filter="web" />;
```

## Testing

Each command component can be tested independently:

```tsx
import { render } from '@testing-library/react';
import { HelpCommand } from './HelpCommand';

test('renders help command', () => {
  const { getByText } = render(<HelpCommand />);
  expect(getByText(/Available commands/i)).toBeInTheDocument();
});
```

## Conclusion

TerminalV2 provides a clean, maintainable architecture for terminal commands while preserving all original functionality. The component-based approach makes the codebase more organized and easier to work with.
