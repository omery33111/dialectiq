import React, { useEffect, useRef } from 'react';

const Clouds: React.FC = () => {
  const cloudsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const handleScroll = () => {
            const clouds = document.querySelectorAll('.clouds') as NodeListOf<HTMLElement>;
            const windowHeight = window.innerHeight;

            clouds.forEach((cloud, index) => {
              const scrolled = window.pageYOffset;
              const speed = index % 2 === 0 ? (index + 1) * 0.5 : -(index + 1) * 0.5; // Adjust the speed here
              const val = (scrolled * speed * 0.1) % window.innerWidth;

              // Calculate the distance from the top and bottom of the viewport
              const distanceFromTop = cloud.getBoundingClientRect().top;
              const distanceFromBottom = windowHeight - distanceFromTop;

              // Set different zIndex for clouds based on index
              cloud.style.zIndex = index < 10 ? '0' : '1'; // Half of clouds with zIndex 0 and half with zIndex 1

              // Set different opacity for clouds based on index
              cloud.style.opacity = index % 3 === 0 ? '0.7' : '1';

              // Calculate if the cloud is within the viewport boundaries
              const isInViewport = distanceFromTop < windowHeight && distanceFromBottom > -cloud.clientHeight * 0.5;

              if (isInViewport) {
                // Reset opacity if the cloud is inside the viewport
                cloud.style.opacity = index % 3 === 0 ? '0.7' : '1';
              } else {
                // Gradually decrease opacity for clouds partially outside the viewport
                const fadeOutFactor = Math.min(
                  1,
                  Math.abs(distanceFromTop) / (windowHeight + cloud.clientHeight)
                );
                cloud.style.opacity = `${fadeOutFactor * (index % 3 === 0 ? 0.7 : 1)}`;
              }

              cloud.style.transform = `translateX(${val}px)`;
              cloud.style.borderRadius = `${0.025 * val}%`;
            });
          };

          window.addEventListener('scroll', handleScroll);

          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      },
      {
        root: null,
        threshold: 0.0,
      }
    );

    if (cloudsRef.current) {
      observer.observe(cloudsRef.current);
    }

    return () => {
      if (cloudsRef.current) {
        observer.unobserve(cloudsRef.current);
      }
    };
  }, []);

  const cloudImages = [
    require('../../images/css-artwork-cloud-05.png'),
    require('../../images/css-artwork-cloud-07.png'),
    require('../../images/css-artwork-cloud-08.png'),
  ];

  return (
    <div ref={cloudsRef} style={{ height: '100vh', position: 'absolute', top: '240vh' }}>
      <div className="clouds-section">
        {[...Array(15)].map((_, index) => {
          const randomTop = `${Math.floor(Math.random() * 170)}vh`;
          const randomLeft = `${Math.floor(Math.random() * 50)}vw`;
          const randomWidth = `${Math.floor(Math.random() * (300 - 190 + 1)) + 190}px`;

          return (
            <img
              key={index}
              className="clouds"
              src={cloudImages[index % cloudImages.length]}
              style={{
                width: randomWidth,
                height: 'auto',
                position: 'absolute',
                top: randomTop,
                left: randomLeft,
                zIndex: index + 1,
                transition: 'opacity 10s ease-out', // Adjust transition duration as needed
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Clouds;
