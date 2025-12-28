import { getProducts } from "@/data/products";
import { ProductsPageClient } from "@/features/filters/ProductsPageClient";
import { CATEGORIES } from "@/data/categories";
import { HeroSection } from "@/components/HeroSection";
import { CategorySquares } from "@/components/CategorySquares";

export const dynamic = "force-static";

export default function HomePage() {
  const products = getProducts();
  return (
    <div className="space-y-6">
      <HeroSection />
      <CategorySquares categories={CATEGORIES} />

      <ProductsPageClient products={products} />
    </div>
  );
}
