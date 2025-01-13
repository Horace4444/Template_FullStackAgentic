import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Store active connections and recent logs
const connections = new Set<ReadableStreamDefaultController>();
const recentLogs: Array<{ timestamp: string; type: string; message: string }> = [];
const MAX_LOGS = 100;

// Broadcast a log to all active connections
function broadcastLog(log: any) {
  const deadConnections = new Set<ReadableStreamDefaultController>();
  
  connections.forEach(controller => {
    try {
      controller.enqueue(`data: ${JSON.stringify(log)}\n\n`);
    } catch (error) {
      deadConnections.add(controller);
    }
  });

  // Cleanup dead connections
  deadConnections.forEach(controller => {
    connections.delete(controller);
  });
}

// Broadcast a reset event to all connections
function broadcastReset() {
  const deadConnections = new Set<ReadableStreamDefaultController>();
  
  connections.forEach(controller => {
    try {
      controller.enqueue(`event: reset\ndata: {}\n\n`);
    } catch (error) {
      deadConnections.add(controller);
    }
  });

  // Cleanup dead connections
  deadConnections.forEach(controller => {
    connections.delete(controller);
  });
}

// GET handler for SSE stream
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      connections.add(controller);
    },
    cancel(reason) {
      connections.delete(reason);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// POST handler for new logs
export async function POST(request: Request) {
  const log = await request.json();
  log.timestamp = new Date().toISOString();
  
  // Add to recent logs
  recentLogs.push(log);
  if (recentLogs.length > MAX_LOGS) {
    recentLogs.shift();
  }

  // Broadcast to all connections
  broadcastLog(log);

  return new Response('OK');
}

// Reset logs
export async function DELETE() {
  // Clear recent logs
  recentLogs.length = 0;
  
  // Broadcast reset event
  broadcastReset();
  
  return new Response('OK');
} 