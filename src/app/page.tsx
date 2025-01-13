"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChatInterface } from "@/components/chat/chat-interface";
import { LogPanel } from "@/components/log/log-panel";

export default function Home() {
  const [key, setKey] = useState(0);

  const handleReset = async () => {
    try {
      // First close existing connections and clear logs
      await fetch('/api/logs/reset', { method: 'DELETE' });
      // Then force remount of components
      setKey(prev => prev + 1);
    } catch (error) {
      console.error('Error resetting:', error);
    }
  };

  return (
    <main className="flex h-screen bg-slate-50 p-4 pb-8">
      {/* Left Panel - Logs */}
      <Card className="w-1/2 mr-4 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-hidden">
          <LogPanel key={key} />
        </div>
      </Card>

      {/* Right Panel - Chat */}
      <Card className="w-1/2 p-4 pb-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Financial Analysis Chat</h2>
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
          >
            Reset
          </button>
        </div>
        <Separator className="mb-4" />
        <div className="flex-1 overflow-hidden">
          <ChatInterface key={key} onReset={handleReset} />
        </div>
      </Card>
    </main>
  );
}
