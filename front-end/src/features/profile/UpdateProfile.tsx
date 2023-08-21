import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { getProfileAsync, patchProfileAsync } from "./profileSlice";
import { BsCheckLg } from "react-icons/bs";



const UpdateProfile = () => {

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
    if (bio !== "") {
      formData.append("bio", bio);
    }
    if (first_name !== "") {
      formData.append("first_name", first_name);
    }
    if (last_name !== "") {
      formData.append("last_name", last_name);
    }
    if (location !== "") {
      formData.append("location", location);
    }
  
    if (
      picture ||
      bio !== "" ||
      first_name !== "" ||
      last_name !== "" ||
      location !== ""
    ) {
      dispatch(patchProfileAsync(formData));
    }
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  }

  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);


  return (
    <div style = {{display: 'flex', justifyContent: 'center'}}>
      <div style = {{width: "80%", overflow: "hidden"}}>
      <div style = {{height: 67}}/>
        <Row >
            <Card >
                <Form onSubmit={handleSubmit}>
                <Card.Body>
                    <Row>
                    <div style = {{position: "relative", right: 15}}>
                    <Button
                  onClick={() => {window.location.href = "/profile_user/profile";}}
                  variant="warning"
                  type="submit">
                  <h6 style = {{margin: 0}}>
                    <BsCheckLg />
                  </h6>
                </Button>
                <br/>
                <br/>
                    </div>
                  
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                      
                    <Form.Group controlId="formPicture">
                      <Form.Control type="file" onChange={handlePictureChange} />
                    </Form.Group>
                    <br/>

                    </Col>
                    <Col md={4}>
                    <br/>
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
                        <ListGroup.Item >
                        <b className="d-flex justify-content-center align-items-center">BIO:</b>
                        <input type="text" value={bio} onChange={(event) => setBio(event.target.value)} />
                        </ListGroup.Item>
                        
                    </ListGroup>
                    
                        </Col>
                    </Row>
                </Card.Body>
                </Form>
                <br/><br/><br/>
            </Card>
            



        </Row>
        </div>
        
    <div style = {{height: "470px"}}/>
    </div>
  );
};

export default UpdateProfile;