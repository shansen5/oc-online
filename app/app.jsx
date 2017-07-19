var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Provider } = require( 'react-redux' );
var { Route, Router, IndexRoute, hashHistory } = require( 'react-router' );

var TodoApp = require( 'TodoApp' );
var actions = require( 'actions' );
var store = require( 'configureStore' ).configure();
var TodoApi = require( 'TodoApi' );

store.subscribe( () => {
    var state = store.getState();
    console.log( 'New State', state );
    TodoApi.setTodos( state.todos );
});

var initialTodos = TodoApi.getTodos();
store.dispatch( actions.addTodos( initialTodos ));

// store.dispatch( actions.addTodo( 'Clean the yard' ));
// store.dispatch( actions.setSearchText( 'yard' ));
// store.dispatch( actions.toggleShowCompleted() );

// Load foundation
$(document).foundation();

require( 'style!css!sass!applicationStyles' );

ReactDOM.render( 
    <Provider store={ store }>
        <TodoApp/>
    </Provider>,
    document.getElementById( "app" )
);
