import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfileAsync, selectProfile } from './profileSlice';
import ProgressBar from "@ramonak/react-progress-bar";



const MyProgressBar = () => {
    const dispatch = useAppDispatch()

    const myProfile = useAppSelector(selectProfile);

    const rankScale = Math.min(
        100,
        (myProfile.points / 2000) * 100
      );
    
      const ProgressBarColor = () => {
        if (myProfile.points >= 0 && myProfile.points < 250) {
          return "grey";
        } else if (myProfile.points >= 250 && myProfile.points < 500) {
          return "yellow";
        } else if (myProfile.points >= 500 && myProfile.points < 750) {
          return "#0CAFFF";
        } else if (myProfile.points >= 750 && myProfile.points < 1000) {
          return "#FFA500";
        } else if (myProfile.points >= 1000 && myProfile.points < 1250) {
          return "#0FFF50";
        } else if (myProfile.points >= 1250 && myProfile.points < 1500) {
          return "#7F00FF";
        } else if (myProfile.points >= 1500 && myProfile.points < 1750) {
          return "#172460";
        } else if (myProfile.points >= 1750 && myProfile.points <= 2000) {
          return "red";
        } else if (myProfile.points >= 2000) {
          return "black";
        }
      };
    

    useEffect(() => {
      dispatch(getProfileAsync());
    }, [dispatch]);
    
  return (
    <div>
            <div className="circle-container">

                <div className="circle" style = {{border: `0.4em solid ${ProgressBarColor()}`, marginRight: "-9px"}}>
                    <h4>
                    {myProfile.points}
                    </h4>
                </div>

                <div className = 'progress-bar'>
                    <ProgressBar bgColor={ProgressBarColor()} completed={rankScale} customLabel = {myProfile.points.toLocaleString()}/>
                </div>
                
            </div>
    </div>
  )
}

export default MyProgressBar
