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

// var bannerStatus = 1;
// var bannerTimer = 4000;

// window.onload = function(){
//     bannerloop();
// }

// var startBannerLoop = setInterval(function() {
//     bannerloop();
// }, bannerTimer);

function bannerloop() {
    if(bannerStatus === 1) {
        document.getElementById("imgban2").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban1").style.right = "0px";
            document.getElementById("imgban1").style.zIndex = "1000";
            document.getElementById("imgban2").style.right = "-1300px";
            document.getElementById("imgban2").style.zIndex = "1010";
            document.getElementById("imgban3").style.right = "1300px";
            document.getElementById("imgban3").style.zIndex = "990";
        }, 500);
        setTimeout(function() {
        document.getElementById("imgban2").style.opacity = "1";
        }, 1000);
        bannerStatus = 2;
    }

    else if(bannerStatus === 2) {
        document.getElementById("imgban3").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban2").style.right = "0px";
            document.getElementById("imgban2").style.zIndex = "1000";
            document.getElementById("imgban3").style.right = "-1300px";
            document.getElementById("imgban3").style.zIndex = "1010";
            document.getElementById("imgban1").style.right = "1300px";
            document.getElementById("imgban1").style.zIndex = "990";
        }, 500);
        setTimeout(function() {
        document.getElementById("imgban3").style.opacity = "1";
        }, 1000);
        bannerStatus = 3;
    }

    else if(bannerStatus === 3) {
        document.getElementById("imgban1").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban3").style.right = "0px";
            document.getElementById("imgban3").style.zIndex = "1000";
            document.getElementById("imgban1").style.right = "-1300px";
            document.getElementById("imgban1").style.zIndex = "1010";
            document.getElementById("imgban2").style.right = "1300px";
            document.getElementById("imgban2").style.zIndex = "990";
        }, 500);
        setTimeout(function() {
        document.getElementById("imgban1").style.opacity = "1";
        }, 1000);
        bannerStatus = 1;
    }
}

function jump_fun(){
    if(document.getElementById("payment").value == "Cash on Delivery"){
      console.log("hello");
    }

    if (document.getElementById("payment").value == "Netbanking") {
        console.log("netbanking over here eh")
      window.open("https://paytm.com/");
    }
}