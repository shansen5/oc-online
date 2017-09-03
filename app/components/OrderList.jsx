import React from 'react';
import { connect } from 'react-redux';
import Order from 'Order';
import OrderApi from 'OrderApi';

export class OrderList extends React.Component {
    render() {
        var { orders, showCompleted, searchText } = this.props;
        var renderOrders = () => {
            if ( orders.length === 0 ) {
                return (
                    <p className="container__message">Nothing to do</p>
                )
            }
            return OrderApi.filterOrders( orders, showCompleted, searchText ).map( (order) => {
                return (
                    // ... is spread function.  Each attribute of order is passed
                    // as a property with the key's name.
                    <Order key={order.id} {...order}/>
                )
            })
        }
        return (
            <div>
                {renderOrders()}
            </div>
        )
    }
}

export default connect( 
    ( state ) => {
        return state;
    }
)( OrderList );