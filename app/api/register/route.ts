import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const body = await req.json();
  const data = schema.safeParse(body);

  if (!data.success) {
    return Response.json({ error: 'Invalid registration data.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: data.data.email } });
  if (existing) {
    return Response.json({ error: 'This email is already registered.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(data.data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.data.name,
      email: data.data.email,
      passwordHash,
      role: 'CANDIDATE',
    },
  });

  return Response.json({ id: user.id, email: user.email, role: user.role }, { status: 201 });
}
