/** @type{HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 100;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy4.png';

        this.speed = Math.random() * 4 + 1;

        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * canvas.width;
        this.newY = Math.random() * canvas.height;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);


        /*this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 1.5 + 0.5;
        // this.curveAmplitude = Math.random() * 200 + 50;*/

        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update(){
        /*this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI/90) + (canvas.width / 2 - this.width / 2);
        this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI/270) + (canvas.height / 2 - this.height / 2);*/

        /* this.x -= this.speed;
        this.y += this.curveAmplitude * Math.sin(this.angle); */

        // this.angle += this.angleSpeed;

        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/70;
        this.y -= dy/70;

        if (this.x + this.width < 0 ) this.x = canvas.width;
        //this.y += Math.random() * 10 - 5;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// create enemy object
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate()