"use client";

import { useState, useRef } from "react";
import Person from "@/types/types";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import UserDrawer from "@/components/UserDrawer";
import { listFilter } from "@/utils/listFilter";
import mockData from "@/public/mockData.json";
import styles from "./page.module.css";

const PAGE_SIZE = 10;
const COLUMN_NUMBER = 6;

export default function Home() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<Person | undefined>(
    undefined,
  );
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const users = mockData as Person[];
  const filteredList = listFilter(users, search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRowClick = (id: number) => {
    setSelectedUser(users.find((u) => u.id === id));
    setTimeout(() => closeButtonRef.current?.focus(), 0);
  };

  const handleAvatarClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setSelectedUser(users.find((u) => u.id === id));
    setTimeout(() => closeButtonRef.current?.focus(), 0);
  };

  const handleCloseDrawer = () => setSelectedUser(undefined);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Customers</h1>
        <div className={styles.searchWrapper}>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </header>

      <Table
        page={page}
        pageSize={PAGE_SIZE}
        filteredList={filteredList}
        columnNumber={COLUMN_NUMBER}
        handleAvatarClick={handleAvatarClick}
        handleRowClick={handleRowClick}
      />

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        filteredList={filteredList}
        goToPage={setPage}
      />

      <UserDrawer
        selectedUser={selectedUser}
        handleCloseDrawer={handleCloseDrawer}
        closeButtonRef={closeButtonRef}
      />
    </div>
  );
}
