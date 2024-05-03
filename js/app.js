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
    document.getElementById("btn-subscribe").classList.add("nav-btn-hidden");
}