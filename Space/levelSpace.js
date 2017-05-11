/*global Audio: false*/
/*global alert: false*/
/*global console: false*/
/*jslint plusplus: true */

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction d'animation de la balle et bien d'autres
var defense; //Fonction d'activation du powerup Défense
var unstoppable; //Fonction d'activation du powerup Unstoppable
var reset; //Fonction de désactivation des powerups
var loseLife; //ça c'est un bon nom
var backgroundMusic; //Ce nom est assez explicite je pense
var win; //Bah quand on gagne, quoi
var timer1;
var go; //Game over

//Variables son
var pupLoseSfx = new Audio("sfx/PUP_Lose.wav");
var pauseSfx = new Audio("sfx/pauseSfx.wav");
var unpauseSfx = new Audio("sfx/unpauseSfx.wav");
var audioBG = new Audio("sfx/space_corsair.mp3");
audioBG.volume = 0.3;
audioBG.loop = true;
audioBG.play();

var wallSfx = new Audio("sfx/murSfx.wav");

//Variables menu pause
var pauseImg = new Image();
pauseImg.src = "gfx/pause.png";
pauseImg.width = 400;
pauseImg.height = 400;

//Variables raquette
var xRaquette = 540,
	yRaquette = 700; //Position raquette 

var raquetteImg = new Image();
raquetteImg.src = "gfx/Raquette.png"; //Asset graphique barre
raquetteImg.width = 200;
raquetteImg.height = 50; //Dimensions asset barre

var pupDef = false; //Drapeau powerup défense
var DefSfx = new Audio("sfx/PUPDef_sound.wav");
DefSfx.volume = 0.5;

var ViseeSfx = new Audio("sfx/PUPVisee.wav"); //PUP pas implémenté, j'attends
ViseeSfx.volume = 0.5;

var raquetteSfx = new Audio("sfx/raquetteSfx.wav");
raquetteSfx.volume = 0.5;

//Variables balle
var moveBalle = false; //Activation de la balle
var moveRaquette = true; //Activation de la raquette
var rayon = 25; //Rayon balle
var xPasAnim = 5; //Vitesse animation en x
var yPasAnim = 5; //Vitesse animation en y
var xBalle = 615,
	yBalle = 649; //Position initiale de la balle
var revx = false,
	revy = false; //Sens animation balle
var speedBalle = 10; //Vitesse balle
var collisionMemeSens = false;
var pupUnstop = false;

var k, j; //Ce sont juste des compteurs pour les boucles for

var balleImg = new Image(); //Asset graphique de la balle
balleImg.src = "gfx/balle.png";
balleImg.width = 50;
balleImg.height = 50; //Dimensions balle

var UnstopSfx = new Audio("sfx/PUPUnstop.wav");
UnstopSfx.volume = 0.8;

var UnstopLoop = new Audio("sfx/PUPUnstopLoop.wav");
UnstopLoop.loop = true;
UnstopLoop.volume = 0.8;

//Variables gain
var hasWon = false;
var winImg = new Image();
winImg.src = "gfx/win.png";
winImg.width = 400;
winImg.height = 207;
var xWinImg = 440,
	yWinImg = 297;

var winSfx = new Audio("sfx/victory.wav");
winSfx.volume = 0.7;
var winSfxPlayed = false;

//Variables briques

var briqueImg = new Image(); //Asset graphique des briques
briqueImg.src = "gfx/brique.png";
briqueImg.width = 80;
briqueImg.height = 40;
var brique2Img = new Image();
brique2Img.src = "gfx/brique2.png";
brique2Img.width = 80;
brique2Img.height = 40;

var briquesObj = [];

var cheatBrick = 0;

var briqueSfx = new Audio("sfx/brickSfx.wav");
briqueSfx.volume = 0.5;

//Variables powerup
var powerupTime = Math.floor((Math.random() * 100) + 1);
var powerup = Math.floor((Math.random() * 100) + 1); //Génère un powerup aléatoire
var capsuleDEFImg = new Image();
capsuleDEFImg.src = "gfx/capsuleDEF.png";
capsuleDEFImg.width = 40;
capsuleDEFImg.height = 80;
var capsuleATKImg = new Image();
capsuleATKImg.src = "gfx/capsuleATK.png";
capsuleATKImg.width = 40;
capsuleATKImg.height = 80;
var xCapsule = -100;
var yCapsule = -100;
var masquagePup = false; //détection collisions powerups / raquette + lance la disparition de la capsule
var collisionPupRaquette = false; //Détection collisions powerups / raquette + lance la génération aléatoire du powerup
var allowPowerup = true; //Créer une boucle qui permet d'avoir plusieurs powerups dans une partie
var xBriques, yBriques, life, hit;
var pattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1,
               1, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

//Variables Timer
var secon;
var compte;
var clock;
//Variables contrôles
var keyState = {};
var pause = false;

