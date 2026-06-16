"use client";
import Person from "@/types/types";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import styles from "./sort-button.module.css";

type SortButtonProps = {
  field: keyof Person;
  sortDir: "asc" | "dsc";
  handleToggleSort: (field: keyof Person) => void;
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
