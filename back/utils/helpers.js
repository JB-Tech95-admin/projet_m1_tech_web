const formatProduct = (product) => {
  return {
    ...product,
    images: product.images ? JSON.parse(product.images) : null,
    features: product.features ? JSON.parse(product.features) : null,
  }
}

const formatCartItem = (item) => {
  return {
    id: item.id,
    productId: item.product_id,
    quantity: item.quantity,
    product: item.product ? formatProduct(item.product) : null,
  }
}

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((total, item) => {
    return total + (item.product ? item.product.price * item.quantity : 0)
  }, 0)

  const shipping = subtotal > 0 ? 30 : 0
  const tax = subtotal * 0.1
  const discount = subtotal > 100 ? 6 : 0
  const total = subtotal + shipping + tax - discount

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}

module.exports = {
  formatProduct,
  formatCartItem,
  calculateCartTotals,
}
