import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyIDAsync, getSingleProfileAsync, getUserSingleBlogCommentsAsync, selectProfile, selectSingleBlogUserComments, selectUserID } from "./profileSlice";
import { myServer } from "../../endpoints/endpoints";
import { selectComments } from "../comment/commentSlice";
import { BsFillPencilFill } from "react-icons/bs";
import MyProgressBar from "./MyProgressBar";
import UserComments from "./UserComments";
import UserQuizes from "./UserQuizes";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userID = useAppSelector(selectUserID);
  const comments = useAppSelector(selectComments);

  
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProfileAsync(Number(id)));
    }

    dispatch(getMyIDAsync());
  }, [id, dispatch]);

   const userProfile = useAppSelector(selectProfile);

  
   function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <div style={{ width: "90%", overflow: "hidden" }}>
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
                  <Button
                    onClick={() => navigate("/profile/profile_update")}
                    variant="warning"
                  >
                    <h6 style={{ margin: 0 }}>
                      {" "}
                      <BsFillPencilFill />{" "}
                    </h6>
                  </Button>
                </div>)}


                <Col md={4} className="d-flex justify-content-center align-items-center">
                  {userProfile.picture ? (
                    <img alt="mypicture" height={200} width={200} src={myServer + userProfile.picture} />
                  ) : (
                    "UNKNOWN"
                  )}
                </Col>
                <Col md={4}>
                  <br />
                  <br />
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <b>FIRST NAME:</b> {userProfile.first_name ? `${userProfile.first_name}` : "UNKNOWN"}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <b>LAST NAME:</b> {userProfile.last_name ? `${userProfile.last_name}` : "UNKNOWN"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>LOCATION:</b> {userProfile.location ? `${userProfile.location}` : "UNKNOWN"}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <br />

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <></>
                      {userProfile.bio ? `${userProfile.bio}` : "UNKNOWN"}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
            <div style={{ height: 60 }} />
              
            <div><b>USER SINCE: </b>{formatDate(userProfile.date)}</div>

          </Card>
         
          <div style = {{height: '15vh'}}/>

          <MyProgressBar /> 

          <div style = {{height: '15vh'}}/>
            
          <UserComments />

          
          <UserQuizes />

        </Row>

      </div>
    </div>
  );
};

export default UserProfile;
