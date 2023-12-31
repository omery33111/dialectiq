import { CircularProgress, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getBlogsAmountAsync, getPagedBlogsAsync, selectBlogisLoading, selectBlogs, selectBlogsAmount } from './blogSlice';

const Blog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const blogs = useAppSelector(selectBlogs);

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

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedBlogsAsync(page));
    dispatch(getBlogsAmountAsync());
  }, [page]);

  const blogsAmount = useAppSelector(selectBlogsAmount);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(blogsAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  const isLoading = useAppSelector(selectBlogisLoading);
  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);


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
        <div style={{ height: "15rem" }} />
        {storedIsLogged && (
          <div>
            <div className="pagination-blog">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, newPage) => setPage(newPage)}
                size="small"
              />
            </div>
            <Container>
              <hr />
            </Container>
          </div>
        )}

        <div className="d-flex justify-content-center">
          <div className="blog-videos">
            <div style={{ height: 230 }} />
            {blogs.slice().reverse().map((blog, index) => {
              const topPosition = 100 * index;
              const blogClassName = index > 0 ? 'blog-item' : '';
              const blogStyle = index > 0 ? { marginTop: '60%' } : { marginBottom: '60%' };
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
                    {isLoading ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <img
                        style={{ border: '1px solid #000000' }}
                        src={myServer + blog.picture}
                        width="100%"
                        height="100%"
                      />
                    )}
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
                  {isLoading ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ) : (
                    <h2 style={{ padding: '10px' }}>{blog.title}</h2>
                  )}
                  {isLoading ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ) : (
                    <p style={{ padding: '7px' }}>{blog.description}</p>
                  )}
                 
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
