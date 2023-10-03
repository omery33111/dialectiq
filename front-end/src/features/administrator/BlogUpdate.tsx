import React, { useEffect, useState } from 'react';
import { patchBlogAsync, selectSingleBlog } from './administratorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import ReactPlayer from 'react-player';
import { getSingleBlogAsync } from '../blog/blogSlice';



const BlogUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const singleBlog = useAppSelector(selectSingleBlog);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<any>(null);
  const [picture, setPicture] = useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleBlogAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog.video);
      setPicture(singleBlog.picture);
      setTitle(singleBlog.title);
      setDescription(singleBlog.description);
    }
  }, [singleBlog]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(event.target.files ? event.target.files[0] : undefined);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description', description);
    formData.append('picture', picture);
    formData.append('video', videoFile);

    dispatch(patchBlogAsync({ blogData: formData, id: String(id) }));
    setTimeout(() => {
      navigate('/administrator/blog/');
    }, 150);
  };

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>BLOG</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">
          <Form.Group controlId="formTitle">
            <Form.Label className="blog-form-title">
              <h5>Title</h5>
            </Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label className="blog-form-title">
              <h5>Description</h5>
            </Form.Label>
            <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
          </Form.Group>

          <Form.Group controlId="formThumbnail">
                    <Form.Label className = "blog-form-title"><h5>Thumbnail</h5></Form.Label>
                    <Form.Control type="file" onChange = {handlePictureChange}/>
                  </Form.Group>

          <Form.Group controlId="formVideo">
            <Form.Label className="blog-form-title">
              <h5>Video</h5>
            </Form.Label>
            <Form.Control type="file" accept=".mp4" onChange={handleVideoChange} />
          </Form.Group>

          <br />
          <div>
          <Button className = "submit-update-blog" variant="warning" type="submit">
            <h6>
              <BsCheckLg />
            </h6>
          </Button>&nbsp;
          </div>

          <div>
          <Button className = "cancel-update-blog" variant="info">
          <Link style = {{textDecoration: "none", color: "black"}} to="/administrator/blog/">
            <h6>
              <BsXLg />
            </h6>
            </Link>
          </Button>
          </div>
        </Form>


        <div className="update-singleblog">
        <Container>
          <ReactPlayer
            url={myServer + singleBlog.video}
            controls={true}
            width="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
          <br/>
          <h3>{singleBlog.title}</h3>
          <p>{singleBlog.description}</p>
        </Container>
      </div>
        

        <div style={{ height: '30vh' }} />
      </Container>
    </div>
  );
};

export default BlogUpdate;
