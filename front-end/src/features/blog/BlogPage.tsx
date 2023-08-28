import React, { useEffect } from 'react'
import BlogComments from '../comment/BlogComments'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleBlogAsync, selectLikes, toggleLike } from './blogSlice';
import ReactPlayer from 'react-player';
import { myServer } from '../../endpoints/endpoints';
import { Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import PostComment from '../comment/PostComment';

const BlogPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    
    const likes = useAppSelector(selectLikes);
    const likesRecord = likes as Record<string, number>;
  
    const { id } = useParams()
  
    useEffect(() => {
        if (id !== undefined) {
        dispatch(getSingleBlogAsync(id))
        console.log(id)
        }
    }, [id, dispatch])
  
    const { singleBlog } = useAppSelector((state) => state.blog);

    
  return (
    <div>
        <div
        className="background-image"
        style={{
          position: 'relative',
          backgroundImage: `url(${require('../../images/blogbg.png')})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-y',
          height: `140vh`,
          width: '100%',
        }}>
            <div style = {{height: "15vh"}}/>
                    
                    <Container>
                    <ReactPlayer
                    url={myServer + singleBlog.video}
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

                <PostComment />
                <BlogComments />
                
                  </Container>

            </div>        
    </div>
  )
}

export default BlogPage