var apple;
var myGamePiece;
var tail = [];
var L = 1;
var score = document.getElementById("score");
var N,T;

function startGame() {
    myGamePiece = new component(30, 30, "darkgreen", 30, 120);
    apple = new component(30, 30, "red");
    N = Math.floor(Math.random() * 450);
    T = Math.floor(Math.random() * 240);   
    spawnApple();
    myGameArea.start();
}

setInterval(function() {
		tail.push(new component(30, 30, "green", myGamePiece.x, myGamePiece.y));						
}, 150);

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 150);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 30;    
    this.speedY = 0;
    this.x = x;
    this.y = y; 
    this.life = 3;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
        this.border();
    }
    this.border = function() {
    		if(this.y > myGameArea.canvas.height - this.height) {
    			 this.y = myGameArea.canvas.height - this.height;
    			 die();
    		}
    		if(this.y < myGameArea.canvas.height - myGameArea.canvas.height) {
    			 this.y = myGameArea.canvas.height - myGameArea.canvas.height;
    		   die(); 
    		}
    		if(this.x < myGameArea.canvas.width - myGameArea.canvas.width) {
    				this.x = myGameArea.canvas.width - myGameArea.canvas.width;
    		   die();	
    		}
    		if(this.x > myGameArea.canvas.width - myGamePiece.width) {
    				this.x = myGameArea.canvas.width - myGamePiece.width;
    		   die();	
    		}
    }
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x+5;
    var otherright = otherobj.x + (otherobj.width-5);
    var othertop = otherobj.y+5;
    var otherbottom = otherobj.y + (otherobj.height-5);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
function spawnApple(){
apple.x = N-(N%30);
apple.y = T-(T%30);		
}
function die() {
	clearInterval(myGameArea.interval);
	tail =[];
	L = 1;
	startGame();
}

function updateGameArea() {
    myGameArea.clear();    
    if(myGamePiece.crashWith(apple)){
      N = Math.floor(Math.random() * 450);
      T = Math.floor(Math.random() * 240);  
      spawnApple();
      L += 1;
    }    
    apple.update();
    for(i=0;i < tail.length;i++){   
    if(apple.crashWith(tail[i])) {
      N = Math.floor(Math.random() * 450);
      T = Math.floor(Math.random() * 240);
    				spawnApple();
    }           
        if(tail.length > L) {
      		tail.shift();	  		
      }
      if(tail[i].life != 0) {
			tail[i].life += -1;		
		}
		if(tail[i].life == 0 && myGamePiece.crashWith(tail[i])) {
				die();
}
      tail[i].update();     
    }    
    myGamePiece.newPos();
    myGamePiece.update();
    score.textContent = L - 1;
}

function moveup() {
    if(myGamePiece.speedY == 0) {
    		myGamePiece.speedX = 0;
      myGamePiece.speedY = -30;
    }
}

function movedown() {
    if(myGamePiece.speedY == 0) {
    		myGamePiece.speedX = 0;
      myGamePiece.speedY = 30;
    }
}

function moveleft() {
    if(myGamePiece.speedX == 0) {
    		myGamePiece.speedY = 0;
      myGamePiece.speedX = -30;
    }
}

function moveright() {
    if(myGamePiece.speedX == 0) {
    		myGamePiece.speedY = 0;
      myGamePiece.speedX = 30;
    }
}