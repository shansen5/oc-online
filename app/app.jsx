var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Provider } = require( 'react-redux' );
var { hashHistory } = require( 'react-router' );

// var Main = require( 'Main' );
var actions = require( 'actions' );
var store = require( 'configureStore' ).configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

firebase.auth().onAuthStateChanged(( user ) => {
    if ( user ) {
        store.dispatch( actions.login( user.uid ));
        store.dispatch( actions.startAddTodos() );
        hashHistory.push( '/todos' );
    } else {
        store.dispatch( actions.logout());
        hashHistory.push( '/' );
    }
})

// store.subscribe( () => {
//     var state = store.getState();
//     console.log( 'New State', state );
//     TodoApi.setTodos( state.todos );
// });

// var initialTodos = TodoApi.getTodos();
// store.dispatch( actions.addTodos( initialTodos ));

// store.dispatch( actions.addTodo( 'Clean the yard' ));
// store.dispatch( actions.setSearchText( 'yard' ));
// store.dispatch( actions.toggleShowCompleted() );

// Load foundation
$(document).foundation();

require( 'style!css!sass!applicationStyles' );


ReactDOM.render( 
    <Provider store={ store }>
        { router }
    </Provider>,
    document.getElementById( "app" )
);
