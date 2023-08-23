import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import Callback from '../callback/Callback';

const Body = () => {
  const carImages = Array.from({ length: 81 }, (_, index) => `car${index + 1}.png`);

  return (
    <div>

    <div className="background-image">

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
            
            <img
            className = 'calendar-pic'
            src={require(`../../images/calendar.png`)}
            alt="calendar"/>
      
                  
            <div id="callback">
              <Callback />
            </div>

      
          </div>

  </div>

   

    </div>
  );
};

export default Body;
