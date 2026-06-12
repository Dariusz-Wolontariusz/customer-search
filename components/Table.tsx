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
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email address</th>
          </tr>
        </thead>
        <tbody>
          {visible.length > 0 ? (
            visible.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
