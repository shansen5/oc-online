var expect = require( 'expect' );
var TestUtils = require( 'react-addons-test-utils' );

var OrderApi = require( 'OrderApi' );

describe( 'OrderApi', () => {
    beforeEach( () => {
        localStorage.removeItem( 'orders' );
    });

    it( 'should exist', () => {
        expect( OrderApi ).toExist();
    });

    describe( 'filterOrders', () => {
        var orders = [{
            id: 1,
            text: 'Test order 1',
            completed: true
        }, {
            id: 2,
            text: 'Test order 2',
            completed: false
        }, {
            id: 3,
            text: 'another test order 3',
            completed: true
        } ];
        it( 'should return all items if showCompleted is true', () => {
            var filteredOrders = OrderApi.filterOrders( orders, true, '' );
            expect( filteredOrders.length ).toBe( 3 );
        });
        it( 'should return only uncompleted orders if showCompleted is false', () => {
            var filteredOrders = OrderApi.filterOrders( orders, false, '' );
            var uncompletedOrders = [ orders[1] ];
            expect( filteredOrders ).toEqual( uncompletedOrders );
        });
        it( 'should sort by completed status and alphabetical', () => {
            var filteredOrders = OrderApi.filterOrders( orders, true, '' );
            expect( filteredOrders[0].id ).toBe( 2 );
            expect( filteredOrders[1].id ).toBe( 3 );
        });
        it( 'should only show orders that match search', () => {
            var filteredOrders = OrderApi.filterOrders( orders, true, 'ANOTHER' );
            expect( filteredOrders[0].id ).toBe( 3 );
        });
        it( 'should return all orders if searchText empty', () => {
            var filteredOrders = OrderApi.filterOrders( orders, true, '' );
            expect( filteredOrders.length ).toBe( 3 );
        });
    });
})