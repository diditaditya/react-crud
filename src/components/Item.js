import React, { Component } from 'react';

import Detail from './ItemDetail';

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
        return (
            <div onClick={()=>this.toggleShowDetail()} >
                <p>{this.props.item.firstName} {this.props.item.lastName}</p>
                <Detail isDetailShown={this.state.detailIsShown} item={this.props.item} />
            </div>
        )
    }
}

export default Item;