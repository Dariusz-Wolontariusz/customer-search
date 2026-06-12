import React from 'react'

const Pagination = () => {
  return (
    <div>
      
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
            {/* page buttons */}

            <div className={styles.pageBtnContainer}>
              <button
                className={`${styles.pageBtn} ${page === 1 ? styles.active : ""}`}
                onClick={() => setPage(1)}
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
                        onClick={() => setPage(pageNumber)}
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
                onClick={() => setPage(pageArr.at(-1) ?? 1)}
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
    </div>
  )
}

export default Pagination