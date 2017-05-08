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
    //TODO: record O or X in the grid for current player
    return state;
}
//TODO: function to check for 
// row - line of the same
// columm
// diagonal


/* TESTS */
/*** Test Helpers ***/
function testRecPlayerSwitch() {
    var testState = start({})
    testState = recMove(testState);
    assertEqual(testState.currentPlayer, "O");

    testState = recMove(testState);
    assertEqual(testState.currentPlayer, "X");
}

function testHasWon() {
    var testState = {
        grid: [
            ["X", "X", "X"],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
    };
    var won = hasWon(testState);
    assertEqual(won.status, true);

    testState.grid[0] = [-1, -1, -1];
    testState.grid[1] = ["O", "O", "O"];
    won = hasWon(testState)
    assertEqual(won.status, true);

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