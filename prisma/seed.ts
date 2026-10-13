import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.savedOpportunity.deleteMany();
  await prisma.application.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.organizationVerification.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.portfolioProject.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.education.deleteMany();
  await prisma.candidateProfile.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.report.deleteMany();
  await prisma.careerArticle.deleteMany();
  await prisma.platformSetting.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const candidatePassword = await bcrypt.hash('candidate123', 10);
  const employerPassword = await bcrypt.hash('employer123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@skillbridge.rw',
      name: 'Platform Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  const candidate = await prisma.user.create({
    data: {
      email: 'candidate@skillbridge.rw',
      name: 'Aline Uwase',
      passwordHash: candidatePassword,
      role: 'CANDIDATE',
      candidateProfile: {
        create: {
          headline: 'Frontend Developer',
          bio: 'Building accessible and user-centered web experiences for underserved communities.',
          location: 'Kigali',
          preferredLocations: ['Kigali', 'Huye'],
          availability: 'Available within 2 weeks',
          preferredOpportunityTypes: ['FULL_TIME', 'INTERNSHIP', 'PROJECT'],
          skills: ['Next.js', 'TypeScript', 'UI Design', 'Accessibility'],
          publicProfile: true,
        },
      },
    },
    include: { candidateProfile: true },
  });

  const employer = await prisma.user.create({
    data: {
      email: 'employer@skillbridge.rw',
      name: 'Mugisha & Co',
      passwordHash: employerPassword,
      role: 'EMPLOYER',
    },
  });

  const organization = await prisma.organization.create({
    data: {
      name: 'Rwanda Digital Hub',
      slug: 'rwanda-digital-hub',
      description: 'Demo employer organization focused on digital innovation and skills development.',
      industry: 'Technology',
      location: 'Kigali',
      website: 'https://example.com',
      email: 'hello@rwandadigitalhub.rw',
      verified: true,
      verificationStatus: 'APPROVED',
      ownerId: employer.id,
    },
  });

  await prisma.organizationMember.create({
    data: {
      organizationId: organization.id,
      userId: employer.id,
      role: 'OWNER',
    },
  });

  const opportunity = await prisma.opportunity.create({
    data: {
      organizationId: organization.id,
      title: 'Frontend Developer Internship',
      type: 'INTERNSHIP',
      location: 'Kigali',
      remote: false,
      sector: 'Technology',
      description: 'Support product teams in shipping accessible user experiences and learning modern design systems.',
      responsibilities: 'Build responsive pages, support QA, document UI patterns, and collaborate with product teams.',
      qualifications: 'Strong understanding of modern frontend tooling and a willingness to learn.',
      requiredSkills: ['React', 'TypeScript', 'CSS', 'Accessibility'],
      experienceLevel: 'Entry-level',
      compensation: 'RWF 150,000 monthly stipend',
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isPublished: true,
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: candidate.id,
        title: 'Profile reminder',
        message: 'Complete your profile to unlock more matching opportunities.',
      },
      {
        userId: employer.id,
        title: 'Verification status',
        message: 'Your organization is approved and can post opportunities.',
      },
    ],
  });

  await prisma.careerArticle.createMany({
    data: [
      {
        title: 'How to write a strong Rwanda job application',
        slug: 'how-to-write-a-strong-rwanda-job-application',
        summary: 'A simple guide to help applicants clearly communicate value and fit.',
        content: 'Use a concise summary, list relevant projects, and explain outcomes clearly...',
        published: true,
      },
      {
        title: 'Building a portfolio that employers notice',
        slug: 'building-a-portfolio-that-employers-notice',
        summary: 'Portfolio guidance for early-career professionals and digital talent.',
        content: 'Show the problem, your contribution, the tools used, and the measured impact.',
        published: true,
      },
    ],
  });

  await prisma.platformSetting.createMany({
    data: [
      { key: 'demo_mode', value: 'true' },
      { key: 'matching_algorithm', value: 'skills_weighted_v1' },
    ],
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'seed.demo_data',
      details: 'Initial demo records created for SkillBridge Rwanda.',
    },
  });

  console.log('Demo data created.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
