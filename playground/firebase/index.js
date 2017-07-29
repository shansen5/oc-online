import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAf7uPL8gZs9V2EwYwJqYAaLx2SirjZ3hQ",
    authDomain: "hansen-todo-app.firebaseapp.com",
    databaseURL: "https://hansen-todo-app.firebaseio.com",
    projectId: "hansen-todo-app",
    storageBucket: "hansen-todo-app.appspot.com",
    messagingSenderId: "870517433865"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
firebaseRef.set( { 
    app: {
        name: 'Todo App',
        version: '0.1'
    },
    isRunning: true,
    user: {
        name: 'Steve',
        age: 65
    }
});

// firebaseRef.child( 'app' ).set( {
//     name: 'Todo Application'
// }).then( () => {
//     console.log( 'Success' );
// }, (e) => {
//     console.log( 'Failed' );
// });
 
// firebaseRef.child( 'user' ).set( {
//     name: 'Andrew'
// });

/*
firebaseRef.update({
    isRunning: false,
    'app/name': 'Todo Application',
    'user/name': 'Karen Sheldon'
}).then( () => {
    console.log( 'Update worked' );
}, (e) => {
    console.log( 'Failed' );
});

firebaseRef.child('app').update({
    version: '0.2.1'
});

firebaseRef.child( 'user/age' ).remove();

firebaseRef.once( 'value' ).then( ( snapshot ) => {
    console.log( 'Entire database:', snapshot.val() );
},
(e) => {
    console.log( 'Unable to fetch value', e );
});

firebaseRef.child( 'app' ).once( 'value' ).then( ( snapshot ) => {
    console.log( 'app object: ', snapshot.key, snapshot.val() );
},
(e) => {
    console.log( 'Unable to fetch value', e );
});

firebaseRef.on( 'value', ( snapshot ) => {
    console.log( 'Got value', snapshot.val() );
});

firebaseRef.update({
    isRunning: true
});

firebaseRef.off();

firebaseRef.update({
    isRunning: false
});

var logData = ( snapshot ) => {
    console.log( 'logData', snapshot.val() );
};

firebaseRef.child( 'user' ).on( 'value', logData ); 

firebaseRef.child( 'user' ).update({
    name: 'Edwin'
});

firebaseRef.child( 'app' ).update({
    version: '1.1.1'
});

firebaseRef.child( 'user' ).off();

firebaseRef.child( 'user' ).update({
    name: 'Janewin'
});

var todosRef = firebaseRef.child( 'todos' );
todosRef.on( 'child_added', ( snapshot ) => {
    console.log( 'child_added', snapshot.key, snapshot.val() );
});
todosRef.on( 'child_changed', ( snapshot ) => {
    console.log( 'child_changed', snapshot.key, snapshot.val() );
});
todosRef.on( 'child_removed', ( snapshot ) => {
    console.log( 'child_removed', snapshot.key, snapshot.val() );
});

var todoRef = todosRef.push({
    text: 'Meditate'
});

todosRef.update( todoRef.val ).update( {
    text: 'Play the guitar'
});
*/