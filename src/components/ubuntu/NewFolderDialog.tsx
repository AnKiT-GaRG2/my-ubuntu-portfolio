import { useState, useEffect, useRef } from 'react';

interface NewFolderDialogProps {
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export function NewFolderDialog({ onConfirm, onCancel }: NewFolderDialogProps) {
  const [folderName, setFolderName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when dialog opens
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onConfirm(folderName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50 p-2">
      <div
        className="bg-[#3c3c3c] rounded-lg shadow-2xl w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] overflow-hidden"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Dialog Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 border-b border-gray-600">
          <h2 className="text-white text-base font-medium">New folder name</h2>
        </div>

        {/* Dialog Content */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <input
            ref={inputRef}
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#2d2d2d] text-white border-2 border-accent-dynamic rounded px-3 py-2 focus:outline-none focus:border-accent-dynamic text-base"
            placeholder=""
            maxLength={50}
          />
        </form>

        {/* Dialog Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 md:px-6 pb-4 md:pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-[#2d2d2d] text-white rounded hover:bg-[#3d3d3d] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (folderName.trim()) {
                onConfirm(folderName.trim());
              }
            }}
            className="px-6 py-2 bg-accent-dynamic text-white rounded hover:brightness-110 transition-all text-sm"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
