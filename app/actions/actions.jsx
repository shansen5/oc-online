import firebase, { firebaseRef, githubProvider, 
    googleProvider, facebookProvider } from 'app/firebase/';
import moment from 'moment';

export var setSearchText = ( searchText ) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    }
}

export var addOrder = ( order ) => {
    return {
        type: 'ADD_ORDER',
        order
    }
}

export var startAddOrder = ( text ) => {
    return ( dispatch, getState ) => {
        var order = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        var uid = getState().auth.uid;
        var orderRef = firebaseRef.child( `users/${uid}/orders` ).push( order );
        return orderRef.then( () => {
            dispatch( addOrder( {
                ...order,
                id: orderRef.key
            }));
        });
    };
}

export var addOrders = ( orders ) => {
    return {
        type: 'ADD_ORDERS',
        orders
    }
}

export var startAddOrders = () => {
    return ( dispatch, getState ) => {
        var uid = getState().auth.uid;
        var ordersRef = firebaseRef.child( `users/${uid}/orders` );
        return ordersRef.once( 'value' ).then(( snapshot ) => {
            var orders = snapshot.val() || {};
            var parsedOrders = [];
            Object.keys( orders ).forEach(( orderId ) => {
                parsedOrders.push({
                    id:orderId,
                    ...orders[ orderId ]
                })
            })
            dispatch( addOrders( parsedOrders ));
        })
    }
}

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    }
}

export var updateOrder = ( id, updates ) => {
    return {
        type: 'UPDATE_ORDER',
        id,
        updates
    }
}

export var startToggleOrder = ( id, completed ) => {
    return ( dispatch, getState ) => {
        var uid = getState().auth.uid;
        var orderRef = firebaseRef.child( `users/${uid}/orders/${id}` );
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return orderRef.update( updates ).then( () => {
            dispatch( updateOrder( id, updates ) );
        })
    }
}

export var startLogin = ( providerName ) => {
    return ( dispatch, getState ) => {
        var provider = githubProvider;
        if ( providerName === 'google' ) {
            provider = googleProvider;
        } else if ( providerName === 'facebook' ) {
            provider = facebookProvider;
        }
        return firebase.auth().signInWithPopup( provider ).then(( result ) => {
            // Success
            console.log( 'Auth worked', result );
        }, ( error ) => {
            if ( error.code === "auth/account-exists-with-different-credential" ) {
                window.alert( "Another service is registered with this email address. Try again with that service." );
            } else {
                // Error
                window.alert( error );
                console.log( 'Unable to auth', error );
            }
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
