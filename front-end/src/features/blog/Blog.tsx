import { useEffect, useState } from 'react';
import { getBlogsAsync, selectBlogs, selectLikes, toggleLike } from './blogSlice';
import { myServer } from '../../endpoints/endpoints';
import ReactPlayer from 'react-player';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FaHeart } from 'react-icons/fa';

const Blog = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);

  const likes = useAppSelector(selectLikes);

  const likesRecord = likes as Record<string, number>; // Assert the type

  const [containerHeight, setContainerHeight] = useState(10);

  useEffect(() => {
    dispatch(getBlogsAsync());

    const storedLikes = localStorage.getItem('blogLikes');
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      dispatch(toggleLike({ blogId: parsedLikes }));
    }
  }, [dispatch]);

  useEffect(() => {
    const newContainerHeight = 0 + blogs.length * 120;
    setContainerHeight(newContainerHeight);
  }, [blogs]);




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
        }}>
        <div className="d-flex justify-content-center">
          <div className="blog-videos">
            <div style={{ height: 300 }} />
            {blogs.slice().reverse().map((blog, index) => {
              const topPosition = 100 * index;
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: '60%',
                    marginTop: 0,
                    position: 'relative',
                    top: `${topPosition}px`,
                  }}>
                  <ReactPlayer
                    url={myServer + blog.video}
                    controls={true}
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                  />
                  <h2 style = {{padding: "10px"}}>{blog.title}</h2>
                  <p style = {{padding: "7px"}}>{blog.description}</p>
                            <h3>
                <FaHeart
                  className={`like-button ${likesRecord[blog.id] ? 'liked' : ''}`}
                  onClick={() => dispatch(toggleLike({ blogId: blog.id }))}
                />
                </h3>
                <div className='counter-like' style = {{color: "grey"}}>
                {likesRecord[blog.id] || 0}
                </div>
              
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
