import faker from "faker";
import { Item } from "./Catalogue";

const generateCategory = (i: number, items?: Item[]): Item => ({
  id: i,
  text: faker.company.bsAdjective(),
  items
});

const generateCompany = (i: number, items?: Item[]): Item => ({
  id: i,
  text: faker.company.companyName(),
  href: faker.internet.url(),
  items
});

export const catalogue = Array.from({ length: 9 }, (x, i) =>
  generateCategory(
    i,
    Array.from({ length: 20 }, (x, i) => generateCompany(i))
  )
);
