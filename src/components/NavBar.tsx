import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar:React.FC = () => {
    return(<div>
         <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Turn counter</Navbar.Brand>
    <Nav className="me-auto">
    </Nav>
    </Container>
  </Navbar>
    </div>);
}

export default NavBar;