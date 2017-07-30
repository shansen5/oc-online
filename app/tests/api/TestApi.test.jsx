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

    // describe( 'setTodos', () => {
    //     it( 'should set valid todos array', () => {
    //         var todos = [{
    //             id: 23,
    //             text: 'Test all files',
    //             completed: false
    //         }];
    //         TodoApi.setTodos( todos );
    //         var actualTodos = JSON.parse( localStorage.getItem( 'todos' ));
    //         expect( actualTodos ).toEqual( todos );
    //     });
    //     it( 'should not set an invalid array', () => {
    //         TodoApi.setTodos( TodoApi );
    //         var actualTodos = JSON.parse( localStorage.getItem( 'todos' ));
    //         expect( actualTodos ).toNotExist();
    //     });
    // });

    // describe( 'getTodos', () => {
    //     it( 'should return empty array for invalid data', () => {
    //         var actualTodos = TodoApi.getTodos();
    //         expect( actualTodos ).toEqual( [] );
    //     });
    //     it( 'should return valid todos for valid data', () => {
    //         var todos = [{
    //             id: 23,
    //             text: 'Test all files',
    //             completed: false
    //         }];
    //         localStorage.setItem( 'todos', JSON.stringify( todos ));
    //         expect( TodoApi.getTodos() ).toEqual( todos );
    //     });
    // });

    describe( 'filterTodos', () => {
        var todos = [{
            id: 1,
            text: 'Test todo 1',
            completed: true
        }, {
            id: 2,
            text: 'Test todo 2',
            completed: false
        }, {
            id: 3,
            text: 'another test todo 3',
            completed: true
        } ];
        it( 'should return all items if showCompleted is true', () => {
            var filteredTodos = TodoApi.filterTodos( todos, true, '' );
            expect( filteredTodos.length ).toBe( 3 );
        });
        it( 'should return only uncompleted todos if showCompleted is false', () => {
            var filteredTodos = TodoApi.filterTodos( todos, false, '' );
            var uncompletedTodos = [ todos[1] ];
            expect( filteredTodos ).toEqual( uncompletedTodos );
        });
        it( 'should sort by completed status and alphabetical', () => {
            var filteredTodos = TodoApi.filterTodos( todos, true, '' );
            expect( filteredTodos[0].id ).toBe( 2 );
            expect( filteredTodos[1].id ).toBe( 3 );
        });
        it( 'should only show todos that match search', () => {
            var filteredTodos = TodoApi.filterTodos( todos, true, 'ANOTHER' );
            expect( filteredTodos[0].id ).toBe( 3 );
        });
        it( 'should return all todos if searchText empty', () => {
            var filteredTodos = TodoApi.filterTodos( todos, true, '' );
            expect( filteredTodos.length ).toBe( 3 );
        });
    });
})