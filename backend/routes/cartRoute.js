import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/auth.js';

const cartrouter = express.Router();
cartrouter.post('/add', authMiddleware, addToCart);
cartrouter.post('/get', authMiddleware, getCart);
cartrouter.post('/remove', authMiddleware, removeFromCart);

export default cartrouter;