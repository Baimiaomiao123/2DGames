import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {Background} from "./background.js";
import {ClimbingEnemy, FlyingEnemy, GroundEnemy} from "./enemies.js";
import {UI} from "./ui.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 500;



    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 85;

            this.speed = 0;
            this.maxSpeed = 5;

            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.particles = [];
            this.maxParticles = 50;

            this.collisions = [];
            this.floatingMessages = [];

            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

            this.debug = false;

            this.score = 0;
            this.winningScore = 40;
            this.fontColor = 'black';
            this.UI = new UI(this);
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;

            this.player.currentState = this.player.states[0]; // initial state
            this.player.currentState.enter();

        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;

            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            //handleMessages
            this.floatingMessages.forEach(message => {
                message.update();
            });

            // handleParticles
            this.particles.forEach((particle, index) => {
                particle.update();
            })
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // handleCollision
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        //reset the game
        reset() {
            console.log("Game is resetting...");
            this.groundMargin = 85;
            this.speed = 0;
            this.maxSpeed = 5;

            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.particles = [];
            this.maxParticles = 50;

            this.collisions = [];
            this.floatingMessages = [];

            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

            this.debug = false;

            this.score = 0;
            this.winningScore = 40;
            this.fontColor = 'black';
            this.UI = new UI(this);
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;

            this.player.currentState = this.player.states[0]; // Reset to initial state
            this.player.currentState.enter();

            requestAnimationFrame(animate)
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
})