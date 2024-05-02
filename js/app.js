
////Game initalization
let nbDistinctCards=6;
let nbRounds=0;
const prefix="ressources/";

//to update later with Math.random(n) puis Math.round pour tirer la position au hasard
//bug taille image lorsque choisie au hasard à résoudre + tard
const targetImages = new Map(); // position -> img
const cardStatuses = new Map();
for (let i=1; i<=nbDistinctCards; i++) {
    let nb=0;
    let inc=0;
    do {
        let position = Math.ceil(Math.random()*(nbDistinctCards*2)); //arrondi au supérieur
        if (targetImages.get("card"+position) == undefined) {
            targetImages.set("card"+position,i);
            cardStatuses.set("card"+position,0);
            nb++;
        }
        inc++;
    } while (nb<2);
}
console.log(targetImages);

//Set target images source
for (let i=1; i<=nbDistinctCards*2; i++) {
    document.getElementById("card"+i+"-img").src=prefix+targetImages.get("card"+i)+".svg";
    //document.getElementById("img"+i).src=prefix+[1,2,3,4,5,6,6,5,4,3,2,1][i-1]+".svg"
}

//stockage des éléments carte
const cards = document.querySelectorAll(".card");

//création des écoutes en masse
cards.forEach(element => {
    element.addEventListener('click', process);
});

//initialisation d'un tour
let turn = initTurn();

////Each turn

////Functions
function process(){
    let card=this.id; //this est l'élément HTML déclenchant
    if (cardStatuses.get(card)==0) {
        if (turn[0]=="empty1"){
            showCard(this);
            turn[0]=card;
        } else if (turn[1]=="empty2"){
            showCard(this);
            turn[1]=card;
            if (targetImages.get(turn[0])!=targetImages.get(turn[1])){
                setTimeout(hideCard, 2000, turn[0]); //ou this
                setTimeout(hideCard, 2500, turn[1]);
                turn = initTurn();
            } else {
                console.log(turn);
                cardStatuses.set(turn[0],1);
                cardStatuses.set(turn[1],1);
                turn = initTurn();
            }
        }
    }
    console.log(cardStatuses);
}

function showCard(object) {
    object.style.transform ="rotateY(180deg)"
}
function hideCard(id) {
    //object.style.transform ="rotateY(0deg)"
    document.getElementById(id).style.transform="rotateY(0deg)"
}

function initTurn() {
    return ["empty1","empty2"];
}