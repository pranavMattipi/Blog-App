import { create } from 'zustand';

export const useBlogStore = create((set, get) => ({
  blogs: [],
  
  // Set the blogs array
  setBlogs: (blogs) => set({ blogs }),

  // Fetch all blogs
  fetchBlogs: async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      set({ blogs: data.data });
    } catch (err) {
      console.error("❌ Error fetching blogs:", err.message);
    }
  },

  // Create a new blog
  createBlog: async (newBlog) => {
    if (!newBlog.title || !newBlog.desc || !newBlog.image) {
      return { success: false, message: 'Please fill in all the fields' };
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) {
        const error = await res.json();
        return { success: false, message: error.message };
      }

      const data = await res.json();
      set((state) => ({ blogs: [...state.blogs, data.data] }));
      return { success: true, message: 'Blog created successfully' };
    } catch (err) {
      return { success: false, message: 'Network or server error' };
    }
  },

  // Delete a blog by ID
  deleteBlog: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Remove deleted blog from local state
      const updatedBlogs = get().blogs.filter((blog) => blog._id !== pid);
      set({ blogs: updatedBlogs });

      return { success: true, message: 'Blog deleted successfully' };
    } catch (err) {
      return { success: false, message: 'Network error while deleting blog' };
    }

  },

updateBlog: async (id, updatedBlog) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBlog),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Update local state
    const updatedBlogs = get().blogs.map((blog) =>
      blog._id === id ? data.data : blog
    );
    set({ blogs: updatedBlogs });

    return { success: true, message: 'Blog updated successfully' };
  } catch (err) {
    return { success: false, message: 'Network error while updating blog' };
  }
},
}));
