// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
    this.speed = Math.random(0,1);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.col = (this.col + this.speed*dt) % 5;

    this.x = this.col * 101;
    this.y = (this.row * 83 - 20);


    // for each enemy,if they're the same as a player, end of game.
    if (player.collide(this)) {
        player.loses();
    } 
}

Enemy.prototype.reset = function () {

    // row between 1 & 3
    this.row = Math.floor((Math.random()*3)+1);
    this.col = Math.floor(Math.random());
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Our Player 
var Player = function() {
    // Player starts in the same place every time.
    this.restart();
}

Player.prototype.update = function(dt) {
    // updates location, handles collision
    this.x = this.col * 101;
    this.y = this.row * 83-20;

    if (this.row == 0) {
        this.wins();
    }
    else { 
        for(var i = 0; i < allEnemies.length; i++ ) {
            if (this.collide(allEnemies[i])) {
                this.loses();
            }
        
        }

    }

}

Player.prototype.collide = function (enemy) {
    // because the bugs are moving 'continuously' as opposed to column by column
    // it's necessary to reverse-calc the actual column values.

    return ((Math.floor(enemy.row+0.5) === this.row) && (Math.floor(enemy.col + 0.5) === this.col));
}


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//
Player.prototype.handleInput = function(key) {
    // the top row = 0, bottom row = 5
    // left col = 0, right col = 4

    if (this.playing) {
        switch(key) {
            case 'left': 
                this.col = Math.max(0,this.col-1);
                break;
            case 'right':
                this.col = Math.min(5,this.col+1);
                break;
            case 'up':
                this.row = Math.max(0,this.row-1);
                break;
            case 'down':
                this.row = Math.min(4,this.row+1);
                break;
        }
    }

    if ((key === 'enter') && (!this.playing)) {
        this.restart();
    }
}
Player.prototype.restart = function() {
    this.row = 5;
    this.col = 2;
    this.sprite = 'images/char-girl.png';
    this.playing = true;

}
Player.prototype.loses = function() {
    // make it a rock until the return key is pressed to reset
    this.sprite = 'images/Rock.png';
    this.playing = false;

}
Player.prototype.wins = function() {
    // make it a Star until the return key is pressed to reset
    this.sprite = 'images/Star.png';
    this.playing = false;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
