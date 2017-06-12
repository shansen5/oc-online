var React = require( 'react' );
var Todo = require( 'Todo' );

var TodoList = React.createClass({
    render: function () {
        var {todos} = this.props;
        var renderTodos = () => {
            return todos.map( (todo) => {
                return (
                    // ... is spread function.  Each attribute of todo is passed
                    // as a property with the key's name.
                    <Todo key={todo.id} {...todo}/>
                )
            })
        }
        return (
            <div>
                {renderTodos()}
            </div>
        )
    }
});

module.exports = TodoList;