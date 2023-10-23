import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getAmericansOfSubjectAsync, getSingleSentenceSubjectAsync, selectSingleSubjectOfSentence, selectSubjectAmericans } from '../administrator/administratorSlice';
import { AmericanQuestion } from '../../models/American';
import { getProfileAsync, selectProfile, selectUserID, setPoints } from '../profile/profileSlice';
import { getSentencesOfSubjectAsync, postAnswerSentenceAsync, selectSubjectSentences } from './sentenceSlice';



const SentenceQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const QuizQuestions = useAppSelector(selectSubjectSentences);


  const singleSubject = useAppSelector(selectSingleSubjectOfSentence);

  const { id } = useParams();


  const myProfile = useAppSelector(selectProfile);
  const [localPoints, setLocalPoints] = useState<number | null>(null);


const [userPoints, setUserPoints] = useState<number | null>(null);

const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

const userID = useAppSelector(selectUserID);

useEffect(() => {
  if (storedIsLogged) {
    if (!userID) {
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
      dispatch(getSingleSentenceSubjectAsync(id));
      dispatch(getSentencesOfSubjectAsync(id));
      dispatch(getSingleSentenceSubjectAsync(id));
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

    const sentenceAnswerData = {
      user_answer: userAnswers,
    };

    dispatch(postAnswerSentenceAsync({ sentenceAnswerData, answers }));


    setTimeout(() => {
      navigate("/quizes/sentence_quiz/sentence_finish");
    }, 150);
  };



  return (
    <div>
    <div style={{ height: 200 }} />

    <div className="american-container">
      <Container>
        <Card style={{ display: 'flex', flexDirection: 'column'}}>
            
            <div style = {{padding: "3%"}}>
            <h1>MULTI CHOICE TEST</h1><br/>

              {singleSubject.description}
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
    <h5>{question.question}</h5>
    <ListGroup variant="flush" style={{ padding: "5%" }}>
      <Form.Group controlId={`formAnswer${index}`}>
        <Form.Control
          type="textarea"
          onChange={(e: any) => handleAnswerChange(e, index)}
        />
      </Form.Group>
    </ListGroup>
  </div>
))}
                 
              
            </Card.Body>
          </Card>
          <br />
           <Button variant="warning" type="submit">
                    <h6 style = {{margin: 0}}>SUBMIT</h6>
                  </Button>
          </form>
              </div>
          
        </Container>
      </div>
      <div style={{ height: 220 }} />
    </div>
  );
};

export default SentenceQuiz;
