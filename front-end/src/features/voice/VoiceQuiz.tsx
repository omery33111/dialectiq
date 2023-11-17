import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleVoiceSubjectAsync, selectSingleSubjectOfVoice } from '../administrator/administratorSlice';
import { getProfileAsync, selectProfile, selectUserID, setPoints } from '../profile/profileSlice';
import { getVoicesOfSubjectAsync, postAnswerVoiceAsync, selectSubjectQuizes, selectVoiceQuestionsisLoading } from './voiceSlice';
import { myServer } from '../../endpoints/endpoints';
import { CircularProgress } from '@mui/material';



const VoiceQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const QuizQuestions = useAppSelector(selectSubjectQuizes);


  const singleSubject = useAppSelector(selectSingleSubjectOfVoice);

  const { id } = useParams();


  const myProfile = useAppSelector(selectProfile);
  const [localPoints, setLocalPoints] = useState<number | null>(null);


const [userPoints, setUserPoints] = useState<number | null>(null);

const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

const userID = useAppSelector(selectUserID);

const storedUserID = JSON.parse(localStorage.getItem('myID') as string);

useEffect(() => {
  if (storedIsLogged) {
    if (storedUserID !== -1) {
  dispatch(getProfileAsync()).then(() => {
    const storedPoints = JSON.parse(localStorage.getItem("points") as string);
    const profilePoints = myProfile.points;
    setUserPoints(storedPoints !== null ? storedPoints : profilePoints);
  });
  }
}
}, []);

  

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleVoiceSubjectAsync(id));
      dispatch(getVoicesOfSubjectAsync(id));
      dispatch(getSingleVoiceSubjectAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setPoints(localPoints || myProfile.points));
  }, [localPoints, dispatch, myProfile.points]);



  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(''));
  const [userAnswers, setUserAnswers] = useState(Array(QuizQuestions.length).fill(''));

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = e.target.value;
    setUserAnswers(updatedAnswers);
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const answers: any = QuizQuestions.map((question, index) => ({
      question: question.id,
      user_answer: userAnswers[index],
    }));

    const voiceAnswerData = {
      user_answer: userAnswers,
    };

    dispatch(postAnswerVoiceAsync({ voiceAnswerData, answers }));


    setTimeout(() => {
      navigate("/quizes/voice_quiz/voice_finish");
    }, 150);
  };


  const isLoading = useAppSelector(selectVoiceQuestionsisLoading);


  return (
    <div style = {{backgroundColor: "#F5F5DC"}}>
    <div style={{ height: 200 }} />

    <div className="american-container">
      <Container>
        <Card style={{ display: 'flex', flexDirection: 'column'}}>
            
            <div style = {{padding: "3%"}}>
            <h1>Voice Quiz</h1><br/>

            {isLoading ? (
          <div>
            <CircularProgress />
            </div>
            ) : (
              singleSubject.description)}
              
            </div>
          </Card>
          <br />
          <div className="american-quiz-card" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <form onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <br />
              
              {QuizQuestions.map((question, index) => (
    <div key={question.id}>

                    {isLoading ? (
                      <div>
                        <CircularProgress />
                        </div>
                        ) : (
        <audio controls controlsList = "nodownload" style = {{width: '100%'}}>
          <source src={myServer + question.question} />
          Your browser does not support the audio element.
        </audio>)}

              {isLoading ? (
                    <div>
                      <CircularProgress />
                    </div>
                      ) : (
                  <ListGroup variant="flush" style={{ padding: "5%" }}>
                    <Form.Group controlId={`formAnswer${index}`}>
                      <Form.Control
                      required
                        type="textarea"
                        dir="rtl"
                        onChange={(e: any) => handleAnswerChange(e, index)}
                      />
                    </Form.Group>
                  </ListGroup>)}
                </div>
              ))}
                 
              
            </Card.Body>
          </Card>
          <br />
           <Button variant="none" type="submit" style = {{backgroundColor: "#FF6931"}}>
                    <h6 style = {{margin: 0, color: "white"}}>SUBMIT</h6>
                  </Button>
          </form>
              </div>
          
        </Container>
      </div>
      <div style={{ height: 220 }} />
    </div>
  );
};

export default VoiceQuiz;
