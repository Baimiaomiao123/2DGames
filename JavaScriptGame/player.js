import {Falling, Jumping, Rolling, Running, Sitting, Diving, Hit} from "./playerStates.js";
import {CollisionAnimation} from "./collisionAnimation.js";
import {FloatingMessages} from "./floatingMessages.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('player');
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;

        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.vy = 0;
        this.weight = 1;

        this.speed = 0;
        this.maxSpeed = 10;

        this.states = [new Sitting(this.game), new Running(this.game),
                    new Jumping(this.game), new Falling(this.game),
                    new Rolling(this.game), new Diving(this.game),
                    new Hit(this.game),];
        this.currentState = null;
    }

    update(input, deltaTime){
        this.checkCollisions();
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.x += this.maxSpeed;
        else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.x -= this.maxSpeed;
        else this.speed = 0;

        // x-axis boundary detection
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // horizontal boundaries

        // vertical movement
        // if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // vertical boundaries
        //if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.height;

        // sprite animation
        // if (this.frameX < this.maxFrame) this.frameX ++;
        // else this.frameX = 0;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollisions() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                // collision detected
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessages('+1', enemy.x, enemy.y, 150, 100))
                } else {
                    this.setState(6, 0);
                    this.game.score -= 5;
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}