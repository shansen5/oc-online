var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var { Route, Router, IndexRoute, hashHistory } = require( 'react-router' );

var TodoApp = require( 'TodoApp' );

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
