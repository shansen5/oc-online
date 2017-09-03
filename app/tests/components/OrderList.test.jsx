var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require( 'react-redux' );
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import { configure } from 'configureStore';
import ConnectedOrderList, { OrderList } from 'OrderList';
import ConnectedOrder, { Order } from 'Order';

describe('OrderList', () => {
    it('should exist', () => {
        expect(OrderList).toExist();
    });

    it('should render one Order component for each order item', () => {
        var orders = [{
            id: 1,
            text: 'Do something',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        },
        {
            id:2,
            text: 'Check mail',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }];
        var store = configure( { 
            orders
        });
        var provider = TestUtils.renderIntoDocument( 
            <Provider store={store}>
                <ConnectedOrderList/>
            </Provider>
        );
        var orderList = TestUtils.scryRenderedComponentsWithType( provider, ConnectedOrderList )[0];
        var ordersComponents = TestUtils.scryRenderedComponentsWithType( orderList, ConnectedOrder );
        expect( ordersComponents.length ).toBe( orders.length );
    });

    it('should render empty message if no orders', () => {
        var orders = [];
        var orderList = TestUtils.renderIntoDocument(<OrderList orders={orders}/>);
        var $el = $( ReactDOM.findDOMNode( orderList ));
        expect( $el.find( '.container__message' ).length ).toBe( 1 );
    });
});