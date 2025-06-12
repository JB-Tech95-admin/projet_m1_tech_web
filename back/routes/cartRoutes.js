const express = require("express")
const CartController = require("../controllers/cartController")

const router = express.Router()

/**
 * @swagger
 * /api/cart/{cartId}:
 *   get:
 *     summary: Récupère un panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: Panier trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.get("/:cartId", CartController.getCart)

/**
 * @swagger
 * /api/cart/{cartId}/items:
 *   post:
 *     summary: Ajoute un produit au panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Produit ajouté au panier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Produit non trouvé
 */
router.post("/:cartId/items", CartController.addToCart)

/**
 * @swagger
 * /api/cart/{cartId}/items/{productId}:
 *   put:
 *     summary: Met à jour la quantité d'un produit dans le panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Quantité mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Panier ou produit non trouvé
 */
router.put("/:cartId/items/:productId", CartController.updateCartItem)

/**
 * @swagger
 * /api/cart/{cartId}/items/{productId}:
 *   delete:
 *     summary: Supprime un produit du panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé du panier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Panier ou produit non trouvé
 */
router.delete("/:cartId/items/:productId", CartController.removeFromCart)

/**
 * @swagger
 * /api/cart/{cartId}:
 *   delete:
 *     summary: Vide le panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: Panier vidé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.delete("/:cartId", CartController.clearCart)

module.exports = router
