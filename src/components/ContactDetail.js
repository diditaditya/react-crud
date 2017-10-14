import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { 
    Row, 
    Col, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter } from 'reactstrap';

import action from '../store/action';

import '../style/styles.css';

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
            modal: false,
        }
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    deleteContact() {
        this.props.deleteContact(parseInt(this.props.match.params.contactId, 10));
        this.setState({
            fireRedirect: true,
        });
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
                            imageUrl: contact.imageUrl,
                        });
                    }
                    return null;
                });
            }
        }
    }

    render() {
        if (this.props.list) {
            if (this.props.list.findIndex((el) => { return String(el.id) === this.props.match.params.contactId }) === -1) {
                return <Redirect to="/" />
            }
        }   
        let contactDetail = this.state;
        let editUrl = "/contact/" + this.props.match.params.contactId + "/edit";
        return (
            <div>
                <Row>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                    <Col xs="10" sm="8" md="6" lg="4" xl="4">
                        <h3 className="page-title" >Contact Detail</h3>
                        <div>
                            <div className="detail-profpic" >
                                <img src={contactDetail.imageUrl} className="preview" alt="profile" />
                            </div>
                            <Row>
                                <Col>
                                    <p className="detail-key" >First Name :</p>
                                </Col>
                                <Col>
                                    <p>{contactDetail.firstName}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="detail-key" >Last Name :</p>
                                </Col>
                                <Col>
                                    <p>{contactDetail.lastName}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="detail-key" >Phone :</p>
                                </Col>
                                <Col>
                                    <p>{contactDetail.phone}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="detail-key" >Address :</p>
                                </Col>
                                <Col>
                                    <p>{contactDetail.address}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="button-container" >
                            <Link to="/"><Button className="button">Back</Button></Link>
                            <Link to={editUrl}><Button className="button">Edit</Button></Link>
                            <Button onClick={() => this.toggleModal()} className="button">Delete</Button>
                            {
                                this.state.fireRedirect &&
                                <Redirect to="/" />
                            }
                        </div>
                    </Col>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                </Row>
                <div>
                    <Modal isOpen={this.state.modal} toggle={()=>this.toggleModal()}>
                        <ModalHeader toggle={()=>this.toggleModal()}>
                            Delete Contact?
                        </ModalHeader>
                        <ModalBody>
                            Do you want to delete {this.state.firstName} {this.state.lastName}?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={()=>this.deleteContact()} >Yes</Button>
                            <Button onClick={()=>this.toggleModal()}>No</Button>
                        </ModalFooter>
                    </Modal>
                </div>
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
        deleteContact: (contactId) => {dispatch(action.delete(contactId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);