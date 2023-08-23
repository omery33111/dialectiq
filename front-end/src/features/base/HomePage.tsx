import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import '../../index.css';
import Body from './Body';
import Callback from '../callback/Callback';
import Statistics from './Statistics';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (inView && videoRef.current && !isPlaying) {
      videoRef.current?.play().catch((error) => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else if (!inView && isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [inView, isPlaying]);


  const statRef = useRef<HTMLVideoElement>(null);
  const [inViewRef2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [isPlaying2, setIsPlaying2] = useState(false);

  useEffect(() => {
    if (inView && statRef.current && !isPlaying2) {
      statRef.current?.play().catch((error) => {
        setIsPlaying2(false);
      });
      setIsPlaying2(true);
    } else if (!inView && isPlaying2) {
      statRef.current?.pause();
      setIsPlaying2(false);
    }
  }, [inView2, isPlaying2]);



  const carImages = Array.from({ length: 81 }, (_, index) => `car${index + 1}.png`);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${require('../../images/mainpic.png')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '110vh'}}>

            <div className = "buttons">
            <Button href = 'https://www.instagram.com/hebrew_adventure/?igshid=MzRlODBiNWFlZA%3D%3D' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(702px)"}}></Button><br/><br/>
            <Button href = 'https://www.youtube.com/@TheHebrewAdventure-kv6ok' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(695px)"}}></Button><br/><br/>
            <Button href = 'https://www.patreon.com/TheHebrewAdventure' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(686px)"}}></Button><br/><br/>
            <Button href = 'https://www.italki.com/en/teacher/14053064' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(672px)"}}></Button>
            </div>
      </div>

      <div ref={inViewRef2} style={{ position: 'relative', top: 100 }}>
        {inView2 && <Statistics />}
      </div>

      <Container
        className="d-flex justify-content-center"
        style={{ position: 'relative', top: 200 }}
      >
        <div ref={inViewRef} style={{ maxWidth: '1000px', width: '100%' }}>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            controls
            controlsList="nodownload"
            muted
            playsInline>
            <source
              src={require('../../images/myvideo.mp4')}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

        <br/>
        <br/>
          <div className = 'd-flex justify-content-center align-items-center'>
            <Button
            
              variant="primary"
              href=""
              >
                <h5 style = {{margin: 20, color: "white"}}>
              PREMIUM PLAN!
              </h5>
            </Button>
          </div>
          
        </div>
      </Container>

      
      <Body />


    </div>
  );
};

export default HomePage;