//Compteur de vie
var drawLife;
var nblife = 3;

var vieImg = new Image();
vieImg.src = "gfx/vieImg.png";

var vieCheatImg = new Image();
vieCheatImg.src = "gfx/vieCheat.png";

//image "Game over"
var goImg = new Image();
goImg.src = "gfx/gameover.jpg";
goImg.width = 421;
goImg.height = 105;
var hasLost = false;

var loseLifeSfx = new Audio("sfx/SfxLoseLife.wav");
loseLifeSfx.volume = 0.5;

var gameoverSfx = new Audio("sfx/gameoverSfx.wav");
/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
var creaBriques = function () {
	"use strict";
	canvas = document.getElementById('canvas');
	scene = canvas.getContext("2d");

	var v, i, Briques = function (xBriques, yBriques, life, hit) { //C'est juste des variables pour les boucles for
		this.x = xBriques;
		this.y = yBriques;
		this.life = life;
		this.hit = hit;
	};
	for (v = 0; v < 6; v += 1) {
		for (i = 0; i < 15; i += 1) {
			xBriques = 83 * i + 19;
			yBriques = 43 * v + 5;
			life = true;
			hit = false;
			briquesObj.push(new Briques(xBriques, yBriques, life, hit));
		}
	}
};

timer1 = function () {

	"use strict";
	if (clock) {
		if (!pause) {
			secon -= 1;
		}
		document.forsec.sec.value = " " + secon;
		compte = setTimeout(timer1, 1000);
		if (secon === 0) {
			reset();
			powerup = Math.floor((Math.random() * 100) + 1);
			clock = false;
		}
	}
};

//Fonction de reset des powerups
reset = function () {
	"use strict";
	if (!pause) {
		xCapsule = -100;
		yCapsule = -100;
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		raquetteImg.src = "gfx/Raquette.png";
		balleImg.src = "gfx/balle.png";
		pupLoseSfx.play();
		raquetteImg.width = 200;
		raquetteImg.height = 50;
		if (pupDef) {
			xRaquette += 44;
		}
		pupDef = false;
		pupUnstop = false;
        UnstopLoop.pause();
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		if (xRaquette >= 1270 - raquetteImg.width) {
			xRaquette = 1270 - raquetteImg.width;
			scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		}
		allowPowerup = true;
	}
};

//Fonction d'activation standard du powerup Défense
defense = function () {
	"use strict";
	if (!pupDef && moveRaquette) {
		scene.clearRect(xCapsule, yCapsule, capsuleDEFImg.width, capsuleDEFImg.height);
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		raquetteImg.src = "gfx/RaquettePUPDef.png";
		DefSfx.play(); //la ferme !
		raquetteImg.width = 288;
		raquetteImg.height = 50;
		pupDef = true;
		xRaquette -= 44;
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		if (xRaquette >= 1272 - raquetteImg.width) {
			xRaquette = 1272 - raquetteImg.width;
			scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		}
		clock = true;
		secon = 20;
		timer1();
	}
};

unstoppable = function () {
	"use strict";
	if (!pupUnstop && moveRaquette) {
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		balleImg.src = "gfx/balleUnstop.png";
		UnstopSfx.play();
        UnstopLoop.play();
		pupUnstop = true;
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		clock = true;
		secon = 5;
		timer1();
	}
};
loseLife = function () {
	"use strict";
	yBalle = 649;
	scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.clearRect(xBalle, yBalle, 50, 50);
    scene.clearRect(xCapsule - 25, yCapsule - 25, 105, 125);
    masquagePup = false;
	moveRaquette = false;
	if (pupDef) {
		xRaquette = 496;
		xBalle = xRaquette + 119;
	} else {
		xRaquette = 540;
		xBalle = xRaquette + 75;
	}
	yRaquette = 700;
	xPasAnim = 5;
	yPasAnim = 5;
	secon = 1;
	timer1();
	scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
	moveBalle = false;
};

var gameoverSound = function () {
	"use strict";
	audioBG.pause();
	gameoverSfx.play();
};

go = function () { //Perte des vies
	"use strict";
	nblife -= 1;
	loseLifeSfx.play();
	console.log(nblife);
	if (nblife <= 0) {
		scene.drawImage(goImg, 440, 300, goImg.width, goImg.height);
		moveBalle = false;
		moveRaquette = false;
		//gameoverSfx.play();
		setTimeout(gameoverSound, 2000);
	}
};

function win() {
	"use strict";
	var addLife, sumLife;
	addLife = function (a, b) {
		return a + b;
	};
	sumLife = pattern.reduce(addLife, 0);
	console.log(sumLife);
	console.log(pattern);
	if (sumLife === 0) {
		hasWon = true;
		moveBalle = false;
		moveRaquette = false;
		scene.clearRect(0, 0, 1280, 800);
		scene.drawImage(winImg, xWinImg, yWinImg, winImg.width, winImg.height);
		if (!winSfxPlayed) {
			audioBG.pause();
			winSfx.play();
			winSfxPlayed = true;
		}
		setTimeout(win, 30);
	}
}

