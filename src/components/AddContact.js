import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { 
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button } from 'reactstrap';

import action from '../store/action';

import '../style/styles.css';
import defaultImage from '../assests/images/anonymous-icon.jpg';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            fireRedirect: false,
            message: '',
            imageUrl: defaultImage,
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
            message: '',
            imageUrl: '',
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

    onImageChange(event) {
        let file = document.getElementById('picFile').files[0];
        if (/image/.test(file.type)) {
            let reader = new FileReader();
            reader.onload = (event) => {
                this.setState({
                    imageUrl: reader.result,
                    message: "",
                });
            }
            reader.readAsDataURL(file);
        } else {
            this.setState({
                imageUrl: defaultImage,
                message: "The file must be image (jpg/png) file"
            });
        }
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
                this.props.addContact({
                    id: this.generateNewId(),
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phone: this.state.phone,
                    imageUrl: this.state.imageUrl,
                });
                this.resetState();
                this.setState({
                    fireRedirect: true,
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

    render() {
        return (
            <div>
                <Row>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                    <Col xs="10" sm="8" md="6" lg="4" xl="4">
                        <h3 className="page-title" >Add New Contact</h3>
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
                                    placeholder="Phone"
                                    value={this.state.phone}
                                    onChange={(e) => this.onPhoneChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={(e) => this.onAddressChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <p>Add Profile Picture</p>
                                <img src={this.state.imageUrl} className="preview" alt="profile" />
                                <Input 
                                    type="file"
                                    id="picFile"
                                    onChange={(e)=>this.onImageChange(e)} 
                                />
                            </FormGroup>
                            <FormGroup>
                                <div className="button-container" >
                                    <Button onClick={() => this.onSubmit()} className="button">Submit</Button>
                                    {this.state.fireRedirect &&
                                        <Redirect to="/" />
                                    }
                                    <Link to="/"><Button className="button">Cancel</Button></Link>
                                </div>
                            </FormGroup>
                        </Form>
                        <p className="message" >{this.state.message}</p>
                    </Col>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                </Row>
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