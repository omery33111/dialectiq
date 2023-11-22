import { useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import '../../index.css';
import Body from './Body';
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


  const isMobile = window.innerWidth <= 767;
  const isLaptop = window.innerWidth >= 769 && window.innerWidth <= 1919;

  const handlePremiumClick = () => {
    window.scrollBy({ 
      top: window.innerHeight * 3, 
      behavior: 'smooth' 
    });
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden'}}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${require('../../images/mainpic.png')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '120vh'}}>

            <div className = "buttons">
            <Button href = 'https://www.instagram.com/hebrew_adventure/?igshid=MzRlODBiNWFlZA%3D%3D' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(685px)"}}></Button><br/><br/>
            <Button href = 'https://www.youtube.com/@TheHebrewAdventure-kv6ok' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(680px)"}}></Button><br/><br/>
            <Button href = 'https://www.patreon.com/TheHebrewAdventure' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(675px)"}}></Button><br/><br/>
            <Button href = 'https://www.italki.com/en/teacher/14053064' variant = "none" className = 'home-button' style = {{width: "18%", height: 57, position: "relative", transform: "translateX(43%) translateY(670px)"}}></Button>
            </div>

          {isMobile ? (
            <div style = {{display: "flex", textAlign: "center", justifyContent: "center", gap: "10px", transform: "translateY(74vh) translateX(1px)"}}>
            <Button href = "/quizes" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
            <Button href = "/forum" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
          </div>
          ) : (
            <div style = {{display: "flex", textAlign: "center", justifyContent: "center", gap: "53px", transform: "translateY(82.3vh) translateX(1px)"}}>
            <Button href = "/quizes" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
            <Button href = "/forum" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
          </div>
          )}

          {isLaptop && (
            <div style = {{display: "flex", textAlign: "center", justifyContent: "center", gap: "53px", transform: "translateY(67vh) translateX(1px)"}}>
            <Button href = "/quizes" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
            <Button href = "/forum" variant = "none" style = {{width: "200px", height: "45px"}}></Button>
          </div>
          )}
            
      </div>

      <div ref={inViewRef2} style={{ position: 'relative', top: 100}}>
        {inView2 && <Statistics />}
      </div>

      <Container 
        className="d-flex justify-content-center"
        style={{ position: 'relative', top: 200, backgroundColor: "#FFF0DB", padding: '80px', border: '4px solid #FF6931'}}>
        <div ref={inViewRef} style={{ maxWidth: '1000px', width: '100%' }}>
          <video
          style = {{border: '1px solid black'}}
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
        <br/>
          <div className = 'd-flex justify-content-center align-items-center'>
            <Button variant = "none" style = {{backgroundColor: "#FF6931"}} onClick={handlePremiumClick}>
                <h5 style = {{margin: 20, color: "white"}}>
              PREMIUM
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
