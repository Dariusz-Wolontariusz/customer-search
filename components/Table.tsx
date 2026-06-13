import Person from "@/types/types";
import React from "react";
import styles from "./table.module.css";

type TableProps = {
  page: number;
  pageSize: number;
  filteredList: Person[];
  columnNumber: number;
};

const Table = ({ page, pageSize, filteredList, columnNumber }: TableProps) => {
  const startIndex = (page - 1) * pageSize;
  const visible = filteredList.slice(startIndex, startIndex + pageSize);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">Name</th>
            <th scope="col">Email address</th>
            <th scope="col">Company</th>
            <th scope="col">Status</th>
            <th scope="col">Country</th>
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
