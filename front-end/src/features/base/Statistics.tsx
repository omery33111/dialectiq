import React from 'react';
import { Container } from 'react-bootstrap';
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <Container>
      <div className="countup-container" style={{ backgroundColor: "#A0784F" }}>
        <div className="countup-item">
          <h5><CountUp start={0} end={100} suffix="%" duration={4} /></h5>
          <h4>ATTENDANCE</h4>
        </div>
        <div className="countup-item">
          <h5><CountUp start={0} end={200} duration={4} /> +</h5>
          <h4>STUDENTS</h4>
        </div>
        <div className="countup-item">
          <h5><CountUp start={0} end={1400} duration={5} /></h5>
          <h4>LESSONS</h4>
        </div>

        <div className="countup-item">
          <h5><span style={{ color: "yellow" }}>&#9733;</span> <CountUp start={0} end={5.0} decimals={1} duration={3} /></h5>
          <h4>RATING</h4>
        </div>

        <div className="countup-item">
          <h5><CountUp start={0} end={100} suffix="%" duration={4} /></h5>
          <h4>RESPONSE</h4>
        </div>
      </div>
    </Container>
  );
}

export default Statistics;
