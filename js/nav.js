const btn = document.querySelector(".hamb")
const nav = document.querySelector("nav")
const main = document.querySelector("main")
const enlaces = document.querySelectorAll("nav a")
const scrollToTopLink = document.getElementById('scrollToTopLink');


btn.addEventListener("click", function (e) {
    e.preventDefault()
    nav.classList.toggle("open")
    document.querySelector(".hamb i").classList.toggle("fa-times")
})

main.addEventListener("click", function (){
    nav.classList.remove("open")
    document.querySelector(".hamb i").classList.remove("fa-times")
}) 


enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        nav.classList.remove("open");
        document.querySelector(".hamb i").classList.remove("fa-times");
    });
});


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
