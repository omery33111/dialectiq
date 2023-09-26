import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getAmericansOfSubjectAsync, selectSubjectAmericans } from '../administrator/administratorSlice';
import { getSingleAmericanSubjectAsync, postAnswerAmericanAsync, selectSingleAmerican } from './americanSlice';
import { AmericanQuestion } from '../../models/American';

const AmericanQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const QuizQuestions = useAppSelector(selectSubjectAmericans);
  const { id } = useParams();

  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(null));
  const [user_answer, setUserAnswer] = useState<any>('');

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleAmericanSubjectAsync(id));
      dispatch(getAmericansOfSubjectAsync(id));
    }
  }, [id, dispatch]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setUserAnswer(newSelectedAnswers);
  };

  const singleAmerican = useAppSelector(selectSingleAmerican);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const answers = selectedAnswers.map((answerIndex, questionIndex) => ({
      question: Number(QuizQuestions[questionIndex].id),
      user_answer: answerIndex + 1, // Add 1 to match your expected answer format
    }));

    const americanAnswerData = {
      user_answer: user_answer,
    };
    console.log({ americanAnswerData, answers })
    dispatch(postAnswerAmericanAsync({ americanAnswerData, answers }));
    navigate("/");
  };

  return (
    <div>
      <div style={{ height: 200 }} />

      <div className="american-container">
        <Container>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <h1>MULTI CHOICE TEST</h1>
          </Card>
          <br />

          <Card>
            <Card.Body>
              <br />
              <div className="american-subject-card" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <form onSubmit={handleSubmit}>
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
                                  onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
                                />
                                {` ${question[`answer${answerIndex + 1}` as keyof AmericanQuestion]}`}
                              </label>
                            </div>
                          ))}
                        </div>
                      </ListGroup>
                    </div>
                  ))}
                  <Button variant="warning" type="submit">
                    <h6>SUBMIT</h6>
                  </Button>
                </form>
              </div>
            </Card.Body>
          </Card>
          <br />
        </Container>
      </div>
      <div style={{ height: 220 }} />
    </div>
  );
};

export default AmericanQuiz;
