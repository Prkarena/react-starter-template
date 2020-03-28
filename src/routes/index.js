/**
 * Routes : returns routes of our application for routing
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
/****************** Pages ******************/
import Home from '../pages/home';
import Admin from '../pages/admin';
import Editor from '../pages/editor';
import Login from '../pages/login';
import FourOFour from '../pages/404';
import Auth from '../components/hoc/auth';
import SignUp from '../pages/signup';
import Layout from '../components/hoc/layout';

const Routes = (props) => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Layout {...props}>
                <Switch>
                    <Auth path="/admin" component={Admin} />
                    <Auth path="/editor" component={Editor} />
                    <Route path="/" exact component={Home} />
                    <Route component={FourOFour} />
                </Switch>
            </Layout>
        </Switch>
    )
}

export default Routes;