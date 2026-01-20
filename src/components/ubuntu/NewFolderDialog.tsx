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
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50">
      <div className="bg-[#3c3c3c] rounded-lg shadow-2xl w-[500px] overflow-hidden">
        {/* Dialog Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 border-b border-gray-600">
          <h2 className="text-white text-sm font-medium">New folder name</h2>
        </div>

        {/* Dialog Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <input
            ref={inputRef}
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#2d2d2d] text-white border-2 border-accent-dynamic rounded px-3 py-2 focus:outline-none focus:border-accent-dynamic"
            placeholder=""
            maxLength={50}
          />
        </form>

        {/* Dialog Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
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
