var React = require( 'react' );
var Todo = require( 'Todo' );

var TodoList = React.createClass({
    render: function () {
        var {todos} = this.props;
        var renderTodos = () => {
            if ( todos.length === 0 ) {
                return (
                    <p className="container__message">Nothing to do</p>
                )
            }
            return todos.map( (todo) => {
                return (
                    // ... is spread function.  Each attribute of todo is passed
                    // as a property with the key's name.
                    <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
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