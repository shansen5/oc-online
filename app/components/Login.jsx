import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({
    onLogin( provider ) {
        var { dispatch } = this.props;

        dispatch( actions.startLogin( provider ) );
    },
    render() {
        return (
            <div>
                <h1 className="page-title">Todo App</h1>

                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <h3>Login</h3>
                            <button className="button" onClick={ () => this.onLogin( 'google' ) }>Login with Google</button>
                            <br/>
                            <button className="button" onClick={ () => this.onLogin( 'github' ) }>Login with GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Redux.connect()( Login );