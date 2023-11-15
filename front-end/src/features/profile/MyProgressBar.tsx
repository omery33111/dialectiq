import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfileAsync, getSingleProfileAsync, selectProfile } from './profileSlice';
import ProgressBar from "@ramonak/react-progress-bar";
import { logoutAsync, selectIsLogged } from '../authentication/authenticationSlice';



const MyProgressBar = () => {
    const dispatch = useAppDispatch()

    const userProfile = useAppSelector(selectProfile);

    const rankScale = Math.min(
        100,
        (userProfile.points / 2000) * 100
      );
    
      const ProgressBarColor = () => {
        if (userProfile.points >= 0 && userProfile.points < 250) {
          return "grey";
        } else if (userProfile.points >= 250 && userProfile.points < 500) {
          return "yellow";
        } else if (userProfile.points >= 500 && userProfile.points < 750) {
          return "#0CAFFF";
        } else if (userProfile.points >= 750 && userProfile.points < 1000) {
          return "#FFA500";
        } else if (userProfile.points >= 1000 && userProfile.points < 1250) {
          return "#0FFF50";
        } else if (userProfile.points >= 1250 && userProfile.points < 1500) {
          return "#7F00FF";
        } else if (userProfile.points >= 1500 && userProfile.points < 1750) {
          return "#172460";
        } else if (userProfile.points >= 1750 && userProfile.points <= 2000) {
          return "red";
        } else if (userProfile.points >= 2000) {
          return "black";
        }
      };
    
    
    const profileID = JSON.parse(localStorage.getItem('profileID') as string);

    useEffect(() => {
        if (Number(profileID) !== -1) {
            dispatch(getSingleProfileAsync(Number(profileID)));
        } else {
            dispatch(logoutAsync());
            window.location.href = "/";
        }
    }, [profileID, dispatch]);
    
    
  return (
    <div>
            <div className="circle-container">


                <div className="circle" style = {{border: `0.4em solid ${ProgressBarColor()}`, marginRight: "-9px"}}>
                    <h4>
                    {userProfile.points}
                    </h4>
                </div>

                <div className = 'progress-bar' style={{ position: 'absolute', backgroundColor: "#D2B48C", border: '4px solid #FF6931', padding: "50px"}}>
                    <ProgressBar bgColor={ProgressBarColor()} completed={rankScale} customLabel = {userProfile.points.toLocaleString()}/>
                </div>
                
            </div>
    </div>
  )
}

export default MyProgressBar
