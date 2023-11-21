import React, { useEffect } from 'react';

const Clouds: React.FC = () => {
  const isLaptop = window.innerWidth >= 769 && window.innerWidth <= 1919;

  useEffect(() => {
    const handleScroll = () => {
      const clouds = document.querySelectorAll('.clouds') as NodeListOf<HTMLElement>;

      clouds.forEach((cloud) => {
        const scrolled = window.pageYOffset;
        const speed = parseFloat(cloud.dataset.speed || '0');
        const direction = cloud.dataset.direction === 'left' ? -1 : 1;
        const val = scrolled * speed * direction;
        cloud.style.transform = `translateX(${val}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cloudImages = [
    require('../../images/css-artwork-cloud-05.png'),
    require('../../images/css-artwork-cloud-07.png'),
    require('../../images/css-artwork-cloud-08.png'),
  ];

  const renderClouds = () => {
    const clouds = [];
    const numberOfClouds = 25;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gapWidth = 200;
    const availableWidth = screenWidth - gapWidth;
    const startHeight = isLaptop ? 30 : 0; // Adjust the startHeight based on isLaptop condition
    const endHeight = 150;
    const startPixels = (startHeight * screenHeight) / 100;
    const endPixels = (endHeight * screenHeight) / 100;
    const totalCloudsWidth = availableWidth * 1.5;

    for (let i = 0; i < numberOfClouds; i++) {
      const cloudWidth = Math.random() * (430 - 200) + 200; // Limit cloud width between 200px and 400px
      const speed = Math.random() * (0.6 - 0.1) + 0.1;
      const direction = Math.random() < 0.5 ? 'left' : 'right';
      const startPositionX = (screenWidth - totalCloudsWidth) / 2;
      const positionX =
        direction === 'left'
          ? startPositionX + i * cloudWidth
          : startPositionX + availableWidth - i * cloudWidth;
      const positionY = Math.random() * (endPixels - startPixels) + startPixels;

      const randomImageIndex = Math.floor(Math.random() * cloudImages.length);
      const selectedImage = cloudImages[randomImageIndex];

      const zIndex = i < numberOfClouds / 2 ? 1 : 1;
      const opacity = Math.random() * (1 - 0.2) + 0.2;

      clouds.push(
        <img
          key={i}
          className="clouds"
          src={selectedImage}
          style={{
            width: `${cloudWidth}px`,
            height: 'auto',
            position: 'absolute',
            top: `${positionY}px`,
            [direction === 'left' ? 'left' : 'right']: `${positionX}px`,
            zIndex: zIndex,
            opacity: opacity,
          }}
          data-speed={speed}
          data-direction={direction}
        />
      );
    }

    return clouds;
  };

  return (
    <div style={{ height: '300vh', position: 'absolute', top: isLaptop ? '260vh' : '240vh' }}>
      <div className="clouds-section">{renderClouds()}</div>
    </div>
  );
};

export default Clouds;
