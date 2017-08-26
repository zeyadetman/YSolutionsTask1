function signup() {
    var data = JSON.stringify({
        "Name": document.getElementById('usrnm').value,
        "Login_Type": "1",
        "EMail": document.getElementById('mail').value,
        "Password": document.getElementById('psw').value,
        "CityID": "",
        "ImgURL": "",
        "FacebookID": "",
        "MobileNumber": "",
        "Gender": "",
        "CategoryID": "c29d99dd-5eae-4317-81f9-aec7c0389514"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess'] == true) {
                setCookie('UserID', JSON.parse(this.responseText)['UserID']);
                setCookie('Verified', 'false');
                window.location.replace('/vercode.html');
            } else {
                document.getElementById('signuperror').style.visibility = 'visible';
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Regesteration");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
}

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