export class InputHandler {
    constructor(game) {
        this.keys = [];
        this.game = game;

        window.addEventListener('keydown', (e) => {
            // Check if the pressed key is an arrow key or the Enter key
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }

            // Toggle debug mode
            else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }

            // Handle the logic for pressing the Enter key
            else if (e.key === 'Enter') {
                // If the game is over, pressing the Enter key will reset the game.
                if (this.game.gameOver) {
                    this.game.reset();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            // Remove the arrow keys or Enter key from the keys array when they are released.
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}