//Écoute des touches pour contrôles
window.addEventListener('keydown', function (e) {
	"use strict";
	keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
	"use strict";
	keyState[e.keyCode || e.which] = false;
}, true);

//Fonction de contrôles raquette next gen
function controls() {
	"use strict";
	//Contrôles flèche gauche et "q"
	if (keyState[37] || keyState[81]) {
		if (!pause && !hasWon && !hasLost) {
			if (xRaquette <= 0) {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette -= 0;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			} else {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette -= 20;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			}
			if (!moveBalle && xBalle >= 65) {
				xBalle = xRaquette + 75;
				scene.clearRect(0, 0, 1280, 800);
				scene.beginPath();
				scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
				for (k = 0; k < briquesObj.length; k = k + 1) {
					if (briquesObj[k].life) {
						if (pattern[k] === 1) {
							scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
						if (pattern[k] === 2) {
							scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
					}
				}
				scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
			}
		}
		drawLife();
	}
	//Contrôles flèche droite et "d"
	if (keyState[39] || keyState[68]) {
		if (!pause && !hasWon && !hasLost) {
			if (xRaquette >= 1280 - raquetteImg.width) {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette += 0;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			} else {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette += 20;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			}
			if (!moveBalle && xBalle <= 1205) {
				xBalle = xRaquette + 75;
				scene.clearRect(0, 0, 1280, 800);
				scene.beginPath();
				scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
				for (k = 0; k < briquesObj.length; k = k + 1) {
					if (briquesObj[k].life) {
						if (pattern[k] === 1) {
							scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
						if (pattern[k] === 2) {
							scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
					}
				}
				scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
			}
		}
		drawLife();
	}
	//Lancement de la balle (espace)
	if (keyState[32] && !moveBalle && !hasWon && !hasLost) {
		if (pause) {
			unpauseSfx.play();
		}
		moveBalle = true;
		pause = false;
		moveRaquette = true;
		animation();
	}
	if (keyState[32] && hasWon) {
		location.replace("../Menu/mainMenu.html");
	}
	if (keyState[32] && hasLost) {
		location.reload();
	}

	//Pause (P)
	if (keyState[80] && moveBalle && !hasWon) {
		moveBalle = false;
		pause = true;
		moveRaquette = false;
		pauseSfx.play();
	}

	setTimeout(controls, 15); //Bouclage de la fonction controls
}

drawLife = function () {
	"use strict";
	scene.clearRect(0, 750, 225, 50);
	if (nblife <= 0) {
		hasLost = true;
	}
	if (nblife >= 1) {
		scene.drawImage(vieImg, 0, 750, 75, 50);
	}
	if (nblife >= 2) {
		scene.drawImage(vieImg, 75, 750, 75, 50);
	}
	if (nblife >= 3) {
		scene.drawImage(vieImg, 150, 750, 75, 50);
	}
	if (nblife > 3) {
		scene.drawImage(vieCheatImg, 0, 750, 225, 50);
	}
};

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
	"use strict";
	//(Re)construction de la scène
	scene.clearRect(0, 0, 1280, 800);
	scene.beginPath();
	scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
	for (k = 0; k < briquesObj.length; k = k + 1) {
		if (briquesObj[k].life) {
			if (pattern[k] === 1) {
				scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
			}
			if (pattern[k] === 2) {
				scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
			}
		}
	}
	if (!moveRaquette && pause) {
		scene.drawImage(pauseImg, 440, 200, pauseImg.width, pauseImg.height);
	}
	scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	if (masquagePup) {
		if (powerup < 50) {
			scene.drawImage(capsuleDEFImg, xCapsule, yCapsule, capsuleDEFImg.width, capsuleDEFImg.height);
			yCapsule += 4;
		} else if (powerup >= 50) {
			scene.drawImage(capsuleATKImg, xCapsule, yCapsule, capsuleATKImg.width, capsuleATKImg.height);
			yCapsule += 4;
		}
	}
	scene.closePath();
	scene.fill();

	//Trajectoire de la balle (à isoler)
	if (moveRaquette) {
		if (xBalle < 0) {
			revx = false;
			wallSfx.play();
		} else if (xBalle + 50 > 1280) {
			revx = true;
			wallSfx.play();
		}
		if (yBalle < 0) {
			revy = false;
			wallSfx.play();
		} else if (yBalle + 50 > 1000) {
			go();
			loseLife();
		}
		if (!revy) {
			yBalle = yBalle + yPasAnim;
		} else {
			yBalle = yBalle - yPasAnim;
		}
		if (!revx) {
			xBalle = xBalle + xPasAnim;
		} else {
			xBalle = xBalle - xPasAnim;
		}
	}
	//collisions pup raquette
	if (!pupDef) {
		if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) { //collision sur le dessus
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 19 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 200 && xCapsule - 10 < xRaquette + 200 && xCapsule + 21 > xRaquette + 200) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 10 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
	} else {
		if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) { //collision sur le dessus
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 19 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 288 && xCapsule - 10 < xRaquette + 288 && xCapsule + 10 > xRaquette + 288) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 21 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
	}
	if (yCapsule > 800) {
		allowPowerup = true;
		masquagePup = false;
	}
	if (collisionPupRaquette) {
		if (powerup < 50) {
			defense();
		} else if (powerup >= 50) {
			unstoppable();
		}
		collisionPupRaquette = false;
	}


	//Fonction collision avec la raquette :
	if (!pupDef) {
		if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) { //collision sur le dessus
			revy = true;
			collisionMemeSens = true;
			if (keyState[39] && revx) {
				xPasAnim += 0.8;
				yPasAnim -= 0.8;
			} else if (keyState[39] && !revx) {
				xPasAnim -= 0.8;
				yPasAnim += 0.8;
			}
			if (keyState[37] && revx) {
				xPasAnim -= 0.8;
				yPasAnim += 0.8;
			} else if (keyState[37] && !revx) {
				xPasAnim += 0.8;
				yPasAnim -= 0.8;
			}
			if (xPasAnim <= 0) {
				revx = !revx;
				xPasAnim = -xPasAnim;
			}
			if (yPasAnim <= 0) {
				revy = !revy;
				yPasAnim = 0;
			}
			raquetteSfx.play();
		}
		if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
			revy = false;
			collisionMemeSens = true;
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 100) { //collision gauche
			if (!collisionMemeSens) {
				if (revx) {
					xBalle = xRaquette - 50;
				}
				revx = true;
			}
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 200 && xBalle > xRaquette + 100) {
			if (!collisionMemeSens) {
				if (!revx) {
					xBalle = xRaquette + 200;
				}
				revx = false;
				raquetteSfx.play();
			}
			collisionMemeSens = false;
		}
	} else {
		if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) { //collision sur le dessus
			revy = true;
			collisionMemeSens = true;
			if (keyState[39] && revx) {
				xPasAnim += 0.8;
				yPasAnim -= 0.8;
			} else if (keyState[39] && !revx) {
				xPasAnim -= 0.8;
				yPasAnim += 0.8;
			}
			if (keyState[37] && revx) {
				xPasAnim -= 0.8;
				yPasAnim += 0.8;
			} else if (keyState[37] && !revx) {
				xPasAnim += 0.8;
				yPasAnim -= 0.8;
			}
			if (xPasAnim <= 0) {
				revx = !revx;
				xPasAnim = -xPasAnim;
			}
			if (yPasAnim <= 0) {
				yPasAnim = 0;
				revy = !revy;
			}
			raquetteSfx.play();

		}
		if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
			revy = false;
			collisionMemeSens = true;
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 144) { //collision gauche
			if (!collisionMemeSens) {
				if (revx) {
					xBalle = xRaquette - 50;
				}
				revx = true;
			}
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 288 && xBalle > xRaquette + 144) {
			if (!collisionMemeSens) {
				if (!revx) {
					xBalle = xRaquette + 288;
				}
				revx = false;
			}
			raquetteSfx.play();
		}
		collisionMemeSens = false;
	}

	//Collisions balle-briques
	for (j = 0; j < briquesObj.length; j += 1) {
		if (pattern[j] > 0) {
			if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle + 40 < briquesObj[j].x && xBalle + 60 > briquesObj[j].x) { //collision gauche
				if (!pupUnstop) {
					revx = true;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle < briquesObj[j].x + 80 && xBalle - 10 < briquesObj[j].x + 80 && xBalle + 10 > briquesObj[j].x + 80) { //collision droite
				if (!pupUnstop) {
					revx = false;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle < briquesObj[j].y + 40 && yBalle - 10 < briquesObj[j].y + 40 && yBalle + 10 > briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision bas
				if (!pupUnstop) {
					revy = false;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle + 50 > briquesObj[j].y && yBalle + 40 < briquesObj[j].y && yBalle + 60 > briquesObj[j].y && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision haut
				if (!pupUnstop) {
					revy = true;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 100 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			briquesObj[j].hit = false;
		}
	}
	drawLife();
	//Bouclage de la fonction animation
	if (moveBalle) {
		setTimeout(animation, speedBalle);
	}
};


//Lancement des fonctions principales après chargement de la page
setTimeout(creaBriques, 2000);
setTimeout(animation, 2001);
setTimeout(controls, 2002);

/******************************************************
                    Fin du programme
******************************************************/