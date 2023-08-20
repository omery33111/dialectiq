import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProfileAsync } from "./profileSlice";
import { BsFillPencilFill } from "react-icons/bs";
import { myServer } from "../../endpoints/endpoints";



const Profile = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);

  const { first_name, last_name, location, bio, picture } = useAppSelector((state) => state.profile);

  return (
    <div style = {{display: 'flex', justifyContent: 'center'}}>
      <div style = {{width: "80%", overflow: "hidden"}}>
        <Row >
            <Card >
                <Card.Body>
                    <Row>
                    <div style = {{position: "relative", right: 15}}>
            <Button
              onClick={() => navigate("/profile_user/profile_update")}
              variant="warning">
             <h6 style = {{margin: 0}}> <BsFillPencilFill /> </h6>
            </Button>
            </div>
                
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                      
                    {picture ? (<img alt="mypicture" height = {200} width = {200} src = {myServer + picture}/>) : ("UNKNOWN")}
                    </Col>
                    <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>FIRST NAME:</b> {first_name? (`${first_name}`) : ("UNKNOWN")}</ListGroup.Item>

                        <ListGroup.Item><b>LAST NAME:</b> {last_name? (`${last_name}`) : ("UNKNOWN")}</ListGroup.Item>
                        <ListGroup.Item><b>LOCATION:</b> {location? (`${location}`) : ("UNKNOWN")}</ListGroup.Item>
                    </ListGroup>
                        </Col>
                        <Col md={4}>
                        <ListGroup variant="flush">
                        <ListGroup.Item ><b className="d-flex justify-content-center align-items-center">BIO: </b>
                        {bio? (`${bio}`) : ("UNKNOWN")}</ListGroup.Item>
                        
                    </ListGroup>
                    
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            



        </Row>
        </div>
        
    <div style = {{height: "470px"}}/>
    </div>
  );
};

export default Profile;