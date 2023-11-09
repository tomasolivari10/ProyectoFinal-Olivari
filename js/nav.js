const btn = document.querySelector(".hamb")
const nav = document.querySelector("nav")
const main = document.querySelector("main")
const enlaces = document.querySelectorAll("nav a")

btn.addEventListener("click", function () {
    nav.classList.toggle("open")
    document.querySelector(".hamb i").classList.toggle("fa-times")
})

main.addEventListener("click", function (){
    nav.classList.remove("open")
    document.querySelector(".hamb i").classList.remove("fa-times")
}) 

//uso un for each para recorrer los a dentro del nav, para que si hago click en alguno se cierre el menu y se quite la X.
enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        nav.classList.remove("open");
        document.querySelector(".hamb i").classList.remove("fa-times");
    });
});




const scrollToTopLink = document.getElementById('scrollToTopLink');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopLink.classList.remove("hide");
        scrollToTopLink.classList.add("show");
    } else {
        scrollToTopLink.classList.remove("show");
        scrollToTopLink.classList.add("hide");
    }
});

scrollToTopLink.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
