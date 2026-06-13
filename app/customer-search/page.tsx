"use client";

import styles from "./styles.module.css";
import Person from "@/types/types";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";

async function getUsers(): Promise<Person[]> {
  const response = await fetch("/mockData.json");

  if (response.ok) {
    const data: Person[] = await response.json();
    return data;
  }
  throw new Error("Something went wrong while fetching the data.");
}

const UserSearch = () => {
  const [usersList, setUsersList] = useState<Person[]>([]);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const columnNumber = 3;
  const isFirstRun = useRef(true);

  // Url query part

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [searchWordInput, setSearchWordInput] = useState<string>(search);
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const goToPage = (n: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(n));
    router.replace(`?${params.toString()}`);
  };

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

  useEffect(() => {
    const updateUrl = (searchWordInput: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("search", searchWordInput);
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    };

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const debouncedSearch = setTimeout(() => {
      updateUrl(searchWordInput);
    }, 500);

    return () => clearTimeout(debouncedSearch);
  }, [searchWordInput]);

  const filteredList = usersList.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

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
          onChange={(e) => setSearchWordInput(e.target.value)}
          value={searchWordInput}
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
                goToPage(1);
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

      <Pagination
        page={page}
        pageSize={pageSize}
        goToPage={goToPage}
        filteredList={filteredList}
      />

      {!isLoading && !error && (
        <Table
          page={page}
          pageSize={pageSize}
          filteredList={filteredList}
          columnNumber={columnNumber}
        />
      )}

      <Pagination
        page={page}
        pageSize={pageSize}
        goToPage={goToPage}
        filteredList={filteredList}
      />
    </div>
  );
};

export default UserSearch;
