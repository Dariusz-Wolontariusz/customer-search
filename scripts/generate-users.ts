import { faker } from "@faker-js/faker";
import fs from "node:fs";
import path from "node:path";

type Status = "active" | "inactive" | "pending";
type CustomerType = "private" | "business";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  jobTitle: string;
  company: string;
  department: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  status: Status;
  customerType: CustomerType;
  createdAt: string;
  lastContactedAt: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  notes: string;
};

const statuses: Status[] = ["active", "inactive", "pending"];
const customerTypes: CustomerType[] = ["private", "business"];
const countryCurrencyPairs = [
  { country: "Norway", currency: "NOK" },
  { country: "Sweden", currency: "SEK" },
  { country: "Denmark", currency: "DKK" },
  { country: "Poland", currency: "PLN" },
  { country: "Germany", currency: "EUR" },
  { country: "Spain", currency: "EUR" },
  { country: "France", currency: "EUR" },
  { country: "Netherlands", currency: "EUR" },
  { country: "United Kingdom", currency: "GBP" },
  { country: "United States", currency: "USD" },
  { country: "Canada", currency: "CAD" },
];
const departments = ["Sales", "Marketing", "Support", "IT", "Finance", "HR"];
const notes = [
  "Prefers email contact.",
  "Prefers phone contact during business hours.",
  "Interested in premium services.",
  "Interested in a business account.",
  "Requested a follow-up next month.",
  "Requested more information about pricing.",
  "Asked for a product demo.",
  "Asked for help with onboarding.",
  "Usually responds within a few days.",
  "Slow response time, but still interested.",
  "Long-term customer with stable activity.",
  "New customer, needs initial follow-up.",
  "Potential business customer.",
  "Potential upgrade opportunity.",
  "Needs support before making a decision.",
  "Waiting for internal approval.",
  "Asked to be contacted after the weekend.",
  "Prefers communication in writing.",
  "Has previously contacted support.",
  "Recently updated contact details.",
  "Interested in monthly billing.",
  "Interested in annual billing.",
  "Asked about cancellation terms.",
  "Asked about available discounts.",
  "Requested invoice by email.",
  "Requested receipt copy.",
  "Has an open support question.",
  "Support case resolved successfully.",
  "Positive feedback after last contact.",
  "Negative feedback after last contact.",
  "Needs clearer product information.",
  "Asked for comparison with competitors.",
  "May need technical assistance.",
  "Decision maker not yet confirmed.",
  "Company size not yet confirmed.",
  "Budget not yet confirmed.",
  "High-value customer.",
  "Low activity in recent months.",
  "No recent orders.",
  "Frequent repeat customer.",
  "Recently placed a large order.",
  "Usually orders small quantities.",
  "Interested in new features.",
  "Asked to receive product updates.",
  "Do not contact too frequently.",
  "Prefers short messages.",
  "Requested contact in the morning.",
  "Requested contact in the afternoon.",
  "Customer profile needs review.",
  "Good candidate for reactivation campaign.",
];

const users: Person[] = Array.from({ length: 50000 }, (_, index) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const countryCurrency = faker.helpers.arrayElement(countryCurrencyPairs);

  const createdAt = faker.date.past({ years: 3 });
  const lastContactedAt = faker.date.between({
    from: createdAt,
    to: new Date(),
  });

  return {
    id: index + 1,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    jobTitle: faker.person.jobTitle(),
    company: faker.company.name(),
    department: faker.helpers.arrayElement(departments),
    city: faker.location.city(),
    country: countryCurrency.country,
    address: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    status: faker.helpers.arrayElement(statuses),
    customerType: faker.helpers.arrayElement(customerTypes),
    createdAt: createdAt.toISOString(),
    lastContactedAt: lastContactedAt.toISOString(),
    totalOrders: faker.number.int({ min: 0, max: 80 }),
    totalSpent: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
    currency: countryCurrency.currency,
    notes: `${faker.helpers.arrayElement(notes)} Last update: ${lastContactedAt.toLocaleDateString("en-GB")}.`,
  };
});

const filePath = path.join(process.cwd(), "public", "mockData.json");

fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

console.log(`Created ${users.length} users in public/mockData.json`);
