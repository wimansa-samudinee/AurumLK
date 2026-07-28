import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "./prisma.js";

dotenv.config();

async function seed() {
  await prisma.inquiry.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.center.deleteMany();
  await prisma.user.deleteMany();

  const adminPasswordRaw = process.env.SEED_ADMIN_PASSWORD;
  const customerPasswordRaw = process.env.SEED_CUSTOMER_PASSWORD;
  const businessPasswordRaw = process.env.SEED_BUSINESS_PASSWORD;

  const adminName = process.env.SEED_ADMIN_NAME;
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const customerName = process.env.SEED_CUSTOMER_NAME;
  const customerEmail = process.env.SEED_CUSTOMER_EMAIL;
  const businessName = process.env.SEED_BUSINESS_NAME;
  const businessEmail = process.env.SEED_BUSINESS_EMAIL;
  const businessLicense = process.env.SEED_BUSINESS_LICENSE;

  const centerDesc = process.env.SEED_CENTER_DESC;
  const centerAddr = process.env.SEED_CENTER_ADDR;
  const centerCity = process.env.SEED_CENTER_CITY;
  const centerPhone = process.env.SEED_CENTER_PHONE;
  const centerWeb = process.env.SEED_CENTER_WEB;

  const branch1Name = process.env.SEED_BRANCH_1_NAME;
  const branch1Addr = process.env.SEED_BRANCH_1_ADDR;
  const branch1City = process.env.SEED_BRANCH_1_CITY;
  const branch1Phone = process.env.SEED_BRANCH_1_PHONE;
  const branch1Hours = process.env.SEED_BRANCH_1_HOURS;

  const branch2Name = process.env.SEED_BRANCH_2_NAME;
  const branch2Addr = process.env.SEED_BRANCH_2_ADDR;
  const branch2City = process.env.SEED_BRANCH_2_CITY;
  const branch2Phone = process.env.SEED_BRANCH_2_PHONE;
  const branch2Hours = process.env.SEED_BRANCH_2_HOURS;

  if (
    !adminPasswordRaw || !customerPasswordRaw || !businessPasswordRaw ||
    !adminName || !adminEmail || !customerName || !customerEmail ||
    !businessName || !businessEmail || !businessLicense ||
    !centerDesc || !centerAddr || !centerCity || !centerPhone || !centerWeb ||
    !branch1Name || !branch1Addr || !branch1City || !branch1Phone || !branch1Hours ||
    !branch2Name || !branch2Addr || !branch2City || !branch2Phone || !branch2Hours
  ) {
    throw new Error("All seed variables (passwords, names, emails, license, center, branches) must be configured in environment variables.");
  }

  const adminPassword = await bcrypt.hash(adminPasswordRaw, 10);
  const customerPassword = await bcrypt.hash(customerPasswordRaw, 10);
  const businessPassword = await bcrypt.hash(businessPasswordRaw, 10);

  await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "ADMIN",
      approved: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: customerName,
      email: customerEmail,
      password: customerPassword,
      role: "CUSTOMER",
      approved: true,
    },
  });

  const business = await prisma.user.create({
    data: {
      name: businessName,
      email: businessEmail,
      password: businessPassword,
      role: "BUSINESS",
      businessName: businessName,
      licenseNumber: businessLicense,
      approved: true,
    },
  });

  const center = await prisma.center.create({
    data: {
      name: businessName,
      description: centerDesc,
      address: centerAddr,
      city: centerCity,
      phone: centerPhone,
      website: centerWeb,
      rating: 4.7,
      branches: {
        create: [
          {
            name: branch1Name,
            address: branch1Addr,
            city: branch1City,
            phone: branch1Phone,
            openingHours: branch1Hours,
          },
          {
            name: branch2Name,
            address: branch2Addr,
            city: branch2City,
            phone: branch2Phone,
            openingHours: branch2Hours,
          },
        ],
      },
      offers: {
        create: [
          {
            title: "Regular Gold Loan",
            type: "Regular",
            rate: 1.2,
            maxAmount: 10000000,
            tenure: "12 months",
            description: "Affordable regular gold loan with low monthly interest.",
            active: true,
            business: { connect: { id: business.id } },
          },
          {
            title: "Express Gold Loan",
            type: "Express",
            rate: 1.5,
            maxAmount: 5000000,
            tenure: "6 months",
            description: "Fast approval loan for urgent cash needs.",
            active: true,
            business: { connect: { id: business.id } },
          },
        ],
      },
    },
    include: { branches: true, offers: true },
  });

  await prisma.inquiry.create({
    data: {
      subject: "Interest rates",
      message: "Can you provide the exact monthly payment for a 7,000,000 LKR loan?",
      customerId: customer.id,
      businessId: business.id,
      offerId: center.offers[0].id,
    },
  });

  console.log("✅ Seed completed: admin, customer, business, center, branch, offers, inquiry.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
