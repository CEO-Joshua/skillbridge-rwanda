import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const opportunitySchema = z.object({
  title: z.string().min(3),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'APPRENTICESHIP', 'FREELANCE', 'CONTRACT', 'PROJECT', 'VOLUNTEER']),
  location: z.string().min(2),
  description: z.string().min(20),
});
