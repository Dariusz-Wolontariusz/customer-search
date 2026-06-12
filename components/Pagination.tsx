import React from "react";
import Person from "@/types/types";
import styles from "./pagination.module.css";

type PaginationProps = {
  page: number;
  pageSize: number;
  filteredList: Person[];
  goToPage: (n: number) => void;
};

const Pagination = ({
  page,
  pageSize,
  filteredList,
  goToPage,
}: PaginationProps) => {
  const handlePrev = () => goToPage(page - 1);
  const handleNext = () => goToPage(page + 1);
  const totalPages = Math.ceil(filteredList.length / pageSize);
  const pageArr = Array.from({ length: totalPages }, (value, idx) => idx + 1);
  const windowStart = Math.max(page - 1, 1);
  const windowEnd = windowStart + 2;

  return (
    <>
      {filteredList && (
        <div className={styles.buttonContainer}>
          <div className={styles.controllBtnContainer}>
            <button
              className={styles.controllBtn}
              onClick={handlePrev}
              disabled={page === 1}
            >
              Prev
            </button>

            <div className={styles.pageBtnContainer}>
              <button
                className={`${styles.pageBtn} ${page === 1 ? styles.active : ""}`}
                onClick={() => goToPage(1)}
              >
                1
              </button>

              {windowStart > 2 && <span>...</span>}

              {pageArr &&
                pageArr
                  .filter(
                    (num) =>
                      num >= windowStart &&
                      num <= windowEnd &&
                      num !== 1 &&
                      num !== totalPages,
                  )
                  .map((pageNumber) => (
                    <div key={pageNumber}>
                      <button
                        className={`${styles.pageBtn} ${
                          page === pageNumber ? styles.active : ""
                        }`}
                        onClick={() => goToPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </div>
                  ))}

              {windowEnd < totalPages - 1 && <span>...</span>}

              <button
                className={`${styles.pageBtn} ${
                  page === pageArr.at(-1) ? styles.active : ""
                }`}
                onClick={() => goToPage(pageArr.at(-1) ?? 1)}
              >
                {pageArr.at(-1)}
              </button>
            </div>

            <button
              className={styles.controllBtn}
              onClick={handleNext}
              disabled={page === Math.ceil(filteredList.length / pageSize)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
