window.fbAsyncInit = function() {
    FB.init({
        appId: '1536933016358765',
        autoLogAppEvents: true,
        status: true,
        xfbml: true,
        version: 'v2.9'
    });
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            connecter = true;
            getInfo();
        }
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            document.getElementById('signin').click();
        }
    }, {
        scope: 'email,public_profile,publish_actions,user_birthday,user_location,user_hometown,user_education_history'
    });
}

window.onload = function() {
    FB.getLoginStatus(function(response) {

    });
};

function getInfo() {
    FB.api('/me', 'GET', {
        fields: 'first_name,last_name,age_range,birthday,name,id,education,hometown,location,email'
    }, function(response) {

        for (var x = 0; x < document.getElementsByClassName('user-name').length; x++) {

            document.getElementsByClassName('user-name')[x].innerHTML = checkCookie('username');
        }
        //document.getElementById('edu').innerHTML = checkCookie('education');
        // document.getElementById('loca').innerHTML = checkCookie('location');
    });
}

function logout() {
    FB.logout(function(response) {
        // 'You are not logged into Facebook.';
    });
}


function setCookie(pro, val) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = pro + '=' + val + ";" + expires + ";path=/";

}

function getCookie(pro) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var x = '',
            y = '';
        var test = 1;
        for (var j = 0; j < ca[i].length; j++) {
            if (ca[i][j] != '=' && test == 1) {
                x += ca[i][j];
            } else if (ca[i][j] == '=') test = 0;
            else {
                y += ca[i][j];
            }
        }
        x = x.replace(/ /g, '');
        if (x == pro) { return y; }
    }
    return '';
}

function checkCookie(property) {
    var user = getCookie(property);
    if (user != "") {
        return user;
    } else
        return '';
}