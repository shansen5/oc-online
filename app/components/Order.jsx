import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class Order extends React.Component {
    onClick() {
        this.props.dispatch( actions.startToggleOrder( this.props.id, !this.props.completed ));
    }
    render() {
        var { id, text, createdAt, completedAt, completed, dispatch } = this.props;
        var orderClassName = completed ? 'order order-completed' : 'order';
        var renderDate = () => {
            var message = completed ? 'Completed ' : 'Created ';
            var timestamp = completed ? completedAt : createdAt;
            return message + moment.unix( timestamp ).format( 'MMM Do YYYY @ h:mm A' );
        };
        return (
            <div className={ orderClassName } onClick={ this.onClick.bind( this ) }>
                <div>
                    <input type="checkbox" checked={completed} onChange={ () => {} }/>
                </div>
                <div>
                    <p>{text} </p>
                    <p className="order__subtext">{renderDate()}</p>
                </div>
            </div>
        )
    }
}

export default connect() ( Order );