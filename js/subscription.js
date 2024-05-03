const $subscriptionForm = document.getElementById("subscriptionForm");
const $inputs = document.querySelectorAll("input");
const $errorMessages = document.querySelectorAll(".err-message");
const STORAGE_KEY = "users";

clearUI();

$subscriptionForm.addEventListener("submit", (event) => {
    event.preventDefault(); //sinon pas d'exécution des instructions
    clearUI();
    const errors=[];
    const user = {};
    $inputs.forEach((input) => {
        switch (input.id) {
            case "input-name":
                if (input.value.length<3) {
                    errors.push(["err-name", "Le nom n'est pas correct"]);
                } else {
                    user.name=input.value;
                }
                break;
            case "input-email":
                if (!validateEmail(input.value)) {
                    errors.push(["err-email", "L'email n'est pas correct"]);
                } else {
                    user.email=input.value;
                }
                break;
            case "input-mdp1":
                if (!validatePassword(input.value)) {
                    errors.push(["err-mdp1", "Le mot de passe n'est pas correct"]);
                } else {
                    user.password=input.value;
                }
                break;
            case "input-mdp2":
                if (!confirmPassword()) {
                    errors.push(["err-mdp2", "Le mot de passe n'est pas identique"]);
                }
                break;
        }
    });
    if (errors.length>0) {
        errors.forEach(element => {
            document.getElementById(element[0]).textContent=element[1];
        });
    } else if (validateUser(STORAGE_KEY,user)[0]>0){
        alert("Le nom "+user.nom+" est déjà utilisé !\nVeuillez modifier votre saisie !");
    } else if (validateUser(STORAGE_KEY,user)[1]>0){
        alert("L'email "+user.email+" est déjà utilisé !\nVeuillez modifier votre saisie !");
    } else {
        saveUser(STORAGE_KEY,user);
        alert(document.getElementById("input-name").value+" enregistré avec succès !");
        window.location.href = "index.html";
    }
});

function clearUI(){
    $errorMessages.forEach((error) => (error.textContent = ""));
}

////form validation
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
    return emailPattern.test(email)
}
function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*]).{6,}$/
    return passwordPattern.test(password)
}
function confirmPassword() {
    return document.getElementById("input-mdp1").value==document.getElementById("input-mdp2").value
}

////Users management
function saveUser(key, user) {
    const users = getUsers(key); //get already stored users
    users.push(user); //add new user to object
    localStorage.setItem(key, JSON.stringify(users)); //save update
}
function getUsers(key) {
    const datasFromLocalstorage = localStorage.getItem(key);
    const convertUsers = JSON.parse(datasFromLocalstorage) || []; //json or empty array
    return convertUsers
}

function validateUser(key,user){
    const users = getUsers(key); //get already stored users
    let result = [0,0];
    if (users.length!=0){
        users.forEach(element => {
            if (user.name==element.name){
                result[0]++;
            } else if (user.email==element.email) {
                result[1]++;
            }
        });
    }
    return result;
}