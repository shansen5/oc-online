var React = require( 'react' );
var moment = require( 'moment' );
var { connect } = require( 'react-redux' );
var actions = require( 'actions' );

export var Todo= React.createClass({
    render: function () {
        var { id, text, createdAt, completedAt, completed, dispatch } = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var message = completed ? 'Completed ' : 'Created ';
            var timestamp = completed ? completedAt : createdAt;
            return message + moment.unix( timestamp ).format( 'MMM Do YYYY @ h:mm A' );
        };
        return (
            <div className={todoClassName} onClick={() => {
                dispatch( actions.startToggleTodo( id, !completed ));
            }}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text} </p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        )
    }
});

export default connect() ( Todo );