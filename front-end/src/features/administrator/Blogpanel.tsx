import { useEffect, useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { selectBlogs, getBlogsAsync, getPagedBlogsAsync, getBlogsAmountAsync, selectBlogsAmount } from '../blog/blogSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Blog } from '../../models/Blog';
import { deleteBlogAsync } from './administratorSlice';
import { useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import { Pagination } from '@mui/material';

const BlogPanel = () => {
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

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedBlogsAsync(page));

    dispatch(getBlogsAmountAsync());
  }, [page]);

  const blogsAmount = useAppSelector(selectBlogsAmount);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(blogsAmount / itemsPerPage);

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
              <th>Thumbnail</th>
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
                <td onClick={() => navigate(`/administrator/update_blog/${blog.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>
                <img alt="blogpic" height = {200} width = {200} src = {myServer + blog.picture}/>
                  </td>
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

export default BlogPanel;
