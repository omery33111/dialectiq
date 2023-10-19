import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SentenceQuestion } from '../../models/Sentence';
import { getSentencesAsync, selectSentences } from '../sentence/sentenceSlice';
import { deleteAmericanAsync, deleteSentenceAsync } from './administratorSlice';

const SentencePanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const sentences = useAppSelector(selectSentences);

  const [showModal, setShowModal] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<SentenceQuestion | null>(null);

  const handleDeleteClick = (sentence: SentenceQuestion) => {
    setSelectedSentence(sentence);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSentence(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedSentence) {
      if (selectedSentence.id) {
        dispatch(deleteSentenceAsync(selectedSentence.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getSentencesAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container className="blog-table">
        <h1 style={{ padding: "15px" }}>COMPLETE THE SENTENCE</h1>
        <br />
        <br />
        <Button onClick = {() => {navigate(`/administrator/sentence_subject`)}} variant="warning" className="new-american-subject-button">
              SUBJECTS
            </Button>
        <Button onClick = {() => {navigate(`/administrator/post_sentence`)}} variant="warning" className="new-american-button">
              NEW SENTENCE QUIZ
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
            {sentences.slice().reverse().map((sentence) => (
              <tr
                key={sentence.id}
                style={{ cursor: "pointer"}}>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{sentence.id}</td>
                <td onClick={() => navigate(`/administrator/update_sentence/${sentence.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{sentence.question}</td>
                <td onClick={() => navigate(`/administrator/update_sentence/${sentence.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{sentence.correct_answer}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(sentence)}
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
        <Modal.Body>Are you sure you want to delete "{selectedSentence?.question}"?</Modal.Body>
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

export default SentencePanel;
