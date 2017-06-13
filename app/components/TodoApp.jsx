var React = require( 'react' );
var TodoList = require( 'TodoList' );
var AddTodo = require( 'AddTodo' );

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [
                { 
                    id: 1,
                    text: 'Walk the dog'
                },
                {
                    id: 2,
                    text: 'Clean the yard'
                },
                {
                    id: 3,
                    text: 'Take a nap'
                },
                {
                    id: 4,
                    text: 'Dust my broom'
                }
            ]
        }
    },
    handleAddTodo: function( todoText ) {
        console.log( 'handleAddTodo()', todoText );
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        )
    }
});

module.exports = TodoApp;