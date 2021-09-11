import Snake from "./Snake";
import Food from "./Food";
import Tally from "./Tally";

class GameController {
    private snake: Snake;
    private food: Food;
    private tally: Tally;

    private pause: HTMLElement;
    private reload: HTMLElement;
    private isLive: boolean;
    private direction: String;

    constructor(KeyDirection: String = "", speed: number = 400, speedGradient: number = 50, maxSpeed: number = 50,
                levelGradient: number = 5, victoryScore: number = 100) {
        this.snake = new Snake();
        this.food = new Food();
        this.tally = new Tally(speed, speedGradient, maxSpeed, levelGradient, victoryScore);

        this.pause = document.getElementById("pause")!;
        this.reload = document.getElementById("reload")!;
        this.isLive = true;
        this.direction = KeyDirection;

        this.init();
    }

    private init() {
        document.addEventListener("keydown",this.keydownHandler.bind(this));
        // document.onkeydown = this.keydownHandler;
        this.reload.onclick = this.reloadOnclickHandler;
        this.run();
    }

    private keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    private reloadOnclickHandler() {
        location.reload();
    }

    private run () {
        let headX = this.snake.getHeadX();
        let headY = this.snake.getHeadY();

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                headY -= 10;
                this.pause.style.display = "none";
                this.reload.style.display = "none";
                break;
            case "ArrowRight":
            case "Right":
                headX += 10;
                this.pause.style.display = "none";
                this.reload.style.display = "none";
                break;
            case "ArrowDown":
            case "Down":
                headY += 10;
                this.pause.style.display = "none";
                this.reload.style.display = "none";
                break;
            case "ArrowLeft":
            case "Left":
                headX -= 10;
                this.pause.style.display = "none";
                this.reload.style.display = "none";
                break;
            case "":
                this.pause.style.display = "none";
                this.reload.style.display = "none";
                break;
            default:
                this.pause.style.display = "block";
                this.reload.style.display = "block";
                break;
        }

        this.snakeEatingFood(headX,headY);

        try {
            this.snake.setHeadX(headX);
            this.snake.setHeadY(headY);
        } catch (e) {
            this.pause.innerText = (e as Error).message;
            this.pause.style.display = "block";
            this.reload.style.display = "block";
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this),this.tally.speed);
    }

    private snakeEatingFood(headX: number, headY: number) {
        if (this.food.getFoodX() === headX && this.food.getFoodY() === headY) {
            this.tally.makeAchievements();
            this.snake.addBody();
            this.food.changeFoodPosition();

            if (this.tally.getScore() === this.tally.victoryScore) {
                this.pause.style.display = "block";
                this.reload.style.display = "block";
                this.pause.innerText =  + "Congratulate, " + this.tally.victoryScore + "points !";
                this.isLive = false;
            }
        }
    }
}

export default GameController;