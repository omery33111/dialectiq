import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AmericanQuestion } from '../../models/American';
import { getAmericansOfSubjectAsync, selectAmericanQuestionsisLoading, selectSubjectAmericans } from '../administrator/administratorSlice';
import { getProfileAsync, selectProfile, selectUserID, setPoints } from '../profile/profileSlice';
import { getAmericansAmountAsync, getSingleAmericanSubjectAsync, postAnswerAmericanAsync, selectAmericansAmount, selectSingleSubjectOfAmerican } from './americanSlice';



const AmericanQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const QuizQuestions = useAppSelector(selectSubjectAmericans);

  const singleSubject = useAppSelector(selectSingleSubjectOfAmerican);
  


  const { id } = useParams();

  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(null));
  const [user_answer, setUserAnswer] = useState<any>('');

  const myProfile = useAppSelector(selectProfile);
  const [localPoints, setLocalPoints] = useState<number | null>(null);


const [userPoints, setUserPoints] = useState<number | null>(null);


const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);
const storedUserID = JSON.parse(localStorage.getItem('myID') as string);

const userID = useAppSelector(selectUserID);

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
      dispatch(getSingleAmericanSubjectAsync(id));
      dispatch(getAmericansOfSubjectAsync(id));
      dispatch(getSingleAmericanSubjectAsync(id));
      dispatch(getAmericansAmountAsync(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setPoints(localPoints || myProfile.points));
  }, [localPoints, dispatch, myProfile.points]);





  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const answers = selectedAnswers.map((answerIndex, questionIndex) => ({
      question: Number(QuizQuestions[questionIndex].id),
      user_answer: answerIndex + 1,
    }));

    const americanAnswerData = {
      user_answer: user_answer,
    };
    dispatch(postAnswerAmericanAsync({ americanAnswerData, answers }));

    setTimeout(() => {
      navigate("/quizes/american_quiz/american_finish");
    }, 150);
  };


  const isLoading = useAppSelector(selectAmericanQuestionsisLoading);


  const americansAmount = useAppSelector(selectAmericansAmount);

  const areAllQuestionsAnswered = () => {
    return totalAnswers == americansAmount
  };

  const [totalAnswers, setTotalAnswers] = useState<number>(0);

  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(QuizQuestions.length).fill(false));


  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setUserAnswer(newSelectedAnswers);

    if (!answeredQuestions[questionIndex]) {
      // If the question was not answered before, mark it as answered and increment totalAnswers
      setAnsweredQuestions((prev) => {
        const updatedQuestions = [...prev];
        updatedQuestions[questionIndex] = true;
        return updatedQuestions;
      });
      setTotalAnswers(totalAnswers + 1);
    }
  };


  const resetSelectedAnswers = () => {
    setSelectedAnswers(Array(americansAmount).fill(null));
  };

  // Effect to reset selected answers when the page is refreshed
  useEffect(() => {
    window.addEventListener('beforeunload', resetSelectedAnswers);

    return () => {
      window.removeEventListener('beforeunload', resetSelectedAnswers);
    };
  }, []);

  return (
    <div style = {{backgroundColor: "#F5F5DC"}}>
    <div style={{ height: 200 }} />

    <div className="american-container">
      <Container>
        <Card style={{ display: 'flex', flexDirection: 'column'}}>
            
            <div style = {{padding: "3%"}}>
            <h1>MULTI CHOICE TEST</h1><br/>

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
              
                  {QuizQuestions.map((question: AmericanQuestion, questionIndex: number) => (
                    <div key={question.id}>
                      <ListGroup variant="flush" style={{ padding: "5%" }}>

                      {isLoading ? (
                      <div>
                        <CircularProgress />
                        </div>
                        ) : (
                        <h5>{question.question}</h5>)}

                        <div className="american-quiz-answers">
                          {['1', '2', '3', '4'].map((option, answerIndex) => (
                            <div key={answerIndex} style={{ marginBottom: "5px" }}>
                              <label>

                                <input
                                  type="radio"
                                  name={`question_${questionIndex}`}
                                  value={answerIndex}
                                  checked={selectedAnswers[questionIndex] === answerIndex}
                                  onChange={() => handleAnswerSelect(questionIndex, answerIndex)}/>

                        {isLoading ? (
                                  <div>
                                    <CircularProgress />
                                    </div>
                                    ) : 
                                    (<>
                                {` ${question[`answer${answerIndex + 1}` as keyof AmericanQuestion]}`}
                                </>)}

                              </label>
                            </div>
                          ))}
                        </div>
                      </ListGroup>
                    </div>
                  ))}
                 
              
            </Card.Body>
          </Card>
          <br />
           <Button variant="none" type="submit" style = {{backgroundColor: "#FF6931"}} disabled={!areAllQuestionsAnswered()}>
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

export default AmericanQuiz;
