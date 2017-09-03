import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class AddTodo extends React.Component {
    onFormSubmit( e ) {
        e.preventDefault();
        var { dispatch } = this.props;
        var giftAmount = this.refs.giftAmount.value;
        var recipientName = this.refs.recipientName.value;
        if ( recipientName && recipientName.trim().length > 0 ) {
            this.refs.recipientName.value = '';
            dispatch( actions.startAddTodo( recipientName ));
        } else {
            this.refs.recipientName.focus();
        }
        if ( giftAmount && giftAmount.trim().length > 0 ) {
            this.refs.giftAmount.value = '';
            dispatch( actions.startAddTodo( giftAmount ));
        } else {
            this.refs.giftAmount.focus();
        }
    }
    render() {
        return( 
            <div className="container__footer">
                <form ref="form" onSubmit={ this.onFormSubmit.bind( this ) } className="addtodo">
                    <div>
                        <input type="text" placeholder="Enter the amount of the gift certificate" ref="giftAmount"/>
                        <input type="text" placeholder="Recipient's name" ref="recipientName"/>
                    </div>
                    <div>
                        <button className="button expanded">Add Gift Certificate</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect() ( AddTodo );