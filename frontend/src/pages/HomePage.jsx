import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/blogs';

function HomePage() {
  const { blogs, fetchBlogs, deleteBlog } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    const result = await deleteBlog(id);
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 flex flex-col items-center justify-start p-6">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-8 py-3 rounded-md shadow-lg mt-6 transform hover:scale-105 transition-transform duration-300 ease-out">
        <p className="text-white text-3xl font-bold">Blog-App</p>
      </div>

      {/* Blog Section */}
      <div className="mt-16 w-full flex justify-center">
        {blogs.length === 0 ? (
          <div className="text-center text-white animate-fadeIn">
            <p className="text-lg">
              No Blogs Uploaded yet
              <br />
              <Link className="text-yellow-300 font-bold underline hover:text-yellow-400 transition-colors duration-300" to="/InputPage">
                Click here
              </Link>{' '}
              to upload your blog
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <Link to={`/blog/${blog._id}`}>
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={blog.image || '/default.jpg'}
                      alt="Blog visual"
                      className="h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/blog/${blog._id}`}>
                    <p className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors duration-300">
                      {blog.title}
                    </p>
                  </Link>

                  <p className="text-gray-500 text-sm mt-1">{blog.desc}</p>
                  <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {blog.content}
                  </p>

                  {/* Buttons */}
                  <div className="flex space-x-3 mt-auto pt-4">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/EditPage/${blog._id}`}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-md text-center shadow hover:bg-yellow-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Blog Button */}
      <Link
        to="/InputPage"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-400 text-white text-3xl px-5 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:rotate-12 hover:scale-110 transition-all duration-300"
      >
        +
      </Link>
    </div>
  );
}

export default HomePage;
