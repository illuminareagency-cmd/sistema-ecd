import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { motivo } = await req.json();
  
  const carta = await prisma.carta.update({
    where: { id },
    data: { status: 'sinalizada' },
  });
  
  return NextResponse.json(carta);
}
