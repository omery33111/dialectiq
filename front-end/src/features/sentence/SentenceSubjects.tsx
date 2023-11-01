import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getPagedSentenceSubjectsAsync, getSentenceSubjectsAmountAsync, getSentenceSubjectsAsync, selectAllSubjectsOfSentence, selectPagedSentenceSubjectisLoading, selectSentenceSubjectsAmount } from './sentenceSlice';
import { CircularProgress, Pagination } from '@mui/material';

const SentenceSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfSentence);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedSentenceSubjectsAsync(page));

    dispatch(getSentenceSubjectsAmountAsync());
  }, [page]);

  const sentenceSubjectsAmount = useAppSelector(selectSentenceSubjectsAmount);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(sentenceSubjectsAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  const isLoading = useAppSelector(selectPagedSentenceSubjectisLoading);
  
  return (
    <div>
      <div style={{ height: 200 }} />
      <Container>
        
      <div className="pagination-quiz">
        <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
          </div>

        <hr />
        <br />
        
        <h1 style={{ padding: "15px", justifyContent: "center", textAlign: "center" }}>COMPLETE THE SENTENCE</h1>
        <br />
        <br />
        <div className="american-subject-card" style={{ display: "flex", flexDirection: 'column', gap: "30px", cursor: "pointer" }}>
          {subjects.slice().reverse().map((subject) => (
            <Card
              key={subject.id}
              onClick={() => { navigate(`/quizes/sentence_quiz/sentence_test/${subject.id}/`) }}
              className="card-with-bg-image"
              style={{ backgroundImage: `url(${myServer + subject.picture})`}}
            >
              {isLoading ? (
              <div>
              <CircularProgress />
              </div>
            ) : (
              <Card.Body>
                <Card.Title className='american-subject-card-text' style = {{color: "white"}}>COMPLETE THE SENTENCE</Card.Title>
                <Card.Text className='american-subject-card-text' style = {{color: "white"}}>
                  {subject.subject_name}
                </Card.Text>
              </Card.Body>)}
            </Card>
          ))}
        </div>
      </Container>
      <div style={{ height: 220 }} />
    </div>
  );
};

export default SentenceSubjects;