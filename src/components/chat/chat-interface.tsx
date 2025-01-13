"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onReset?: () => void;
}

export function ChatInterface({ onReset }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setMessages([]);
    setInput('');
    try {
      await fetch('/api/logs/reset', { method: 'DELETE' });
      onReset?.();
    } catch (error) {
      console.error('Error resetting:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request: ' + (error as Error).message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 overflow-auto mb-6 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-100'
                : 'bg-white border border-slate-200 shadow-sm'
            }`}
          >
            {message.role === 'assistant' ? (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{children}</h3>,
                  p: ({ children }) => <p className="text-slate-900 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-slate-900 space-y-2">{children}</ul>,
                  li: ({ children }) => <li className="text-slate-900">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-emerald-800">{children}</strong>,
                  em: ({ children }) => <em className="text-slate-900 italic">{children}</em>,
                  code: ({ children }) => <code className="bg-slate-100 text-slate-900 px-1 py-0.5 rounded">{children}</code>
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <div className="text-emerald-900 font-medium">{message.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 p-4 bg-white border-t border-slate-200">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a detailed question about a company's financials, risks, or market position..."
          className="flex-1 p-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          style={{ minHeight: '80px', maxHeight: '160px' }}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className={`px-5 py-3 rounded-lg font-medium transition-colors ${
            isLoading
              ? 'bg-slate-100 text-slate-500'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Submit'}
        </button>
      </div>
    </div>
  );
} 