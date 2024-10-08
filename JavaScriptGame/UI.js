export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // time
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 20 + 25 * i, 95, 25, 25);
        }
        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2+ 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore) {
                context.fillText('Boo-yah', this.game.width / 2, this.game.height / 2 - 20);
                context.font = this.fontSize * 0.8+ 'px ' + this.fontFamily;
                context.fillText('What are creatures of the night afraid of? YOU!!!', this.game.width / 2, this.game.height / 2 + 20);
            } else {
                context.fillText('Love at first bite?', this.game.width / 2, this.game.height / 2 - 20);
                context.font = this.fontSize * 0.8+ 'px ' + this.fontFamily;
                context.fillText('Nope. Better luck next time!', this.game.width / 2, this.game.height / 2 + 20);
                context.fillText('If you wanna try more, please pressing the Enter to reset the game!', this.game.width / 2, this.game.height / 2 + 60);
            }
        }
        context.restore();
    }
}