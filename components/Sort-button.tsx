"use client";
import { Person, SortColumns } from "@/types/types";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import styles from "./sort-button.module.css";

type SortButtonProps = {
  field: SortColumns;
  sortDir: "asc" | "dsc";
  handleToggleSort: (field: SortColumns) => void;
};

const SortButton = ({ field, sortDir, handleToggleSort }: SortButtonProps) => {
  return (
    <>
      <span>
        <button
          className={styles.sortButton}
          onClick={() => handleToggleSort(field)}
        >
          {sortDir === "asc" ? <ArrowDownAZ /> : <ArrowUpZA />}
        </button>
      </span>
    </>
  );
};

export default SortButton;
