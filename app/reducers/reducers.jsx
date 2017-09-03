var uuid = require( 'node-uuid' );
var moment = require( 'moment' );

export var searchTextReducer = ( state = '', action ) => {
    switch( action.type ) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
}

export var showCompletedReducer = ( state = false, action ) => {
    switch( action.type ) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
}

export var orderReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'ADD_ORDER':
            return [
                ...state,
                action.order
            ]
        case 'ADD_ORDERS':
            return [
                ...state,
                ...action.orders
            ]
        case 'UPDATE_ORDER':
            return state.map( ( order ) => {
                if ( order.id === action.id ) {
                    return {
                        ...order,
                        ...action.updates
                    }
                } else {
                    return order;
                }
            });
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export var authReducer = ( state = {}, action ) => {
    switch( action.type ) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        default:
            return state;
    }
}