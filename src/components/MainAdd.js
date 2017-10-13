import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { 
    Form,
    FormGroup,
    Input, 
    Button } from 'reactstrap';

import action from '../store/action';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            fireRedirect: false,
        };
    }

    generateNewId() {
        let ids = this.props.list.map(contact => {
            return parseInt(contact.id, 10);
        });
        return Math.max(...ids) + 1;
    }

    resetState() {
        this.setState({
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
        });
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
            this.props.addContact({
                id: this.generateNewId(),
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phone,
            });
            this.resetState();
            this.setState({
                fireRedirect: true,
            });
        } else {
            console.log("Both first and last name may not be empty");
        }
    }

    render() {
        return (
            <div>
                <h4>Add New Contact</h4>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="First name"
                            value={this.state.firstName}
                            onChange={(e) => this.onFirstNameChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="Last name"
                            value={this.state.lastName}
                            onChange={(e) => this.onLastNameChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="Address"
                            value={this.state.address}
                            onChange={(e) => this.onAddressChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="Phone"
                            value={this.state.phone}
                            onChange={(e) => this.onPhoneChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => this.onSubmit()} >Submit</Button>
                        {this.state.fireRedirect &&
                            <Redirect to="/" />
                        }
                        <Link to="/"><Button>Cancel</Button></Link>
                    </FormGroup>
                </Form>                
            </div>
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
        addContact: (contact) => { dispatch(action.add(contact)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);