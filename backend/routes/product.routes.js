import express from 'express';
import {
  getAllBlogs,
  getBlogById,  // ✅ IMPORT IT
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllBlogs);      // Get all blogs
router.get('/:id', getBlogById);   // ✅ Get single blog by ID
router.post('/', createBlog);      // Create blog
router.put('/:id', updateBlog);    // Update blog
router.delete('/:id', deleteBlog); // Delete blog

export default router;
