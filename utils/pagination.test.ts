import { describe, it, expect } from "vitest";
import { totalPages } from "./pagination";

describe("totalPages", () => {
  it("should return the correct number of pages", () => {
    expect(totalPages(100, 10)).toBe(10);
  });
  it("should return the correct number of pages", () => {
    expect(totalPages(5000, 100)).toBe(50);
  });
  it("should give 1 page when there's less records than page size", () => {
    expect(totalPages(2, 100)).toBe(1);
  });
  it("should return 0 if no records to show", () => {
    expect(totalPages(0, 100)).toBe(0);
  });
  it("should round up when there's a remainder", () => {
    expect(totalPages(101, 10)).toBe(11);
  });

  it("should handle large numbers", () => {
    expect(totalPages(10000001, 10000000)).toBe(2);
  });
});
