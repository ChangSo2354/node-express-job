import express from 'express'
import { createCategory, deletCategory, getAllCategory, getSingleDataCategory, updateCategory } from '../controllers/categoryController.js';
const categoryRoute = express.Router();

categoryRoute.post('/category',createCategory);
categoryRoute.put('/category/:id',updateCategory)
categoryRoute.delete('/category/:id',deletCategory);
categoryRoute.get('/category',getAllCategory);
categoryRoute.get('/category/:id',getSingleDataCategory);

export default categoryRoute;