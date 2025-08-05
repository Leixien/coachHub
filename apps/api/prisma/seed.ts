import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default organization
  const organization = await prisma.organization.upsert({
    where: { slug: 'demo-gym' },
    update: {},
    create: {
      name: 'Demo Gym',
      slug: 'demo-gym',
      logoUrl: 'https://via.placeholder.com/200x200?text=Demo+Gym',
      primaryColor: '#0ea5e9',
      secondaryColor: '#22c55e',
    },
  });

  // Create muscle groups
  const muscleGroups = await Promise.all([
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000001' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Chest',
        description: 'Pectoral muscles',
        color: '#ef4444',
        sortOrder: 1,
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000002' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Back',
        description: 'Latissimus dorsi, rhomboids, traps',
        color: '#3b82f6',
        sortOrder: 2,
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000003' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Shoulders',
        description: 'Deltoids',
        color: '#f59e0b',
        sortOrder: 3,
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000004' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000004',
        name: 'Arms',
        description: 'Biceps, triceps, forearms',
        color: '#8b5cf6',
        sortOrder: 4,
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000005' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000005',
        name: 'Legs',
        description: 'Quadriceps, hamstrings, calves',
        color: '#06b6d4',
        sortOrder: 5,
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: '00000000-0000-0000-0000-000000000006' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000006',
        name: 'Core',
        description: 'Abdominals, obliques',
        color: '#10b981',
        sortOrder: 6,
      },
    }),
  ]);

  // Create demo coach user
  const hashedPassword = await bcrypt.hash('demo123', 12);
  
  const coach = await prisma.user.upsert({
    where: { email: 'demo@coachhub.it' },
    update: {},
    create: {
      email: 'demo@coachhub.it',
      passwordHash: hashedPassword,
      firstName: 'Marco',
      lastName: 'Rossi',
      role: 'COACH',
      organizationId: organization.id,
      emailVerified: true,
      isActive: true,
    },
  });

  // Create demo athlete users
  const athlete1 = await prisma.user.upsert({
    where: { email: 'atleta1@coachhub.it' },
    update: {},
    create: {
      email: 'atleta1@coachhub.it',
      passwordHash: hashedPassword,
      firstName: 'Giulia',
      lastName: 'Bianchi',
      role: 'ATHLETE',
      organizationId: organization.id,
      emailVerified: true,
      isActive: true,
    },
  });

  const athlete2 = await prisma.user.upsert({
    where: { email: 'atleta2@coachhub.it' },
    update: {},
    create: {
      email: 'atleta2@coachhub.it',
      passwordHash: hashedPassword,
      firstName: 'Luca',
      lastName: 'Verde',
      role: 'ATHLETE',
      organizationId: organization.id,
      emailVerified: true,
      isActive: true,
    },
  });

  // Create athlete profiles
  const athleteProfile1 = await prisma.athleteProfile.upsert({
    where: { userId: athlete1.id },
    update: {},
    create: {
      userId: athlete1.id,
      dateOfBirth: new Date('1995-06-15'),
      gender: 'FEMALE',
      heightCm: 165,
      activityLevel: 'MODERATE',
      goals: ['Tonificazione', 'Perdita peso'],
      bmr: 1350.00,
      tdee: 1890.00,
    },
  });

  const athleteProfile2 = await prisma.athleteProfile.upsert({
    where: { userId: athlete2.id },
    update: {},
    create: {
      userId: athlete2.id,
      dateOfBirth: new Date('1988-03-22'),
      gender: 'MALE',
      heightCm: 180,
      activityLevel: 'ACTIVE',
      goals: ['Aumento massa muscolare', 'Forza'],
      bmr: 1750.00,
      tdee: 2450.00,
    },
  });

  // Create default exercises (sample)
  const exercises = await Promise.all([
    prisma.exercise.upsert({
      where: { id: '10000000-0000-0000-0000-000000000001' },
      update: {},
      create: {
        id: '10000000-0000-0000-0000-000000000001',
        name: 'Panca Piana con Bilanciere',
        description: 'Esercizio fondamentale per il petto',
        instructions: '1. Sdraiati sulla panca\\n2. Impugna il bilanciere con presa leggermente più ampia delle spalle\\n3. Abbassa il bilanciere al petto controllando il movimento\\n4. Spingi verso l\'alto contraendo i pettorali',
        primaryMuscleGroupId: muscleGroups[0].id, // Chest
        secondaryMuscleGroups: [muscleGroups[3].id], // Arms
        equipmentNeeded: ['Bilanciere', 'Panca piana', 'Dischi'],
        difficultyLevel: 'INTERMEDIATE',
        isDefault: true,
        createdBy: coach.id,
      },
    }),
    prisma.exercise.upsert({
      where: { id: '10000000-0000-0000-0000-000000000002' },
      update: {},
      create: {
        id: '10000000-0000-0000-0000-000000000002',
        name: 'Squat con Bilanciere',
        description: 'Re degli esercizi per le gambe',
        instructions: '1. Posiziona il bilanciere sui trapezi\\n2. Piedi alla larghezza delle spalle\\n3. Scendi contraendo glutei e quadricipiti\\n4. Risali spingendo sui talloni',
        primaryMuscleGroupId: muscleGroups[4].id, // Legs
        secondaryMuscleGroups: [muscleGroups[5].id], // Core
        equipmentNeeded: ['Bilanciere', 'Rack', 'Dischi'],
        difficultyLevel: 'INTERMEDIATE',
        isDefault: true,
        createdBy: coach.id,
      },
    }),
    prisma.exercise.upsert({
      where: { id: '10000000-0000-0000-0000-000000000003' },
      update: {},
      create: {
        id: '10000000-0000-0000-0000-000000000003',
        name: 'Trazioni alla sbarra',
        description: 'Esercizio fondamentale per la schiena',
        instructions: '1. Appenditi alla sbarra con presa prona\\n2. Contrai le scapole\\n3. Tirati su fino a portare il mento sopra la sbarra\\n4. Scendi controllando il movimento',
        primaryMuscleGroupId: muscleGroups[1].id, // Back
        secondaryMuscleGroups: [muscleGroups[3].id], // Arms
        equipmentNeeded: ['Sbarra per trazioni'],
        difficultyLevel: 'ADVANCED',
        isDefault: true,
        createdBy: coach.id,
      },
    }),
  ]);

  // Create sample program template
  const programTemplate = await prisma.programTemplate.create({
    data: {
      name: 'Programma Base Upper/Lower',
      description: 'Programma di allenamento per principianti con split upper/lower',
      durationWeeks: 8,
      phaseType: 'HYPERTROPHY',
      tags: ['Principiante', 'Upper/Lower', 'Ipertrofia'],
      isPublic: true,
      organizationId: organization.id,
      createdBy: coach.id,
    },
  });

  // Create workout days for the program
  const upperDay = await prisma.workoutDay.create({
    data: {
      programTemplateId: programTemplate.id,
      dayNumber: 1,
      weekNumber: 1,
      name: 'Upper Body',
      notes: 'Allenamento parte superiore del corpo',
      sortOrder: 1,
    },
  });

  const lowerDay = await prisma.workoutDay.create({
    data: {
      programTemplateId: programTemplate.id,
      dayNumber: 2,
      weekNumber: 1,
      name: 'Lower Body',
      notes: 'Allenamento parte inferiore del corpo',
      sortOrder: 2,
    },
  });

  // Add exercises to workout days
  await prisma.workoutExercise.createMany({
    data: [
      // Upper Day
      {
        workoutDayId: upperDay.id,
        exerciseId: exercises[0].id, // Panca piana
        sortOrder: 1,
        sets: 4,
        repsMin: 8,
        repsMax: 12,
        restSeconds: 120,
      },
      {
        workoutDayId: upperDay.id,
        exerciseId: exercises[2].id, // Trazioni
        sortOrder: 2,
        sets: 3,
        repsMin: 5,
        repsMax: 8,
        restSeconds: 180,
      },
      // Lower Day
      {
        workoutDayId: lowerDay.id,
        exerciseId: exercises[1].id, // Squat
        sortOrder: 1,
        sets: 4,
        repsMin: 10,
        repsMax: 15,
        restSeconds: 150,
      },
    ],
  });

  // Create program instance for athlete 1
  const programInstance = await prisma.programInstance.create({
    data: {
      templateId: programTemplate.id,
      athleteId: athleteProfile1.id,
      coachId: coach.id,
      name: 'Programma Giulia - Settembre 2024',
      startDate: new Date('2024-09-01'),
      status: 'ACTIVE',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('👤 Demo Users Created:');
  console.log('📧 Coach: demo@coachhub.it / demo123');
  console.log('📧 Athlete 1: atleta1@coachhub.it / demo123');
  console.log('📧 Athlete 2: atleta2@coachhub.it / demo123');
  console.log('');
  console.log(`🏢 Organization: ${organization.name} (${organization.slug})`);
  console.log(`💪 Muscle Groups: ${muscleGroups.length} created`);
  console.log(`🏋️ Exercises: ${exercises.length} created`);
  console.log(`📋 Program Template: ${programTemplate.name}`);
  console.log(`📅 Program Instance: ${programInstance.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
