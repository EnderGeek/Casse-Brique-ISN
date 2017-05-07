/*global Audio: false*/
/*global alert: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas; //Le canvas en lui-même
var scene;
var animation; //Fonction d'animation du canvas
var select; //Fonction de "collisions" choix de niveau

//Variables raquette
var x = 540, y = 700; //Position raquette

var move = true; //Activation de la raquette

var raquetteImg = new Image();
raquetteImg.src = "Raquette.png"; //Asset graphique barre
raquetteImg.width = 200;
raquetteImg.height = 50; //Dimensions asset barre

var raquetteMoveSfx = new Audio("Select.wav");
var raquetteLockedSfx = new Audio("OutSelect.wav");
var raquetteLaunchSfx = new Audio("Launch.wav");
var audioBG = new Audio("journey.mp3");
audioBG.volume = 0.3;
audioBG.loop = true;
audioBG.play();

//Variables balle
var posx = 615, posy = 649; //Position initiale de la balle

var flag = false; //Activation de la balle
var pas = 1; //Vitesse animation

var balleImg = new Image();
balleImg.src = "balle.png";
balleImg.width = 50;
balleImg.height = 50;
var rayon = 25; //Rayon balle

//Variables briques

var spaceImg = new Image();
spaceImg.src = "briqueSpace.png";

var nordicImg = new Image();
nordicImg.src = "briqueNordic.png";

var troisImg = new Image();
troisImg.src = "briquePH1.png";

var quatreImg = new Image();
quatreImg.src = "briquePH2.png";

var creditsImg = new Image();
creditsImg.src = "briqueCredits.png";



/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
var creaBriques = function () {
    "use strict";
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");
};

//Appel de la fonction de création des briques au chargement terminé de la page

//Partie commande (touches)
document.addEventListener("keydown", function (event) {     // commande barre    
    "use strict";
    if (move) {
        switch (event.keyCode) {
        case 39:
            if (x >= 1040) {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x += 0;
                raquetteLockedSfx.play();
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x += 250;
                posx = x + 75;
                posy = y - 51;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
                raquetteMoveSfx.play();
                animation();
            }
            break;
        case 37:
            if (x <= 40) {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x -= 0;
                raquetteLockedSfx.play();
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x -= 250;
                posx = x + 75;
                posy = y - 51;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
                raquetteMoveSfx.play();
                animation();
            }
            break;
        case 32:
            flag = true;
            move = false;
            raquetteLaunchSfx.play();
            animation();
            break;
        }
    }
});

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
    "use strict";
    //(Re)construction de la scène
    scene.clearRect(0, 0, 1280, 800);
    scene.beginPath();
    scene.drawImage(balleImg, posx, posy, 50, 50);
    scene.drawImage(spaceImg, 45, 330, 190, 60);
    scene.drawImage(nordicImg, 295, 330, 190, 60);
    scene.drawImage(troisImg, 545, 330, 190, 60);
    scene.drawImage(quatreImg, 795, 330, 190, 60);
    scene.drawImage(creditsImg, 1045, 330, 190, 60);
    scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
    scene.closePath();
    scene.fill();
    
    //Trajectoire de la balle
    if (flag) {posy -= 7; }
    
    
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, 20);
    }
};

select = function () {
    "use strict";
    //Fonction de "collisions" aux "briques" de choix de niveau
    if (posy === 383 && flag) { //posy initial 649
        if (posx === 115) {
            //1er choix
            flag = false;
            alert("N'est pas encore prêt");
            location.reload();
        } else if (posx === 365) {
            //2e choix
            flag = false;
            alert("Encore moins prêt...");
            location.reload();
        } else if (posx === 615) {
            //3e choix
            flag = false;
            alert("Lancement niveau proto");
            location.replace("../Proto Anim/levelProto.html");
        } else if (posx === 865) {
            //4e choix
            flag = false;
            alert("Meuuuurge !");
            location.reload();
        } else if (posx === 1115) {
            //5e choix
            flag = false;
            location.replace("credits.html");
        }
    }
    setTimeout(select, 10);
};

//Lancement des fonctions principales après chargement de la page
setTimeout(creaBriques, 499);
setTimeout(animation, 500);
setTimeout(select, 501);


/******************************************************
                    Fin du programme
******************************************************/
