import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { AddToCartButton } from "@/features/cart/AddToCartButton";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="relative aspect-[3/2]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>

      <aside className="lg:sticky lg:top-[92px]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/30">
          <div className="inline-flex rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/70">
            {product.category}
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {product.title}
          </h1>
          <div className="mt-2 text-lg font-semibold text-white/90">
            {formatPrice(product.price)}
          </div>
          <p className="mt-4 text-sm leading-7 text-white/65">{product.description}</p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </aside>
    </div>
  );
}


