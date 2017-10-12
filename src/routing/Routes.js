import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainList from '../components/MainList';
import MainAdd from '../components/MainAdd';

const AppRoute = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={MainList} />
                <Route path="/add" component={MainAdd} />
            </Switch>
        </main>
    )
}

export default AppRoute;