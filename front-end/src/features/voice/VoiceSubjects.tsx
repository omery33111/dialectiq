import { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getVoiceSubjectsAsync, selectAllSubjectsOfVoice } from './voiceSlice';

const VoiceSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfVoice);

  useEffect(() => {
    dispatch(getVoiceSubjectsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        <h1 style={{ padding: "15px", justifyContent: "center", textAlign: "center" }}>VOICE QUIZ</h1>
        <br />
        <br />
        <div className="american-subject-card" style={{ display: "flex", flexDirection: 'column', gap: "30px", cursor: "pointer" }}>
          {subjects.slice().reverse().map((subject) => (
            <Card
              key={subject.id}
              onClick={() => { navigate(`/quizes/voice_quiz/voice_test/${subject.id}/`) }}
              className="card-with-bg-image"
              style={{ backgroundImage: `url(${myServer + subject.picture})`}}
            >
              <Card.Body>
                <Card.Title className='american-subject-card-text' style = {{color: "white"}}>VOICE QUIZ</Card.Title>
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

export default VoiceSubjects;