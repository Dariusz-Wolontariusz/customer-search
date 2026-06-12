import { writeFileSync } from "fs";

function generateDistinctMockData(count: number) {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];

  const mockData = Array.from({ length: count }, (_, idx) => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      id: idx + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${idx + 1}@example.com`,
    };
  });

  return mockData;
}

const mockData = generateDistinctMockData(50000);

writeFileSync("mockData.json", JSON.stringify(mockData, null, 2));

console.log(`Generated ${mockData.length} records`);
