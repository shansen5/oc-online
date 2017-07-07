var expect = require( 'expect' );
var actions = require( 'actions' );

describe( 'Actions', () => {
    it( 'should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        }
        var response = actions.setSearchText( action.searchText );
        expect ( response ).toEqual( action );
    })

    it( 'should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            text: 'Something to do'
        }
        var response = actions.addTodo( action.text );
        expect( response ).toEqual( action );
    })

    it( 'should generate a toggle show completed action', () => {
        var action = { 
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        var response = actions.toggleShowCompleted();
        expect( response ).toEqual( action );``
    })

    it( 'should generate an action to toggle the todo', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 4
        }
        var response = actions.toggleTodo( action.id );
        expect( response ).toEqual( action );
    })
})