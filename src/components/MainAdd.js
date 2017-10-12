import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Form, 
    Input, 
    Button } from 'reactstrap';

class MainAdd extends Component {
    render() {
        return (
            <div>
                <p>Main Add Page</p>
                <Form>
                    <Input type="text" placeholder="First name" />
                    <Input type="text" placeholder="Last name" />
                    <Input type="text" placeholder="Address" />
                    <Input type="text" placeholder="Phone" />
                    <Button>Submit</Button>
                    <Link to="/"><Button>Cancel</Button></Link>
                </Form>                
            </div>
        )
    }
}

export default MainAdd;