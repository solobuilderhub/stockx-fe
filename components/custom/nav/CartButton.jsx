import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartDropdown from '@/components/platform/cart/CartDropdown';

const CartButton = ({ cartCount = 0, isLoading = false, className }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  
  const closeCart = () => setIsCartOpen(false);
  
  // Use actual cart count
  const displayCount = cartCount;

  return (
    <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative h-9 w-9 ${className || ''}`}>
          <ShoppingCart className="h-5 w-5" />
          {displayCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {isLoading ? "..." : displayCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none shadow-none bg-transparent w-auto" align="end">
        <CartDropdown onClose={closeCart} />
      </PopoverContent>
    </Popover>
  );
};

export default CartButton;
