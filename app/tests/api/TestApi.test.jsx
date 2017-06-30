var expect = require( 'expect' );
var TestUtils = require( 'react-addons-test-utils' );

var TodoApi = require( 'TodoApi' );

describe( 'TodoApi', () => {
    beforeEach( () => {
        localStorage.removeItem( 'todos' );
    });

    it( 'should exist', () => {
        expect( TodoApi ).toExist();
    });

    describe( 'setTodos', () => {
        it( 'should set valid todos array', () => {
            var todos = [{
                id: 23,
                text: 'Test all files',
                completed: false
            }];
            TodoApi.setTodos( todos );
            var actualTodos = JSON.parse( localStorage.getItem( 'todos' ));
            expect( actualTodos ).toEqual( todos );
        });
        it( 'should not set an invalid array', () => {
            TodoApi.setTodos( TodoApi );
            var actualTodos = JSON.parse( localStorage.getItem( 'todos' ));
            expect( actualTodos ).toNotExist();
        });
    });

    describe( 'getTodos', () => {
        it( 'should return empty array for invalid data', () => {
            var actualTodos = TodoApi.getTodos();
            expect( actualTodos ).toEqual( [] );
        });
        it( 'should return valid todos for valid data', () => {
            var todos = [{
                id: 23,
                text: 'Test all files',
                completed: false
            }];
            localStorage.setItem( 'todos', JSON.stringify( todos ));
            expect( TodoApi.getTodos() ).toEqual( todos );
        });
    });
})