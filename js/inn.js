console.log(document.cookie);

console.log(cookieJSON(document.cookie));
if (cookieJSON(document.cookie)['Verified'] == 'true') {
    window.location.replace('/newsfeed.html');
}

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