import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import OCOnlineApp from 'OCOnlineApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = ( nextState, replace, next ) => {
    if ( !firebase.auth().currentUser ) {
        replace( '/' );
    }
    next();
}

var redirectIfLoggedIn = ( nextState, replace, next ) => {
    if ( firebase.auth().currentUser ) {
        replace( '/orders' );
    }
    next();
}

export default (
    <Router history={hashHistory}>
        <Route path="/">>
            <IndexRoute component={ Login } onEnter={ redirectIfLoggedIn }/>
            <Route path="orders" component={ OCOnlineApp } onEnter = { requireLogin }/>
        </Route>
    </Router>
);