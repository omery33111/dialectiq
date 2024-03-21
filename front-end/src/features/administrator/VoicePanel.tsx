import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { VoiceQuestion } from '../../models/Voice';
import { deleteVoiceAsync, getPagedVoicesAsync, getVoicesAmountAsync, selectVoices, selectVoicesAmount } from './administratorSlice';
import { Pagination } from '@mui/material';



const VoicePanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const voices = useAppSelector(selectVoices);

  const [showModal, setShowModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceQuestion | null>(null);

  const handleDeleteClick = (voice: VoiceQuestion) => {
    setSelectedVoice(voice);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVoice(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedVoice) {
      if (selectedVoice.id) {
        dispatch(deleteVoiceAsync(selectedVoice.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedVoicesAsync(page));

    dispatch(getVoicesAmountAsync());
  }, [page]);

  const voicesAmount = useAppSelector(selectVoicesAmount);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(voicesAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container className="blog-table">
      <div className="pagination-admin">
        <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
          </div>
          
        <h1 style={{ padding: "15px" }}>VOICE TEST</h1>
        <br />
        <br />
        <Button onClick = {() => {navigate(`/administrator/voice_subject`)}} variant="warning" className="new-american-subject-button">
              SUBJECTS
            </Button>
        <Button onClick = {() => {navigate(`/administrator/post_voice`)}} variant="warning" className="new-american-button">
              NEW VOICE TEST
            </Button>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {voices.slice().map((voice) => (
              <tr
                key={voice.id}
                style={{ cursor: "pointer"}}>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{voice.id}</td>
                <td onClick={() => navigate(`/administrator/update_voice/${voice.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{voice.question}</td>
                <td onClick={() => navigate(`/administrator/update_voice/${voice.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{voice.correct_answer}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(voice)}
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
        <Modal.Body>Are you sure you want to delete "{selectedVoice?.question}"?</Modal.Body>
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

export default VoicePanel;
