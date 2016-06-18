// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 540;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "media/background.png";

// Kirby image
var ballReady = false;
var ballImage = new Image();
ballImage.onload = function () {
	ballReady = true;
};
ballImage.src = "media/ball.png";

// Villain image
var pacReady = false;
var pacImage = new Image();
pacImage.onload = function () {
	pacReady = true;};
pacImage.src = "media/pac.png";

// Star image
var starReady = false;
var starImage = new Image();
starImage.onload = function () {
	starReady = true;
};
starImage.src = "media/star.png";
//Radius to be used if using circular collision
//Attributes of Kirby aka Ball 
var ball={
	vX:15,
	vY:0,
	X:100,
	Y:237.5,
	radius:100,
	inAir:false
};

//Attributes of "Villain" Pacman
var pac={
	X:1000,
	Y:261,
	radius:100,
};

//Star positions
var star={
	X:1500,
	Y:60
};

var gravity=2;//Increase/decrease gravity as per wish to make game harder in a way different from that of horizontal velocity
var score=0;
var gamePaused=false;

//Sound Effects
var jumpSound=new Audio("media/jump.ogg");
var deathSound=new Audio("media/death.wav");

var keysDown = {};//"set" of keys pressed
//Adds pressed key
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

//Deletes unpressed key if present
addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);

//To do when a key is pressed
var keys=function(){
	if(keysDown[32]&&!gamePaused){//If spacebar is pressed when game isn't paused
		if(!ball.inAir){
			ball.inAir=!ball.inAir;
			ball.vY=30;
			jumpSound.play();
			}
		}
	
	if(keysDown[80]){//If P is pressed to pause/unpause
		if(!gamePaused)
			gamePaused=true;
	}
	if(keysDown[85]){
		if(gamePaused)
			gamePaused=false;
	}
}

/*Circular collision for more accuracy
var collision=function(){
		if ((Math.pow(ball.X-pac.X-148,2)+Math.pow(ball.Y-148-pac.Y,2))<=Math.pow(ball.radius+pac.radius,2))
			return true;
		else
			return false;}*/

//Normal collision
var collision=function(){
 	if((ball.X+10<(47+60+pac.X))&&(ball.X+128+10>pac.X+47)&&(ball.Y+10<(pac.Y+35+80))&&((ball.Y+128+10)>(pac.Y+35)))
		return true;
 	else
 		return false;
}

var render=function(){
	if(bgReady)
		ctx.drawImage(bgImage,0,0,960000,540);

	if(starReady)
		ctx.drawImage(starImage,star.X,star.Y);

	if(ballReady)
		ctx.drawImage(ballImage,ball.X,ball.Y,150,150);

	if(pacReady)
		ctx.drawImage(pacImage,pac.X,pac.Y,150,150);

	if(collision()){
		deathSound.play();
		alert("GAME OVER\nYour Score is: "+score);
		location.reload();
	}

	/*Drawing Container boxes for shapes to make sure it'll work and know the exact sizes of drawn objects
	ctx.rect(ball.X+10,ball.Y+10,128,128);
	ctx.rect(pac.X+47,pac.Y+35,60,80);
	ctx.strokeStyle="red";
	ctx.stroke();*/

	//If ball returns from air and hits ground,sets it back to the ground
	if(ball.Y>237.5){
		ball.inAir=false;
		ball.vY=0;
		ball.Y=237.5;
	}
	//If ball goes over and out of the screen
	if(ball.Y<0){
		ball.Y=0;
	}

	//If ball is in the air,it imitates gravity
	if(ball.inAir){
	ball.Y-=ball.vY;
	ball.vY-=gravity;
	}

	//Moves ball forward 
	ball.X+=ball.vX;

	//If the ball has moved beyond the pacman
	if(pac.X<ball.X-150){
		pac.X=ball.X+Math.random()*300+800;
		score++;
		//Makes game progressively harder
		ball.vX+=0.5;
		if(score>localStorage.getItem("hiscore")){//Stores game in Local Storage for permanent hiscore
			localStorage.setItem("hiscore",score);
		}
	}
	//Regenerates star if crossed
	if(star.X<ball.X-150){
		star.X=ball.X+Math.random()*300+800;
		star.Y=Math.random()*200;
	}
	//alert("lel"); If you want to see everything frame by frame
}

var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	if(!gamePaused){
		render();
		ctx.translate(-ball.vX, 0);
	}

	keys();
	if(localStorage.getItem("hiscore")==undefined){
		localStorage.setItem("hiscore",0);
	}
	document.getElementById("score").innerHTML="Score: "+score;
	document.getElementById("hiscore").innerHTML="HiScore: "+localStorage.getItem("hiscore");	
	then = now;

	requestAnimationFrame(main);
};
//Makes animation choosing the ideal among available so it'll work on
var w = window;
//Makes animation choosing the ideal among available so it'll work on
//                         General                   Safari Opera Chrome              IE                            Firefox
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
main();