# Customer Search

A portfolio project: a customer search app over 50,000 generated customer records, built with Next.js, TypeScript and PostgreSQL.

**Live demo:** [Customer search](https://customer-search-three.vercel.app/)

## Features

- Search by name or email
- Customer detail panel with full keyboard support
- Server-side pagination with 25, 50, 75 or 100 rows per page
- Sorting by name, email, company, status and country
- Search term and page number stored in the URL, so results can be shared or bookmarked

## How it works

The customer data lives in a PostgreSQL database hosted on Neon. The first version shipped all records as one large JSON file that every visitor had to download. Moving the data to a database means the browser only receives the rows it shows.

Search, sorting and pagination all run in the database through a Next.js API route. Sort parameters are checked against an allowlist before they reach the query.

Search input is debounced by 500 ms, so the database gets one query when the user stops typing instead of one per keystroke.

The detail panel follows common dialog patterns: focus moves into the panel when it opens, Escape closes it, focus returns to the row that opened it, and the page behind is made inert.

All customer data is fake, generated with Faker.

## Tech stack

- Next.js (App Router)
- TypeScript
- PostgreSQL (Neon)
- CSS Modules
- Vercel

## API

`GET /api/customers`

| Parameter   | Description                                                 | Default |
| ----------- | ----------------------------------------------------------- | ------- |
| `page`      | Page number                                                 | `1`     |
| `pageSize`  | Rows per page: `25`, `50`, `75` or `100`                    | `50`    |
| `search`    | Matches first name, last name and email                     | empty   |
| `sortField` | `id`, `lastName`, `email`, `company`, `status` or `country` | `id`    |
| `sortDir`   | `asc` or `dsc`                                              | `asc`   |

Response:

```json
{
  "customers": [],
  "total": 0
}
```

## Running locally

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Dariusz-Wolontariusz/customer-search.git
cd customer-search
npm install
```

2. Create a `.env.local` file in the project root with a PostgreSQL connection string:

```
DATABASE_URL=your_connection_string
```

3. Seed the database:

```bash
npx tsx --env-file=.env.local db/seed.ts
```

The seed script expects a generated JSON data file, which is not included in the repository because of its size.

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Possible improvements

- Word-by-word search across fields (for example "mark gmail")
- Filters for status, country and customer type
- Sort settings stored in the URL
- Unit tests

## Author

Dariusz Ciazynski

- Portfolio: https://portfolio-pied-six-87.vercel.app/
- GitHub: https://github.com/Dariusz-Wolontariusz
- LinkedIn: https://www.linkedin.com/in/dariusz-ciazynski/
