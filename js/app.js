// Enemies our player must avoid
var score = 0;
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<505){
        this.x = this.x+(150*dt);
    }else{
    this.x = -90;
    this.y = yPos[Math.floor(Math.random()*3)];
    }

    if(this.x < player.x + 30 && this.x > player.x - 60 && this.y < player.y + 60 && this.y > player.y - 40){
        document.getElementById("score").innerHTML = 0;
        score = 0;
        player = new Player(200,320);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function (dt) {
    if(player.y < 20){
        score++;
        if(score>9){
            alert("Congrats!!! You have won!!!!!");
            score=0;
        }
        document.getElementById("score").innerHTML=score;
        this.reset();
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput=function(e){
    switch(e){
    case 'left': if(this.x > 0){ this.x -= 100; break;}else{break;}
    case 'up': if(this.y > 3){ this.y -= 100; break;}else{break;}
    case 'right': if(this.x < 400){ this.x += 100; break;}else{break;}
    case 'down':  if(this.y < 400){ this.y += 100; break;}else{break;}
    }
}

Player.prototype.reset = function(){
    player = new Player(200,320);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Math.floor(Math.random(-900,-90)) , yPos[Math.random(0,2)])
var allEnemies = [];
var yPos = [50,150,230];
var enemy;
for (var i = 0; i<6; i++){
    enemy = new Enemy(Math.random(-900,-90)*-900, yPos[Math.floor(Math.random()*3)]);
    allEnemies.push(enemy)
}
var player = new Player(200,320);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
