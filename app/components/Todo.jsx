var React = require( 'react' );
var moment = require( 'moment' );

var Todo= React.createClass({
    render: function () {
        var {id, text, createdAt, completedAt, completed} = this.props;
        var renderDate = () => {
            var message = completed ? 'Completed ' : 'Created ';
            var timestamp = completed ? completedAt : createdAt;
            return message + moment.unix( timestamp ).format( 'MMM Do YYYY @ h:mm A' );
        };
        return (
            <div onClick={() => {
                this.props.onToggle( id );
            }}>
                <input type="checkbox" checked={completed}/>
                <p>{text} </p>
                <p>{renderDate()}</p>
            </div>
        )
    }
});

module.exports = Todo;