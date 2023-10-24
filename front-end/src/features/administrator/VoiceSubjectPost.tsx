import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AmericanSubject } from '../../models/AmericanSubject';
import { postAmericanSubjectAsync, postSentenceSubjectAsync, postVoiceSubjectAsync, selectSingleSubjectOfSentence, selectSingleSubjectOfVoice } from './administratorSlice';
import { VoiceSubject } from '../../models/VoiceSubject';



const VoiceSubjectPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const VoiceSubject = useAppSelector(selectSingleSubjectOfVoice)


  const [subject_name, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [thePicture, setPicture] = useState<any>(null);


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
  
    const formData: any = new FormData();
    formData.append('subject_name', subject_name);
    formData.append('description', description);
    formData.append('picture', thePicture);
  
    const newSubject: VoiceSubject = {
      subject_name: subject_name,
      description: description,
      picture: thePicture,
      id: VoiceSubject.id
    };
  
  
    dispatch(postVoiceSubjectAsync(formData));
  
    setTimeout(() => {
      navigate("/administrator/voice_subject/");
    }, 150);
  };
  

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>VOICE TEST SUBJECT</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">
          
        <Form.Group controlId="formSubject">
                <Form.Label className = "blog-form-title"><h5>Voice Test Quiz Subject</h5></Form.Label>
                <Form.Control type="textarea" value={subject_name} onChange={handleSubjectChange} />
              </Form.Group>
          
        <Form.Group controlId="formDescription">
                <Form.Label className = "blog-form-title"><h5>Description</h5></Form.Label>
                <Form.Control type="textarea" value={description} onChange={handleDescriptionChange} />
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
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/voice_subject/">
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

export default VoiceSubjectPost;
