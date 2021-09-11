enum Player {
    X = "x",
    O = "o"
}

let odds: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let stage: HTMLDivElement = document.querySelector("#stage");
let cols: NodeListOf<Element> = document.querySelectorAll(".col");
let tipPanel: HTMLDivElement = document.querySelector("#tip-panel");
let winner: HTMLDivElement = tipPanel.querySelector("#tip-panel > p");
let restart: HTMLDivElement = document.querySelector("#tip-panel > button");

let currentPlayer: Player;
let steps: number;

init();
restart.onclick = init;

function init(): void {
    tipPanel.style.display = "none";
    stage.classList.remove(Player.X, Player.O);
    steps = 0;

    currentPlayer = Player.X;
    stage.classList.add(currentPlayer);

    cols.forEach(function (item: Element): void {
        let col: HTMLDivElement = item as HTMLDivElement;
        col.classList.remove(Player.X, Player.O);

        col.removeEventListener("click", clickColHandler);
        col.addEventListener("click", clickColHandler, { once: true });
    });
}

function clickColHandler(event: MouseEvent): void {
    let col: HTMLDivElement = event.target as HTMLDivElement;
    col.classList.add(currentPlayer);
    steps++;

    let isWin: boolean = checkWin(currentPlayer);
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

function checkWin(currentPlayer: Player): boolean {
    return odds.some(function (items: number[]): boolean {
        let notWin: boolean = items.some(function (index: number): boolean {
            let col: HTMLDivElement = cols[index] as HTMLDivElement;
            if (!col.classList.contains(currentPlayer)) {
                return true;
            }
        });

        if (!notWin) {
            return true;
        }
    });
}

function showTipPanel(currentPlayer: Player): void {
    if (currentPlayer === null) {
        winner.innerText = "平局!";
    } else {
        winner.innerText = currentPlayer.toLocaleUpperCase() + " 获胜!";
    }
    tipPanel.style.display = "block";
}
