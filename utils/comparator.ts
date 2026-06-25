import Person from "@/types/types";

export function makeComparator(
  sortField: keyof Person,
  sortDir: "asc" | "dsc",
) {
  return (a: Person, b: Person) => {
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
}
