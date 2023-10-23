import { useEffect } from 'react'
import BlogComments from '../comment/BlogComments'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleBlogAsync, selectLikes, toggleLike } from './blogSlice';
import ReactPlayer from 'react-player';
import { myServer } from '../../endpoints/endpoints';
import { Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import PostComment from '../comment/PostComment';
import { getCommentsAsync } from '../comment/commentSlice';



const BlogPage = () => {
    const dispatch = useAppDispatch();
    
    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

    const likes = useAppSelector(selectLikes);
    const likesRecord = likes as Record<string, number>;
  
    const { id } = useParams()
  
    useEffect(() => {
        if (id !== undefined) {
        dispatch(getSingleBlogAsync(id))
        dispatch(getCommentsAsync(Number(id)));
        console.log(id)
        }
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




  return (
    <div>
        <div
        className="background-image"
        style={{
          position: 'relative',
          backgroundImage: `url(${require('../../images/blogbg.png')})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-y',
          height: "290vh",
          width: '100%',
        }}>


            <div style = {{height: "28vh"}}/>
                    
                    <Container>
                    <div className='single-blog-time-line'>
                  <img
                    src={`${require('../../images/blogtimeline.png')}`}
                    width="100%"
                    height="100%"
                  />
                  <h6 className = "sigle-blog-date">{formatDate(singleBlog.date)}</h6>
                  </div>

                <div>

              
                {/* <ReactPlayer
                  url={myServer + singleBlog.video}
                  controls={true}
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload scrollbar download',
                      },
                    },
                  }}
                /> */}


            <ReactPlayer
                  url={singleBlog.youtube}
                  controls
                  width="100%"
                  height="70vh"
                />

            



                  </div>

                  <h2 style = {{padding: "10px"}}>{singleBlog.title}</h2>
                  <p style = {{padding: "7px"}}>{singleBlog.description}</p>
                            <h3>
                <FaHeart
                  className={`like-button-single ${likesRecord[singleBlog.id] ? 'liked' : ''}`}
                  onClick={() => dispatch(toggleLike({ blogId: singleBlog.id }))}
                />
                </h3>
                <div className='counter-like-single' style = {{color: "grey"}}>
                {likesRecord[singleBlog.id] || 0}
                </div>
                    
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