import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/blogs';

function Input() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    desc: '',
    image: '',
  });

  const { createBlog } = useBlogStore();

  const handleNewBlog = async () => {
    const { success, message } = await createBlog(newBlog);
    if (success) {
      alert('✅ Blog uploaded!');
      setNewBlog({ title: '', desc: '', image: '' });
    } else {
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-blue-900 px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-3xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-5 py-2 rounded-md shadow">
            <p className="text-white text-2xl font-bold">📝 Add New Blog</p>
          </div>

          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            ⬅ Back
          </Link>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder="Add Title for your Blog"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          />

          <textarea
            value={newBlog.desc}
            onChange={(e) => setNewBlog({ ...newBlog, desc: e.target.value })}
            placeholder="Add Short Description for Your Blog"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          ></textarea>

          <input
            type="text"
            value={newBlog.image}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
            placeholder="Add Image URL for your Blog"
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          />

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleNewBlog}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-400 text-white py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              ✅ Upload Blog
            </button>
            <Link
              to="/"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-400 text-white py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
            >
              ❌ Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
