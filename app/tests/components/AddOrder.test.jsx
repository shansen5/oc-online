var expect = require( 'expect' );
var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var TestUtils = require( 'react-addons-test-utils' );
var $ = require( 'jquery' );

var { AddOrder } = require( 'AddOrder' );

import * as actions from 'actions';

describe( 'AddOrder', () => {
    it( 'should exist', () => {
        expect( AddOrder ).toExist();
    });

    it( 'should dispatch ADD_ORDER when valid order amount', () => {
        var giftAmount = 150.0;
        var action = actions.startAddOrder( giftAmount );
        var spy = expect.createSpy();
        var addOrder = TestUtils.renderIntoDocument(
            <AddOrder dispatch={spy}/> );
        var $el = $( ReactDOM.findDOMNode( addOrder ));
        addOrder.refs.giftAmount.value = giftAmount;
        TestUtils.Simulate.submit( $el.find( 'form' )[0] );
        expect( spy ).toHaveBeenCalledWith( action );
    });

    it( 'should not dispatch ADD_ORDER if blank amount entered', () => {
        var spy = expect.createSpy();
        var addOrder = TestUtils.renderIntoDocument(
            <AddOrder dispatch={spy}/> );
        var $el = $( ReactDOM.findDOMNode( addOrder ));
        addOrder.refs.giftAmount.value = '   ';
        TestUtils.Simulate.submit( $el.find( 'form' )[0] );
        expect( spy ).toNotHaveBeenCalled();
    });
});