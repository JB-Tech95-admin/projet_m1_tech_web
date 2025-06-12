const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body

  if (!productId) {
    return res.status(400).json({ error: "productId is required" })
  }

  if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
    return res.status(400).json({ error: "quantity must be a positive integer" })
  }

  next()
}

const validateCartId = (req, res, next) => {
  const { cartId } = req.params

  if (!cartId || cartId.trim() === "") {
    return res.status(400).json({ error: "cartId is required" })
  }

  next()
}

const validateProductId = (req, res, next) => {
  const { id } = req.params

  if (!id || id.trim() === "") {
    return res.status(400).json({ error: "Product ID is required" })
  }

  next()
}

module.exports = {
  validateCartItem,
  validateCartId,
  validateProductId,
}
