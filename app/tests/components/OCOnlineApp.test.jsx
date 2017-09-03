var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require( 'react-redux' );
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var configureStore = require( 'configureStore' );
import OrderList from 'OrderList'
// Use the unconnected version of OCOnlineApp for testing.
import {OCOnlineApp} from 'OCOnlineApp';

describe('OCOnlineApp', () => {
    it('should exist', () => {
        expect(OCOnlineApp).toExist();
    });

    it( 'should render OrderList', () => {
        var store = configureStore.configure();
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <OCOnlineApp/>
            </Provider>
        )

        var oconlineApp = TestUtils.scryRenderedComponentsWithType( provider, OCOnlineApp )[0];
        var orderList = TestUtils.scryRenderedComponentsWithType( oconlineApp, OrderList );
        expect( orderList.length ).toBe( 1 );
    })
});