import firebase, { firebaseRef } from 'app/firebase/';
import moment from 'moment';

export var setSearchText = ( searchText ) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    }
}

export var addTodo = ( todo ) => {
    return {
        type: 'ADD_TODO',
        todo
    }
}

export var startAddTodo = ( text ) => {
    return ( dispatch, getState ) => {
        var todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        var todoRef = firebaseRef.child( 'todos' ).push( todo );
        return todoRef.then( () => {
            dispatch( addTodo( {
                ...todo,
                id: todoRef.key
            }));
        });
    };
}

export var addTodos = ( todos ) => {
    console.log( 'addTodos:', todos );
    return {
        type: 'ADD_TODOS',
        todos
    }
}

export var startAddTodos = () => {
    return ( dispatch, getState ) => {
        console.log( 'in startAddTodos()' );
        var todoRef = firebaseRef.child( 'todos' ).once( 'value' ).then( (snapshot) => {
            console.log( 'todoRef is', todoRef );
            var todosObj = snapshot.val() || {};
            var todos = [];
            var ids = Object.keys( todos );
            Object.keys( todosObj ).map( ( key ) => {
                var todo = todosObj[key];
                todo.id = key;
                todos.push( todo );
            });
            console.log( 'Todos in startAddTodos:', todos );
            var addTodosAction = addTodos( todos );
            console.log( 'addTodosAction: ', addTodosAction );
            var dispatchAction = dispatch( addTodosAction );
            console.log( 'dispatchAction:', dispatchAction );
            return dispatchAction;
        });
    }
}

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    }
}

export var updateTodo = ( id, updates ) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    }
}

export var startToggleTodo = ( id, completed ) => {
    return ( dispatch, getState ) => {
        var todoRef = firebaseRef.child( `todos/${id}` );
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update( updates ).then( () => {
            dispatch( updateTodo( id, updates ) );
        })
    }
}