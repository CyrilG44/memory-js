
////Game initalization
let nbDistinctCards=6;
const prefix="ressources/";

//bug taille image lorsque choisie au hasard à résoudre + tard
const targetImages = new Map(); // position -> img
const cardStatuses = new Map();
let turn = 0;
let nbTurns = 0;

initMemory();

//stockage des éléments carte
const cards = document.querySelectorAll(".card");

//création écoutes des cartes
cards.forEach(element => {
    element.addEventListener('click', process);
});

//écoute barre espace
addEventListener("keypress", function (event) {
    if (event.key==" ") {
        if (turn[0]!="empty1"){
            hideCard(turn[0]);
        }
        initMemory();
    }
})

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
            nbTurns++;
            if (targetImages.get(turn[0])!=targetImages.get(turn[1])){
                setTimeout(hideCard, 2000, turn[0]); //ou this
                setTimeout(hideCard, 2500, turn[1]);
                turn = initTurn();
            } else {
                cardStatuses.set(turn[0],1);
                cardStatuses.set(turn[1],1);
                turn = initTurn();
            }
        }
    }
    //console.log(cardStatuses);
    if (isDone(cardStatuses)){
        document.getElementById("inProgress").textContent="";
        document.getElementById("success").textContent=`Bravo ! Vous avez gagné en ${nbTurns} coups !`;
    } else {
        document.getElementById("nb").textContent=nbTurns;
    }
}

function showCard(object) {
    object.style.transform ="rotateY(180deg)"
}
function hideCards(){
    for (const element of cardStatuses) {
        if (element[1]==1){
            hideCard(element[0]);
        }
    }
}
function hideCard(id) {
    //object.style.transform ="rotateY(0deg)"
    document.getElementById(id).style.transform="rotateY(0deg)"
}

function initMemory(){
    hideCards();
    cardStatuses.clear();
    targetImages.clear();    
    turn = initTurn();
    nbTurns = 0;
    document.getElementById("inProgress").innerHTML='Partie en cours - nombre de coups = <span id="nb">0</span>';
    document.getElementById("success").textContent="";
    for (let i=1; i<=nbDistinctCards; i++) {
        let nb=0;
        do {
            let position = Math.ceil(Math.random()*(nbDistinctCards*2)); //arrondi au supérieur
            if (targetImages.get("card"+position) == undefined) {
                targetImages.set("card"+position,i);
                cardStatuses.set("card"+position,0);
                nb++;
            }
        } while (nb<2);
    }
    console.log(targetImages);
    //Set target images source
    for (let i=1; i<=nbDistinctCards*2; i++) {
        document.getElementById("card"+i+"-img").src=prefix+targetImages.get("card"+i)+".svg";
        //document.getElementById("img"+i).src=prefix+[1,2,3,4,5,6,6,5,4,3,2,1][i-1]+".svg"
    }
}

function initTurn() {
    return ["empty1","empty2"];
}

function isDone(tab){
    for (const element of tab) {
        if (element[1]==0) {
            return false;
        }
    }
    return true;
}