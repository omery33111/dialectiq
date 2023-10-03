import { useEffect, useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteAmericanAsync } from './administratorSlice';
import { useNavigate } from 'react-router-dom';
import { getAmericansAsync, selectAmericans } from '../american/americanSlice';
import { AmericanQuestion } from '../../models/American';

const AmericanPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const americans = useAppSelector(selectAmericans);

  const [showModal, setShowModal] = useState(false);
  const [selectedAmerican, setSelectedAmerican] = useState<AmericanQuestion | null>(null);

  const handleDeleteClick = (american: AmericanQuestion) => {
    setSelectedAmerican(american);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAmerican(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedAmerican) {
      if (selectedAmerican.id) {
        dispatch(deleteAmericanAsync(selectedAmerican.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getAmericansAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container className="blog-table">
        <h1 style={{ padding: "15px" }}>AMERICAN</h1>
        <br />
        <br />
        <Button onClick = {() => {navigate(`/administrator/american_subject`)}} variant="warning" className="new-american-subject-button">
              SUBJECTS
            </Button>
        <Button onClick = {() => {navigate(`/administrator/post_american`)}} variant="warning" className="new-american-button">
              NEW AMERICAN
            </Button>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              {/* <th>Subject</th> */}
              <th>Question</th>
              <th>Answer1</th>
              <th>Answer2</th>
              <th>Answer3</th>
              <th>Answer4</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {americans.slice().reverse().map((american) => (
              <tr
                key={american.id}
                style={{ cursor: "pointer"}}>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{american.id}</td>
                {/* <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.subject.subject_name}</td> */}
                <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.question}</td>
                <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.answer1}</td>
                <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.answer2}</td>
                <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.answer3}</td>
                <td onClick={() => navigate(`/administrator/update_american/${american.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{american.answer4}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(american)}
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
        <Modal.Body>Are you sure you want to delete "{selectedAmerican?.question}"?</Modal.Body>
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

export default AmericanPanel;
