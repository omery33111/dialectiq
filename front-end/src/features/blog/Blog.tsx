import React, { useEffect } from 'react';
import { getBlogsAsync, selectBlogs } from './blogSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';



const Blog = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);

  useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogs.slice().reverse().map((blog, index) => (
          <li key={index}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
