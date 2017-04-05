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

//Variables balle
var posx = 615, posy = 649; //Position initiale de la balle

var flag = false; //Activation de la balle
var pas = 5; //Vitesse animation

var balleImg = new Image();
balleImg.src = "balle.png";
balleImg.width = 50;
balleImg.height = 50;
var rayon = 25; //Rayon balle

//Variables briques

var briqueImg = new Image();
briqueImg.src = "briqueProto.png";
briqueImg.width = 80;
briqueImg.height = 40;



/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
var creaBriques = function () {
    "use strict";
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");

    //Un jour ma brique viendra, ....
};

//Appel de la fonction de création des briques au chargement terminé de la page
window.addEventListener("load", creaBriques);

//Partie commande (touches)
document.addEventListener("keydown", function (event) {     // commande barre    
    "use strict";
    if (move) {
        switch (event.keyCode) {
        case 39:
            if (x >= 1040) {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x += 0;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x += 250;
                posx = x + 75;
                posy = y - 51;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
                animation();
            }
            break;
        case 37:
            if (x <= 40) {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x -= 0;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(x, y, raquetteImg.width, raquetteImg.height);
                x -= 250;
                posx = x + 75;
                posy = y - 51;
                scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
                animation();
            }
            break;
        case 32:
            flag = true;
            move = false;
            animation();
            break;
        case 49: //Donne la position en x de la balle en appuyant sur &/1
            alert(posx);
            alert(posy);
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
    //Insérer un truc important ici ?
    scene.drawImage(raquetteImg, x, y, raquetteImg.width, raquetteImg.height);
    scene.closePath();
    scene.fill();
    
    //Trajectoire de la balle
    if (flag) {posy -= 7; }
    
    
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, 15);
    }
};

select = function () {
    "use strict";
    //Fonction de "collisions" aux "briques" de choix de niveau
    if (posy === 383 && flag) { //posy initial 649
        alert("Collision détectée");
        if (posx === 115) {
            //1er choix
            flag = false;
            alert("Selectionné : 1");
            location.reload();
        } else if (posx === 365) {
            //2e choix
            flag = false;
            alert("Selectionné : 2");
            location.reload();
        } else if (posx === 615) {
            //3e choix
            flag = false;
            alert("Selectionné : 3");
            location.reload();
        } else if (posx === 865) {
            //4e choix
            flag = false;
            alert("Selectionné : 4");
            location.reload();
        } else if (posx === 1115) {
            //5e choix
            flag = false;
            alert("Selectionné : 5");
            location.reload();
        }
    }
    setTimeout(select, 10);
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);
setTimeout(select, 500);


/******************************************************
                    Fin du programme
******************************************************/
