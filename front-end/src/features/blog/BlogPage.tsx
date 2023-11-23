import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import BlogComments from '../comment/BlogComments';
import PostComment from '../comment/PostComment';
import { getCommentsAsync } from '../comment/commentSlice';
import { getBlogsAmountAsync, getMoreBlogsAsync, getSingleBlogAsync, selectBlogs, selectSingleBlogisLoading } from './blogSlice';
import { myServer } from '../../endpoints/endpoints';
import MoreBlogs from './MoreBlogs';



const BlogPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

    const { id } = useParams()
  
    useEffect(() => {
        if (id !== undefined) {
        dispatch(getSingleBlogAsync(id))
        dispatch(getCommentsAsync(Number(id)));
        }

        dispatch(getBlogsAmountAsync());
    }, [id, dispatch])
  
    const { singleBlog } = useAppSelector((state) => state.blog);


  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

  
  const isLoading = useAppSelector(selectSingleBlogisLoading);
  
  const isMobile = window.innerWidth <= 767;

  const isLaptop = window.innerWidth >= 769 && window.innerWidth <= 1919;

  return (
    <div>

      {!isMobile && !isLaptop && <MoreBlogs />}
    



        <div
        className="background-image"
        style={{
          position: 'relative',
          backgroundImage: `url(${require('../../images/blogbg2.png')})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-y',
          height: "290vh",
          width: '100%',
        }}>


            <div style = {{height: "28vh"}}/>
                    
                    <Container>
                    <div className='single-blog-time-line'>

                      {isLaptop ? (
                        <img
                        style = {{position: "relative", left: 135}}
                        src={`${require('../../images/blogtimeline.png')}`}
                        width="100%"
                        height="100%"
                      />
                      ) : (
                        <img
                        src={`${require('../../images/blogtimeline.png')}`}
                        width="100%"
                        height="100%"
                      />
                      )}
                  
                  <h6 className = "sigle-blog-date">{formatDate(singleBlog.date)}</h6>
                  </div>

                <div>

              
            {isLoading ? (
                      <div>
                      <CircularProgress />
                      </div>
                    ) : (
            <ReactPlayer
            className = "blog-video"
                  url={singleBlog.youtube}
                  controls
                  width="87%"
                  height="70vh"
                />)}

            



                  </div>
                      
                  {isLoading ? (
                      <div>
                      <CircularProgress /> 
                      </div>
                    ) : (
                     
                      <div>
                        {isMobile ? (
                          <h2 style = {{padding: "10px", position: "relative", left: 23}}>{singleBlog.title}</h2>
                        ) : (
                        <h2 style = {{padding: "10px", position: "relative", left: 83}}>{singleBlog.title}</h2>)}
                  
                  </div>
                  )}

                  
                  

                    {isLoading ? (
                      <div>
                      <CircularProgress />
                      </div>
                    ) : (

                      <div>
                        {isMobile ? (
                        <p style = {{padding: "7px", position: "relative", left: 27}}>{singleBlog.description}</p>) : (
                        <p style = {{padding: "7px", position: "relative", left: 87}}>{singleBlog.description}</p>)}
                  

                  </div>
                  )}


                    
                {storedIsLogged && (
                <PostComment />
                )}
                
                <BlogComments />

                
                
                  </Container>

                
            </div>        
    </div>
  )
}

export default BlogPage