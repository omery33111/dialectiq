import React from 'react';

const Body = () => {
  return (
    <div>



        <div
        className="background-image"
        style={{
        backgroundImage: `url(${require('../../images/blueframe.png')})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '110vh',
        width: "100%",
        display: "flex"}}/>

</div>
    
  );
};

export default Body;