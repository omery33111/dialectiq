import { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getSentenceSubjectsAsync, selectAllSubjectsOfSentence } from './sentenceSlice';

const SentenceSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfSentence);

  useEffect(() => {
    dispatch(getSentenceSubjectsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1 style={{ padding: "15px", justifyContent: "center", textAlign: "center" }}>COMPLETE THE SENTENCE</h1>
        <br />
        <br />
        <div className="american-subject-card" style={{ display: "flex", flexDirection: 'column', gap: "30px", cursor: "pointer" }}>
          {subjects.slice().reverse().map((subject) => (
            <Card
              key={subject.id}
              onClick={() => { navigate(`/quizes/sentence_quiz/sentence_test/${subject.id}/`) }}
              className="card-with-bg-image"
              style={{ backgroundImage: `url(${myServer + subject.picture})`}}
            >
              <Card.Body>
                <Card.Title className='american-subject-card-text' style = {{color: "white"}}>COMPLETE THE SENTENCE</Card.Title>
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

export default SentenceSubjects;