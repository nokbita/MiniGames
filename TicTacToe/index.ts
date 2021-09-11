let stage: HTMLDivElement = document.querySelector("#stage");
let cols: HTMLCollectionOf<Element> = document.getElementsByClassName("col");
let mask: HTMLDivElement = document.querySelector("#mask");
let message: HTMLDivElement = document.querySelector("#message");
let winner: HTMLDivElement = message.querySelector("#winner");
let restart: HTMLDivElement = document.querySelector("#restart");

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

let currentPlayer: Player = Player.X;
let end: boolean = false;
let victor: Player;

for (let index: number = 0; index < cols.length; index++) {
    (<HTMLDivElement>cols.item(index))
    .addEventListener("click", clickColHandler, { once: true });
}

function clickColHandler(event: MouseEvent): void {
    let col: HTMLDivElement = event.target as HTMLDivElement;

    stage.classList.remove(currentPlayer);
    col.classList.add(currentPlayer);

    let isWinner: boolean = checkWinner(currentPlayer);
    if (isWinner) {
        showMessage(currentPlayer);
        return;
    }
    let isEnd: boolean = checkEnd();
    if (isEnd) {
        showMessage(null);
        return;
    }

    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    stage.classList.add(currentPlayer);
}

function checkWinner(currentPlayer: Player): boolean {
    let isVictory: boolean = false;

    debugger;
    odds.some(function (items: number[]): boolean {
        let isFailture: boolean = false;
        items.some(function (index: number): boolean {
            let col: HTMLDivElement = cols[index] as HTMLDivElement;
            if (!col.classList.contains(currentPlayer)) {
                isFailture = true;
                return true;
            }
        });
        if (!isFailture) {
            isVictory = true;
            return true;
        }
    });

    return isVictory;
}

function showMessage(currentPlayer: Player): void {
    if (currentPlayer === null) {
        winner.innerText = "平局 ！";
    } else {
        winner.innerText = currentPlayer.toLocaleUpperCase() + " 获胜 ！";
    }
    mask.style.display = "block";
    message.style.display = "block";
}

function checkEnd(): boolean {
    let isEnd: boolean = true;
    for (let index: number = 0; index < cols.length; index++) {
        const element: HTMLDivElement = cols[index] as HTMLDivElement;
        if(!element.classList.contains(Player.X) && !element.classList.contains(Player.O)) {
            isEnd = false;
            break;
        }
    }

    return isEnd;
}


restart.onclick = function (): void {
    location.reload();
}

