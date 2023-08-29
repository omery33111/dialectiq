import { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleProfileAsync, selectProfile } from "./profileSlice";
import { myServer } from "../../endpoints/endpoints";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProfileAsync(Number(id)));
    }
  }, [id, dispatch]);

   const userProfile = useAppSelector(selectProfile);



  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%", overflow: "hidden" }}>
        <div style={{ height: 80 }} />
        <Row>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  {userProfile.picture ? (
                    <img alt="mypicture" height={200} width={200} src={myServer + userProfile.picture} />
                  ) : (
                    "UNKNOWN"
                  )}
                </Col>
                <Col md={4}>
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
                      <b className="d-flex justify-content-center align-items-center">BIO: </b>
                      {userProfile.bio ? `${userProfile.bio}` : "UNKNOWN"}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
            <div style={{ height: 60 }} />
          </Card>
        </Row>
      </div>
      <div style={{ height: "470px" }} />
    </div>
  );
};

export default UserProfile;
