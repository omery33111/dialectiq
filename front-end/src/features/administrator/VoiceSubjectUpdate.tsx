import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleVoiceSubjectAsync, patchVoiceSubjectAsync, selectSingleSubjectOfVoice } from './administratorSlice';



const VoiceSubjectUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const VoiceSubject = useAppSelector(selectSingleSubjectOfVoice)

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleVoiceSubjectAsync(id));
    }
  }, [id, dispatch]);

  const [subject_name, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [thePicture, setPicture] = useState<undefined | File>(undefined); 




  useEffect(() => {
    if (VoiceSubject) {
      // Set the state variables with initial values
      setSubject(VoiceSubject.subject_name);
      setDescription(VoiceSubject.description);
    }
  }, [VoiceSubject]);

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
    
    if (description !== VoiceSubject.description) {
      formData.append('description', description);
    }

    if (thePicture) {
      formData.append('picture', thePicture);
    }

    dispatch(patchVoiceSubjectAsync({ subjectData: formData, id: String(id) }));

    setTimeout(() => {
      navigate("/administrator/voice_subject/");
    }, 150);
  };



  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>VOICE QUIZ</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">
          
        <Form.Group controlId="formSubject">
                <Form.Label className = "blog-form-title"><h5>Voice Quiz Subject</h5></Form.Label>
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
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/voice_subject">
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

export default VoiceSubjectUpdate;
