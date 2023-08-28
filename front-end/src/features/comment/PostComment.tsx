import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { myServer } from '../../endpoints/endpoints'
import { getProfileAsync } from '../profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSingleBlog } from '../blog/blogSlice';
import { BsSend } from "react-icons/bs";
import { getCommentsAsync, postCommentAsync } from './commentSlice';



const PostComment = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileAsync());
      }, [dispatch]);
      


  const { first_name, last_name, location, picture, profile_id } = useAppSelector((state) => state.profile);


    
  const singleBlog = useAppSelector(selectSingleBlog);


const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('blog', String(singleBlog.id));
    formData.append('profile', String(profile_id));
    formData.append('comment', comment);

    dispatch(postCommentAsync(formData)).then(() => {
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
                            src={myServer + picture}
                            alt='addcomment'
                            className="user-picture"
                        />
                        <div>
                            <Card.Title>{first_name? (first_name) : ("UNKNOWN")} {last_name? (last_name) : ("UNKNOWN")}</Card.Title>
                            <Card.Title><h6>{location? (first_name) : ("UNKNOWN")}</h6></Card.Title>
                            <Form onSubmit={handleSubmit}>
                            <Card.Text>
                              
                              <div>
                            <Form.Group controlId="formComment" className = "comment-form">
                            <Form.Control
                            style = {{width: "30%"}}
                              type="text"
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