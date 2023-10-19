import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SentenceSubject } from '../../models/SentenceSubject';
import { getSentenceSubjectsAsync, selectAllSubjectsOfSentence } from '../sentence/sentenceSlice';
import { postSentenceAsync } from './administratorSlice';

const SentencePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfSentence)


  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subject, setSubject] = useState(0);


  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCorrectAnswer(e.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    formData.append('correct_answer', correctAnswer);
    formData.append('subject', subject.toString());

    dispatch(postSentenceAsync(formData));

    setTimeout(() => {
      navigate("/administrator/sentence_quiz/");
    }, 150);
  };

  useEffect(() => {
    dispatch(getSentenceSubjectsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1>AMERICAN QUIZ</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="blog-form">

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => setSubject(Number(event.target.value))}
            required
            value={subject}
          >
            <option value="">SELECT A SUBJECT</option>
            {subjects.map((subject: SentenceSubject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>


        <Form.Group controlId="formQuestion">
                <Form.Label className = "blog-form-title"><h5>Question</h5></Form.Label>
                <Form.Control type="textarea" value={question} onChange={handleQuestionChange} />
              </Form.Group>
              
              <Form.Group controlId="correctAnswer">
                <Form.Label className = "blog-form-title"><h5>Correct Answer</h5></Form.Label>
                <Form.Control type="textarea" value={correctAnswer} onChange={handleCorrectAnswerChange} />
              </Form.Group>


          <br />
          <div>
          <Button className="submit-update-blog" variant="warning" type="submit" disabled={!subject}>
              <h6>
                <BsCheckLg />
              </h6>
            </Button>
            &nbsp;
          </div>

          <div>
            <Button className="cancel-update-blog" variant="info">
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/sentence_quiz/">
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

export default SentencePost;
