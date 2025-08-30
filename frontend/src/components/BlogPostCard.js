import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
    <p className="text-gray-700 mb-2">{post.summary}</p>
            <Link to={`/blog/${post.slug}`} className="text-red-600 font-semibold">Read More</Link>
  </div>
);

export default BlogPostCard; 