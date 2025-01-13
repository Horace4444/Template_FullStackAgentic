import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the logs from the parent route's memory store
    const mod = await import('../route');
    if ('recentLogs' in mod) {
      (mod.recentLogs as any[]).length = 0;
    }
    
    // Broadcast a reset event to all connections
    const resetLog = {
      type: 'info',
      message: 'Conversation reset',
      timestamp: new Date().toISOString(),
    };
    
    if ('broadcastLog' in mod) {
      (mod.broadcastLog as Function)(resetLog);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resetting logs:', error);
    return NextResponse.json(
      { error: 'Failed to reset logs' },
      { status: 500 }
    );
  }
} 