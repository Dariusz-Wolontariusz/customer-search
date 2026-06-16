import Person from "@/types/types";
import styles from "./table.module.css";
import SortButton from "./Sort-button";
import { useState } from "react";

type TableProps = {
  page: number;
  pageSize: number;
  filteredList: Person[];
  columnNumber: number;
};

const Table = ({ page, pageSize, filteredList, columnNumber }: TableProps) => {
  const [sortDir, setSortDir] = useState<"asc" | "dsc">("asc");
  const [sortField, setSortField] = useState<keyof Person>("firstName");
  const startIndex = (page - 1) * pageSize;

  const comparator = (a: Person, b: Person) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === "string" && typeof bVal === "string") {
      const result = aVal.localeCompare(bVal);
      return sortDir === "asc" ? result : -result;
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      const result = aVal - bVal;
      return sortDir === "asc" ? result : -result;
    }
    return 0;
  };

  const sorted = filteredList.toSorted(comparator);
  const visible = sorted.slice(startIndex, startIndex + pageSize);

  const handleToggleSort = (field: keyof Person) => {
    setSortField(field);
    if (field !== sortField) {
      return setSortDir("asc");
    }
    return setSortDir((prev) => (prev === "asc" ? "dsc" : "asc"));
  };

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">
              <div className={styles.sortableColumn}>
                Name
                <SortButton
                  field="lastName"
                  sortDir={sortDir}
                  handleToggleSort={handleToggleSort}
                />
              </div>
            </th>
            <th scope="col">
              <div className={styles.sortableColumn}>
                Email Address
                <SortButton
                  field="email"
                  sortDir={sortDir}
                  handleToggleSort={handleToggleSort}
                />
              </div>
            </th>
            <th scope="col">
              <div className={styles.sortableColumn}>
                Company
                <SortButton
                  field="company"
                  sortDir={sortDir}
                  handleToggleSort={handleToggleSort}
                />
              </div>
            </th>
            <th scope="col">
              <div className={styles.sortableColumn}>
                Status
                <SortButton
                  field="status"
                  sortDir={sortDir}
                  handleToggleSort={handleToggleSort}
                />
              </div>
            </th>
            <th scope="col">
              <div className={styles.sortableColumn}>
                Country
                <SortButton
                  field="country"
                  sortDir={sortDir}
                  handleToggleSort={handleToggleSort}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.length > 0 ? (
            visible.map((user) => (
              <tr key={user.id}>
                <td className={styles.avatarCell}>
                  <img
                    className={styles.avatar}
                    src={user.avatar}
                    alt="customers avatar"
                  />
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td className={styles.statusCell}>
                  <span
                    className={`${styles.status}
                      ${
                        user.status === "active"
                          ? styles.active
                          : user.status === "inactive"
                            ? styles.inactive
                            : styles.pending
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.country}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnNumber}>No users matching your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
