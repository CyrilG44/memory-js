const $subscriptionForm = document.getElementById("loginForm");
const $errorMessages = document.querySelectorAll(".err-message");
const STORAGE_KEY = "users";

$subscriptionForm.addEventListener("submit", (event) => {
    event.preventDefault(); //sinon pas d'exécution des instructions
    clearUI();
    
    const user={};
    user.email=document.getElementById("input-email").value;
    user.password=document.getElementById("input-mdp").value;
    const profile = loginUser(STORAGE_KEY,user);
    console.log(profile);
    if (profile.length==2) {
        alert(profile[1]+" connecté avec succès !");
        window.location.href = "profile.html";
    } else if (profile[0]!="empty") {
        document.getElementById("err-email").textContent="Mot de passe incorrect";
    } else {
        document.getElementById("err-email").textContent="Utilisateur inconnu";
    }
});

function clearUI(){
    $errorMessages.forEach((error) => (error.textContent = ""));
}

////Users management
function getUsers(key) {
    const datasFromLocalstorage = localStorage.getItem(key);
    const convertUsers = JSON.parse(datasFromLocalstorage) || []; //json or empty array
    return convertUsers
}
function loginUser(key,user){
    const users = getUsers(key); //get already stored users
    let result = ["empty"];
    users.forEach(element => {
        if (user.email==element.email){
            result[0]=user.email;
            if (user.password==element.password){
                result.push(element.name);
            }
        }       
        });
    return result;
}