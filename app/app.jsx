var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Provider } = require( 'react-redux' );
var { Route, Router, IndexRoute, hashHistory } = require( 'react-router' );

// var Main = require( 'Main' );
var actions = require( 'actions' );
var store = require( 'configureStore' ).configure();
var TodoApi = require( 'TodoApi' );
import TodoApp from 'TodoApp';

import Login from 'Login';

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

store.dispatch( actions.startAddTodos() );

// Load foundation
$(document).foundation();

require( 'style!css!sass!applicationStyles' );

ReactDOM.render( 
    <Provider store={ store }>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={ Login }/>
                <Route path="todos" component={ TodoApp }/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById( "app" )
);
