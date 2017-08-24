import firebase, { firebaseRef, githubProvider, googleProvider } from 'app/firebase/';
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
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child( `users/${uid}/todos` ).push( todo );
        return todoRef.then( () => {
            dispatch( addTodo( {
                ...todo,
                id: todoRef.key
            }));
        });
    };
}

export var addTodos = ( todos ) => {
    return {
        type: 'ADD_TODOS',
        todos
    }
}

export var startAddTodos = () => {
    return ( dispatch, getState ) => {
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child( `users/${uid}/todos` ).once( 'value' ).then(( snapshot ) => {
            var todos = snapshot.val() || {};
            var parsedTodos = [];
            Object.keys( todos ).forEach(( todoId ) => {
                parsedTodos.push({
                    id:todoId,
                    ...todos[ todoId ]
                })
            })
            dispatch( addTodos( parsedTodos ));
        })
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
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child( `users/${uid}/todos/${id}` );
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update( updates ).then( () => {
            dispatch( updateTodo( id, updates ) );
        })
    }
}

export var startLogin = ( providerName ) => {
    return ( dispatch, getState ) => {
        var provider = githubProvider;
        if ( providerName === 'google' ) {
            provider = googleProvider;
        }
        return firebase.auth().signInWithPopup( provider ).then(( result ) => {
            // Success
            console.log( 'Auth worked', result );
        }, ( error ) => {
            // Error
            window.alert( error );
            console.log( 'Unable to auth', error );
        })
    }
}

export var startLogout = () => {
    return ( dispatch, getState ) => {
        return firebase.auth().signOut().then (() => {
            console.log( 'Logged out' );
        })
    }
}

export var login = ( uid ) => {
    return {
        type: 'LOGIN',
        uid
    }
}

export var logout = () => {
    return {
        type: 'LOGOUT'
    }
}
