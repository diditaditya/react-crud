import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainList from '../components/MainList';
import Add from '../components/AddContact';
import Detail from '../components/ContactDetail';
import Edit from '../components/EditContact';

const AppRoute = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={MainList} />
                <Route path="/add" component={Add} />
                <Route exact path="/contact/:contactId" component={Detail} />
                <Route path="/contact/:contactId/edit" component={Edit} />
            </Switch>
        </main>
    )
}

export default AppRoute;