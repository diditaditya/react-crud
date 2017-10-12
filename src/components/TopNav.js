import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    Collapse,
    NavbarToggler } from 'reactstrap';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand href="/">Address Book</NavbarBrand>
                    <NavbarToggler onClick={()=>this.toggle()} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/add" >Add New Contact</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopNav;