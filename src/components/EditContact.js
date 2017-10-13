import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button, Input, Form, FormGroup, Label } from 'reactstrap';

import action from '../store/action';

import '../style/styles.css';

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
            message: '',
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

    isPhoneValid() {
        if (this.state.phone.match(/^[0-9]*$/)) {
            return true;
        }
        return false;
    }

    onSubmit() {
        if (this.isNameValid()) {
            if (this.isPhoneValid()) {
                this.props.updateContact({
                    id: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phone: this.state.phone,
                });
                this.setState({
                    fireRedirect: true,
                    message: '',
                });
            } else {
                this.setState({
                    message: "Phone can only consist of numbers",
                });
            }
        } else {
            this.setState({
                message: "Both first and last name may not be empty",
            });
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
        let detailUrl = "/contact/" + this.props.match.params.contactId;
        return (
            <Row>
                <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                <Col xs="10" sm="8" md="6" lg="4" xl="4" >
                    <h3 className="page-title" >Edit Detail</h3>
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
                        <FormGroup>
                            <div className="button-container" >
                                <Link to={detailUrl}><Button className="button">Cancel</Button></Link>
                                <Button onClick={() => this.onSubmit()} className="button">Submit</Button>
                                {
                                    this.state.fireRedirect &&
                                    <Redirect to={detailUrl} />
                                }
                            </div>
                        </FormGroup>
                    </Form>
                    <p className="message" >{this.state.message}</p>
                </Col>
                <Col xs="1" sm="2" md="3" lg="4" xl="4" />
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