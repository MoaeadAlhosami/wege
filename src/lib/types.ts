export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export type PriceFilter = "all" | "lt50" | "50-100" | "gt100";

export type Filters = {
  category: string | "all";
  price: PriceFilter;
  q: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};


