import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item';

class MainList extends Component {
    render() {
        return (
            <div>
                <h3>Main List</h3>
                {
                    this.props.list.map(item => {
                        return <Item item={item} key={item.id}/>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
    }
}

export default connect(mapStateToProps, null)(MainList);