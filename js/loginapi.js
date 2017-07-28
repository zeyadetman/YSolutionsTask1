function sending() {
    var data = JSON.stringify({
        "Email": document.getElementById('mail').value,
        "Password": document.getElementById('password').value
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            setCookie('User_ID', JSON.parse(this.responseText)['User_ID']);
            if (JSON.parse(this.responseText)['IsSuccess'] == true) {
                if (JSON.parse(this.responseText)['Is_Verified'] == true) {
                    document.getElementById('signin').click();
                    document.location.replace('newsfeed.html');
                } else {
                    window.location.replace('/vercode.html');
                }
            } else {
                document.getElementById('loginerror').style.display = "block";
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Login");
    xhr.setRequestHeader("content-type", "application/json");
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