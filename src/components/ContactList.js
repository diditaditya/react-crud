import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import Contact from './Contact';
import '../'

class ContactList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.list.map(item => {
                        let searchString = this.props.searchString.toLowerCase();
                        if (/^[?]/.test(searchString)) {
                            return <Contact item={item} key={item.id} />
                        } else {
                            let pattern = RegExp(searchString);
                            if (pattern.test(`${item.firstName} ${item.lastName}`.toLowerCase())) {
                                return <Contact item={item} key={item.id} />
                            }
                        }
                    })
                }
            </div>
        );
    }
}

export default ContactList;