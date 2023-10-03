import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleProfileAsync, getUserSingleBlogCommentsAsync, selectProfile, selectSingleBlogUserComments } from './profileSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import { Card } from 'react-bootstrap';



const UserComments = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const userComments = useAppSelector(selectSingleBlogUserComments);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getUserSingleBlogCommentsAsync(Number(id)));
      dispatch(getSingleProfileAsync(Number(id)));
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

      <div className = "scrollbar-pic">
          <img
            src={require('../../images/recentcomments.png')}
            width = "350"/>
            <br/>
            <br/>
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

                                <div style = {{flexDirection: "column"}}>
                                <Card.Title onClick = {() => window.location.reload()} style = {{cursor: 'pointer', width: "150%", position: "relative", top: -80, right: -90}}>
                                    {userProfile.first_name || 'UNKNOWN'}{' '}
                                    {userProfile.last_name || 'UNKNOWN'}
                                </Card.Title>
                                <Card.Title onClick = {() => window.location.reload()} style = {{cursor: 'pointer', width: "150%", position: "relative", top: -80, right: -45}}>
                                    <h6>{userProfile.location || 'UNKNOWN'}</h6>
                                </Card.Title>
                                </div>

                                <Card.Text style = {{position: "relative", top: -23, right: -15}}>
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
  );
};

export default UserComments;
