console.log('usremail');
console.log(document.cookie);

function reset2() {
    console.log(document.getElementById('usremail').value);
    var data = JSON.stringify({
        "EMail": document.getElementById('usremail').value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess'] === true) {
                console.log('111');
                document.getElementById('errormsg22').innerHTML = JSON.parse(this.responseText)['ErrorMessage'];
                location.replace('NewPassword.html');
                //document.getElementById('errormsg').style.visibility = 'inline';
            } else {
                console.log(JSON.parse(this.responseText)['IsSuccess']);
                document.getElementById('errormsg22').innerHTML = JSON.parse(this.responseText)['ErrorMessage'];

                //document.getElementById('errormsg').style.visibility = 'inline';
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/ForgetPassword");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "41dbb018-eb27-2ab2-400c-601a7c45c8ff");

    xhr.send(data);
}

function setter() {
    var data = JSON.stringify({
        "Email": document.getElementById('mail').value,
        "Password": document.getElementById('psw').value,
        "ConfirmPassword": document.getElementById('psw2').value,
        "VerficationCode": document.getElementById('vercode').value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText)['ErrorMessage']);
            console.log(JSON.parse(this.responseText)['IsSuccess']);
            if (JSON.parse(this.responseText)['IsSuccess'] == true)
                document.getElementById('signuperror').innerHTML = 'The password already changed. Want to <a href="/Log-in.html">login</a>';
            else if (JSON.parse(this.responseText)['IsSuccess'] == false)
                document.getElementById('signuperror').innerHTML = 'Wrong Verification Code. Want to resend it visit <a href="/Reset-password.html">recover your password</a>';
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/ResetPassword");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "fba94788-5d13-5a92-8d04-97193412d70e");

    xhr.send(data);
}

function reset211() {
    var data = JSON.stringify({
        "Email": $("#usrresetemail").val(),
        "Password": $("#usrresetpassword").val(),
        "ConfirmPassword": $("#usrresetrepassword").val(),
        "VerficationCode": $("#usrresetverif").val()
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            if (JSON.parse(this.responseText)['IsSuccess'] == true)
                location.replace("Log-in.html");
            else if (JSON.parse(this.responseText)['IsSuccess'] == false) {
                $("#errormsg211").css("visibility", "visible");
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/ResetPassword");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "00771751-53ab-ac08-3627-c33746279377");

    xhr.send(data);
}