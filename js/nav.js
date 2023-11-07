const btn = document.querySelector(".hamb")
const nav = document.querySelector("nav")

btn.addEventListener("click", function () {
    nav.classList.toggle("open")
    document.querySelector(".hamb i").classList.toggle("fa-times")
})

