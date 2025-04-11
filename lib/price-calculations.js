// lib/price-calculations.js
export function calculateItemPrice(item) {
  // Get base price from product
  const basePrice = item.product.price.amount;
  
  // Apply discount if available
  let discountedPrice = basePrice;
  if (item.product.price.discount) {
    const { discount } = item.product.price;
    
    // Check if discount is expired
    if (discount.expiry && new Date(discount.expiry) < new Date()) {
      discountedPrice = basePrice;
    } else if (discount.type === "percentage") {
      discountedPrice = basePrice * (1 - discount.value / 100);
    } else if (discount.type === "fixed") {
      discountedPrice = Math.max(0, basePrice - discount.value);
    }
  }
  
  // Add price modifiers from variations if any
  if (item.variations && item.variations.length > 0) {
    // For each variation in the item
    item.variations.forEach(selectedVar => {
      // Find matching variation in product
      const productVariation = item.product.variations.find(
        pv => pv._id === selectedVar.variationId
      )
      
      if (!productVariation) return
      
      // Find the selected option
      const selectedOption = productVariation.options.find(
        opt => opt._id === selectedVar.optionId
      )
      
      if (selectedOption && selectedOption.priceModifier) {
        discountedPrice += selectedOption.priceModifier
      }
    })
  }
  
  return discountedPrice;
}



export function calculateItemTotal(item) {
  const price = calculateItemPrice(item);
  return price * item.quantity;
}

export function calculateCartSubtotal(items = []) {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
}

export function calculateTax(subtotal, taxRate = 0) {
  return subtotal * taxRate;
}


// Calculate discount amount based on coupon
export function calculateDiscountAmount(coupon, subtotal) {
  if (!coupon) return 0;
  
  let discount = 0;
  if (coupon.discountType === 'fixed') {
    discount = coupon.discountAmount;
  } else if (coupon.discountType === 'percentage') {
    discount = (subtotal * coupon.discountAmount) / 100;
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  }
  return discount;
}

export function formatPrice(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}