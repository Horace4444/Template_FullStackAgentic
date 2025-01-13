"use client";

interface ChatResetProps {
  onReset?: () => void;
}

export function ChatReset({ onReset }: ChatResetProps) {
  const handleReset = async () => {
    try {
      await fetch('/api/logs/reset', { method: 'DELETE' });
      onReset?.();
    } catch (error) {
      console.error('Error resetting:', error);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
    >
      Reset
    </button>
  );
} 