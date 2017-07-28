var ca = decodeURIComponent(document.cookie).split('=');
var id = ca[1];

function checker() {
    var data = JSON.stringify({
        "User_ID": id,
        "VerficationCode": document.getElementById('usrid').value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess']) {
                window.location.replace('/newsfeed.html');
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