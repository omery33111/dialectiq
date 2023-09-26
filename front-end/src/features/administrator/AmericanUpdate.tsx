import React, { useEffect, useState } from 'react';
import { getAmericanSubjectsAsync, patchAmericanAsync, selectAllSubjectsOfAmerican } from './administratorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleAmericanAsync, selectSingleAmerican } from '../american/americanSlice';
import { AmericanSubject } from '../../models/AmericanSubject';



const AmericanUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const singleAmerican = useAppSelector(selectSingleAmerican);
  const subjects = useAppSelector(selectAllSubjectsOfAmerican)

  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [subject, setSubject] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleAmericanAsync(id));
    }

    dispatch(getAmericanSubjectsAsync());
  }, [id, dispatch]);

  useEffect(() => {
    if (singleAmerican) {
      
      setQuestion(singleAmerican.question);
      setAnswer1(singleAmerican.answer1);
      setAnswer2(singleAmerican.answer2);
      setAnswer3(singleAmerican.answer3);
      setAnswer4(singleAmerican.answer4);
      setCorrectAnswer(singleAmerican.correct_answer);
    }
  }, [singleAmerican]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswer1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer1(e.target.value);
  };

  const handleAnswer2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer2(e.target.value);
  };

  const handleAnswer3Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer3(e.target.value);
  };

  const handleAnswer4Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer4(e.target.value);
  };

  const handleCorrectAnswerChange = (eventKey: string | null) => {
    if (eventKey !== null) {
      setCorrectAnswer(Number(eventKey));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    formData.append('answer1', answer1);
    formData.append('answer2', answer2);
    formData.append('answer3', answer3);
    formData.append('answer4', answer4);
    formData.append('correct_answer', correctAnswer.toString());
    formData.append('subject', subject.toString());
    

    dispatch(patchAmericanAsync({ americanData: formData, id: String(id) }));
    setTimeout(() => {
      navigate('/administrator/american_quiz/');
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
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => setSubject(Number(event.target.value))}
            required
            value={subject}
          >
            <option value="">SELECT A SUBJECT</option>
            {subjects.map((subject: AmericanSubject) => (
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
              
              <Form.Group controlId="formAnswer1">
                <Form.Label className = "blog-form-title"><h5>Answer1</h5></Form.Label>
                <Form.Control type="textarea" value={answer1} onChange={handleAnswer1Change} />
              </Form.Group>

              <Form.Group controlId="formAnswer2">
                <Form.Label className = "blog-form-title"><h5>Answer2</h5></Form.Label>
                <Form.Control type="textarea" value={answer2} onChange={handleAnswer2Change} />
              </Form.Group>

              <Form.Group controlId="formAnswer3">
                <Form.Label className = "blog-form-title"><h5>Answer3</h5></Form.Label>
                <Form.Control type="textarea" value={answer3} onChange={handleAnswer3Change} />
              </Form.Group>

              <Form.Group controlId="formAnswer4">
                <Form.Label className = "blog-form-title"><h5>Answer4</h5></Form.Label>
                <Form.Control type="textarea" value={answer4} onChange={handleAnswer4Change} />
              </Form.Group>

          <Form.Group controlId="formCorrectAnswer">
            <Form.Label className="blog-form-title">
              <h5>Correct Answer</h5>
            </Form.Label>
            <Dropdown onSelect={handleCorrectAnswerChange}>
              <Dropdown.Toggle variant="dark">
                {correctAnswer ? correctAnswer : "SELECT AN OPTION"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

        <div className="update-american">
        <Container>
          <br/>
          <h3 style = {{position: "relative", justifyContent: "center", textAlign: "center"}}>{singleAmerican.subject.subject_name}</h3><br/>
          <h5 className="update-american-answer">{singleAmerican.question}</h5><br/>
          <h5 className="update-american-answer">1. {singleAmerican.answer1}</h5>
          <h5 className="update-american-answer">2. {singleAmerican.answer2}</h5>
          <h5 className="update-american-answer">3. {singleAmerican.answer3}</h5>
          <h5 className="update-american-answer">4. {singleAmerican.answer4}</h5><br/>
          <p><b style = {{color: "red"}}>CORRECT ANSWER: </b>{singleAmerican.correct_answer}</p>
        </Container>
      </div>

        <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default AmericanUpdate;
