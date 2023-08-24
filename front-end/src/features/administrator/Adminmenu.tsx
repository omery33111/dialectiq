import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Adminmenu = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/');
  };

  const handleUserClick2 = () => {
    navigate('/');
  };

  const handleUserClick3 = () => {
    navigate('/');
  };

  const handleUserClick4 = () => {
    navigate('/');
  };


  return (
    <div className="d-flex justify-content-center align-items-center">
      
      <Container>
      <br/>
      <br/>      <br/>
      <br/>
        <div className = "panel-pics">
          <div>
          <Link to="/administrator/blog" onClick={handleUserClick}>
            <div style = {{borderRadius: "10px"}}>
            <img className = "panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
            height = "300"
            width = "300"
            >
              </img>
              </div>
              
              </Link>
              
            
          </div>

          <div>
          <Link to="/adminmenu/blog" onClick={handleUserClick2}>
            <img className = "panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>

          <div>
          <Link to="/adminmenu/blog" onClick={handleUserClick3}>
            <img className = "panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
            height = "300"
            width = "300">
              </img>
            </Link>
          </div>
          
          <div>
          <Link to="/adminmenu/blog" onClick={handleUserClick4}>
            <img className = "panel-pic" src={require('../../images/portalpic1.png')} alt="portalpic1"
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