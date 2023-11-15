import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdInformation } from 'react-icons/io';


const Quizes = () => {



  const isMobile = window.innerWidth <= 767;

  return (
<div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#F5F5DC" }}>
      <Container>
        <br />
        <br />
        <br />
        <br />


        <div className="card-container">

    
      {isMobile ? (
        <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            <p>Quizzes are 100 points and wrong answers decrease the amount of potential points. Re-answer quizzes to learn from your mistakes,
              but be careful: wrong answers to previously correct questions cost 5 points and you can't earn points on questions you were already right in.</p>
          </Tooltip>
        }
      >
        <div className="circle-info">
          <p style={{ color: 'white', margin: 0, fontSize: "3.3rem", top: -12, right: -9, position: "relative" }}><IoMdInformation /></p>
        </div>
      </OverlayTrigger>
      ) : (<OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            <p>Quizzes are 100 points and wrong answers decrease the amount of potential points. Re-answer quizzes to learn from your mistakes,
              but be careful: wrong answers to previously correct questions cost 5 points and you can't earn points on questions you were already right in.</p>
          </Tooltip>
        }
      >
        <div className="circle-info">
          <p style={{ color: 'white', margin: 0, fontSize: "3.3rem", top: -16, right: -4, position: "relative" }}><IoMdInformation /></p>
        </div>
      </OverlayTrigger>)}
        

        
          
          <div className="custom-card" style={{ backgroundColor: "#A0784F" }}>
            
            <div className="image-box">
              <img className="panel-pic" src={require('../../images/quizpic1.png')} alt="portalpic1"
                height="500"
                width="100%"
              />
            </div>
            <div className="card-content">
              <h2>Multi Choice</h2>
              <p>
              For each question, pick the 1 answer that makes the most sense.
              Choose wisely to ace this quiz and show your smarts. Your mission is to select the very best option from the 4 choices given.
              </p>
              <Link to="/quizes/american_quiz/subjects">Lets Begin!</Link>
            </div>
          </div>

          {/* Repeat the structure for other images */}
          <div className="custom-card" style={{ backgroundColor: "#009688" }}>
            <div className="image-box">
              <img className="panel-pic" src={require('../../images/quizpic2.png')} alt="portalpic2"
                height="500"
                width="100%"
              />
            </div>
            <div className="card-content">
              <h2>Complete The Sentence</h2>
              <p>
              Choose the word that best fits the sentence. Select wisely to excel on this quiz.
              Pick the word that perfectly matches the sentence meaning.
              </p>
              <Link to="/quizes/sentence_quiz/subjects">Lets Begin!</Link>
            </div>
          </div>

          <div className="custom-card" style={{ backgroundColor: "#FF6931" }}>
            <div className="image-box">
              <img className="panel-pic" src={require('../../images/quizpic3.png')} alt="portalpic3"
                height="500"
                width="100%"
              />
            </div>
            <div className="card-content">
              <h2>Auditory</h2>
              <p>
              In this quiz, listen carefully and spell what you hear correctly. Focus your hearing to ace this test of dictation skills.
              Your goal is to write down the words exactly as they are spoken.
              </p>
              <Link to="/quizes/voice_quiz/subjects">Lets Begin!</Link>
            </div>
          </div>
        </div>

        <br />
        <br />
      </Container>

      <div style={{ height: 900 }} />
    </div>
  );
};

export default Quizes;