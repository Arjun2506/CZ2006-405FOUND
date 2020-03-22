import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto" style={{"font-size": "200% "}}>
                        <Nav.Link href="/home">Maps</Nav.Link>
                        <Nav.Link href="/PSI">PSI Level</Nav.Link>
                        <Nav.Link href="/PM">PM 2.5</Nav.Link>
                        <Nav.Link href="/PM">UV Index</Nav.Link>
                    </Nav>
                </Navbar>
            </div >)
    }
}