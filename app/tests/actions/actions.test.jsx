import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
var expect = require( 'expect' );

import firebase, { firebaseRef } from 'app/firebase/';
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
        var updates = {
            completed: true,
            completedAt: moment().unix()
        }
        var action = {
            type: 'UPDATE_TODO',
            id: 4,
            updates
        }
        var response = actions.updateTodo( action.id, action.updates );
        expect( response ).toEqual( action );
    })

    describe( 'Tests with firebase todos', () => {
        var testTodoRef;

        beforeEach( ( done ) => {
            var todosRef = firebaseRef.child( 'todos' );
            todosRef.remove().then( () => {
                testTodoRef = firebaseRef.child( 'todos' ).push();
                testTodoRef.set( {
                    text: 'Something to do',
                    completed: false,
                    createdAt: 12345
                })
            })
            .then( () => done() )
            .catch( done );
        })

        afterEach( ( done ) => {
            testTodoRef.remove().then( () => done() );
        })

        it( 'should toggle todo and dispatch UPDATE_TODO action', ( done ) => {
            const store = createMockStore( {} );
            const action = actions.startToggleTodo( testTodoRef.key, true );
            console.log( action );
            var promise = store.dispatch( action );
            console.log( 'In should toggle todo, promise is: ', promise );
            promise.then( () => {
                const mockActions = store.getActions();
                expect( mockActions[0] ).toInclude( {
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key,
                });
                expect( mockActions[0].updates ).toInclude( {
                    completed: true
                });
                expect( mockActions[0].updates.completedAt ).toExist();
                done();
            }, done );
        })
        
        it( 'should call startAddTodos action', ( done ) => {
            const store = createMockStore( {} );
            const action = actions.startAddTodos();
            console.log( action );
            var promise = store.dispatch( action );
            console.log( 'In should call startAddTodos, promise is: ', promise );
            promise.then( () => {
                const mockActions = store.getActions();
                expect( mockActions[0].type ).toEqual( 'ADD_TODOS' );
                expect( mockActions[0].todos.length ).toEqual( 1 );
                expect( mockActions[0].todos[0].text ).toEqual( 'Something to do' );
                done();
            }, done );
        })
        
    })
})