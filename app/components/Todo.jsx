import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class Todo extends React.Component {
    onClick() {
        this.props.dispatch( actions.startToggleTodo( this.props.id, !this.props.completed ));
    }
    render() {
        var { id, text, createdAt, completedAt, completed, dispatch } = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var message = completed ? 'Completed ' : 'Created ';
            var timestamp = completed ? completedAt : createdAt;
            return message + moment.unix( timestamp ).format( 'MMM Do YYYY @ h:mm A' );
        };
        return (
            <div className={ todoClassName } onClick={ this.onClick.bind( this ) }>
                <div>
                    <input type="checkbox" checked={completed} onChange={ () => {} }/>
                </div>
                <div>
                    <p>{text} </p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        )
    }
}

export default connect() ( Todo );