import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Contact from './Contact';
import '../style/styles.css';

class ContactList extends Component {
    render() {
        if (this.props.list.length > 0) {
            return (
                <div>
                    {
                        this.props.list.map(item => {
                            let searchString = this.props.searchString.toLowerCase();
                            if (/^[?*)(+[\]\\]/.test(searchString)) {
                                return <Contact item={item} key={item.id} />
                            } else {
                                let pattern = RegExp(searchString);
                                if (pattern.test(`${item.firstName} ${item.lastName}`.toLowerCase())) {
                                    return <Contact item={item} key={item.id} />
                                }
                            }
                            return null;
                        })
                    }
                </div>
            );
        }
        return (
            <p className="message" >No Contact Found, Please <Link to="/add" >Add New Contact</Link></p>
        );
    }
}

export default ContactList;