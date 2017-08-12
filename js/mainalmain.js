function cookieJSON(x) {
    var ca = decodeURIComponent(x).split('=');
    var list = [];
    for (var i = 0; i < ca.length; i++) {
        if (!i % 2)
            list.push(ca[i]);
        else {
            ca[i] = ca[i].split('; ');
            list.push(ca[i][0]);
            list.push(ca[i][1]);
        }
    }
    var dic = [];
    console.log(list);
    for (var i = 0; i < list.length; i += 2) {
        dic[list[i]] = list[i + 1];
    }
    console.log(dic['UserID']);
    console.log(dic['Verified']);
    return dic;
}

var data = JSON.stringify({
    "User_ID": cookieJSON(document.cookie)['UserID']
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        console.log(this.responseText);
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