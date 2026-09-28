import Link from "next/link";
import styles from "./page.module.css";

function StartPage() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.heroSection}>
        <div className={styles.titleContainer}>
          <h1>Customer Search</h1>
          <p>
            Search, sort and browse 50,000 customers, built with TypeScript,
            Next.js and PostgreSQL.
          </p>
        </div>
        <div className={styles.linksContainer}>
          <Link className={styles.projectLink} href="/customer-search">
            Open the app
          </Link>
          <a
            className={styles.githubLink}
            href="https://github.com/Dariusz-Wolontariusz/customer-search"
            target="_blank"
            rel="noopener noreferrer"
          >
            View code
          </a>
        </div>
      </section>
      <section className={styles.cardSection}>
        <h2>What I built</h2>
        <ul className={styles.cardContainer}>
          <li>
            <h3>Real database</h3>
            <p>
              36 MB JSON was too big to deploy. Moved 50,000 records to Postgres
              on Neon, seeded in batches of 1,000
            </p>
          </li>
          <li>
            <h3>Server-side search and pagination</h3>
            <p>
              An API route searches in the database and sends only one page to
              the browser
            </p>
          </li>
          <li>
            <h3>Search in the URL + debounce</h3>
            <p>
              Links can be shared, and the database gets one request when the
              user pauses, not one per letter
            </p>
          </li>
          <li>
            <h3>Accessibility</h3>
            <p>
              Customer drawer with focus management, Escape to close, background
              locked with inert, keyboard-reachable rows
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default StartPage;
