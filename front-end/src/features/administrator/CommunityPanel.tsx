import Pagination from '@mui/material/Pagination';
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactFlipCard from 'reactjs-flip-card';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { getForumProfilesAsync, getProfilesAmountAsync, searchProfileAsync, selectProfiles, selectProfilesAmount, selectSearchProfile, updateSearchProfile } from "../profile/profileSlice";
import { GoSearch } from "react-icons/go";



const CommunityPanel = () => {

  const [page, setPage] = useState(1);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getForumProfilesAsync(page));

    dispatch(getProfilesAmountAsync());
  }, [page]);

  const profiles = useAppSelector(selectProfiles);
  const profilesAmount = useAppSelector(selectProfilesAmount);

  
  const ItemsPerPage = 8;

  const totalPages = Math.ceil(profilesAmount / ItemsPerPage);

  // Calculate the page numbers for the "next" pages
  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  
  const ProgressBarColor = (points: any) => {
    if (points >= 0 && points < 250) {
      return "grey";
    } else if (points >= 250 && points < 500) {
      return "yellow";
    } else if (points >= 500 && points < 750) {
      return "#0CAFFF";
    } else if (points >= 750 && points < 1000) {
      return "#FFA500";
    } else if (points >= 1000 && points < 1250) {
      return "#0FFF50";
    } else if (points >= 1250 && points < 1500) {
      return "#7F00FF";
    } else if (points >= 1500 && points < 1750) {
      return "#172460";
    } else if (points >= 1750 && points <= 2000) {
      return "red";
    } else if (points >= 2000) {
      return "black";
    }
  };


  const searchProfile = useAppSelector(selectSearchProfile);

  const handleSearchClick = () => {
    dispatch(searchProfileAsync({ searchQuery: searchProfile }));
  };


  return (
    <div>


      <Container>



      <div style={{ height: "18rem" }} />

      <div>
          <Form>
          <div className='search-item'>
            <Form.Group controlId="formProductName">
              <Form.Control
                type="text"
                onChange={(event) => dispatch(updateSearchProfile(event.target.value))}
                value={searchProfile}/>
            </Form.Group>
            </div>

            <div className='search-item2'>
            <Button variant = "" style = {{fontSize: "1.5rem", cursor: "pointer", padding: 0}} onClick={handleSearchClick}>
            <GoSearch/>
            </Button>
            </div>

          </Form>
        </div>

      <hr/>

      

      <div className="pagination-container">
      <Pagination
            count={totalPages}
            page={page}
            onChange={(event, newPage) => setPage(newPage)}
            size="small"
          />
        </div>


      <div className="forum-container">
        {profiles.map((profile) => (
          <div key={profile.profile_id}>

            <ReactFlipCard
      direction="vertical" // You can choose "vertical" or "diagonal" as well
      flipTrigger="onHover" // You can choose "onClick" or "disabled" as well
      frontComponent={
            <Card className="forum-item" onClick = {() => navigate(`/profile/user_profile/${profile.user}/`)} style = {{borderRadius: '5%'}}>
              <img
                alt="profilepic"
                height={286}
                width={287}
                src={myServer + profile.picture}
                style = {{borderRadius: '5%'}}
              />
              
              <div style = {{borderRadius: '5%'}}>
              <img
                      src={require('../../images/profilepicbg.png')}
                      width="100%"
                      alt="profile-logo"
                      style={{ position: 'absolute', top: 0, right: 0, borderRadius: '4%'}}
                    />
                    </div>


                <div className="circle-container-forum">
                  <div
                    className="circle"
                    style={{
                      border: `0.4em solid ${ProgressBarColor(profile.points)}`,
                      marginRight: "-9px",
                    }}
                  >
                    <h4>{profile.points}</h4>
                  </div>
                </div>

            </Card>}

            backComponent={
            <Card className="forum-item" onClick = {() => navigate(`/profile/user_profile/${profile.user}/`)} style = {{borderRadius: '5%'}}>
              <img
                alt="mypicture"
                height={260}
                width={287}
                src={myServer + profile.picture}
                style = {{borderRadius: '5%'}}
              />
              <div className = "forum-progressbar">
                <div className="circle-container">
                  <div
                    className="circle"
                    style={{
                      border: `0.4em solid ${ProgressBarColor(profile.points)}`,
                      marginRight: "-9px",
                    }}>
                    <h4>{profile.points}</h4>
                  </div>
                  <div className="progress-bar-forum">
                    <ProgressBar
                      bgColor={ProgressBarColor(profile.points)}
                      completed={(profile.points / 2000) * 100}
                      customLabel={profile.points.toLocaleString()}
                    />
                  </div>
                </div>
              </div>
              <Card.Body style = {{position: "relative", top: -52}}>
                <Card.Title>
                  {profile.first_name ? `${profile.first_name}` : "UNKNOWN"}{" "}
                  {profile.last_name ? `${profile.last_name}` : "UNKNOWN"}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.7rem" }}>
                  <b style={{ position: "relative", top: -5 }}>
                    {profile.location ? `${profile.location}` : "UNKNOWN"}
                  </b>
                </Card.Text>
                <Card.Text>
                  {profile.bio ? `${profile.bio}` : "UNKNOWN"}
                </Card.Text>
              </Card.Body>
            </Card>}/>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        ))}

      </div>
      <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default CommunityPanel;