import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
var expect = require( 'expect' );

import firebase, { firebaseRef } from 'app/firebase/';
var actions = require( 'actions' );

var createMockStore = configureMockStore( [thunk] );

describe( 'Actions', () => {
    it( 'should generate login action', () => {
        var action = {
            type: 'LOGIN',
            uid: '12345'
        }
        var response = actions.login( action.uid );
        expect ( response ).toEqual( action );
    });

    it( 'should generate logout action', () => {
        var action = {
            type: 'LOGOUT'
        }
        var response = actions.logout();
        expect ( response ).toEqual( action );
    });

    it( 'should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        }
        var response = actions.setSearchText( action.searchText );
        expect ( response ).toEqual( action );
    })

    it( 'should generate add order action', () => {
        var action = {
            type: 'ADD_ORDER',
            order: {
                id: 'abc123',
                text: 'Something to do',
                completed: false,
                createdAt: 222222
            } 
        }
        var response = actions.addOrder( action.order );
        expect( response ).toEqual( action );
    })

    })
    it( 'should generate a toggle show completed action', () => {
        var action = { 
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        var response = actions.toggleShowCompleted();
        expect( response ).toEqual( action );``
    })

    it( 'should generate an action to toggle the order', () => {
        var updates = {
            completed: true,
            completedAt: moment().unix()
        }
        var action = {
            type: 'UPDATE_ORDER',
            id: 4,
            updates
        }
        var response = actions.updateOrder( action.id, action.updates );
        expect( response ).toEqual( action );
    })

    describe( 'Tests with firebase orders', () => {
        var testOrderRef;
        var uid;
        var ordersRef;

        beforeEach( ( done ) => {
            firebase.auth().signInAnonymously().then( ( user ) => {
                uid = user.uid;
                ordersRef = firebaseRef.child( `users/${uid}/orders` );
                return ordersRef.remove();
            }).then( () => {
                testOrderRef = ordersRef.push();
                testOrderRef.set( {
                    text: 'Something to do',
                    completed: false,
                    createdAt: 12345
                });
            }).then( () => done() )
            .catch( done );
        })

        afterEach( ( done ) => {
            testOrderRef.remove().then( () => done() );
        })

        it( 'should toggle order and dispatch UPDATE_ORDER action', ( done ) => {
            const store = createMockStore( { auth: { uid }} );
            const action = actions.startToggleOrder( testOrderRef.key, true );
            console.log( 'In should toggle order, action is: ', action );
            var promise = store.dispatch( action );
            console.log( 'In should toggle order, promise is: ', promise );
            promise.then( () => {
                const mockActions = store.getActions();
                expect( mockActions[0] ).toInclude( {
                    type: 'UPDATE_ORDER',
                    id: testOrderRef.key,
                });
                expect( mockActions[0].updates ).toInclude( {
                    completed: true
                });
                expect( mockActions[0].updates.completedAt ).toExist();
                done();
            }, done );
        })
        
        it('should populate orders and dispatch ADD_ORDERS', (done) => {
            const store = createMockStore( { auth: { uid }} );
            const action = actions.startAddOrders();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_ORDERS');
                expect(mockActions[0].orders.length).toEqual(1);
                expect(mockActions[0].orders[0].text).toEqual('Something to do');

                done();
            }, done)
        });

        it ( 'should generate add orders action object', () => {
            var orders = [{
                id: '111',
                text: 'anything',
                completed: false,
                completedAt: undefined,
                createdAt: 33333
            }];
            var action = {
                type: 'ADD_ORDERS',
                orders
            }
            var response = actions.addOrders( orders );
            expect( response ).toEqual( action );
        });


})