import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAmericanSubjectsAsync, selectAllSubjectsOfAmerican } from '../administrator/administratorSlice';
import { useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';

const AmericanSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfAmerican);

  useEffect(() => {
    dispatch(getAmericanSubjectsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1 style={{ padding: "15px", justifyContent: "center", textAlign: "center" }}>MULTI CHOICE</h1>
        <br />
        <br />
        <div className="american-subject-card" style={{ display: "flex", flexDirection: 'column', gap: "30px", cursor: "pointer" }}>
          {subjects.slice().reverse().map((subject) => (
            <Card
              key={subject.id}
              onClick={() => { navigate(`/quizes/american_quiz/american_test/${subject.id}/`) }}
              className="card-with-bg-image"
              style={{ backgroundImage: `url(${myServer + subject.picture})`}}
            >
              <Card.Body>
                <Card.Title className='american-subject-card-text' style = {{color: "white"}}>MULTI CHOICE</Card.Title>
                <Card.Text className='american-subject-card-text' style = {{color: "white"}}>
                  {subject.subject_name}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <div style={{ height: 220 }} />
    </div>
  );
};

export default AmericanSubjects;