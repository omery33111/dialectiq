import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfileAsync, selectProfile, selectUserID } from '../profile/profileSlice';
import { getRightAmericansAsync, selectAmericanCorrectAnswers } from '../administrator/administratorSlice';
import { Button, Card, Modal } from 'react-bootstrap';

const AmericanFinish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const myProfile = useAppSelector(selectProfile);

  const rightAmericans = useAppSelector(selectAmericanCorrectAnswers);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const userID = useAppSelector(selectUserID);

  useEffect(() => {
    if (storedIsLogged) {
      dispatch(getProfileAsync());
      dispatch(getRightAmericansAsync());
    }
  }, [dispatch]);

  const localStoragePoints = JSON.parse(localStorage.getItem("points") as string);
  

  const [modalContent, setModalContent] = useState(null); // State to store modal content
  const [showModal, setShowModal] = useState(false);

  const openModal = (content: any) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  return (
    <div className="page-container">
      <div style={{ height: "8vh" }} />
      <img className="congrats-image" src={require('../../images/congrats.png')} alt="congrats" width="600" height="300" />

      <div className="centered-container">
  {storedIsLogged ? (
    <h1 className="points-count-quiz">
      <CountUp start={0} end={myProfile.points - localStoragePoints} duration={2} />
    </h1>
  ) : (
    <div className="animate-pop">
      You successfully completed the test!
    </div>
  )}



  <div className='redirected' onClick={() => openModal(rightAmericans)}>
  <Card     style = {{borderRadius: "17px", height: "170px", cursor: "pointer"}}
              className="results-card"
            >
            </Card>
  </div>

  
  <ConfettiExplosion
    force={0.9}
    duration={4500}
    particleCount={400}
    width={2300}
    height="180vh"
    particleSize={10}
  />

  
</div>

<Modal show={showModal} onHide={closeModal}>
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>
    {rightAmericans.length === 0 ? (
      <div>You did not answer any question correctly! Try again.</div>
    ) : (
      rightAmericans.map((answer) => (
        <Card key={answer.id} style={{ marginBottom: '10px' }}>
          <Card.Title style={{ margin: '10px' }}>
            {answer.question}
          </Card.Title>
          <Card.Text style={{ margin: '10px' }}>
            {answer.user_answer}
          </Card.Text>
        </Card>
      ))
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


      <br />
      <br />
      <br />
      <br />
      <br />
      {storedIsLogged ? (
        <img className="congrats-message-image" src={require('../../images/congratsmessageamerican.png')} alt="congratsmessageamerican" width="750" height="200" />
      ) : (
        <img className="congrats-message-image" src={require('../../images/congratsmessagequiznonprem.png')} alt="congratsmessageamerican" width="750" height="200" />
      )}
      
      
    </div>
  );
};

export default AmericanFinish;
