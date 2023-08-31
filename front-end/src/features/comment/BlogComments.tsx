import { useEffect, useState } from 'react';
import { changeCommentAsync, deleteCommentAsync, getCommentsAsync, getSingleCommentAsync, selectComment, selectComments } from './commentSlice';
import {  Button, Card, Form, Modal } from 'react-bootstrap';
import { myServer } from '../../endpoints/endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { selectProfile } from '../profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BsFillPencilFill, BsSend, BsTrashFill } from 'react-icons/bs';
import { getSingleBlogAsync, selectSingleBlog } from '../administrator/administratorSlice';

const BlogComments = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const comments = useAppSelector(selectComments);

    const userProfile = useAppSelector(selectProfile)

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getCommentsAsync(Number(id)));
            dispatch(getSingleBlogAsync(id));
        }
    }, [id, dispatch]);

    // useEffect(() => {
    //     dispatch(getSingleCommentAsync());
    // }, [dispatch]);

    const [showMore, setShowMore] = useState(false);
    const [showAllModal, setShowAllModal] = useState(false); // State for showing the modal

    const toggleComments = () => {
        setShowMore(!showMore);
    };

    const toggleModal = () => {
        setShowAllModal(!showAllModal);
    };

    const firstComment = comments.length > 50 ? comments[0] : null;
    const remainingComments = showMore ? comments.slice(0, 8) : comments.slice(0, 3); // Displaying the first 8 remaining comments

    

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }


  const handleDelete = (commentId: string) => {
    dispatch(deleteCommentAsync(commentId));
  };

