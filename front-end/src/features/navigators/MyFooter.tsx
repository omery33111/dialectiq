import { Container } from 'react-bootstrap';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';



const MyFooter = () => {



  return (
    
    <div>
     <footer style={{ height: "200px", width: "100%", position: 'relative', bottom: 0, backgroundColor: '#5271ff' }} className="text-light py-4">
    <Container className='text-center'>
                <a href="https://github.com/omery33111" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faGithub} size = '2x' style={{margin: "10 20px"}}/>
                </a>
                <a href="https://www.instagram.com/omer_yanai/" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faInstagram} size = '2x' style={{margin: "10 20px"}}/>
                </a>
                <a href="https://www.linkedin.com/in/omer-yanai-01208a262/" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faLinkedin} size = '2x' style={{margin: "10 20px"}}/>
                </a>
            </Container>
            <br/>
            <p className="text-center" style = {{color: "white"}}>Copyright &copy; {new Date().getFullYear()} Omer Yanai</p>
    </footer>


    </div>
  );
};

export default MyFooter;