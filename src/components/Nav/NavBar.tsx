import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to={'/'}>
            <Navbar.Brand href="#home">Turn counter</Navbar.Brand>
          </Link>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
