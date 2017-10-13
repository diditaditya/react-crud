import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <Link to={url}>
                <p>{this.props.item.firstName} {this.props.item.lastName}</p>
            </Link>
        )
    }
}

export default Item;