import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Adminmenu = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      
      <Container>
      <br/>
      <br/>
      <br/>
        <div className = "admin-panel-pics">
          <div>
          <Link to="/administrator/blog">
            <div style = {{borderRadius: "10px"}}>
            <img className = "admin-panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
            height = "300"
            width = "300"
            >
              </img>
              </div>
              
              </Link>
              
            
          </div>

          <div>
          <Link to="/administrator/american_quiz">
            <img className = "admin-panel-pic" src={require('../../images/portalpic2.png')} alt="portalpic1"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>

          <div>
          <Link to="/administrator/blog">
            <img className = "admin-panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>
          
          <div>
          <Link to="/administrator/blog">
            <img className = "admin-panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
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

export default Adminmenu;