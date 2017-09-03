var $ = require( 'jquery' );

module.exports = {
    // setOrders: function ( orders ) {
    //     if ( $.isArray( orders )) {
    //         localStorage.setItem( 'orders', JSON.stringify( orders ));
    //         return orders;
    //     }
    // },
    // getOrders: function () {
    //     var stringOrders = localStorage.getItem( 'orders' );
    //     var orders = [];
    //     try {
    //         orders = JSON.parse( stringOrders );
    //     } catch (e) {
    //         console.log( 'JSON.parse() failed: ', e );
    //     }
    //     return $.isArray( orders ) ? orders : [];
    // },
    filterOrders: function ( orders, showCompleted, searchText ) {
        var filteredOrders = orders;

        // Filter by showCompleted
        filteredOrders = filteredOrders.filter( ( order ) => {
            return !order.completed || showCompleted;
        });

        // Filter by searchText
        if ( searchText.length > 0 ) {
            filteredOrders = filteredOrders.filter( ( order ) => {
                return order.text.toLowerCase().indexOf( searchText.toLowerCase() ) >= 0;
            });
        }

        // Sort orders by completed
        filteredOrders.sort( ( a, b ) => {
            if ( !a.completed && b.completed ) {
                return -1;
            } else if ( a.completed && !b.completed ) {
                return 1;
            } else if ( a.createdAt < b.createdAt ) {
                return -1;
            } else {
                return 1;
            }
        });
        return filteredOrders;
    }
}