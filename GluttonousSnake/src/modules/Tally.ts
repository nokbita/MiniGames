class Tally {
    private score: HTMLElement;
    private level: HTMLElement;

    private _speed: number;
    private _speedGradient: number;
    private _maxSpeed: number;
    private _levelGradient: number;
    private _victoryScore: number;
    
    constructor(speed: number, speedGradient: number, maxSpeed: number, levelGradient: number, victoryScore: number) {
        this.score = document.getElementById("score")!;
        this.level = document.getElementById("level")!;

        this._speed = speed;
        this._speedGradient = speedGradient;
        this._maxSpeed = maxSpeed;
        this._levelGradient = levelGradient;
        this._victoryScore = victoryScore;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get speedGradient(): number {
        return this._speedGradient;
    }

    set speedGradient(value: number) {
        this._speedGradient = value;
    }

    get maxSpeed(): number {
        return this._maxSpeed;
    }

    set maxSpeed(value: number) {
        this._maxSpeed = value;
    }

    get levelGradient(): number {
        return this._levelGradient;
    }

    set levelGradient(value: number) {
        this._levelGradient = value;
    }

    get victoryScore(): number {
        return this._victoryScore;
    }

    set victoryScore(value: number) {
        this._victoryScore = value;
    }

    getScore() {
        return Number.parseInt(this.score.innerText);
    }
    addScore() {
        this.score.innerText = this.getScore() + 1 + "";
    }

    getLevel() {
        return Number.parseInt(this.level.innerText);
    }
    addLevel() {
        this.level.innerText = this.getLevel() + 1 + "";
    }

    makeAchievements() {
        this.addScore();

        if (this.getScore() % this._levelGradient === 0) {
            this.addLevel();
            if (this._speed > this._maxSpeed) {
                this._speed -= this._speedGradient;
            }
        }
    }
}

export default Tally;