import Link from "next/link";
import styles from "./page.module.css";

function StartPage() {
  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.heroSection}>
          <div className={styles.titleContainer}>
            <h1>Customer Search</h1>
            <p>
              Portfolio project by Dariusz Ciazynski: a customer search app over
              50,000 generated records, built with Next.js, TypeScript and
              PostgreSQL.
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
          <h2>How it's built</h2>
          <ul className={styles.cardContainer} role="list">
            <li>
              <h3>Real database instead of a static file</h3>
              <p>
                The first version shipped all 50,000 customer records as one
                nearly 40 MB file that every visitor had to download. I moved
                the data into PostgreSQL (hosted on Neon), so the browser only
                receives what it actually shows.
              </p>
            </li>
            <li>
              <h3>Server-side search and pagination</h3>
              <p>
                Search and paging run in the database through a Next.js API
                route. The browser gets one page of results at a time (25 to 100
                rows), no matter how large the dataset grows.
              </p>
            </li>
            <li>
              <h3>Shareable, efficient search</h3>
              <p>
                The search term and page number live in the URL, so any result
                can be bookmarked or shared. Typing is debounced by 500 ms, so
                the database gets one query when the user pauses, not one per
                keystroke.
              </p>
            </li>
            <li>
              <h3>Accessibility</h3>
              <p>
                The customer panel works fully by keyboard: focus moves into it
                on open, Escape closes it, and focus returns to the row that
                opened it. The page behind is locked while the panel is open.
              </p>
            </li>
          </ul>
        </section>
        <section className={styles.techStackContainer}>
          <h2>Tech stack</h2>
          <ul className={styles.techStackList} role="list">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>PostgreSQL</li>
            <li>Neon</li>
            {/* <li>Vitest</li> */}
            <li>CSS Modules</li>
            <li>Vercel</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {/* <div className={styles.footerNameLogo}> */}
          <p>Built by Dariusz Ciazynski</p>
          {/* <img
              src="/DC_logo.png"
              alt="Dariusz Ciazynski"
              width={32}
              height={32}
            /> */}
          {/* </div> */}

          <ul role="list" className={styles.footerList}>
            <li>
              <a
                href="https://portfolio-pied-six-87.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Dariusz-Wolontariusz"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/dariusz-ciazynski/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default StartPage;
