import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsBrowserSafari, BsFillFileTextFill, BsPhoneFill } from 'react-icons/bs';
import { FaUserSecret } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUserID } from '../profile/profileSlice';

const MyNavbar = () => {
  const location = useLocation();

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string);
  const storedUserID = JSON.parse(localStorage.getItem('myID') as string);

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

  const containerBackground = isScrolling || !isHomePage ? '#A0784F' : 'transparent';

  const userID = useAppSelector(selectUserID);

  const isMobile = window.innerWidth <= 767;

  return (
    <div>
      <Navbar
        className={`fixed-top ${isScrolling ? 'scrolling' : ''}`}
        style={{
          background: 'transparent',
          transition: 'background 0.3s ease-in-out',
          boxShadow: '0 7px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 30px 0 rgba(0, 0, 0, 0.30)',
          top: 10,
        }}
      >
        <Container
          style={{
            backgroundColor: containerBackground,
            borderRadius: '20px',
            height: 53,
            transition: 'background 0.3s ease-in-out',
          }}
        >
          <Nav>
            <Navbar.Brand style={{ color: 'white', left: -40, position: "relative" }} href="/">
            <img
                  className="admin-panel-pic"
                  src={require('../../images/logo.png')}
                  alt="portalpic1"
                  height="auto"
                  width="165"
                />
            </Navbar.Brand>
          </Nav>
          <Nav style={{ position: 'relative', top: -6, left: -45 }}>
            {shouldRefresh && storedIsStaff && (
              <Nav.Link href="/adminmenu">
                <h3
                  style={{
                    color: 'white',
                    position: 'relative',
                    right: '245%',
                    top: 2,
                  }}
                >
                  <FaUserSecret />
                </h3>

                {isMobile ? (
                  <div style = {{position: "absolute", marginLeft: "-64px", marginTop: "-6px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Admin
                  </div>
                ) : (
                  <div style = {{position: "absolute", marginLeft: "-74px", marginTop: "-7px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Admin
                  </div>
                )}
              </Nav.Link>
            )}

            <Nav.Link href="/forum">
              <h3
                style={{
                  color: 'white',
                  position: 'relative',
                  right: '170%',
                  top: 2,
                }}
              >
                <BsBrowserSafari />
              </h3>

              {isMobile ? (
                  <div style = {{position: "absolute", marginLeft: "-47px", marginTop: "-6px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Forum
                  </div>
                ) : (
                  <div style = {{position: "absolute", marginLeft: "-52px", marginTop: "-7px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Forum
                  </div>
                )}

            </Nav.Link>

            <Nav.Link href="/quizes">
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

              {isMobile ? (
                  <div style = {{position: "absolute", marginLeft: "-32px", marginTop: "-6px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Quizes
                  </div>
                ) : (
                  <div style = {{position: "absolute", marginLeft: "-35px", marginTop: "-7px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Quizes
                  </div>
                )}

            </Nav.Link>

            <Nav.Link href="/paged_blogs">
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

              {isMobile ? (
                  <div style = {{position: "absolute", marginLeft: "-13px", marginTop: "-6px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Blog
                  </div>
                ) : (
                  <div style = {{position: "absolute", marginLeft: "-12px", marginTop: "-7px", fontSize: "0.8rem", zIndex: 1, color: "white"}}>
                  Blog
                  </div>
                )}

            </Nav.Link>

                  <div style={{position: "relative", top: 7}}>
            {userID == -1 ? (
              <Nav.Link href="/authentication/login">
              <h2 className="user-icon-top" style={{ color: 'white' }}>
                <RiUserFill />
              </h2>
              
            </Nav.Link>
            ) : (
              <Nav.Link href={`/profile/user_profile/${userID}/`}>
              <h2 className="user-icon-top" style={{ color: 'white' }}>
                <RiUserFill />
              </h2>
              
            </Nav.Link>
            )}
            </div>

          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
