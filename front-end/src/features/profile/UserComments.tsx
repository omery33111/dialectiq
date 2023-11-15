import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getSingleProfileAsync, getUserQuizesAsync, getUserSingleBlogCommentsAsync, selectProfile, selectSingleBlogUserComments, selectUserAnsweredQuizes, selectUserID } from './profileSlice';
import { logoutAsync, selectIsLogged } from '../authentication/authenticationSlice';



const UserComments = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const userComments = useAppSelector(selectSingleBlogUserComments);
  const userQuizes = useAppSelector(selectUserAnsweredQuizes);

  const isLogged = useAppSelector(selectIsLogged);

  const userID = useAppSelector(selectUserID);

  const { id } = useParams();

  useEffect(() => {
    if (userID !== -1) {
    if (id !== undefined) {
      dispatch(getUserSingleBlogCommentsAsync(Number(id)));
      dispatch(getSingleProfileAsync(Number(id)));

      dispatch(getUserQuizesAsync(Number(id)));
    }
  }
  }, [id, dispatch]);

  const userProfile = useAppSelector(selectProfile);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }


  function handleComment(comment: any) {
    if (window.innerWidth <= 768 && comment.length > 15) {
      comment = comment.substring(0, 15) + '...';
    }
    return comment;
  }


  return (
    <div>
      {userComments.length > 0 ? (

        <div>

      {userQuizes.length > 0 ? (
            <div>
      
            <div className = "scrollbar-pic">
            
                
                <div>
                <img
                  src={require('../../images/recentcomments.png')}
                  width = "350"/>
                  <br/>
                  <br/>
                  </div>
      
              
                </div>
          
          <div className = "scrollbar-user-comments">
          <div style={{ overflowY: 'auto', maxHeight: '500px', width: "100%"}}>
            {userComments && userComments.map((user_blogs) => (
              <div key={user_blogs.id}>
                <Card className='user-comments-card'>
      
                  <Card.Header className = "user-comments-card-header" onClick = {() => {navigate(`/blog/blog_page/${user_blogs.id}`)}}>
                      
                    <img
                      src={myServer + user_blogs.blog_info.picture}
                      alt="user-comments-pic"
                      className='user-comments-card-pic'
                    />
                    <img
                            src={require('../../images/forthumbnail.png')}
                            className='user-comments-card-pic-thumb'
                          />
      
                      <div className = "user-comments-nopic">
                    <div className='user-comments-card-title'>
                    <h2>{user_blogs.blog_info.title}</h2>
                    </div>
      
                    <div className='user-comments-card-desc'>
                    <p>{user_blogs.blog_info.description}</p>
                    </div>
      
                    <div className='user-comments-card-date'>
                    <span >{formatDate(user_blogs.blog_info.date)}</span>
                    </div>
                    </div>
      
                  </Card.Header>
                  <Card.Body>
                    {user_blogs.comments.map((comment, index) => (
                      <div key={index}>
      
                          <Card className="comment-card">
                              <Card.Body>
      
                                      <img onClick = {() => window.location.reload()}
                                      style = {{cursor: 'pointer', position: "relative", top: -8}}
                                      src={myServer + userProfile.picture}
                                      alt={`${userProfile.first_name} ${userProfile.last_name}`}
                                      className="user-picture"/>
      
                                      <div className = "user-single-comment">
      
                                      <div style = {{position: "absolute", textAlign: "left", justifyContent: "left"}}>
                                      <Card.Title onClick = {() => window.location.reload()} style = {{cursor: 'pointer', transform: "translateX(240px) translateY(-80px)"}}>
                                      <div style = {{width: "400px"}}>
                                        {userProfile.first_name}{' '}
                                          
                                          {userProfile.last_name}
                                          </div>
                                      </Card.Title>
                                      <Card.Title onClick = {() => window.location.reload()} style = {{cursor: 'pointer', transform: "translateX(242px) translateY(-85px)", fontSize: "0.8rem"}}>
                                          {userProfile.location}
                                      </Card.Title>
                                      </div>
      
                                      <Card.Text style = {{position: "relative", transform: "translateX(107px) translateY(-24px)"}}>
                                          {handleComment(comment)}
                                      </Card.Text>
      
                                      </div>
      
                              </Card.Body>
                          </Card>
                        
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            ))}
            
          </div>
          </div>
      
          </div>
      ) : ("")}

        </div>

      ) : ("")}


    </div>
  );
};

export default UserComments;
