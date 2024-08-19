const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// control of the speed of background(global layer speed)
let gameSpeed = 5;
let gameFrame = 4;


const backgroundLayer1 = new Image();
backgroundLayer1.src = 'backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'backgroundLayers/layer-5.png';


window.addEventListener('load', () => {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e){
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    })

    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 2400; // the whole width of the layer is 2400 pixels
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            // control of speed of different layers
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            // require the current speed
            this.speed = gameSpeed * this.speedModifier;
            this.x = gameFrame * this.speed % this.width;
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1.0);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5];


    function animate(){
        // delete old layer
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // ctx.drawImage(backgroundLayer2, x, 0);
        // ctx.drawImage(backgroundLayer4, x2, 0);
        // if (x < -2400) x = 2400 + x2 - gameSpeed;
        // else x -= gameSpeed;
        // if (x2 < -2400) x = 2400 + x - gameSpeed;
        // else x2 -= gameSpeed;
        gameObjects.forEach(gameObject => {
            gameObject.update();
            gameObject.draw();
        })
        gameFrame--;
        requestAnimationFrame(animate);
    }
    animate();
})


