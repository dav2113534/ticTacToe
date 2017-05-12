/* 
this will keep each player's score
*/
var player1 = 'X';
var player2 = 'O';

var state = {}

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


function hasWon(state) {
    var won = [
        /* Horizontal */
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        /* Vertical */
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        /* Diagonally */
        [0, 4, 8],
        [2, 4, 6]
    ]
    if (state.grid === won) {
        alert(state.currentPlayer + " Has Won!")
    } else {
        alert("We Have a Draw")
    }

}

//Saves player1 position 
function savePlayer1Pos(state){
    var player1Pos=[];
    for(var i = 0; i < state.grid.length; i++)
    if(player1 === state.grid[i]){
        player1Pos.push(i);
    }
return player1Pos;
}




function render(state) {
    if (state.grid) {
        $(".board").html(state.grid.map(renderRow).join(""));
        $('.tile').click(handleTileClick);
        $('.currentPlayer').html(renderPlayer(state.currentPlayer));
    }

    $(".startButton").click(handleStart);

}

function renderCell(parentIndex, cell, index) {
    return '<td id=' + parentIndex + '-' + index + ' class="tile"></td>'
}

function renderCellForRow(parentIndex) {
    return function (cell, index) {
        return renderCell(parentIndex, cell, index);
    }
}

function renderRow(row, index) {
    return "<tr>" + row.map(renderCellForRow(index)).join("") + "</tr>"
}

function renderPlayer(player) {
    return "Current player is " + player;
}

function handleStart(e) {
    start(state);
    render(state);
}

function handleTileClick(e) {
    recMove(state);
    render(state);
}

//start(this.state);
render(this.state);

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
                currentPlayer: ""
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