function add( a, b ) {
    return a + b;
}

console.log( add( 3, 1 ));

var toAdd = [9, 5, 6];

console.log( add( ...toAdd ));

var groupA = ['Karen', 'Steve', 'Dan'];
var groupB = ['Hal', 'Mary'];
var final = [...groupB, 3, ...groupA];

console.log( final );