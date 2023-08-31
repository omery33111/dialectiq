import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { myServer } from '../../endpoints/endpoints'
import { getProfileAsync, selectProfile } from '../profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSingleBlog } from '../blog/blogSlice';
import { BsSend } from "react-icons/bs";
import { getCommentsAsync, postCommentAsync } from './commentSlice';
import { useNavigate } from 'react-router-dom';



const PostComment = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProfileAsync());
      }, [dispatch]);
      


      
  const myProfile = useAppSelector(selectProfile)


    
  const singleBlog = useAppSelector(selectSingleBlog);


const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('blog', String(singleBlog.id));
    formData.append('profile', String(myProfile.profile_id));
    formData.append('comment', comment);
    

    dispatch(postCommentAsync(formData)).then(() => {
      setComment("")

      // After posting the comment, refresh the comments list
      dispatch(getCommentsAsync(Number(singleBlog.id)));
      
    });
  };


  return (
    <div>
        
        <div className="comment-container">
                <Card className="comment-card">
                    <Card.Body className="comment-body">
                        <img
                            onClick = {() => navigate("/profile/profile")} style = {{cursor: 'pointer'}}
                            src={myServer + myProfile.picture}
                            alt='addcomment'
                            className="user-picture"
                        />
                        <div>
                            <Card.Title onClick = {() => navigate("/profile/profile")} style = {{cursor: 'pointer', width: "40%"}}>{myProfile.first_name? (myProfile.first_name) : ("UNKNOWN")} {myProfile.last_name? (myProfile.last_name) : ("UNKNOWN")}</Card.Title>
                            <Card.Title onClick = {() => navigate("/profile/profile")} style = {{cursor: 'pointer', width: "20%"}}><h6>{myProfile.location? (myProfile.location) : ("UNKNOWN")}</h6></Card.Title>
                            <Form onSubmit={handleSubmit}>
                            <Card.Text>
                              
                              <div>
                            <Form.Group controlId="formComment" className = "comment-form">
                            <Form.Control
                            style = {{width: "30%"}}
                              type="text"
                              value = {comment}
                              onChange={(event) => setComment(event.target.value)}
                              required/>
                          </Form.Group>
                          <Button variant="dark" type="submit" className = "comment-button">
                              <h5 ><BsSend /></h5>
                            </Button>
                            </div>

                            </Card.Text>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
        </div>

    </div>
  )
}

export default PostComment