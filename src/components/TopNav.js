import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Navbar, 
    Nav, 
    NavItem, 
    Collapse,
    NavbarToggler } from 'reactstrap';

import '../style/styles.css';

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
            <div className="nav-container">
                <Navbar color="faded" light expand="md">
                    <Link to="/" className="nav-brand"> Address Book</Link>
                    <NavbarToggler onClick={()=>this.toggle()} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem onClick={() => this.toggle()}>
                                <Link to="/add" >Add New Contact</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
    }
}

export default connect(mapStateToProps, null)(TopNav);