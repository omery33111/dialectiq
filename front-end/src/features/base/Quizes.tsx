import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Quizes = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      
      <Container>
      <br/>
      <br/>      <br/>
      <br/>
        <div className = "panel-pics">
          <div>
          <Link to="/quizes/american_quiz/subjects">
            <div style = {{borderRadius: "10px"}}>
            <img className = "panel-pic" src={require('../../images/quizpic1.png')} alt="portalpic1"
            height = "300"
            width = "300"
            >
              </img>
              </div>
              
              </Link>
              
            
          </div>

          <div>
          <Link to="/quizes/sentence_quiz/subjects">
            <img className = "panel-pic" src={require('../../images/quizpic2.png')} alt="portalpic2"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>

          <div>
          <Link to="/quizes/voice_quiz/subjects">
            <img className = "panel-pic" src={require('../../images/quizpic3.png')} alt="portalpic1"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>
          
        </div>
        <br/>
      <br/>
      </Container>
      
      <div style={{ height: 900 }} />
    </div>
  );
};

export default Quizes;