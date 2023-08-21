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

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${require('../../images/mainpic.png')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '110vh',
        }}
      >
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ position: 'relative', top: '92.4%' }}
        >
          <div style={{ display: 'inline-block', marginRight: '60px' }}>
            <Button
              variant="none"
              href="#callback"
              style={{ width: '20vh', height: '60px' }}
            >
              {/* Add button content here */}
            </Button>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Button
              variant="none"
              style={{ width: '20vh', height: '60px' }}
            >
              {/* Add button content here */}
            </Button>
          </div>
        </Container>
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
            playsInline
          >
            <source
              src={require('../../images/myvideo.mp4')}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>

      <div style={{ height: 250 }} />
      <Body />

      <div id="callback">
        <div style={{ height: 100 }} />
        <Callback />
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
};

export default HomePage;
