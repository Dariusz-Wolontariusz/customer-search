import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);
const perPage = [25, 50, 75, 100];

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = Number(params.get("page")) || 1;
  const rawPageSize = Number(params.get("pageSize") ?? 50);
  const pageSize = perPage.includes(rawPageSize) ? rawPageSize : 50;
  const offset = (page - 1) * pageSize;
  const search = params.get("search") ?? "";
  const searchPattern = "%" + search + "%";

  const res =
    await sql`SELECT * FROM customers WHERE (first_name || ' ' || last_name || ' ' || email) ILIKE ${searchPattern} ORDER BY id LIMIT ${pageSize} OFFSET ${offset}`;

  const totalRawMatches =
    await sql`SELECT COUNT(*) FROM customers WHERE (first_name || ' ' || last_name || ' ' || email) ILIKE ${searchPattern}`;

  const totalMatches = Number(totalRawMatches[0].count);

  return Response.json({ customers: res, total: totalMatches });
}
