import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import ContactList from './ContactList';
import '../'

class MainList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            list: null,
            isZA: false,
        };
    }

    componentWillMount() {
        this.sortAllName();
    }

    sortAllName() {
        let sorted;
        if (!this.state.isZA) {
            sorted = this.props.list.sort((a, b) => {
                return `${a.firstName}${a.lastName}`.localeCompare(`${b.firstName}${b.lastName}`) > 0;
            });
            
        } else {
            sorted = this.props.list.sort((a, b) => {
                return `${a.firstName}${a.lastName}`.localeCompare(`${b.firstName}${b.lastName}`) < 0;
            })
        }
        this.setState({
            list: sorted,
        });
    }

    toggleSort() {
        this.setState({
            isZA: !this.state.isZA,
        }, ()=> {
            this.sortAllName();
        });
    }

    sortByFirstName(list) {
        return list.sort((a,b) => {
            return a.firstName.localeCompare(b.firstName);
        })
    }

    showSortButton() {
        if (!this.state.isZA) {
            return <p onClick={() => this.toggleSort()}>Sort Z-A</p>
        } else {
            return <p onClick={() => this.toggleSort()}>Sort A-Z</p>
        }
    }

    onSearchChange(event) {
        this.setState({
            searchString: event.target.value,
        });
    }

    render() {
        // let sorted = this.sortAllName(this.props.list);
        return (
            <div>
                <Row>
                    <Col/>
                    <Col>
                        <h3>Contact List</h3>
                        <InputGroup>
                            <InputGroupAddon>Search</InputGroupAddon>
                            <Input value={this.state.searchString} onChange={(e)=>{this.onSearchChange(e)}} />
                        </InputGroup>
                        {this.showSortButton()}
                        <ContactList list={this.state.list} searchString={this.state.searchString}/>
                    </Col>
                    <Col/>
                </Row>
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