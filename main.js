/* 
this will keep each player's score
*/
var player1 = 0;
var player2 = 0;


function start(state) {
    state.currentPlayer = 'X';
    state.grid = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    return state;

}

function recMove(state) {
    if (state.currentPlayer === "O") {
        state.currentPlayer = "X";
    } else {
        state.currentPlayer = "O";
    }
    return state;
}


/* TESTS */
/*** Test Helpers ***/
function testRecPlayerSwitch() {
    var testState = start({})
    testState = recMove(testState);
    assertEqual(testState.currentPlayer, "O");

    testState = recMove(testState);
    assertEqual(testState.currentPlayer, "X");
}

function testRecMoveSaving() {
    var testState = start({})
}

function testStart() {
    var testState = {};
    testState = start(testState);

    assertEqual(testState.currentPlayer, 'X');
    assertEqual(testState.grid.length, 3, "grid should be initialised")
}

function test() {
    testStart();
    testRecPlayerSwitch();
}

function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log("PASS");
    } else {
        if (message === undefined) {
            message = "";
        }
        console.error("FAIL:" + message, arguments.callee.caller.name, actual, expected);
    }
}

test();