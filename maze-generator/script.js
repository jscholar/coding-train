document.getElementById("size")
.addEventListener("change", (e) => {
    console.log(e.target.value);
    squares = e.target.value;
    reset();
})
