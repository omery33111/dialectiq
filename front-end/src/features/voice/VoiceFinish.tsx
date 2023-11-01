import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfileAsync, selectProfile, selectUserID } from '../profile/profileSlice';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';



const VoiceFinish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const myProfile = useAppSelector(selectProfile);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const userID = useAppSelector(selectUserID);

  useEffect(() => {
    if (storedIsLogged) {
      if (userID) {
    dispatch(getProfileAsync());
  }
}
  }, [dispatch]);

  const localStoragePoints = JSON.parse(localStorage.getItem("points") as string);


  const timer = setTimeout(() => {
    navigate('/quizes/voice_quiz/subjects');
  }, 5000);

  return (
    <div className="page-container">
      <div style={{ height: "8vh" }} />
      <img className="congrats-image" src={require('../../images/congrats.png')} alt="congrats" width="600" height="300" />

      <div className="centered-container">
  {storedIsLogged ? (
    <h1 className="points-count-quiz">
      <CountUp start={0} end={myProfile.points - localStoragePoints} duration={2} />
    </h1>
  ) : (
    <div className="animate-pop">
      You successfully completed the test!
    </div>
  )}

  <div className='redirected'>
    <h5>YOU ARE BEING REDIRECTED...</h5>
  </div>
  <ConfettiExplosion
    force={0.9}
    duration={4500}
    particleCount={400}
    width={2300}
    height="180vh"
    particleSize={10}
  />
</div>


      <br />
      <br />
      {storedIsLogged ? (
        <img className="congrats-message-image" src={require('../../images/congratsmessageamerican.png')} alt="congratsmessageamerican" width="750" height="200" />
      ) : (
        <img className="congrats-message-image" src={require('../../images/congratsmessagequiznonprem.png')} alt="congratsmessageamerican" width="750" height="200" />
      )}
      
      
    </div>
  );
};

export default VoiceFinish;
