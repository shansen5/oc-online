var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Route, Router, IndexRoute, hashHistory } = require( 'react-router' );
var actions = require( 'actions' );
var store = require( 'configureStore' ).configure();

var TodoApp = require( 'TodoApp' );

store.subscribe( () => {
    console.log( 'New State', store.getState() );
})

store.dispatch( actions.addTodo( 'Clean the yard' ));
store.dispatch( actions.setSearchText( 'yard' ));
store.dispatch( actions.toggleShowCompleted() );

// Load foundation
require( 'style!css!sass!foundation-sites/dist/foundation.min.css');
$(document).foundation();

require( 'style!css!sass!applicationStyles' );

ReactDOM.render( 
    <div>
        <TodoApp/>
    </div>,
    document.getElementById( "app" )
);
