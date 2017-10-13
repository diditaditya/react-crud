import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button, Input, Form, FormGroup, Label } from 'reactstrap';

import action from '../store/action';

class EditContact extends Component {
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

    onFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    onLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        });
    }

    onAddressChange(event) {
        this.setState({
            address: event.target.value,
        });
    }

    onPhoneChange(event) {
        this.setState({
            phone: event.target.value,
        });
    }

    isNameValid() {
        let isFirstNameEmpty = true;
        if (this.state.firstName.length > 0) {
            isFirstNameEmpty = false;
        }
        if (isFirstNameEmpty) {
            if (this.state.lastName.length === 0) {
                return false;
            }
            return true;
        }
        return true;
    }

    onSubmit() {
        if (this.isNameValid()) {
            this.props.updateContact({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phone,
            });
            this.setState({
                fireRedirect: true,
            });
        } else {
            console.log("Both first and last name may not be empty");
        }
    }

    componentDidMount() {
        let contactDetail = null;
        this.props.list.map(contact => {
            if (String(contact.id) === String(this.props.match.params.contactId)) {
                contactDetail = contact;
            }
            return null;
        });
        this.setState({
            firstName: contactDetail.firstName,
            lastName: contactDetail.lastName,
            phone: contactDetail.phone,
            address: contactDetail.address,
        });
    }


    render() {
        // console.log(this.props.match);
        // let contactDetail = null;
        // this.props.list.map(contact => {
        //     console.log(contact);
        //     if (contact.id === parseInt(this.props.match.params.contactId, 10)) {
        //         contactDetail = contact;
        //     }
        // });
        let detailUrl = "/contact/" + this.props.match.params.contactId;
        return (
            <Row>
                <Col></Col>
                <Col>
                    <p>Edit Detail</p>
                    <Form>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input 
                                type="text"
                                id="firstName"
                                value={this.state.firstName}
                                onChange={(e)=>this.onFirstNameChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                value={this.state.lastName}
                                onChange={(e) => this.onLastNameChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                type="text"
                                id="phone"
                                value={this.state.phone}
                                onChange={(e) => this.onPhoneChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                value={this.state.address}
                                onChange={(e) => this.onAddressChange(e)}
                            />
                        </FormGroup>
                    </Form>
                    <div>
                        <Link to={detailUrl}><Button>Cancel</Button></Link>
                        <Button onClick={()=>this.onSubmit()} >Submit</Button>
                        {
                            this.state.fireRedirect &&
                            <Redirect to={detailUrl} /> 
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
        updateContact: (contact) => {dispatch(action.update(contact))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);