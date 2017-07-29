var expect = require( 'expect' );
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var actions = require( 'actions' );

var createMockStore = configureMockStore( [thunk] );

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
            todo: {
                id: 'abc123',
                text: 'Something to do',
                completed: false,
                createdAt: 222222
            } 
        }
        var response = actions.addTodo( action.todo );
        expect( response ).toEqual( action );
    })

    it( 'should create todo and dispatch addTodo', ( done ) => {
        const store = createMockStore( {} );
        const todoText = 'Read a book';

        store.dispatch( actions.startAddTodo( todoText )).then( () => {
            const actions = store.getActions();
            expect( actions[0] ).toInclude( {
                type: 'ADD_TODO'
            });
            expect( actions[0].todo ).toInclude( {
                text: todoText
            });
            done();
        }).catch( done );
    });

    it ( 'should generate add todos action object', () => {
        var todos = [{
            id: '111',
            text: 'anything',
            completed: false,
            completedAt: undefined,
            createdAt: 33333
        }];
        var action = {
            type: 'ADD_TODOS',
            todos
        }
        var response = actions.addTodos( todos );
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