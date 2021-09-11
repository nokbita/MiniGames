class Food {
    private food: HTMLElement = document.getElementById("food")!;

    getFoodX() {
        return this.food.offsetLeft;
    }
    getFoodY() {
        return this.food.offsetTop;
    }

    private setFoodX(x: number) {
        if (this.getFoodX() === x || x < 0 || x > 290) {
            return;
        }

        this.food.style.left = x + "px";
    }
    private setFoodY(y: number) {
        if (this.getFoodY() === y || y < 0 || y > 290) {
            return;
        }

        this.food.style.top = y + "px";
    }

    changeFoodPosition() {
        let x = Math.round(Math.random() * 29) * 10;
        let y = Math.round(Math.random() * 29) * 10;
        this.setFoodX(x);
        this.setFoodY(y);
    }
}

export default Food;