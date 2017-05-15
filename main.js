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

function recMove(state, row, column) {
    state.grid[row][column] = state.currentPlayer;
    if (state.currentPlayer === "O") {
        state.currentPlayer = "X";
       

    } else {
        state.currentPlayer = "O";
    }

    return state;
}


function displayPlayer(){
    for(var i = 0; i < state.grid.length; i++);
    if(state.grid[i][i] === state.currentPlayer){
        $('.tile').text(state.currentPlayer); 
    } else( console.log("do nothing"))
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





function render(state) {
    if (state.grid) {
        $(".board").html(state.grid.map(renderRow).join(""));
        $('.tile').click(handleTileClick);
        $('.tile').html(state.currentPlayer); 
        $('.currentPlayer').html(renderPlayer(state.currentPlayer));
        // $('tile').text(state.currentPlayer);


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
    var split = e.target.id.split('-').map(function (a) {
        return parseInt(a);
    })
    recMove(state, split[0], split[1]);
    render(state);
}

//start(this.state);
render(this.state);

/* TESTS */
/*** Test Helpers ***/
function testRecPlayerSwitch() {
    var testState = start({})
    testState = recMove(testState, 0, 0);
    assertEqual(testState.currentPlayer, "O");

    testState = recMove(testState, 0, 0);
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
    var testState = start({});
    var currentPlayer = testState.currentPlayer;

    recMove(testState, 0, 0);

    assertEqual(testState.grid[0][0], currentPlayer);
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
    testRecMoveSaving();
    // testHasWon(); 
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