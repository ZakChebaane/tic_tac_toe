function gameGrid() {
    const grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const showGrid = () => grid;
    const chooseCell = (currentCell ,activePlayer) => {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
                if(grid[i][j] === parseInt(currentCell)) {
                    if (activePlayer === 1) {
                        grid[i][j] = "X";
                    } else if (activePlayer === 2) {
                        grid[i][j] = "O";
                    }
                }
            }
        }
    }
    const gameFinished = () => {
        function finishGame(condition) {
            if (condition === "draw") {
                const turnDiv = document.querySelector(".playerTurn");
                turnDiv.textContent = "It's a Draw :(";
                return;
            }
        }
        // Checks if there are 3 in a row
        // Option 1: Check all 8 different combinations, see if they match as all 'X' or all 'O'
        // Option 2: Loop through every cell, look at the cells bellow and above it if it exists
        //           and do the same for diagonal keep going till you find a matching line with all X


        // Checks if the grid is full
        let full = false;
        grid.forEach((outside) => {
            outside.forEach((inside) => {
                if (inside === "X" || inside === "O") {
                    if (full === false) {
                        full = true;
                    }
                    full = true;
                } else {
                    full = false;
                    return;
                }
            });
        });
        if (full === true) {
            finishGame("draw");
        }
    }
    return {
        showGrid,
        chooseCell,
        gameFinished
    };
}
function controlFlow() {
    const players = [
        {
            name: "Player1",
            token: 1
        },
        {
            name: "Player2",
            token: 2
        }
    ];
    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    return {
        getActivePlayer,
        switchActivePlayer
    };
}
function screenController() {
    const grid = gameGrid();
    const control = controlFlow();
    const containerDiv = document.querySelector(".container");
    const turnDiv = document.querySelector(".playerTurn");
    const getTurnDiv = () =>  turnDiv;
    const displayGrid = () => {
        containerDiv.textContent = "";
        const gridArr = grid.showGrid();
        let count = 1;
        gridArr.forEach((outsideElement) => {
            outsideElement.forEach((insideElement) => {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.dataset.position = count;
                count += 1;
                if (insideElement === "X") {
                    cell.textContent = insideElement;
                    cell.style.color = ("DD0000");
                } else if (insideElement === "O") {
                    cell.textContent = insideElement;
                    cell.style.color = ("0000DD");
                }
                containerDiv.appendChild(cell);
            });
        });
    }
    const displayTurn = () => {
        turnDiv.textContent = `${control.getActivePlayer().name}'s Turn...`;
    };
    const clickHandlerGrid = (cell) => {
        const selectedCell = cell.target.dataset.position;
        if (selectedCell == null) {
            return;
        }
        grid.chooseCell(selectedCell, control.getActivePlayer().token);
        displayGrid();
        control.switchActivePlayer();
        displayTurn();
        grid.gameFinished();
    }
    containerDiv.addEventListener("click", clickHandlerGrid);
    displayGrid();
    displayTurn();
    return {
        getTurnDiv
    }
}
screenController();
