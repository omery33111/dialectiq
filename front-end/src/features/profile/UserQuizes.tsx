import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserQuizesAsync, getUserSingleBlogCommentsAsync, selectSingleBlogUserComments, selectUserAnsweredQuizes } from './profileSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import { Card } from 'react-bootstrap';



const UserQuizes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const userQuizes = useAppSelector(selectUserAnsweredQuizes);
  const userComments = useAppSelector(selectSingleBlogUserComments);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getUserQuizesAsync(Number(id)));

      dispatch(getUserSingleBlogCommentsAsync(Number(id)));
    }

  }, [id, dispatch]);


  return (
    <div>
      {userComments.length + userQuizes.length < 2 ? ("") : (
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
    )}
    </div>
  );
};

export default UserQuizes;
