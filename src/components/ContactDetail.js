import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

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
            <div>
                <Row>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                    <Col xs="10" sm="8" md="6" lg="4" xl="4">
                        <h3 className="page-title" >Contact Detail</h3>
                        <div>
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
                            <Button onClick={() => this.onDelete()} className="button">Delete</Button>
                            {
                                this.state.fireRedirect &&
                                <Redirect to="/" />
                            }
                        </div>
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
        deleteContact: (contactId) => {dispatch(action.delete(contactId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);