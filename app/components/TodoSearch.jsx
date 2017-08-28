import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TodoSearch extends React.Component {
    onSearchChange() {
        var searchText = this.refs.searchText.value;
        this.props.dispatch( actions.setSearchText( searchText ));
    }
    onCompletedChange() {
        this.props.dispatch( actions.toggleShowCompleted() );
    }
    render() {
        var { dispatch, showCompleted, searchText } = this.props;
        return (
            <div className="container__header">
                <div>
                    <input type="search" ref="searchText" placeholder="Search todos"
                            value={ searchText } onChange={ this.onSearchChange.bind( this ) }/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" 
                                checked={showCompleted} onChange={ this.onCompletedChange.bind( this ) }/>
                        Show completed todos
                    </label>
                </div>
            </div>
        )
    }
}

export default connect( 
    ( state ) => {
        return {
            showCompleted: state.showCompleted,
            searchText: state.searchText
        }
    }
) ( TodoSearch );