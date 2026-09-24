import rawCustomers from "@/../../../secretDB.json";
import { neon } from "@neondatabase/serverless";
import Person from "@/types/types";

const sql = neon(process.env.DATABASE_URL!);

const customers = rawCustomers as Person[];

const insertPerson = (person: Person) => {
  return sql`INSERT INTO customers (id, first_name, last_name, email, phone, avatar, job_title, company, department, city, country, address, postal_code, status, customer_type, created_at, last_contacted_at, total_orders, total_spent, currency, notes) VALUES (
  ${person.id},
  ${person.firstName},
  ${person.lastName},
  ${person.email},
  ${person.phone},
  ${person.avatar},
  ${person.jobTitle},
  ${person.company},
  ${person.department},
  ${person.city},
  ${person.country},
  ${person.address},
  ${person.postalCode},
  ${person.status},
  ${person.customerType},
  ${person.createdAt},
  ${person.lastContactedAt},
  ${person.totalOrders},
  ${person.totalSpent},
  ${person.currency},
  ${person.notes}
  )`;
};

const main = async () => {
  await sql`TRUNCATE customers`;

  for (let i = 0; i < customers.length; i += 1000) {
    const slips = customers
      .slice(i, i + 1000)
      .map((person) => insertPerson(person));
    await sql.transaction(slips);
    console.log(i);
  }

  const res = await sql`SELECT COUNT(*) FROM customers`;
  console.log(res);
};

main();
