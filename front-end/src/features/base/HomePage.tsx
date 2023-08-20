import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import '../../index.css';
import Body from './Body';
import Callback from '../callback/Callback';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
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

  return (
    <div style={{ backgroundColor: '#002c50', position: 'relative', overflow: "hidden"}}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${require('../../images/mainpic.png')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '110vh'}}>

        <Container className="d-flex justify-content-center align-items-center" style={{position: 'relative', top: '7.5%'}}>
          <Button href = "/instagram" variant = "none" style = {{width: "30vh", height: "60px"}}></Button>
        </Container>
        
          
        <Container className="d-flex justify-content-center align-items-center" style={{position: 'relative', top: '10.2%'}}>
          <Button href = "#callback" variant = "none" style = {{width: "30vh", height: "70px"}}></Button>
        </Container>

      </div>
      

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ position: 'relative', top: 150}}
      >
        <div ref={inViewRef} style={{ maxWidth: '1000px', width: '100%' }}>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            controls
            controlsList="nodownload"
            muted
            playsInline
          >
            <source src={require('../../images/myvideo.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>

      <div>
        <div style = {{height: 250}} />

          <Body/>

      </div>

          <div id = "callback">
          <div style = {{height: 100}} />
          <Callback />
      </div>
      <div style = {{height: 100}} />

    </div>
  );
};

export default HomePage;