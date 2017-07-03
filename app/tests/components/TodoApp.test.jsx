var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it( 'should add todo to the todos state on handleAddTodo', () => {
        var todoText = 'text text';
        var todoApp = TestUtils.renderIntoDocument( <TodoApp/> );
        todoApp.setState( {todos: []} );
        todoApp.handleAddTodo( todoText );
        expect( todoApp.state.todos[0].text ).toBe( todoText );
        expect( todoApp.state.todos[0].createdAt ).toBeA( 'number' );
        expect( todoApp.state.todos[0].completedAt ).toNotExist();
    });

    it( 'should toggle completed value to true when handleToggle called', () => {
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: false,
            createdAt: 0,
            completedAt: undefined
        }
        var todoApp = TestUtils.renderIntoDocument( <TodoApp/> );
        todoApp.setState( {todos: [todoData]} );
        expect( todoApp.state.todos[0].completed ).toBe( false );
        todoApp.handleToggle( todoData.id );
        expect( todoApp.state.todos[0].completed ).toBe( true );
        expect( todoApp.state.todos[0].completedAt ).toBeA( 'number' );
    });

    it( 'should toggle completed value to false when handleToggle called', () => {
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: true,
            createdAt: 0,
            completedAt: 1
        }
        var todoApp = TestUtils.renderIntoDocument( <TodoApp/> );
        todoApp.setState( {todos: [todoData]} );
        expect( todoApp.state.todos[0].completed ).toBe( true );
        todoApp.handleToggle( todoData.id );
        expect( todoApp.state.todos[0].completed ).toBe( false );
        expect( todoApp.state.todos[0].completedAt ).toNotExist();
    });
});