import mongoose from 'mongoose';
import Product from '../models/product.model.js';

// @desc    Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('[GET] Error fetching blogs:', error.message);
    res.status(500).json({ success: false, message: 'Server error while fetching blogs' });
  }
};

// @desc    Create a new blog
export const createBlog = async (req, res) => {
  const { title, desc, image } = req.body;

  if (!title || !desc || !image) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const newBlog = new Product({ title, desc, image });
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error('[POST] Error creating blog:', error.message);
    res.status(500).json({ success: false, message: 'Server error while creating blog' });
  }
};

// @desc    Update a blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }

  try {
    const updatedBlog = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('[PUT] Error updating blog:', error.message);
    res.status(500).json({ success: false, message: 'Server error while updating blog' });
  }
};

// @desc    Delete a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }

  try {
    const deletedBlog = await Product.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('[DELETE] Error deleting blog:', error.message);
    res.status(500).json({ success: false, message: 'Server error while deleting blog' });
  }
};

// backend/controllers/product.controller.js
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }

  try {
    const blog = await Product.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('[GET BY ID] Error fetching blog:', error.message);
    res.status(500).json({ success: false, message: 'Server error while fetching blog' });
  }
};

