
// sticky header

var header = document.getElementById("get-header")
var sticky = header.offsetTop;

// window.onscroll = console.log("scrolling");
window.onscroll = function() {myfunction()};

function myfunction() {
    if(window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
}

//rotating banner



var bannerStatus = 1;
// showSlides(bannerStatus);

// function plusSlide(bannerStatus) {
//     showSlides(bannerStatus += bannerStatus);
// }

// function minusSlide(n) {
//     showSlides(bannerStatus -= bannerStatus);
// }


// document.getElementById("imgbanbtn-next").onclick = function() {plusSlide(bannerStatus)}

// document.getElementById("imgbanbtn-prev").onclick = function() {minusSlide(bannerStatus)}


// function showSlides(bannerStatus) {
//     var i;
//     var track = document.getElementsByClassName("imgban");
//     if(bannerStatus > track.length) {bannerStatus = 1}
//     if(bannerStatus < 1) {bannerStatus = track.length}
//     for (i = 0; i < track.length; i++) {
//         track[i].style.display = "none";
//     }
// }
var bannerTimer = 3000;

window.onload = function(){
    bannerloop();
}

var startBannerLoop = setInterval(function() {
    bannerloop();
}, bannerTimer);

function bannerloop() {
    if(bannerStatus === 1) {
        document.getElementById("imgban2").style.opacity = "0";
        // document.getElementById("imgban3").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban1").style.right = "0px";
            document.getElementById("imgban1").style.zIndex = "1000";
            document.getElementById("imgban2").style.right = "-1200px";
            document.getElementById("imgban2").style.zIndex = "1010";
            document.getElementById("imgban3").style.right = "1200px";
            document.getElementById("imgban3").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban2").style.opacity = "1";
        }, 800);
        bannerStatus = 2;
    }

    else if(bannerStatus === 2) {
        document.getElementById("imgban3").style.opacity = "0";
        // document.getElementById("imgban1").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban2").style.right = "0px";
            document.getElementById("imgban2").style.zIndex = "1000";
            document.getElementById("imgban3").style.right = "-1200px";
            document.getElementById("imgban3").style.zIndex = "1010";
            document.getElementById("imgban1").style.right = "1200px";
            document.getElementById("imgban1").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban3").style.opacity = "1";
        }, 800);
        bannerStatus = 3;
    }
    
    else if(bannerStatus === 3) {
        document.getElementById("imgban1").style.opacity = "0";
        // document.getElementById("imgban2").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban3").style.right = "0px";
            document.getElementById("imgban3").style.zIndex = "1000";
            document.getElementById("imgban1").style.right = "-1200px";
            document.getElementById("imgban1").style.zIndex = "1010";
            document.getElementById("imgban2").style.right = "1200px";
            document.getElementById("imgban2").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban1").style.opacity = "1";
        }, 800);
        bannerStatus = 1;
    }
}

//rotating button function

// document.getElementById("imgbanbtn-prev").onclick = function() {
//     // if(bannerStatus === 1) {
//     //     bannerStatus = 2;
//     // }
//     // else if(bannerStatus === 2) {
//     //     bannerStatus = 3;
//     // }
//     // else if(bannerStatus === 3) {
//     //     bannerStatus = 1;
//     // }
//     bannerloopprev();
// }

// document.getElementById("imgbanbtn-next").onclick = function() {
//     bannerloop();
// }

function bannerloopprev() {
    if(bannerStatus === 1) {
        document.getElementById("imgban1").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban3").style.right = "0px";
            document.getElementById("imgban3").style.zIndex = "1000";
            document.getElementById("imgban1").style.right = "-1200px";
            document.getElementById("imgban1").style.zIndex = "1010";
            document.getElementById("imgban2").style.right = "1200px";
            document.getElementById("imgban2").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban2").style.opacity = "1";
        }, 1000);
        bannerStatus = 3;
    }

    else if(bannerStatus === 2) {
        document.getElementById("imgban3").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban1").style.right = "0px";
            document.getElementById("imgban1").style.zIndex = "1000";
            document.getElementById("imgban3").style.right = "-1200px";
            document.getElementById("imgban3").style.zIndex = "1010";
            document.getElementById("imgban2").style.right = "1200px";
            document.getElementById("imgban2").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban3").style.opacity = "1";
        }, 1000);
        bannerStatus = 1;
    }
    
    else if(bannerStatus === 3) {
        document.getElementById("imgban2").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("imgban2").style.right = "0px";
            document.getElementById("imgban2").style.zIndex = "1000";
            document.getElementById("imgban1").style.right = "-1200px";
            document.getElementById("imgban1").style.zIndex = "1010";
            document.getElementById("imgban3").style.right = "1200px";
            document.getElementById("imgban3").style.zIndex = "990";
        }, 100);
        setTimeout(function() {
        document.getElementById("imgban1").style.opacity = "1";
        }, 1000);
        bannerStatus = 2;
    }
}

$(document).ready(function(){
var forml = $("#forml");
var formr = $("#formr");
var username= $("#idusername");
var email= $("#idemail");
var password = $("#idpassword");


//On Submitting
forml.submit(function(){
    if(email.val().length==0 || password.val().length==0){
                    alert('Please enter the email');
        return false;
                    }
    else
    {
                if(password.val().length==0)
                    {
                        alert('Please enter the password');
                        return false;
                    }

                 else
                    return true;
    }
});


});