//handle navbar color
const currentPath=document.location.pathname
const currentPage=currentPath.slice(1,currentPath.length-5);
document.getElementById("btn-"+currentPage).classList.add("current-btn");

//display expected navbar buttons depending on user connexion
const currentUser = localStorage.getItem("currentUser") || [];
if (currentUser.length==0) {
    document.getElementById("btn-logout").classList.add("nav-btn-hidden");
    document.getElementById("btn-profile").classList.add("nav-btn-hidden");
} else {
    document.getElementById("btn-login").classList.add("nav-btn-hidden");
    document.getElementById("btn-subscription").classList.add("nav-btn-hidden");
}

//user logout
const USER_KEY="currentUser"
const $logoutBtn=document.getElementById("btn-logout");
$logoutBtn.addEventListener("click", () => localStorage.removeItem(USER_KEY));

//users storage
const USERS_KEY = "users";
function getUsers() {
    const datasFromLocalstorage = localStorage.getItem(USERS_KEY);
    const convertUsers = JSON.parse(datasFromLocalstorage) || []; //json or empty array
    return convertUsers
}
function saveUser(user) {
    const users = getUsers(); //get already stored users
    users.push(user); //add new user to object
    localStorage.setItem(USERS_KEY, JSON.stringify(users)); //save update
}

export {getUsers, saveUser};