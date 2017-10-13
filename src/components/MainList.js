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
            isAZ: true,
        };
    }

    componentWillMount() {
        this.sortAllName();
    }

    sortAllName() {
        let sorted;
        if (this.state.isAZ) {
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
            isAZ: !this.state.isAZ,
        }, () => {
            this.sortAllName();
        });
    }

    showSortButton() {
        if (this.state.isAZ) {
            return <p onClick={() => this.toggleSort()} className="sort-button">Sort Z-A</p>
        } else {
            return <p onClick={() => this.toggleSort()} className="sort-button">Sort A-Z</p>
        }
    }

    onSearchChange(event) {
        this.setState({
            searchString: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
                    <Col xs="10" sm="8" md="6" lg="4" xl="4" >
                        <h3 className="page-title" >Contact List</h3>
                        <InputGroup>
                            <InputGroupAddon>Search</InputGroupAddon>
                            <Input value={this.state.searchString} onChange={(e)=>{this.onSearchChange(e)}} />
                        </InputGroup>
                        {this.showSortButton()}
                        <ContactList list={this.state.list} searchString={this.state.searchString}/>
                    </Col>
                    <Col xs="1" sm="2" md="3" lg="4" xl="4" />
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