import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Callback } from '../../models/Callback';
import { deleteCallbackAsync, getCallbacksAmountAsync, getPagedCallbacksAsync, selectCallbacks, selectCallbacksAmount } from './administratorSlice';

const CallbackPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const callbacks = useAppSelector(selectCallbacks);

  const [showModal, setShowModal] = useState(false);
  const [selectedCallback, setSelectedCallback] = useState<Callback | null>(null);

  const handleDeleteClick = (callback: Callback) => {
    setSelectedCallback(callback);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCallback(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedCallback) {
      if (selectedCallback.id) {
        dispatch(deleteCallbackAsync(selectedCallback.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedCallbacksAsync(page));

    dispatch(getCallbacksAmountAsync());
  }, [page]);

  const callbacksAmount = useAppSelector(selectCallbacksAmount);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(callbacksAmount / itemsPerPage);

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
        <h1 style={{ padding: "15px" }}>CALLBACK</h1>
        <br />
        <br />
        <Button onClick = {() => {navigate(`/administrator/callback/registration`)}} variant="warning" className="new-blog-button">
              REGISTER
            </Button>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {callbacks.slice().reverse().map((callback) => (
              <tr
                key={callback.id}
                style={{ cursor: "pointer" }}>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{callback.id}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{callback.name}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{callback.email}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(callback)}
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
        <Modal.Body>Are you sure you want to delete "{selectedCallback?.name}"?</Modal.Body>
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

export default CallbackPanel;
