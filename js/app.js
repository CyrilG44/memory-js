
////Game initalization
let nbDistinctCards=6;
let nbRounds=0;
const prefix="ressources/";

//to update later with Math.random(n) puis Math.round pour tirer la position au hasard
const targetImages = [1,2,3,4,5,6,6,5,4,3,2,1];
//const targetImages = new Array(2*nbCartes);

const cardStatuses = [0,0,0,0,0,0,0,0,0,0,0,0]
//console.log(cardStatuses.length);

//Set target images
for (let i=0; i<nbDistinctCards*2; i++) {
    document.getElementById("img"+(i+1)).src=prefix+targetImages[i]+".svg"
}

//to optimize later (by for?)
const $position1 = document.getElementById("position1");
const $position2 = document.getElementById("position2");
const $position3 = document.getElementById("position3");

////Each turn
let nbOnGoingCards=0;
$position1.addEventListener('click', process, $position1);
$position2.addEventListener('click', (event) => process(event));
//


////Functions
function process(event){
    //if (nbOnGoingCards<2) {
    console.log(event.currentTarget.style);
    showCard(event);
    console.log(event.currentTarget.style);
    setTimeout(hideCard, 1000, event);
    //hideCard(event);
    console.log(event.currentTarget.style);
    //}
    
}

function showCard(event) {
    //$position1.style.transform ="rotateY(180deg)"
    event.currentTarget.style.transform ="rotateY(180deg)"
}
function hideCard(event) {
    //$position1.style.transform ="rotateY(0deg)"
    event.currentTarget.style.transform ="rotateY(0deg)"
}