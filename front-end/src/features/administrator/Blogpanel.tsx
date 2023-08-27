import { useEffect, useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { selectBlogs, getBlogsAsync } from '../blog/blogSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Blog } from '../../models/Blog';
import { deleteBlogAsync } from './administratorSlice';
import { useNavigate } from 'react-router-dom';

const Blogpanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const blogs = useAppSelector(selectBlogs);

  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedBlog) {
      if (selectedBlog.id) {
        dispatch(deleteBlogAsync(selectedBlog.id.toString()));
      }
      setShowModal(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: 200 }} />
      <Container className="blog-table">
        <h1 style={{ padding: "15px" }}>BLOG</h1>
        <br />
        <br />
        <Button onClick = {() => {navigate(`/administrator/post_blog`)}} variant="warning" className="new-blog-button">
              NEW BLOG
            </Button>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blogs.slice().reverse().map((blog) => (
              <tr
                key={blog.id}
                style={{ cursor: "pointer" }}>
                <td onClick={() => navigate(`/administrator/update_blog/${blog.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{blog.id}</td>
                <td onClick={() => navigate(`/administrator/update_blog/${blog.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{blog.title}</td>
                <td onClick={() => navigate(`/administrator/update_blog/${blog.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{blog.description}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(blog)}
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
        <Modal.Body>Are you sure you want to delete "{selectedBlog?.title}"?</Modal.Body>
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

export default Blogpanel;
