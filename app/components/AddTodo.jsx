import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class AddTodo extends React.Component {
    onFormSubmit( e ) {
        e.preventDefault();
        var { dispatch } = this.props;
        var todoText = this.refs.todoText.value;
        if ( todoText && todoText.trim().length > 0 ) {
            this.refs.todoText.value = '';
            dispatch( actions.startAddTodo( todoText ));
        } else {
            this.refs.todoText.focus();
        }
    }
    render() {
        return( 
            <div className="container__footer">
                <form ref="form" onSubmit={ this.onFormSubmit.bind( this ) } className="addtodo">
                    <div>
                        <input type="text" placeholder="Enter something you need to do" ref="todoText"/>
                    </div>
                    <div>
                        <button className="button expanded">Add Todo</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect() ( AddTodo );