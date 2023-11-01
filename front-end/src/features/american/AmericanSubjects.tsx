import { CircularProgress, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getAmericanSubjectsAmountAsync, getPagedAmericanSubjectsAsync, selectAllSubjectsOfAmerican, selectAmericanSubjectsAmount, selectPagedAmericanSubjectisLoading } from './americanSlice';

const AmericanSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subjects = useAppSelector(selectAllSubjectsOfAmerican);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedAmericanSubjectsAsync(page));

    dispatch(getAmericanSubjectsAmountAsync());
  }, [page]);

  const americanSubjectsAmount = useAppSelector(selectAmericanSubjectsAmount);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(americanSubjectsAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  const isLoading = useAppSelector(selectPagedAmericanSubjectisLoading);

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
        <h1 style={{ padding: "15px", justifyContent: "center", textAlign: "center" }}>MULTI CHOICE</h1>
        <br />
        <br />
        <div className="american-subject-card" style={{ display: "flex", flexDirection: 'column', gap: "30px", cursor: "pointer" }}>
          {subjects.slice().map((subject) => (
            
            <Card
              key={subject.id}
              onClick={() => { navigate(`/quizes/american_quiz/american_test/${subject.id}/`) }}
              className="card-with-bg-image"
              style={{ backgroundImage: `url(${myServer + subject.picture})`}}
            >
              {isLoading ? (
              <div>
              <CircularProgress />
              </div>
            ) : (
              <Card.Body>
                <Card.Title className='american-subject-card-text' style = {{color: "white"}}>MULTI CHOICE</Card.Title>
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

export default AmericanSubjects;