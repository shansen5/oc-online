var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import * as actions from 'actions';
import { Order } from 'Order';

describe('Order', () => {
    it('should exist', () => {
        expect(Order).toExist();
    });

    it( 'should dispatch UPDATE_ORDER action on click', () => {
        var orderData = {
            id: 11,
            text: 'Test features',
            completed: false
        }
        var action = actions.startToggleOrder( orderData.id, !orderData.completed );
        var spy = expect.createSpy();
        var order = TestUtils.renderIntoDocument( <Order {...orderData} dispatch={spy}/> );
        var $el = $( ReactDOM.findDOMNode( order ));
        TestUtils.Simulate.click( $el[0] );
        expect( spy ).toHaveBeenCalledWith( action );
    });
});