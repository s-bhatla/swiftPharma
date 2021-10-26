




var header = document.getElementById("get-header")
var sticky = header.offsetTop;

window.onscroll = console.log("scrolling");
window.onscroll = function() {myfunction()};

function myfunction() {
    if(window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
}