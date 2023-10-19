import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { BsCheckLg, BsFillPencilFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import MyProgressBar from "./MyProgressBar";
import UserComments from "./UserComments";
import UserQuizes from "./UserQuizes";
import { changeProfileAsync, getMyIDAsync, getSingleProfileAsync, selectProfile, selectUserID } from "./profileSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userID = useAppSelector(selectUserID);
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProfileAsync(Number(id)));
    }

    dispatch(getMyIDAsync());
  }, [id, dispatch]);

  const userProfile = useAppSelector(selectProfile);

  const [editing, setEditing] = useState(false);
  const [picture, setPicture] = useState<any>(null);
  const [firstName, setFirstName] = useState(userProfile.first_name);
  const [lastName, setLastName] = useState(userProfile.last_name);
  const [location, setLocation] = useState(userProfile.location);
  const [bio, setBio] = useState(userProfile.bio);

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
      setFirstName(userProfile.first_name || ''); // Initialize with user's first name or an empty string
      setLastName(userProfile.last_name || ''); // Initialize with user's last name or an empty string
      setLocation(userProfile.location || ''); // Initialize with user's location or an empty string
      setBio(userProfile.bio || ''); // Initialize with user's bio or an empty string
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
  
    if (picture) {
      updatedProfile.append('picture', picture);
    }
  
   
    dispatch(changeProfileAsync({ profileData: updatedProfile, id: userProfile.profile_id.toString() }));
    
  
    window.location.reload();
  };

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
                {String(userID) === String(userProfile.user) && (
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
                  <img
                    alt="mypicture"
                    height={200}
                    width={200}
                    src={myServer + userProfile.picture}
                  />

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
                        userProfile.first_name
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
                        userProfile.last_name
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
                        userProfile.location
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
                        userProfile.bio
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
            <div>
              <b>USER SINCE: </b>
              {formatDate(userProfile.date)}
            </div>
          </Card>
          <div style={{ height: "15vh" }} />
          <MyProgressBar />
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
