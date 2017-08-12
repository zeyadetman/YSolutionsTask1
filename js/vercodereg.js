var ca = decodeURIComponent(document.cookie).split(';');
var id = ca[1].split('=');


function checker() {
    var data = JSON.stringify({
        "User_ID": id[1],
        "VerficationCode": document.getElementById('usrid').value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess']) {
                window.location.replace('/Log-in.html');
            } else {
                document.getElementById('usrid').value = '';
                document.getElementById('errormsg').style.display = 'inline';
            }


        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/VerfiedAccnt");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d2d0f54e-4ab2-b163-b893-82f010cb6a6b");

    xhr.send(data);
}

//-----------------------------------
function setCookie(pro, val) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = pro + '=' + val + ";" + expires + ";path=/";
}

function getCookie(pro) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split('=');
    return ca[1];
}

function deleteCookie(property) {
    document.cookie = "User_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}