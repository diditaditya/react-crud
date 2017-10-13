import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

import action from '../store/action';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.contactId,
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            fireRedirect: false,
        }
    }

    onDelete() {
        console.log(this.props.match);
        let confirmed = window.confirm(`Do you want to delete ${this.state.firstName} ${this.state.lastName}?`);
        if (confirmed) {
            this.props.deleteContact(parseInt(this.props.match.params.contactId, 10));
            this.setState({
                fireRedirect: true,
            });
        }
    }

    componentDidMount() {
        if (this.props.list) {
            if (this.props.list !== null) {
                this.props.list.map(contact => {
                    if (String(contact.id) === String(this.props.match.params.contactId)) {
                        this.setState({
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phone: contact.phone,
                            address: contact.address,
                        });
                    }
                    return null;
                });
            }
        }
    }

    render() {
        let contactDetail = this.state;
        let editUrl = "/contact/" + this.props.match.params.contactId + "/edit";
        return (
            <Row>
                <Col></Col>
                <Col>
                    <p>Contact Detail</p>
                    <div>
                        <p>First Name  : {contactDetail.firstName}</p>
                        <p>Last Name   : {contactDetail.lastName}</p>
                        <p>Phone       : {contactDetail.phone}</p>
                        <p>Address     : {contactDetail.address}</p>
                    </div>
                    <div>
                        <Link to="/"><Button>Back</Button></Link>
                        <Link to={editUrl}><Button>Edit</Button></Link>
                        <Button onClick={()=>this.onDelete()} >Delete</Button>
                        { 
                            this.state.fireRedirect &&
                            <Redirect to="/" />
                         }
                    </div>
                </Col>
                <Col></Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteContact: (contactId) => {dispatch(action.delete(contactId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);