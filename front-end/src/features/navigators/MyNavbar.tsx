import { Container, Nav, Navbar } from 'react-bootstrap'
import { FaUserSecret } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";



const MyNavbar = () => {

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string)

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string)

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">

            <Container>

            <Nav>

            <Navbar.Brand href="/">Dialectiq</Navbar.Brand>

            </Nav>

            <Nav>

            {storedIsStaff && (
            <Nav.Link href="#admin"> <h3 style = {{color: "white", position: "relative", right: "100%", top: 2}}> <FaUserSecret /> </h3> </Nav.Link>)}

            {storedIsLogged ? (
              <Nav.Link href="/profile_user/profile"> <h2 style = {{color: "white", position: "relative"}}> <RiUserFill /> </h2> </Nav.Link>
            ) : (
              <Nav.Link href="/authentication/login"> <h2 style = {{color: "white", position: "relative"}}> <RiUserFill /> </h2> </Nav.Link>
            )}
            

            </Nav>
        
            </Container>

        </Navbar>


    </div>
  )
}

export default MyNavbar