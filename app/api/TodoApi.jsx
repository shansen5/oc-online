var $ = require( 'jquery' );

module.exports = {
    setTodos: function ( todos ) {
        if ( $.isArray( todos )) {
            localStorage.setItem( 'todos', JSON.stringify( todos ));
            return todos;
        }
    },
    getTodos: function () {
        var stringTodos = localStorage.getItem( 'todos' );
        var todos = [];
        try {
            todos = JSON.parse( stringTodos );
        } catch (e) {
            console.log( 'JSON.parse() failed: ', e );
        }
        return $.isArray( todos ) ? todos : [];
    },
    filterTodos: function ( todos, showCompleted, searchText ) {
        var filteredTodos = todos;

        // Filter by showCompleted
        filteredTodos = filteredTodos.filter( ( todo ) => {
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        if ( searchText.length > 0 ) {
            filteredTodos = filteredTodos.filter( ( todo ) => {
                return todo.text.toLowerCase().indexOf( searchText.toLowerCase() ) >= 0;
            });
        }

        // Sort todos by completed
        filteredTodos.sort( ( a, b ) => {
            if ( !a.completed && b.completed ) {
                return -1;
            } else if ( a.completed && !b.completed ) {
                return 1;
            } else {
                return a.text.localeCompare( b.text );
            }
        });
        return filteredTodos;
    }
}