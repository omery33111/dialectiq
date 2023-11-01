import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { BsCheckLg, BsFillPencilFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { logoutAsync } from "../authentication/authenticationSlice";
import MyProgressBar from "./MyProgressBar";
import { changeProfileAsync, getSingleProfileAsync, selectProfile, selectProfileisError, selectProfileisLoading, selectUserID } from "./profileSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectProfileisLoading);
  const isError = useAppSelector(selectProfileisError);

  const userID = useAppSelector(selectUserID);

  const { id } = useParams();

  useEffect(() => {
    // dispatch(getMyIDAsync());

      if (id !== undefined) {
        dispatch(getSingleProfileAsync(Number(id)));
      } 
      else {
        dispatch(logoutAsync());
        window.location.href = "/"
      }

      
  }, [id, dispatch]);

  const userProfile = useAppSelector(selectProfile);

  const [editing, setEditing] = useState(false);
  const [picture, setPicture] = useState<any>(null);
  const [firstName, setFirstName] = useState(userProfile.first_name);
  const [lastName, setLastName] = useState(userProfile.last_name);
  const [location, setLocation] = useState(userProfile.location);
  const [bio, setBio] = useState(userProfile.bio);
  const [pointsAmount, setPointsAmount] = useState<any>(userProfile.points);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name || '');
      setLastName(userProfile.last_name || '');
      setLocation(userProfile.location || ''); 
      setBio(userProfile.bio || ''); 
      setPointsAmount(userProfile.points || 0); 
    }
  }, [userProfile]);
  
  const saveProfile = () => {
    const updatedProfile = new FormData();
  
    if (firstName !== userProfile.first_name) {
      updatedProfile.append('first_name', firstName);
    }
  
    if (lastName !== userProfile.last_name) {
      updatedProfile.append('last_name', lastName);
    }
  
    if (location !== userProfile.location) {
      updatedProfile.append('location', location);
    }
  
    if (bio !== userProfile.bio) {
      updatedProfile.append('bio', bio);
    }
  
    if (pointsAmount !== userProfile.points) {
      updatedProfile.append('points', pointsAmount.toString());
    }
  
    if (picture) {
      updatedProfile.append('picture', picture);
    }
  
   
    dispatch(changeProfileAsync({ profileData: updatedProfile, id: userProfile.profile_id.toString() }));
    
  
    window.location.reload();
  };

  const isStaff = JSON.parse(localStorage.getItem('is_staff') as string);

  
  useEffect(() => {
    if (isError) {
      navigate('/error');
    }
  }, [isError, navigate]);
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <div style={{ width: "85%", overflow: "hidden" }}>
        <div style={{ height: 89 }} />

        <Row>
          <Card>
            <Card.Body>
              <Row>
                <br />
                <br />
                <br />

                
                {(String(userID) === String(userProfile.user) || isStaff) && (
                  <div style={{ position: "relative", right: 15 }}>
                    {editing ? (
                      <Button onClick={saveProfile} variant="warning">
                        <h6 style={{ margin: 0 }}> <BsCheckLg /> </h6>
                      </Button>
                    ) : (
                      <Button onClick={() => setEditing(true)} variant="warning">
                        <h6 style={{ margin: 0 }}> <BsFillPencilFill /> </h6>
                      </Button>
                    )}
                  </div>
                )}
                <Col md={4} className="d-flex justify-content-center align-items-center">
                {isLoading ? (
          <div>
            <CircularProgress />
            </div>
            ) : (
              <img
                    alt="mypicture"
                    height={200}
                    width={200}
                    src={myServer + userProfile.picture}
                  />
            )}
                  

                  {editing ? (
                        <Form.Group controlId="formPicture">
                        <Form.Control type="file" onChange={handlePictureChange} />
                      </Form.Group>
                      ) : (
                        ""
                      )}
                      
                </Col>
                <Col md={4}>
                  <br />
                  <br />
                  <ListGroup variant="flush">
                    <ListGroup.Item>

                    
                      <b>FIRST NAME:</b>{" "}
                      {editing ? (
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      ) : (
                          
                        <div>
                        {isLoading ? (
                          <div>
                            <CircularProgress />
                            </div>
                            ) : (userProfile.first_name)}
                        </div>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>LAST NAME:</b>{" "}
                      {editing ? (
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      ) : (
                        <div>
                          {isLoading ? (
                            <div>
                            <CircularProgress />
                            </div>
                          ) : (
                            userProfile.last_name
                          )}
                        </div>
                        
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>LOCATION:</b>{" "}
                      {editing ? (
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      ) : (
                        <div>
                          {isLoading ? (
                            <div>
                            <CircularProgress />
                            </div>
                          ) : (
                            userProfile.location
                            )}
                        </div>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <br />
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <b>BIO:</b>{" "}
                      {editing ? (
                        <textarea
                        style = {{position: "relative", top: 40}}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      ) : (

                        <div>
                          {isLoading ? (
                            <div>
                            <CircularProgress />
                            </div>
                          ) : (
                            userProfile.bio
                          )}
                        
                        </div>
                      )}
                    </ListGroup.Item>

                    
                      {editing && (
                        <ListGroup.Item>
                           <b>POINTS: </b>
                        <textarea
                        style = {{position: "relative", top: 40}}
                          value={pointsAmount}
                          onChange={(e) => setPointsAmount(e.target.value)}
                        />
                        </ListGroup.Item>
                      )}
                    

                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
            <div>
              <b>USER SINCE: </b>
              {isLoading ? (
                            <div>
                            <CircularProgress />
                            </div>
                          ) : (
                            formatDate(userProfile.date)
                          )}
              
            </div>
          </Card>

          <div style={{ height: "15vh" }} />
          <MyProgressBar />
          <div style={{ height: "16vh" }} />
          {/* <UserComments />
          <div style={{ height: "16vh" }} />
          <UserQuizes /> */}
        </Row>
      </div>
    </div>
  );
};

export default UserProfile;
