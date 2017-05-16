/* 
this will keep each player's score
*/
var playerX = 'X';
var playerO = 'O';

var state = {}
var initialCellValue = undefined;

function start(state) {
    state.currentPlayer = playerX;
    state.grid = [
        [initialCellValue, initialCellValue, initialCellValue],
        [initialCellValue, initialCellValue, initialCellValue],
        [initialCellValue, initialCellValue, initialCellValue]
    ];
    return state;

}

function recMove(state, row, column) {
    state.grid[row][column] = state.currentPlayer;
    if (state.currentPlayer === playerO) {
        state.currentPlayer = playerX;
    } else {
        state.currentPlayer = playerO;
    }

    return state;
}


function displayPlayer(state) {
    for (var i = 0; i > state.grid.length; i++);
    if (state.grid[i][i] === playerX) {
        $('.tile').text(playerX);
    } else (console.log("do nothing"))
}





function hasWon(state) {
    var status = false;
    var player = undefined;
    var wonIndex = [];
    state.grid.forEach(function (row, rowIndex) {
        var firstCell = row[0];
        if (firstCell !== initialCellValue) {
            var rowExludingFirst = row.slice(1);
            var rowWin = rowExludingFirst.every(function (e) { return e === firstCell });
            if (rowWin) {
                status = true;
                player = firstCell;
                row.forEach(function (cell, cellIndex) {
                    wonIndex.push([rowIndex, cellIndex])
                })
            }
        }
    })
    return {
        status: status,
        player: player,
        wonIndex: wonIndex
    }
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
    if (cell === initialCellValue) cell = "";
    var wonClass = "";
    var won = hasWon(state).wonIndex.find(function (wi) {
        return wi[0] === parentIndex && wi[1] === index
    })
    if (won !== undefined) {
        wonClass = "won";

    }
    return '<td id=' + parentIndex + '-' + index + ' class="tile ' + wonClass + '">' + cell + '</td>'
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
    // displayPlayer(state)
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
            [initialCellValue, initialCellValue, initialCellValue],
            [initialCellValue, initialCellValue, initialCellValue],
        ]

    };
    var won = hasWon(testState);
    assertEqual(won.status, true);
    assertEqual(won.player, "X");
    assertEqual(won.wonIndex.length, 3);
    assertEqual(won.wonIndex[0][0], 0);

    testState.grid[0] = [initialCellValue, initialCellValue, initialCellValue];
    testState.grid[1] = ["O", "O", "O"];

    won = hasWon(testState)
    assertEqual(won.status, true);
    assertEqual(won.player, "O");
    assertEqual(won.wonIndex.length, 3);
    assertEqual(won.wonIndex[0][0], 1);
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
    testHasWon();
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