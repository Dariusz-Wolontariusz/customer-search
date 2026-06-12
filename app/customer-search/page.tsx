"use client";

import React from "react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";

type Person = {
  id: number;
  name: string;
  email: string;
};

async function getUsers(): Promise<Person[]> {
  const response = await fetch("/mockData.json");

  if (response.ok) {
    const data = response.json();
    return data;
  }
  throw new Error("Something went wrong with fetching the data.");
}

const UserSearch = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [usersList, setUsersList] = useState<Person[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);

        const data = await getUsers();
        setUsersList(data);

        return usersList;
      } catch (error) {
        setError(
          "Could not load the customers list. Please refresh the screen to try again.",
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const filteredList = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchWord.toLowerCase()),
  );

  const startIndex = (page - 1) * pageSize;
  const visible = filteredList.slice(startIndex, startIndex + pageSize);
  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);
  const totalPages = Math.ceil(filteredList.length / pageSize);
  const pageArr = Array.from({ length: totalPages }, (value, idx) => idx + 1);
  console.log("pageArr", pageArr);
  const windowStart = Math.max(page - 1, 1);
  const windowEnd = windowStart + 2;

  return (
    <div className={styles.mainContainer}>
      <h1>Customer Search</h1>
      <div className={styles.searchGroup}>
        <label htmlFor="searchField">Search User</label>
        <input
          id="searchField"
          className={styles.inputField}
          type="text"
          placeholder="Search user"
          onChange={(e) => {
            setSearchWord(e.target.value);
            setPage(1);
          }}
          value={searchWord}
        />
      </div>

      {isLoading && <p>Loading data...</p>}
      {error && (
        <p className={styles.errorAlert} role="alert">
          <CircleAlert className={styles.errorIcon} size={20} />
          <span>{error}</span>
        </p>
      )}

      {/* matches */}

      {filteredList && (
        <div className={styles.matchesContainer}>
          <p>Found {filteredList.length} matches.</p>
          <div className={styles.selectAmountItemsContainer}>
            <label htmlFor="selectAmoutItems">Items per page:</label>
            <select
              className={styles.selectAmountItems}
              id="selectAmoutItems"
              onChange={(e) => {
                setPageSize(+e.target.value);
                setPage(1);
              }}
              defaultValue={50}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      )}

      {/*top buttons */}

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

      {/* table  */}
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email address</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              !error &&
              (visible.length > 0 ? (
                visible.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No users matching your search.</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* bottom buttons */}
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
  );
};

export default UserSearch;
