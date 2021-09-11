var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var odds = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var stage = document.querySelector("#stage");
var cols = document.querySelectorAll(".col");
var tipPanel = document.querySelector("#tip-panel");
var winner = tipPanel.querySelector("#tip-panel > p");
var restart = document.querySelector("#tip-panel > button");
var currentPlayer;
var steps;
init();
restart.onclick = init;
function init() {
    tipPanel.style.display = "none";
    stage.classList.remove(Player.X, Player.O);
    steps = 0;
    currentPlayer = Player.X;
    stage.classList.add(currentPlayer);
    cols.forEach(function (item) {
        var col = item;
        col.classList.remove(Player.X, Player.O);
        col.removeEventListener("click", clickColHandler);
        col.addEventListener("click", clickColHandler, { once: true });
    });
}
function clickColHandler(event) {
    var col = event.target;
    col.classList.add(currentPlayer);
    steps++;
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        showTipPanel(currentPlayer);
        return;
    }
    if (steps >= 9) {
        showTipPanel(null);
        return;
    }
    stage.classList.remove(currentPlayer);
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    stage.classList.add(currentPlayer);
}
function checkWin(currentPlayer) {
    return odds.some(function (items) {
        var notWin = items.some(function (index) {
            var col = cols[index];
            if (!col.classList.contains(currentPlayer)) {
                return true;
            }
        });
        if (!notWin) {
            return true;
        }
    });
}
function showTipPanel(currentPlayer) {
    if (currentPlayer === null) {
        winner.innerText = "平局!";
    }
    else {
        winner.innerText = currentPlayer.toLocaleUpperCase() + " 获胜!";
    }
    tipPanel.style.display = "block";
}
