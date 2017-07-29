var expect = require( 'expect' );
var df = require( 'deep-freeze-strict' );
var reducers = require( 'reducers' );

describe( 'Reducers', () => {
    describe( 'searchTextReducer', () => {
        it( 'should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            }
            var response = reducers.searchTextReducer( df( '' ), df( action ));
            expect( response ).toEqual( action.searchText );
        })
    })
    describe( 'showCompletedReducer', () => {
        it( 'should negate the current showCompleted value', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            }
            var response = reducers.showCompletedReducer( df( true ), df( action ));
            expect( response ).toBe( false );
            response = reducers.showCompletedReducer( df( false ), df( action ));
            expect( response ).toBe( true );
        })
    })
    describe( 'todoReducer', () => {
        var todoData = [{
            id: 11,
            text: 'Test features 11',
            completed: true,
            createdAt: 100,
            completedAt: 1000
        },
        {
            id: 2,
            text: 'Test features 2',
            completed: false,
            createdAt: 0,
            completedAt: undefined
        }]
        it( 'should add the todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'Ride my bike',
                    completed: false,
                    createdAt: 1234567
                }
            }
            var state = {
                showCompleted: false,
                searchText: '',
                todos: []
            }
            var response = reducers.todoReducer( df( state ), df( action ));
            expect( response.length ).toBe( 1 );
            expect( response[0] ).toEqual( action.todo );
        })
        it( 'should add existing todos', () => {
            var action = {
                type: 'ADD_TODOS',
                todos: todoData
            }
            var state = {
                showCompleted: false,
                searchText: '',
                todos: []
            }
            var response = reducers.todoReducer( df( state ), df( action ));
            expect( response.length ).toBe( 2 );
            expect( response[0] ).toBe( todoData[0] );
        })
        it( 'should toggle the todo completed state from false to true', () => {
            var action = {
                type: 'TOGGLE_TODO',
                id: 2
            }
            var response = reducers.todoReducer( df( todoData ), df( action ) );
            console.log( response );
            expect( response[0].completed ).toBe( true );
            expect( response[1].completed ).toBe( true );
            expect( response[1].completedAt ).toBeA( 'number' );
        })
        it( 'should toggle the todo completed state from true to false', () => {
            var action = {
                type: 'TOGGLE_TODO',
                id: 11
            }
            var response = reducers.todoReducer( df( todoData ), df( action ) );
            console.log( response );
            expect( response[0].completed ).toBe( false );
            expect( response[1].completed ).toBe( false );
        })
    })
})