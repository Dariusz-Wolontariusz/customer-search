"use client";

import styles from "./styles.module.css";
import { Person, ApiResponse, SortColumns } from "@/types/types";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import UserDrawer from "@/components/UserDrawer";

async function getUsers(
  page: number,
  pageSize: number,
  search: string,
  sortField: SortColumns,
  sortDir: "asc" | "dsc",
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  params.set("search", search);
  params.set("sortField", sortField);
  params.set("sortDir", sortDir);

  const apiUrl = `/api/customers?${params.toString()}`;

  const response = await fetch(apiUrl);

  if (response.ok) {
    const data: ApiResponse = await response.json();
    return data;
  }
  throw new Error("Something went wrong while fetching the data.");
}

const UserSearchContent = () => {
  const [usersList, setUsersList] = useState<Person[]>([]);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "dsc">("asc");
  const [sortField, setSortField] = useState<SortColumns>("lastName");
  const columnNumber = 3;
  const isFirstRun = useRef<boolean>(true);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Url query build

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

  const handleToggleSort = (field: SortColumns) => {
    goToPage(1);
    setSortField(field);
    if (field !== sortField) {
      return setSortDir("asc");
    }
    return setSortDir((prev) => (prev === "asc" ? "dsc" : "asc"));
  };

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUsers(page, pageSize, search, sortField, sortDir);

        if (!ignore) {
          setUsersList(data.customers);
          setTotalMatches(data.total);
        }
        return () => {
          ignore = true;
        };
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
  }, [page, search, pageSize, sortField, sortDir]);

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

  const selectedUser = usersList.find((user) => selectedUserId === user.id);

  const handleAvatarClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedUserId(id);
    triggerRef.current = e.currentTarget;
  };

  const handleRowClick = (id: number) => {
    setSelectedUserId(id);
  };

  const handleCloseDrawer = () => {
    setSelectedUserId(null);
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [selectedUserId]);

  return (
    <div className={styles.mainContainer}>
      <h1>Customer Search</h1>
      <UserDrawer
        selectedUser={selectedUser}
        handleCloseDrawer={handleCloseDrawer}
        closeButtonRef={closeButtonRef}
      />
      <div
        className={styles.backgroundContainer}
        inert={selectedUser ? true : undefined}
      >
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

        {
          <div className={styles.matchesContainer}>
            <p>Found {totalMatches} matches.</p>
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
        }

        {!isLoading && !error && (
          <Pagination
            page={page}
            pageSize={pageSize}
            goToPage={goToPage}
            usersList={usersList}
            totalMatches={totalMatches}
          />
        )}

        {!isLoading && !error && (
          <Table
            usersList={usersList}
            columnNumber={columnNumber}
            handleAvatarClick={handleAvatarClick}
            handleRowClick={handleRowClick}
            handleToggleSort={handleToggleSort}
            sortDir={sortDir}
          />
        )}

        {!isLoading && !error && (
          <Pagination
            page={page}
            pageSize={pageSize}
            goToPage={goToPage}
            usersList={usersList}
            totalMatches={totalMatches}
          />
        )}
      </div>
    </div>
  );
};

const UserSearch = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserSearchContent />
    </Suspense>
  );
};

export default UserSearch;
