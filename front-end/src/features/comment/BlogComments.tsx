import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCommentsAsync, selectComments } from './commentSlice';
import { Button, Card, Modal } from 'react-bootstrap';
import { myServer } from '../../endpoints/endpoints';
import { useNavigate, useParams } from 'react-router-dom';

const BlogComments = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const comments = useAppSelector(selectComments);

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getCommentsAsync(Number(id)));
        }
    }, [id, dispatch]);

    const [showMore, setShowMore] = useState(false);
    const [showAllModal, setShowAllModal] = useState(false); // State for showing the modal

    const toggleComments = () => {
        setShowMore(!showMore);
    };

    const toggleModal = () => {
        setShowAllModal(!showAllModal);
    };

    const firstComment = comments.length > 4 ? comments[0] : null;
    const remainingComments = showMore ? comments.slice(1, 8) : comments.slice(1, 3); // Displaying the first 8 remaining comments

    return (
        <div>
            <div className="comment-container">
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
                                <Card.Text>{firstComment.comment}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                )}

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
                                <Card.Text>{comment.comment}</Card.Text>
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
