var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import { OrderSearch }  from 'OrderSearch';
var Order = require( 'Order' );

describe('OrderSearch', () => {
    it('should exist', () => {
        expect(OrderSearch).toExist();
    });

    it('should dispatch SET_SEARCH_TEXT on input change', () => {
        var searchText = 'Dog';
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText
        }
        var spy = expect.createSpy();
        var orderSearch = TestUtils.renderIntoDocument( <OrderSearch dispatch={spy}/> ); 
        orderSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change( orderSearch.refs.searchText );
        expect( spy ).toHaveBeenCalledWith( action );
    });

    it( 'should dispatch TOGGLE_SHOW_COMPLETED with proper checked value', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        var spy = expect.createSpy();
        var orderSearch = TestUtils.renderIntoDocument( <OrderSearch dispatch={spy}/> ); 
        orderSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change( orderSearch.refs.showCompleted );
        expect( spy ).toHaveBeenCalledWith( action );
    });
});