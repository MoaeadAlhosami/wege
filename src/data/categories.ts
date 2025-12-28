export type Category = {
  id: "Shoes" | "Shirts" | "Electronics" | "Accessories";
  title: string;
  image: string; // public path
};

export const CATEGORIES: Category[] = [
  { id: "Shoes", title: "Shoes", image: "/categories/shoes.svg" },
  { id: "Shirts", title: "Shirts", image: "/categories/shirts.svg" },
  { id: "Electronics", title: "Electronics", image: "/categories/electronics.svg" },
  { id: "Accessories", title: "Accessories", image: "/categories/accessories.svg" },
];


