import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BiLogIn, BiCog } from 'react-icons/bi';
import {FaDropbox} from 'react-icons/fa'

export default function NavbarComponent() {
  return (
    <Navbar bg="secondary" expand="sm" className="d-flex justify-content-between">
      <Navbar.Brand as={Link} to="/" className="text-light">< FaDropbox fontSize="3rem"/>
        My Backend Dropbox
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-light ">
          < BiCog fontSize ='3rem'/>Profile
        </Nav.Link>
        <Link to="/Login"  className="p-2 text-light" >
          <BiLogIn  fontSize="3em"/>
        </Link>
      </Nav>
    </Navbar>
  )
}
