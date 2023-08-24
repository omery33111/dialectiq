import React, { useState } from 'react';
import { postBlogAsync } from './administratorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';



const BlogPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    };
  
    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setVideoFile(event.target.files ? event.target.files[0] : undefined);
    };
  
  
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<any>(null);
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', videoFile);
  
      dispatch(postBlogAsync(formData));

      setTimeout(() => {
        navigate("/administrator/blog/");
    }, 150);
    };

  return (
    <div>
        
        <div style = {{height: 200}}/>
      <Container>

      <h1>BLOG</h1>
      <br/>
      <br/>
      <Form onSubmit={handleSubmit} className = "blog-form">
              <Form.Group controlId="formTitle">
                <Form.Label className = "blog-form-title"><h5>Title</h5></Form.Label>
                <Form.Control type="text" value={title} onChange={handleTitleChange} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label className = "blog-form-title"><h5>Description</h5></Form.Label>
                <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
              </Form.Group>

              <Form.Group controlId="formVideo">
                    <Form.Label className = "blog-form-title"><h5>Video</h5></Form.Label>
                    <Form.Control type="file" accept='.mp4' onChange = {handleVideoChange}/>
                  </Form.Group>

                  <br/>
                  <Button
                  style = {{width: "20%"}}
                onClick={() => {
                  // window.location.href = '/administrator/blog';
                }}
                variant="warning"
                type="submit">
                <h6 style={{ margin: 0 }}>
                  <BsCheckLg />
                </h6>
              </Button>
        </Form>

      <div style = {{height: "30vh"}}/>
        </Container>
    </div>
  )
}

export default BlogPost