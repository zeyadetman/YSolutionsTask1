var data = JSON.stringify({
    "Email": document.getElementById('mail').value,
    "Password": document.getElementById('mail').value
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Login");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "0b6e9c11-d254-c386-e67b-804a53a6c272");

function sending() {
    var result = xhr.send(data);
    if (result.Is_Verified == true) {
        if (result.IsSuccess == true)
            document.getElementById('signin').click();
        else
            document.getElementById('mmm').click(); //modal appears
    }
}

xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/VerfiedAccnt");


function checker() {
    if (document.getElementById('verificationcode').value == userId.VerficationCode)
        document.getElementById('signin').click();
    else document.getElementById('mmm').click(); //modal reopen
}



//--------registeration----------
xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Regesteration");
var data3 = JSON.stringify({
    "Name": document.getElementById('usrnm').value,
    "EMail": document.getElementById('mail').value,
    "Password": document.getElementById('psw').value,
});

function checkerup() {
    var res = xhr.send(data3);
    if (res.IsSuccess == false) {
        takken();
    } else {
        document.getElementById('mmm').click(); //modal appears
    }
}

function takken() {
    document.getElementById('mmm').click();
    document.getElementById('taken').innerHTML = "already taken";
    document.getElementById('taken').style.color = "red";
}