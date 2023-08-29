import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProfileAsync, selectProfile } from "./profileSlice";
import { BsFillPencilFill } from "react-icons/bs";
import { myServer } from "../../endpoints/endpoints";



const Profile = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const myProfile = useAppSelector(selectProfile)


  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);


  return (
    <div style = {{display: 'flex', justifyContent: 'center'}}>
      
      <div style = {{width: "80%", overflow: "hidden"}}>
      <div style = {{height: 79}}/>
        <Row >
            <Card >
                <Card.Body>
                    <Row>
                    <div style = {{position: "relative", right: 15}}>
            <Button
              onClick={() => navigate("/profile/profile_update")}
              variant="warning">
             <h6 style = {{margin: 0}}> <BsFillPencilFill /> </h6>
            </Button>
            </div>
            

                
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                      
                    {myProfile.picture ? (<img alt="mypicture" height = {200} width = {200} src = {myServer + myProfile.picture}/>) : ("UNKNOWN")}
                    </Col>
                    
                    <Col md={4}>
                    <br/><br/>

                    <ListGroup variant="flush">
                        <ListGroup.Item><b>FIRST NAME:</b> {myProfile.first_name? (`${myProfile.first_name}`) : ("UNKNOWN")}</ListGroup.Item>

                        <ListGroup.Item><b>LAST NAME:</b> {myProfile.last_name? (`${myProfile.last_name}`) : ("UNKNOWN")}</ListGroup.Item>
                        <ListGroup.Item><b>LOCATION:</b> {myProfile.location? (`${myProfile.location}`) : ("UNKNOWN")}</ListGroup.Item>
                    </ListGroup>
                        </Col>
                        <Col md={4}>
                    <br/>

                        <ListGroup variant="flush">
                        <ListGroup.Item ><b className="d-flex justify-content-center align-items-center">BIO: </b>
                        {myProfile.bio? (`${myProfile.bio}`) : ("UNKNOWN")}</ListGroup.Item>
                        
                    </ListGroup>
                    
                        </Col>
                    </Row>
                </Card.Body>
                <div style = {{height: 60}} />
            </Card>
            



        </Row>
        </div>
        
    <div style = {{height: "470px"}}/>
    </div>
  );
};

export default Profile;