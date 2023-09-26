import { useEffect, useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteAmericanSubjectAsync, getAmericanSubjectsAsync, selectAllSubjectsOfAmerican } from './administratorSlice';
import { useNavigate } from 'react-router-dom';
import { AmericanSubject } from '../../models/AmericanSubject';



const AmericanSubjectPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const subjects = useAppSelector(selectAllSubjectsOfAmerican);

  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<AmericanSubject | null>(null);

  const handleDeleteClick = (subject: AmericanSubject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedSubject) {
      if (selectedSubject.id) {
        dispatch(deleteAmericanSubjectAsync(selectedSubject.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getAmericanSubjectsAsync());
  }, [dispatch]);

  return (
    <div>
    <div style={{ height: 200 }} />
    <Container className="blog-table">
      <h1 style={{ padding: "15px" }}>AMERICAN SUBJECT</h1>
      <br />
      <br />
      <Button onClick = {() => {navigate(`/administrator/american_quiz`)}} variant="warning" className="new-american-subject-button">
              AMERICANS
            </Button>

      <Button onClick = {() => {navigate(`/administrator/post_american_subject`)}} variant="warning" className="new-american-button">
              NEW SUBJECT
            </Button>

            <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>American Subject</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subjects.slice().reverse().map((subject) => (
              <tr
                key={subject.id}
                style={{ cursor: "pointer" }}>
                <td onClick = {() => {navigate(`/administrator/update_american_subject/${subject.id}/`)}} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{subject.id}</td>
                <td onClick = {() => {navigate(`/administrator/update_american_subject/${subject.id}/`)}} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{subject.subject_name}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(subject)}
                  >
                    <h3><BsTrashFill style={{color: "white"}} /></h3>
                  </Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      <div style={{ height: 300 }} />
    </Container>

    <Modal show={showModal} onHide={handleCloseModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <BsTrash /> Delete Warning
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete "{selectedSubject?.subject_name}"?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </div>

  );
};



export default AmericanSubjectPanel;
