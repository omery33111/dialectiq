import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getAmericansOfSubjectAsync, selectSubjectAmericans } from '../administrator/administratorSlice';
import { getSingleAmericanSubjectAsync, postAnswerAmericanAsync, saveAnswers, selectSingleSubjectOfAmerican } from './americanSlice';
import { AmericanQuestion } from '../../models/American';
import { getProfileAsync, selectProfile, selectUserID, setPoints } from '../profile/profileSlice';



const AmericanQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const QuizQuestions = useAppSelector(selectSubjectAmericans);

  const savedAnswers = useAppSelector(saveAnswers);

  const singleSubject = useAppSelector(selectSingleSubjectOfAmerican);

  const { id } = useParams();

  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(null));
  const [user_answer, setUserAnswer] = useState<any>('');

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
      dispatch(getSingleAmericanSubjectAsync(id));
      dispatch(getAmericansOfSubjectAsync(id));
      dispatch(getSingleAmericanSubjectAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setPoints(localPoints || myProfile.points));
  }, [localPoints, dispatch, myProfile.points]);


  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setUserAnswer(newSelectedAnswers);
  };


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
              
                  {QuizQuestions.map((question: AmericanQuestion, questionIndex: number) => (
                    <div key={question.id}>
                      <ListGroup variant="flush" style={{ padding: "5%" }}>
                        <h5>{question.question}</h5>

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
                                {` ${question[`answer${answerIndex + 1}` as keyof AmericanQuestion]}`}

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

export default AmericanQuiz;
