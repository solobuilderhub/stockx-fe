import Link from "next/link";
import { SparklesIcon } from "lucide-react";

export const PromotedProducts = ({ products, onSelect }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <div className="space-y-2 w-full overflow-hidden bg-background">
      <div className="flex items-center">
        <div className="inline-flex items-center px-2 py-1 text-xs rounded bg-retro-secondary/10">
          <SparklesIcon size={10} className="mr-1 text-retro-secondary" />
          <span className="font-medium">Featured</span>
        </div>
      </div>
      
      <div className="grid gap-1.5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="flex items-center px-2 py-2 text-sm rounded hover:bg-retro-primary/10 transition-all relative z-10"
            onClick={onSelect}
          >
            <div className="min-w-6 h-6 mr-2 rounded bg-retro-accent/20 flex items-center justify-center text-retro-accent font-bold text-xs">
              {product.name.charAt(0)}
            </div>
            <span className="truncate">{product.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="pt-1.5 border-t  flex justify-end">
        <Link
          href="/products"
          className="text-xs text-retro-primary hover:underline relative z-10"
          onClick={onSelect}
        >
          All products →
        </Link>
      </div>
    </div>
  );
};