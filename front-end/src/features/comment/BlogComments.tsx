import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCommentsAsync, selectComments } from './commentSlice';
import { Button, Card, Modal } from 'react-bootstrap';
import { myServer } from '../../endpoints/endpoints';
import { useParams } from 'react-router-dom';

const BlogComments = () => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getCommentsAsync(Number(id)));
            console.log(id);
        }
    }, [id, dispatch]);

    const showMoreComments = () => {
        setShowModal(true);
    };

    const closeCommentsModal = () => {
        setShowModal(false);
    };

    const firstComment = comments.length > 0 ? comments[0] : null;
    const remainingComments = comments.slice(1);

    return (
        <div>
            <div className="comment-container">
                {firstComment && (
                    <Card key={firstComment.id} className="comment-card">
                        <Card.Body className="comment-body">
                            <img
                                src={myServer + firstComment.profile.picture}
                                alt={`${firstComment.profile.first_name} ${firstComment.profile.last_name}`}
                                className="user-picture"
                            />
                            <div>
                                <Card.Title>
                                    {firstComment.profile.first_name || 'UNKNOWN'}{' '}
                                    {firstComment.profile.last_name || 'UNKNOWN'}
                                </Card.Title>
                                <Card.Title>
                                    <h6>{firstComment.profile.location || 'UNKNOWN'}</h6>
                                </Card.Title>
                                <Card.Text>{firstComment.comment}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                )}
                {remainingComments.length > 0 && (
                    <Button onClick={showMoreComments}>Show more comments...</Button>
                )}
            </div>
            <Modal show={showModal} onHide={closeCommentsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>More Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {remainingComments.map(comment => (
                        <Card key={comment.id} className="comment-card" style={{ width: '100%' }}>
                            <Card.Body className="comment-body">
                                <img
                                    src={myServer + comment.profile.picture}
                                    alt={`${comment.profile.first_name} ${comment.profile.last_name}`}
                                    className="user-picture"
                                />
                                <div>
                                    <Card.Title>
                                        {comment.profile.first_name || 'UNKNOWN'}{' '}
                                        {comment.profile.last_name || 'UNKNOWN'}
                                    </Card.Title>
                                    <Card.Title>
                                        <h6>{comment.profile.location || 'UNKNOWN'}</h6>
                                    </Card.Title>
                                    <Card.Text>{comment.comment}</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button variant="secondary" style={{ width: '30%' }} onClick={closeCommentsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BlogComments;
