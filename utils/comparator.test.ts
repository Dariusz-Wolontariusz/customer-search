import { describe, it, expect } from "vitest";
import { makeComparator } from "./comparator";
import Person from "@/types/types";

describe("makeComparator", () => {
  it("should sort first name ascending in alphabetical order", () => {
    expect(
      makeComparator("firstName", "asc")(persons[0], persons[1]),
    ).toBeLessThan(0);
  });
  it("should sort last name descending in alphabetical order", () => {
    expect(
      makeComparator("lastName", "dsc")(persons[0], persons[1]),
    ).toBeLessThan(0);
  });
  it("should sort last name in equal position", () => {
    expect(makeComparator("lastName", "asc")(persons[1], persons[2])).toBe(0);
  });
  it("should sort numbers in ascending order", () => {
    expect(
      makeComparator("totalSpent", "asc")(persons[0], persons[2]),
    ).toBeLessThan(0);
  });
  it("should sort numbers in descending order", () => {
    expect(
      makeComparator("totalSpent", "dsc")(persons[1], persons[2]),
    ).toBeLessThan(0);
  });
  it("should sort numbers descending when first is smaller", () => {
    expect(
      makeComparator("totalSpent", "dsc")(persons[2], persons[1]),
    ).toBeGreaterThan(0);
  });
  it("should sort numbers as equals", () => {
    expect(
      makeComparator("totalSpent", "dsc")(persons[2], persons[3]),
    ).toBeCloseTo(0);
  });
});

const persons = [
  {
    firstName: "Dariusz",
    lastName: "Wolontariusz",
    email: "darky@gmail.com",
    totalSpent: 1210,
  },
  {
    firstName: "Mario",
    lastName: "Bros",
    email: "mariachi.brother@tlen.pl",
    totalSpent: 5012,
  },
  {
    firstName: "Luigi",
    lastName: "Bros",
    email: "lugini.brother@amazon.com",
    totalSpent: 1212,
  },
  {
    firstName: "Bertha",
    lastName: "Mamma",
    email: "mamma.bertha@amazon.com",
    totalSpent: 1212,
  },
] as Person[];
