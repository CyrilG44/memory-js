const $subscriptionForm = document.getElementById("loginForm");
const $errorMessages = document.querySelectorAll(".err-message");
const KEY_USERS = "users";
const KEY_USER = "currentUser";

$subscriptionForm.addEventListener("submit", (event) => {
    event.preventDefault(); //sinon pas d'exécution des instructions
    clearUI();
    
    const user={};
    user.email=document.getElementById("input-email").value;
    user.password=document.getElementById("input-mdp").value;
    const profile = checkUser(user);
    console.log(profile);
    if (profile.length==2) {
        user.name=profile[1];
        loginUser(user);
        alert(user.name+" connecté avec succès !");
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
function getUsers() {
    const datasFromLocalstorage = localStorage.getItem(KEY_USERS);
    const convertUsers = JSON.parse(datasFromLocalstorage) || []; //json or empty array
    return convertUsers
}
function checkUser(user){
    const users = getUsers(); //get already stored users
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
function loginUser(user){
    localStorage.setItem(KEY_USER,user.name);
}