import React, { useEffect, useState } from 'react';
import { patchAmericanSubjectAsync } from './administratorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleAmericanSubjectAsync, selectSingleSubjectOfAmerican } from '../american/americanSlice';



const AmericanSubjectUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const AmericanSubject = useAppSelector(selectSingleSubjectOfAmerican)

  const [subject_name, setSubject] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleAmericanSubjectAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (AmericanSubject) {
      
      setSubject(AmericanSubject.subject_name);
    }
  }, [AmericanSubject]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('subject_name', subject_name);

    dispatch(patchAmericanSubjectAsync({ subjectData: formData, id: String(id) }));
    setTimeout(() => {
      navigate('/administrator/american_subject/');
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
                <Form.Label className = "blog-form-title"><h5>American Subject</h5></Form.Label>
                <Form.Control type="textarea" value={subject_name} onChange={handleSubjectChange} />
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
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/american_quiz/">
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

export default AmericanSubjectUpdate;
