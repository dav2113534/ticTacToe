/* 
this will keep each player's score
*/
var player1 = 'X';
var player2 = 'O';


function start(state) {
    state.currentPlayer = 'X';
    state.grid = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
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

function hasWon(state){
    var won = [
        /* Horizontal */ 
        [0,1,2],
        [3,4,5],
        [6,7,8],
        /* Vertical */ 
        [0,3,6],
        [1,4,7],
        [2,5,8],
        /* Diagonally */ 
        [0,4,8],
        [2,4,6]
    ]
    
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

function testHasWon() {
    var testState = {
        grid: [
            ["X", "X", "X"],
            [-1, -1, -1],
            [-1, -1, -1],
            {
            }
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