var React = require( 'react' );

var AddTodo = React.createClass( {
    onFormSubmit: function (e) {
        e.preventDefault();
        var todoText = this.refs.todoText.value;
        if ( todoText && todoText.trim().length > 0 ) {
            this.props.onAddTodo( todoText );
            this.refs.todoText.value = '';
        } else {
            this.refs.todoText.focus();
        }
    },
    render: function () {
        return( 
            <div className="container__footer">
                <form ref="form" onSubmit={this.onFormSubmit} className="addtodo">
                    <div>
                        <input type="text" placeholder="Enter something you need to do" ref="todoText"/>
                    </div>
                    <div>
                        <button className="button expanded">Add Todo</button>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = AddTodo;