import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);
const perPage = [25, 50, 75, 100];

//translate TS to SQL

const sortColumns: Record<string, string> = {
  id: "id",
  firstName: "first_name",
  lastName: "last_name",
  company: "company",
  country: "country",
  status: "status",
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = Number(params.get("page")) || 1;
  const rawPageSize = Number(params.get("pageSize") ?? 50);
  const pageSize = perPage.includes(rawPageSize) ? rawPageSize : 50;
  const offset = (page - 1) * pageSize;
  const search = params.get("search") ?? "";
  const searchPattern = "%" + search + "%";
  const rawSortField = params.get("sortField") ?? "";
  const sortField = sortColumns[rawSortField] ?? "id";
  const rawSortDir = params.get("sortDir");

  const sortDir = rawSortDir === "dsc" ? "DESC" : "ASC";

  const res =
    await sql`SELECT * FROM customers WHERE (first_name || ' ' || last_name || ' ' || email) ILIKE ${searchPattern} ORDER BY ${sql.unsafe(sortField)} ${sql.unsafe(sortDir)}, id LIMIT ${pageSize} OFFSET ${offset}`;

  const totalRawMatches =
    await sql`SELECT COUNT(*) FROM customers WHERE (first_name || ' ' || last_name || ' ' || email) ILIKE ${searchPattern}`;

  const totalMatches = Number(totalRawMatches[0].count);

  //name translation from SQL to TS

  const customers = res.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    avatar: row.avatar,
    jobTitle: row.job_title,
    company: row.company,
    department: row.department,
    city: row.city,
    country: row.country,
    address: row.address,
    postalCode: row.postal_code,
    status: row.status,
    customerType: row.customer_type,
    createdAt: row.created_at,
    lastContactedAt: row.last_contacted_at,
    totalOrders: row.total_orders,
    totalSpent: Number(row.total_spent),
    currency: row.currency,
    notes: row.notes,
  }));

  return Response.json({ customers: customers, total: totalMatches });
}
