const $subscriptionForm = document.getElementById("subscriptionForm");
const $inputs = document.querySelectorAll("input");

clearUI();

/*
const user = {};
user.name="nom1"
console.log(user);
*/

$subscriptionForm.addEventListener("submit", (event) => {
    event.preventDefault(); //sinon pas d'exécution des instructions
    clearUI();
    const errors=[];

    $inputs.forEach((input) => {
        switch (input.id) {
            case "input-name":
                if (input.value.length<3) {
                    errors.push([input.id, "Le nom n'est pas correct"]);
                } else {
                    console.log("Name OK");
                }
                break;
            case "input-email":
                if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas correct"]);
                } else {
                    console.log("email OK");
                }
                break;
            case "input-mdp1":
                if (!validatePassword(input.value)) {
                    errors.push([input.id, "Le mot de passe n'est pas correct"]);
                } else {
                    console.log("mdp1 OK");
                }
                break;
            case "input-mdp2":
                if (!confirmPassword()) {
                    errors.push([input.id, "Le mot de passe n'est pas identique"]);
                } else {
                    console.log("passwordConfirmation OK");
                }
                break;
        }
    });
    console.log(errors);
    if (errors.length>0) {
        //for ggggg
    } else {
        alert("create/maj local storage");
    }
});

function clearUI(){
    $errorInputs.forEach((error) => (error.textContent = ""));
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
    return emailPattern.test(email)
}
function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*]){6,}$/
    return passwordPattern.test(password)
}
function confirmPassword() {
    return document.getElementById("input-mdp1").value==document.getElementById("input-mdp2").value
}