//   const myProfile = useAppSelector(selectProfile)
  const singleBlog = useAppSelector(selectSingleBlog);
  const singleComment = useAppSelector(selectComment);
  
  const [commentState, setCommentState] = useState<string>('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('blog', String(singleBlog.id));
    formData.append('comment', commentState);
  
    dispatch(changeCommentAsync({ commentData: formData, id: commentId })).then(
      () => {
        dispatch(getCommentsAsync(Number(singleBlog.id)));
        setEditingCommentId(null);
      }
    );
  };

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

    return (
        <div>
            <div className="comment-container">
                
                <>
                {firstComment && (
                    <Card key={firstComment.id} className="comment-card">
                        <Card.Body className="comment-body">
                            <img
                                onClick = {() => navigate(`/profile/user_profile/${firstComment.user}/`)} style = {{cursor: 'pointer'}}
                                src={myServer + firstComment.profile.picture}
                                alt={`${firstComment.profile.first_name} ${firstComment.profile.last_name}`}
                                className="user-picture"
                            />
                            <div>
                                <Card.Title onClick = {() => navigate(`/profile/user_profile/${firstComment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                    {firstComment.profile.first_name || 'UNKNOWN'}{' '}
                                    {firstComment.profile.last_name || 'UNKNOWN'}
                                </Card.Title>
                                <Card.Title  onClick = {() => navigate(`/profile/user_profile/${firstComment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                    <h6>{firstComment.profile.location || 'UNKNOWN'}</h6>
                                </Card.Title>

                                    

                                <Card.Text>
                                    
                                {editingCommentId === firstComment.id ? (
                    <Form onSubmit={(event) => handleSubmit(event, firstComment.id)}>
                    <div>
                        <Form.Group controlId="formComment" className="comment-form">
                            <Form.Control
                                style={{ width: "30%" }}
                                type="text"
                                value={commentState}
                                onChange={(event) => setCommentState(event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="comment-button">
                            <h5><BsSend /></h5>
                        </Button>
                    </div>
                </Form>
            ) : (
                <div>
                    {firstComment.comment}
                </div>
                )}
                                
                                
                                {String(firstComment.user) === String(userProfile.user) && (
                                    <div className = "edit-delete">

                                    <div style = {{color: "blue", cursor: "pointer"}}>
                                        
                                        <BsFillPencilFill onClick={() => {
                                    if (editingCommentId === firstComment.id) {
                                        setEditingCommentId(null); // Close editing form
                                    } else {
                                        setEditingCommentId(firstComment.id); // Open editing form
                                        setCommentState(firstComment.comment);
                                    }
                                    }} />
                                    
                                    </div>
                                    <div style = {{color: "red", cursor: "pointer", position: "relative", top: -24, right: -50}}>
                                    <BsTrashFill onClick={() => handleDelete(firstComment.id)} />
                                    </div>

                                    </div>
                                )}
                                

                                </Card.Text>
                                <small className = 'comment-date'>{formatDate(firstComment.date)}</small>
                            </div>

                        </Card.Body>
                    </Card>
                )}
                </>

                {remainingComments.map(comment => (
                    <Card key={comment.id} className="comment-card">
                        <Card.Body className="comment-body">
                            <img
                                src={myServer + comment.profile.picture}
                                alt={`${comment.profile.first_name} ${comment.profile.last_name}`}
                                className="user-picture"
                            />
                            <div>
                                <Card.Title onClick = {() => navigate(`/profile/user_profile/${comment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                    {comment.profile.first_name || 'UNKNOWN'}{' '}
                                    {comment.profile.last_name || 'UNKNOWN'}
                                </Card.Title>
                                <Card.Title onClick = {() => navigate(`/profile/user_profile/${comment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                    <h6>{comment.profile.location || 'UNKNOWN'}</h6>
                                </Card.Title>
                                <Card.Text>

                                {editingCommentId === comment.id ? (
                                    <Form onSubmit={(event) => handleSubmit(event, comment.id)}>
                                        <div>
                                            <Form.Group controlId="formComment" className="comment-form">
                                                <Form.Control
                                                    style={{ width: "30%" }}
                                                    type="text"
                                                    value={commentState} // Use the comment state here
                                                    onChange={(event) => setCommentState(event.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="dark" type="submit" className="comment-button">
                                                <h5><BsSend /></h5>
                                            </Button>
                                        </div>
                                    </Form>
                                ) : (
                                    <div>
                                        {comment.comment}
                                    </div>
                                )}

                                    </Card.Text>
                                <small className = 'comment-date'>{formatDate(comment.date)}</small>

                                {String(comment.user) === String(userProfile.user) && (
                                    <div className = "edit-delete">

                                    <div style = {{color: "blue", cursor: "pointer"}}>

                                    <BsFillPencilFill onClick={() => {
                                        if (editingCommentId === comment.id) {
                                            setEditingCommentId(null); // Close editing form
                                        } else {
                                            setEditingCommentId(comment.id); // Open editing form
                                            setCommentState(comment.comment); // Set the comment text in the edit form
                                        }
                                    }} />


                                    </div>
                                    <div style = {{color: "red", cursor: "pointer", position: "relative", top: -24, right: -50}}>
                                    <BsTrashFill onClick={() => handleDelete(comment.id)} />
                                    </div>

                                    </div>
                                )}
                                
                            </div>
                        </Card.Body>
                    </Card>
                ))}

                {comments.length > 3 && (
                    <div onClick={toggleComments} style={{ cursor: 'pointer' }}>
                        {showMore ? (
                            <div>
                                <span>Show less</span>

                                {comments.length > 8 && (
                                <span onClick={toggleModal} style={{ marginLeft: '1rem', cursor: 'pointer' }}>
                                    Show all comments
                                </span>
                                )}
                            </div>
                        ) : (
                            
                            <span>Show more comments...</span>

                            
                        )}
                    </div>
                )}              


                                
            </div>



            
            <Modal show={showAllModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>All Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {comments.slice(8).map(comment => (
                            <Card key={comment.id} className="comment-card" style={{ width: '100%' }}>
                            <Card.Body className="comment-body">
                                <img
                                    onClick = {() => navigate(`/profile/user_profile/${comment.user}/`)} style = {{cursor: 'pointer'}}
                                    src={myServer + comment.profile.picture}
                                    alt={`${comment.profile.first_name} ${comment.profile.last_name}`}
                                    className="user-picture"
                                />
                                <div>
                                    <Card.Title  onClick = {() => navigate(`/profile/user_profile/${comment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                        {comment.profile.first_name || 'UNKNOWN'}{' '}
                                        {comment.profile.last_name || 'UNKNOWN'}
                                    </Card.Title>
                                    <Card.Title  onClick = {() => navigate(`/profile/user_profile/${comment.user}/`)} style = {{cursor: 'pointer', width: "100%"}}>
                                        <h6>{comment.profile.location || 'UNKNOWN'}</h6>
                                    </Card.Title>
                                    <Card.Text>{comment.comment}</Card.Text>
                                    <small style = {{position: "absolute", bottom: 3, right: 11, color: "grey"}}>{formatDate(comment.date)}</small>

                                    {String(comment.user) === String(userProfile.user) && (
                                    <div className = "edit-delete-modal">

                                    <div style = {{color: "blue", cursor: "pointer"}}>

                                    <BsFillPencilFill onClick={() => {
                                        if (editingCommentId === comment.id) {
                                            setEditingCommentId(null); // Close editing form
                                        } else {
                                            setEditingCommentId(comment.id); // Open editing form
                                            setCommentState(comment.comment); // Set the comment text in the edit form
                                        }
                                    }} />


                                    </div>
                                    <div style = {{color: "red", cursor: "pointer", position: "relative", top: -24, right: -50}}>
                                    <BsTrashFill onClick={() => handleDelete(comment.id)} />
                                    </div>

                                    </div>
                                )}
                                
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default BlogComments;
