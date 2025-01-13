"use client";

import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'step' | 'result';
  message: string;
}

export function LogPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    // Close any existing connection
    if (eventSource) {
      eventSource.close();
    }

    // Create new EventSource with a timestamp to prevent caching
    const es = new EventSource(`/api/logs?t=${Date.now()}`);
    setEventSource(es);

    // Handle individual log messages
    es.onmessage = (event) => {
      const log = JSON.parse(event.data);
      setLogs(prev => [...prev, log]);
    };

    // Handle reset events
    es.addEventListener('reset', () => {
      setLogs([]);
    });

    // Cleanup on unmount
    return () => {
      es.close();
      setEventSource(null);
      setLogs([]);
    };
  }, []); // Empty dependency array to only run on mount

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-4">System Logs</h2>
      <div className="flex-1 space-y-2 overflow-auto pr-2">
        {logs.length === 0 ? (
          <div className="text-center text-slate-500 italic">
            Waiting for system logs...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={`${log.timestamp}-${index}`}
              className={`p-3 rounded-lg ${
                log.type === 'step'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : log.type === 'info'
                  ? 'bg-slate-50 text-slate-700 border border-slate-100'
                  : 'bg-white text-emerald-700 border border-emerald-100'
              }`}
            >
              <div className="text-xs opacity-75 mb-1">
                {new Date(log.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-sm">{log.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 