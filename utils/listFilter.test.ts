import { describe, it, expect } from "vitest";
import Person from "@/types/types";
import { listFilter } from "./listFilter";

describe("listFilter", () => {
  it("should give 1 match if found only one", () => {
    expect(listFilter(persons, "Dariusz").length).toBe(1);
  });
  it("should give multiple matches if there are more than 1", () => {
    expect(listFilter(persons, "Bros").length).toBe(2);
  });
  it("should give 0 matches if there are none", () => {
    expect(listFilter(persons, "Bertha").length).toBe(0);
  });
  it("should give matches from the middle of the email", () => {
    expect(listFilter(persons, "brother").length).toBe(2);
  });
  it("should give 0 matches if misspelled", () => {
    expect(listFilter(persons, "Daruisz").length).toBe(0);
  });
});

const persons = [
  {
    firstName: "Dariusz",
    lastName: "Wolontariusz",
    email: "darky@gmail.com",
  },
  {
    firstName: "Mario",
    lastName: "Bros",
    email: "mariachi.brother@tlen.pl",
  },
  {
    firstName: "Luigi",
    lastName: "Bros",
    email: "lugini.brother@amazon.com",
  },
] as Person[];
