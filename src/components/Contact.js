import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import '../style/styles.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailIsShown: false,
        }
    }

    toggleShowDetail() {
        this.setState({
            detailIsShown: !this.state.detailIsShown,
        });
    }

    render() {
        let url = "/contact/" + this.props.item.id;
        return (
            <Link to={url} >
                <Row className="contact-container" >
                    <Col xs="3" >
                        <img src={this.props.item.imageUrl} className="contact-profpic" alt="profile" />
                    </Col>
                    <Col>
                        <p className="contact-name" >{this.props.item.firstName} {this.props.item.lastName}</p>
                    </Col>
                </Row>
            </Link>
        )
    }
}

export default Item;