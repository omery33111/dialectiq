import React, { useEffect, useState } from 'react';
import { patchAmericanSubjectAsync, patchSentenceSubjectAsync, selectSingleSubjectOfSentence } from './administratorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleAmericanSubjectAsync, selectSingleSubjectOfAmerican } from '../american/americanSlice';



const SentenceSubjectUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const SentenceSubject = useAppSelector(selectSingleSubjectOfSentence)

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleAmericanSubjectAsync(id));
    }
  }, [id, dispatch]);

  const [subject_name, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [thePicture, setPicture] = useState<undefined | File>(undefined); 




  useEffect(() => {
    if (SentenceSubject) {
      // Set the state variables with initial values
      setSubject(SentenceSubject.subject_name);
      setDescription(SentenceSubject.description);
    }
  }, [SentenceSubject]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subject_name', subject_name);
    
    // Check if description has changed
    if (description !== SentenceSubject.description) {
      formData.append('description', description);
    }

    // Check if thePicture has changed
    if (thePicture) {
      formData.append('picture', thePicture);
    }

    const newSubject = {
      subject_name: subject_name,
      description: description,
      picture: thePicture,
      id: SentenceSubject.id
    };

    dispatch(patchSentenceSubjectAsync({ subjectData: formData, id: String(id) }));

    setTimeout(() => {
      navigate("/administrator/sentence_subject/");
    }, 150);
  };



  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>AMERICAN QUIZ</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">
          
        <Form.Group controlId="formSubject">
                <Form.Label className = "blog-form-title"><h5>Complete The Sentence Quiz Subject</h5></Form.Label>
                <Form.Control type="textarea" required value={subject_name} onChange={handleSubjectChange} />
              </Form.Group>
          
        <Form.Group controlId="formDescription">
                <Form.Label className = "blog-form-title"><h5>Description</h5></Form.Label>
                <Form.Control type="textarea" required value={description} onChange={handleDescriptionChange} />
              </Form.Group>

              <Form.Group controlId="formPicture">
                    <Form.Label className = "blog-form-title"><h5>Picture</h5></Form.Label>
                    <Form.Control type="file" onChange = {handlePictureChange}/>
                  </Form.Group>
              
          <br />
          <div>
            <Button className="submit-update-blog" variant="warning" type="submit">
              <h6>
                <BsCheckLg />
              </h6>
            </Button>&nbsp;
          </div>

          <div>
            <Button className="cancel-update-blog" variant="info">
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/sentence_subject">
                <h6>
                  <BsXLg />
                </h6>
              </Link>
            </Button>
          </div>
        </Form>

        <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default SentenceSubjectUpdate;
