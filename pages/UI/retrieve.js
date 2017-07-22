function getCookie(pro) {
    //console.log(document.cookie);
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    //console.log(ca);
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
    //console.log(property);
    var user = getCookie(property);
    if (user != "") {
        return user;
    } else
        return '';
}
for (var x = 0; x < document.getElementsByClassName('user-name').length; x++) {
    console.log(checkCookie('username'));
    document.getElementsByClassName('user-name')[x].innerHTML = checkCookie('username');
}
console.log(checkCookie('education'));
console.log(checkCookie('location'));
document.getElementById('edu').innerHTML = checkCookie('education');
document.getElementById('loca').innerHTML = checkCookie('location');