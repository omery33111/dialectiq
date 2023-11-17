import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Callback from '../callback/Callback';
import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import Clouds from './Clouds';


const Body = () => {
  const carImages = Array.from({ length: 81 }, (_, index) => `car${index + 1}.png`);

  const [isBodyTextAnimated, setIsBodyTextAnimated] = useState(false);

  const bodyTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsBodyTextAnimated(true);
      }
    }, {
      root: null,
      threshold: 0.5
    });

    if (bodyTextRef.current) {
      observer.observe(bodyTextRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [bodyTextRef]);



  


  return (
    <div>
      
    <div className="background-image">

            <div>
              <Clouds />
            </div>

    <div className="body-container">

            <div className="car-container">
            
              <Carousel fade controls={false} indicators={false} interval={2500}>
                {carImages.map((carImage, index) => (
                  <Carousel.Item key={index}>
                    <img
                      style={{ borderRadius: '20px' }}
                      src={require(`../../images/Carousel/${carImage}`)}
                      alt={carImage}
                      height='120'
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              
            </div>

            

                  <div id = "callback"/>

            <div className={`body-text ${isBodyTextAnimated ? 'body-text-animated' : ''}`} ref={bodyTextRef}>
            Welcome to "The Hebrew Adventure"! It's a cool place to learn Hebrew and explore its culture.
            I'm Or, and I'm happy you're here with me. We have fun videos, quizzes, forums, and audio challenges, as well as lots of useful stuff for learning Hebrew.<br/><br/>
            I'm a 23-year-old who loves languages, and I've taught over 1300 Hebrew lessons.
            I also enjoy learning languages myself and can speak Hebrew, English, and Spanish, and I'm working on Japanese.
            Come join me on this exciting journey to learn Hebrew and dive into its culture. Whether you're a beginner or already know some Hebrew, you'll find something interesting here.
            Let's start this adventure!
            </div>
            

            <img
            style = {{border: '1px solid #000000'}}
            className = 'calendar-pic'
            src={require(`../../images/calendar.png`)}
            alt="calendar"/>
      
            <div>
              <Callback />
            </div>

      
          </div>

  </div>

   

    </div>
  );
};

export default Body;
