import { useEffect, useState } from 'react';
import {
  getBlogsAsync,
  selectBlogs,
  selectLikes,
  toggleLike,
} from './blogSlice';
import { myServer } from '../../endpoints/endpoints';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const blogs = useAppSelector(selectBlogs);

  const likes = useAppSelector(selectLikes);

  const likesRecord = likes as Record<string, number>; // Assert the type

  useEffect(() => {
    dispatch(getBlogsAsync());

    const storedLikes = localStorage.getItem('blogLikes');
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      dispatch(toggleLike({ blogId: parsedLikes }));
    }
  }, [dispatch]);

  const [containerHeight, setContainerHeight] = useState(10);

  useEffect(() => {
    const newContainerHeight = 10 + blogs.length * 160;
    setContainerHeight(newContainerHeight);
  }, [blogs]);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

  return (
    <div>
      <div
        className="background-image"
        style={{
          position: 'relative',
          backgroundImage: `url(${require('../../images/blogbg.png')})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-y',
          height: `${containerHeight}vh`,
          width: '100%',
        }}
      >
        <div className="d-flex justify-content-center">
          <div className="blog-videos">
            <div style={{ height: 300 }} />
            {blogs.slice().reverse().map((blog, index) => {
              const topPosition = 100 * index;
              const blogClassName = index > 0 ? 'blog-item' : ''; // Set classname for the second blog and onwards
              const blogStyle = index > 0 ? { marginTop: '60%' } : { marginBottom: '60%' }; // Set style for the second blog and onwards
              return (
                <div
                  key={index}
                  className={blogClassName}
                  style={{
                    ...blogStyle,
                    position: 'relative',
                    top: `${topPosition}px`,
                  }}
                >
                  <div className="blog-time-line">
                    <img
                      src={`${require('../../images/blogtimeline.png')}`}
                      width="100%"
                      height="100%"
                    />
                    <h6 className="blog-date">{formatDate(blog.date)}</h6>
                  </div>
                  <div>
                    <img
                      src={myServer + blog.picture}
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div>
                    <img
                      onClick={() => navigate(`/blog/blog_page/${blog.id}`)}
                      src={require('../../images/forthumbnail.png')}
                      width="100%"
                      alt="profile-logo"
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    />
                  </div>
                  <h2 style={{ padding: '10px' }}>{blog.title}</h2>
                  <p style={{ padding: '7px' }}>{blog.description}</p>
                  <h3>
                    <FaHeart
                      className={`like-button ${
                        likesRecord[blog.id] ? 'liked' : ''
                      }`}
                      onClick={() => dispatch(toggleLike({ blogId: blog.id }))}
                    />
                  </h3>
                  <div className="counter-like" style={{ color: 'grey' }}>
                    {likesRecord[blog.id] || 0}
                  </div>
                  {/* <BlogComments /> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
