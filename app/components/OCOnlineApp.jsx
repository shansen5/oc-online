import React from 'react';
import * as Redux from 'react-redux';

import OrderList from 'OrderList';
import AddOrder from 'AddOrder';
import OrderSearch from 'OrderSearch';
import * as actions from 'actions';

export class OCOnlineApp extends React.Component {
    onLogout( e ) {
        var { dispatch } = this.props;
        e.preventDefault();
        dispatch( actions.startLogout() );
    }
    render() {
        return (
            <div>
                <div className="page-actions">
                    <a href="#" onClick = { this.onLogout.bind( this ) }>Logout</a>
                </div>
                <h1 className="page-title">Oystercatcher Online Store</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <OrderSearch/>
                            <OrderList/>
                            <AddOrder/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Redux.connect()(OCOnlineApp);