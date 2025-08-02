import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function IndiPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) setBlog(data.data);
      } catch (err) {
        console.error("Error fetching blog:", err.message);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-700 to-blue-900">
        <p className="text-lg text-white animate-pulse">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 px-4 py-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-5 py-2 rounded-md shadow">
          <p className="text-white text-2xl font-bold">{blog.title}</p>
        </div>

        <Link
          to="/"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          ⬅ Back
        </Link>
      </div>

      {/* Blog Image */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
          <img
            src={blog.image || '/default.jpg'}
            alt="Blog Visual"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Blog Description */}
      <div className="flex justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-5xl transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IndiPage;
