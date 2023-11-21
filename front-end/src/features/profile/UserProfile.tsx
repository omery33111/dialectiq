import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { BsCheckLg, BsFillPencilFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { logoutAsync } from "../authentication/authenticationSlice";
import MyProgressBar from "./MyProgressBar";
import { changeProfileAsync, getProfileAsync, getSingleProfileAsync, selectProfile, selectProfileisError, selectProfileisLoading, selectUserID } from "./profileSlice";
import { FaSignInAlt } from "react-icons/fa";
import UserComments from "./UserComments";
import UserQuizes from "./UserQuizes";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectProfileisLoading);
  const isError = useAppSelector(selectProfileisError);

  const userID = useAppSelector(selectUserID);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      localStorage.setItem('profileID', id);
    }
  }, [id]);

  useEffect(() => {
      if (Number(id) !== -1) {
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
      setPointsAmount(userProfile.points || 100); 
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

  const storedMyID = JSON.parse(localStorage.getItem('myID') as string);
  
  const onLogout = () => {
    dispatch(logoutAsync());
    window.location.href = "/"
  };

  useEffect(() => {
    if (Number(id) === -1) {
      dispatch(logoutAsync());
      window.location.href = "/";
    }
  }, [dispatch, storedMyID]);


  const rankScale = Math.min(
    100,
    (userProfile.points / 2000) * 100
  );

  const ProgressBarColor = () => {
    if (userProfile.points >= 0 && userProfile.points < 250) {
      return "grey";
    } else if (userProfile.points >= 250 && userProfile.points < 500) {
      return "yellow";
    } else if (userProfile.points >= 500 && userProfile.points < 750) {
      return "#0CAFFF";
    } else if (userProfile.points >= 750 && userProfile.points < 1000) {
      return "#FFA500";
    } else if (userProfile.points >= 1000 && userProfile.points < 1250) {
      return "#0FFF50";
    } else if (userProfile.points >= 1250 && userProfile.points < 1500) {
      return "#7F00FF";
    } else if (userProfile.points >= 1500 && userProfile.points < 1750) {
      return "#172460";
    } else if (userProfile.points >= 1750 && userProfile.points <= 2000) {
      return "red";
    } else if (userProfile.points >= 2000) {
      return "black";
    }
  };
  
  
  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F5F5DC" }}>
      

      <div style={{ width: "85%", overflow: "hidden" }}>
        <div style={{ height: 89 }} />

        <Row>
          <Card style = {{border: '2px solid #FF6931'}}>
            <Card.Body>
              <Row>
                <br />

              <div style = {{position: "absolute", right: 10, width: "100%"}}>
                {(String(userID) === String(userProfile.user)) && (
                <div className="logout-button"
                onClick = {() => onLogout()}>
                <FaSignInAlt />
                </div>)}
                </div>

                {(String(userID) === String(userProfile.user) || isStaff) && (
                  <div style={{ position: "relative", right: 15 }}>
                    {editing ? (
                      <Button onClick={saveProfile} variant="none" style = {{backgroundColor: "#FF6931", marginLeft: "10px"}}>
                        <h6 style={{ margin: 0, color: "white" }}> <BsCheckLg /> </h6>
                      </Button>
                    ) : (
                      <Button onClick={() => setEditing(true)} variant="none" style = {{backgroundColor: "#FF6931", marginLeft: "10px"}}>
                        <h6 style={{ margin: 0, color: "white" }}> <BsFillPencilFill /> </h6>
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
                              
                    {isStaff && editing && (
              <ListGroup.Item>
                <b>POINTS: </b>
                <textarea
                  style={{ position: "relative", top: 40 }}
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                />
              </ListGroup.Item>
            )}
                    

                  </ListGroup>
                </Col>
                
              </Row>
              <br/>
                              <br/>
            </Card.Body>
            <div>
              <b style = {{margin: "10px"}}>USER SINCE: </b>
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
          <div>
          <div>

               <MyProgressBar />
                
    </div>
          </div>
          
          <div style={{ height: "16vh" }} />
          <UserComments />
          <div style={{ height: "16vh" }} />
          <UserQuizes />
        </Row>
      </div>
    </div>
  );
};

export default UserProfile;
