import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsFillFileTextFill, BsPhoneFill } from 'react-icons/bs';
import { FaUserSecret } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';



const MyNavbar = () => {
  const location = useLocation();

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string);
  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (storedIsStaff) {
      setShouldRefresh(true);
    }
  }, [storedIsStaff]);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolling(window.pageYOffset > 770);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const isHomePage = location.pathname === '/'; // Check if the current location is the home page

  const containerBackground = isScrolling || !isHomePage ? '#0097E6' : 'transparent';

  return (
    <div>
      <Navbar
        className={`fixed-top ${isScrolling ? 'scrolling' : ''}`}
        style={{
          background: "transparent",
          transition: 'background 0.3s ease-in-out', // Smooth color transition animation
          boxShadow: '0 7px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 30px 0 rgba(0, 0, 0, 0.30)',
          top: 10
        }}
      >
        <Container
          style={{
            backgroundColor: containerBackground,
            borderRadius: '20px',
            height: 53,
            transition: 'background 0.3s ease-in-out', // Apply the same transition to the container background
          }}
        >
          <Nav>
            <Navbar.Brand style={{ color: 'white' }} href="/">
              Dialectiq
            </Navbar.Brand>
          </Nav>
          <Nav style = {{position: "relative", top: 3}}>
            {shouldRefresh && storedIsStaff && (
              <Nav.Link href="/adminmenu">
                <h3
                  style={{
                    color: 'white',
                    position: 'relative',
                    right: '170%',
                    top: 2,
                  }}
                >
                  <FaUserSecret />
                </h3>
              </Nav.Link>
            )}

                  <Nav.Link href = "/quizes">
                  <h3
                  style={{
                    color: 'white',
                    position: 'relative',
                    right: '105%',
                    top: 2,
                  }}
                >
                  <BsFillFileTextFill />
                </h3>
                  </Nav.Link>


                  <Nav.Link href = "/blog">
                  <h3
                  style={{
                    color: 'white',
                    position: 'relative',
                    right: '50%',
                    top: 2,
                  }}
                >
                  <BsPhoneFill />
                </h3>
                  </Nav.Link>

            {storedIsLogged ? (
              <Nav.Link href="/profile/profile">
                <h2
                className = 'user-icon-top'
                  style={{color: 'white'}}>
                  <RiUserFill />
                </h2>
              </Nav.Link>
            ) : (
              <Nav.Link href="/authentication/login">
                <h2
                className = 'user-icon-top'
                  style={{color: 'white'}}>
                  <RiUserFill />
                </h2>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <style>
        {`
          .scrolling {
            background: #A07178;
          }
        `}
      </style>
      
    </div>
  );
};

export default MyNavbar;
