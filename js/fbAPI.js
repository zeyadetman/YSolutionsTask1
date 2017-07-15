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
        console.log(document.getElementsByClassName('user-name').length);
        for (var x = 0; x < document.getElementsByClassName('user-name').length; x++) {
            document.getElementsByClassName('user-name')[x].innerHTML = response.name;
        }
        document.getElementById('edu').innerHTML = response.education;
        document.getElementById('loca').innerHTML = response.location;
    });
}

function logout() {
    FB.logout(function(response) {
        // 'You are not logged into Facebook.';
    });
}