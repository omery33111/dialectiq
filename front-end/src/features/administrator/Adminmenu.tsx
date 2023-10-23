import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Adminmenu = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container>
        <br />
        <br />
        <br />
        <div className="admin-panel-pics">
          <div>
            <Link to="/administrator/blog">
              <div style={{ borderRadius: "10px" }}>
                <img
                  className="admin-panel-pic"
                  src={require('../../images/portalpic1.png')}
                  alt="portalpic1"
                  height="300"
                  width="300"
                />
              </div>
            </Link>
          </div>

          <div>
            <img
              className="admin-panel-pic"
              src={require('../../images/portalpic2.png')}
              alt="portalpic2"
              height="300"
              width="300"
              onClick={handleShow}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div>
            <Link to="/administrator/community">
              <img
                className="admin-panel-pic"
                src={require('../../images/portalpic3.png')}
                alt="portalpic3"
                height="300"
                width="300"
              />
            </Link>
          </div>
        </div>
        <br />
        <br />
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Link to="/administrator/american_quiz">
            <h4 style = {{textDecoration: "none", color: "black"}}>American Quiz</h4>
            </Link>
          </div>
          <div>
          <Link to="/administrator/sentence_quiz">
            <h4 style = {{textDecoration: "none", color: "black"}}>Complete The Sentence Quiz</h4>
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ height: 900 }} />
    </div>
  );
};

export default Adminmenu;
