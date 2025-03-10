import { prisma } from "../src/models/PrismaClient";

async function generateNGOData(): Promise<void> {
  const ngoTypes = ['Educational', 'Environmental', 'Healthcare', 'Human Rights', 'Social Services'];
  const statusTypes = ['active', 'inactive', 'pending'];

  const ngos = Array.from({ length: 500 }, (_, i) => ({
    name: `${ngoTypes[Math.floor(Math.random() * ngoTypes.length)]} Initiative ${Math.random()
    .toString(36)
    .substring(2, 10)}`,
    organization_type: ngoTypes[Math.floor(Math.random() * ngoTypes.length)],
    tax_id: `TAX${String(i + 1).padStart(6, '0')}`,
    year_established: Math.floor(Math.random() * (2024 - 1950) + 1950),
    contact_information: {
      email: `contact${i + 1}@ngo${i + 1}.org`,
      phone: `+886${Math.floor(Math.random() * 1000000000)}`,
      address: `${i + 1} NGO Street, Taipei, Taiwan`
    },
    status: statusTypes[Math.floor(Math.random() * statusTypes.length)],
    website: `https://www.ngo${i + 1}.org`,
    social_media: {
      facebook: `https://facebook.com/ngo${i + 1}`,
      twitter: `https://twitter.com/ngo${i + 1}`,
      instagram: `https://instagram.com/ngo${i + 1}`
    },
    notes: `Sample NGO organization ${i + 1} description`
  }));

  try {
    for (const ngo of ngos) {
      await prisma.organizations.create({
        data: ngo
      });
    }
    console.log('Successfully created 500 NGO records');
  }
  catch (error) {
    console.error('Error creating NGO records:', error);
  }
  finally {
    await prisma.$disconnect();
  }
}

generateNGOData().then();