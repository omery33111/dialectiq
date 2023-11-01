import React from 'react';



const ErrorPage = () => {



  return (
    <div
        style={{
          overflow: "hidden",
          backgroundImage: `url(${require('../../images/lightblueerror.png')})`,
          height: '100vh'}}>

            <div className = 'fadeIn'>
        <img src={require(`../../images/backgrounderror.png`)} width = "90%" style = {{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
        </div>

      <div className="clouds" style = {{position: "relative", top: -250}}>
        <div className="cloud1">
        <img src={require(`../../images/css-artwork-cloud-05.png`)} style= {{width: "300px", height: "150px", position: "relative", transform: "translate(0%, 20%)"}} />
        </div>

        <div className="cloud2">
        <img src={require(`../../images/css-artwork-cloud-05.png`)} style= {{width: "320px", height: "160px"}} />
        </div>

        <div className="cloud3">
        <img src={require(`../../images/css-artwork-cloud-08.png`)} style= {{width: "450px", height: "300px"}} />
        </div>

        <div className="cloud4">
        <img src={require(`../../images/css-artwork-cloud-05.png`)} style= {{width: "400px", height: "200px"}} />
        </div>

        <div className="cloud5">
        <img src={require(`../../images/css-artwork-cloud-07.png`)} style= {{width: "450px", height: "240px", position: "relative", transform: "translate(0%, -20%)"}} />
        </div>

      </div>
    </div>
  )
}



export default ErrorPage
