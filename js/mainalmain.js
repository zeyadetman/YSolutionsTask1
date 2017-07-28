console.log(document.cookie);
var ca = decodeURIComponent(document.cookie).split('=');
var id = ca[ca.length - 1];
console.log(id);

var data = JSON.stringify({
    "User_ID": id
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        for (var x = 0; x < document.getElementsByClassName('user-name').length; x++) {
            document.getElementsByClassName('user-name')[x].innerHTML = JSON.parse(this.responseText)['Name'];
        }
    }
});

xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "ee1b56be-2ef9-0d5e-fc3d-ffb8511a2600");

xhr.send(data);