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
console.log(cookieJSON(document.cookie));

function checker() {
    var data = JSON.stringify({
        "User_ID": cookieJSON(document.cookie)['UserID'],
        "VerficationCode": document.getElementById('usrid').value
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess']) {
                setCookie('Verified', JSON.parse(this.responseText)['UserID']);
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