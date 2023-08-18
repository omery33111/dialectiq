import React, { useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { patchProfileAsync } from "./profileSlice";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";



const ProfileUpdate = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [picture, setPicture] = useState<any>(null);
  const [bio, setBio] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("bio", bio);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("location", location);

    dispatch(patchProfileAsync(formData));
  };


  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  }



  return (
    <div style = {{display: 'flex', justifyContent: 'center'}}>
        <div  style = {{width: "80%", overflow: "hidden"}}>
      <Row>
        <Col>
          <Card>
            <Form onSubmit={handleSubmit} style = {{margin: 30}}>
        
              <Card.Body>

              <div>
                      <Button
                       onClick={() => navigate("/profile_user/profile")}
                        variant="warning"
                        type="submit">
                        <h6> <BsCheckLg /> </h6>
                      </Button>
                    </div>
                
                <Row>

                  <Col md={4} className="d-flex justify-content-center align-items-center">
                  
                    <Form.Group controlId="formPicture">
                      <Form.Control type="file" onChange={handlePictureChange} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>FIRST NAME:</b> <input type="text" value={first_name} onChange={(event) => setFirstName(event.target.value)} />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>LAST NAME:</b> <input type="text" value={last_name} onChange={(event) => setLastName(event.target.value)} />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>LOCATION:</b> <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b className="d-flex justify-content-center align-items-center">BIO:</b>
                        <input type="text" value={bio} onChange={(event) => setBio(event.target.value)} />
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
      </div>
    <div style={{ height: "470px" }} />
  </div>

  );
};

export default ProfileUpdate;