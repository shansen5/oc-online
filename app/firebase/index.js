import firebase from 'firebase';

try {
    var config = {
        apiKey: "AIzaSyAf7uPL8gZs9V2EwYwJqYAaLx2SirjZ3hQ",
        authDomain: "hansen-todo-app.firebaseapp.com",
        databaseURL: "https://hansen-todo-app.firebaseio.com",
        projectId: "hansen-todo-app",
        storageBucket: "hansen-todo-app.appspot.com",
        messagingSenderId: "870517433865"
    };
    firebase.initializeApp(config);
} catch ( e ) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;