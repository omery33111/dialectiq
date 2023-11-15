import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserQuizesAsync, getUserSingleBlogCommentsAsync, selectProfileisError, selectSingleBlogUserComments, selectUserAnsweredQuizes, selectUserID } from './profileSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import { Card } from 'react-bootstrap';
import { logoutAsync } from '../authentication/authenticationSlice';



const UserQuizes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const userQuizes = useAppSelector(selectUserAnsweredQuizes);
  const userComments = useAppSelector(selectSingleBlogUserComments);

  const isError = useAppSelector(selectProfileisError);

  const userID = useAppSelector(selectUserID);

  const storedMyID = JSON.parse(localStorage.getItem('myID') as string);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      if (userID !== -1) {
      dispatch(getUserQuizesAsync(Number(id)));

      dispatch(getUserSingleBlogCommentsAsync(Number(id)));
    }}
      
    if (!userID) {
      dispatch(logoutAsync());
      navigate("/")
    }

  }, [id, dispatch, userID, isError]);


  return (
    <div>
      {userQuizes.length > 0 ? (
        
        <div>

{userComments.length > 0 ? (
  <div>
  <div className = 'profile-hierarchy'>

    <div className = "scrollbar-pic-quiz">

      
        
        <div>
        <img
          src={require('../../images/recentquizes.png')}
          width = "340"/>
          <br/>
          <br/>
          </div>

      
        
        </div>

  <div className = "scrollbar-user-comments">
  {userQuizes.slice().reverse().map((quiz, index) => (
      <div key={index}>
          <Card
            className="card-with-bg-image"
            style={{ cursor: "pointer", backgroundImage: `url(${myServer + quiz.picture})`, margin: "0px", marginTop: `${index === 0 ? 0 : 10}px`, marginBottom: `${index === userQuizes.length - 1 ? 0 : 10}px` }}
          >
            <Card.Body>
              <Card.Title className='profile-american-subject-card-text' style = {{color: "white"}}>{quiz.subject_name}</Card.Title>
              <Card.Text className='profile-american-subject-card-text' style = {{color: "white"}}>
                {quiz.description}
              </Card.Text>
            </Card.Body>
            
          </Card>
          </div>
          
        ))}
        
    
  </div>
  
  </div>
  </div>
) : ("")}

        </div>
      ) : ("")}
      
    </div>
  );
};

export default UserQuizes;
