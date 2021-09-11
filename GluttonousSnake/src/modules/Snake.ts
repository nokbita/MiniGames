class Snake {
    private snakeElement: HTMLElement = document.getElementById("snake")!;
    private headElement: HTMLElement = this.snakeElement.querySelector("div")!;
    private bodyElements: HTMLCollectionOf<HTMLDivElement> = this.snakeElement.getElementsByTagName("div");

    getHeadX() {
        return this.headElement.offsetLeft;
    }
    getHeadY() {
        return this.headElement.offsetTop;
    }

    setHeadX(x: number) {
        if (this.getHeadX() === x) {
            return;
        }

        if (x < 0 || x > 290) {
            throw new Error("GAME OVER !");
        }

        // this.bodyElements[1] !== undefined 可以简写为 this.bodyElements[1]
        if (this.bodyElements[1] !== undefined && this.bodyElements[1].offsetLeft === x) {
            if (this.getHeadX() > x) {
                x += 20;
            } else {
                x -= 20;
            }
        }

        this.moveBody();
        this.headElement.style.left = x + "px";
        this.hitOneself();
    }
    setHeadY(y: number) {
        if (this.getHeadY() === y) {
            return;
        }

        if (y < 0 || y > 290) {
            throw new Error("GAME OVER !");
        }

        if (this.bodyElements[1] && this.bodyElements[1].offsetTop === y) {
            if (this.getHeadY() > y) {
                y += 20;
            } else {
                y -= 20;
            }
        }

        this.moveBody();
        this.headElement.style.top = y + "px";
        this.hitOneself();
    }

    addBody() {
        this.snakeElement.insertAdjacentHTML("beforeend","<div></div>");
        console.log("蛇身长度：" + this.bodyElements.length);

    }

    moveBody() {
        for (let i = this.bodyElements.length - 1; i > 0; i--) {
            let last = <HTMLElement>this.bodyElements.item(i);
            let lastSecond = <HTMLElement>this.bodyElements.item(i - 1);
            last.style.left = lastSecond.offsetLeft + "px";
            last.style.top = lastSecond.offsetTop + "px";
        }
    }

    hitOneself() {
        for (let i = 1; i < this.bodyElements.length; i++) {
            let body = this.bodyElements[i];
            if (this.getHeadX() === body.offsetLeft && this.getHeadY() === body.offsetTop) {
                throw new Error("Hit yourself，GAME OVER !");
            }
        }
    }

}

export default Snake;