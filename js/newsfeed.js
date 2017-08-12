console.log(document.cookie);
if (document.cookie == '')
    document.location.replace('/Log-in.html');
else {

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

    console.log(cookieJSON(document.cookie)['UserID']);

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    //-------------------------User Details-------------------------------
    var data = JSON.stringify({
        "User_ID": cookieJSON(document.cookie)['UserID']
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            //console.log(JSON.parse(this.responseText)['']);
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "ffdd1d2c-2e3b-a7f1-0136-78d1551f6bb0");

    xhr.send(data);


    //--------------------Newsfeed---------------------------
    var data = JSON.stringify({
        "User_ID": "edb9165e-3852-4826-8832-48e928b80321"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
            console.log(JSON.parse(this.responseText)['MyANDJoinedCasesList'].length);
            console.log(JSON.parse(this.responseText));
            stter('MyANDJoinedCasesList', 'minecol', JSON.parse(this.responseText));
            stter('FollowingCassesList', 'followingcol', JSON.parse(this.responseText));


        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Newsfeed");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "9f9840a3-3897-06a4-29c5-2f356949f5e3");

    xhr.send(data);


    function stter(stri, stri1, response) {
        for (var i = 0; i < response[stri].length; i++) {
            var a = document.createElement('div');
            var w = document.getElementById(stri1);
            w.appendChild(a);
            var b = document.createElement('div');
            a.appendChild(b);
            var c = document.createElement('div');
            b.appendChild(c);
            var imga = document.createElement('img');
            var span1 = document.createElement('span');
            var span1a = document.createElement('a');
            span1.appendChild(span1a);
            var span2 = document.createElement('span');
            span2.innerHTML = response[stri][i]['EndDate'];
            c.append(imga);
            c.append(span1);
            c.append(span2);
            setAttributes(imga, { 'class': 'img-circle', 'src': document.createTextNode(response[stri][i]['IMG']), 'alt': 'User Image' });
            setAttributes(span1, { 'class': 'username' });
            span1.setAttribute('a', '#');
            span1a.innerHTML = response[stri][i]['CaseName'];
            setAttributes(span2, { 'class': 'description' });
            a.setAttribute('class', 'box box-widget');

            b.setAttribute('class', 'box-header with-border');
            c.setAttribute('class', 'user-block');
            var e = document.createElement('div');
            w.appendChild(e);
            var imge = document.createElement('img');
            e.appendChild(imge);
            var pe = document.createElement('p');
            e.appendChild(pe);
            pe.innerHTML = response[stri][i]['CaseName'];
            setAttributes(imge, { 'class': 'img-responsive pad', 'src': document.createTextNode(response[stri][i]['IMG']), 'alt': 'Photo' });
            e.setAttribute('class', 'box-body');
        }
    }
}

function signout() {
    document.cookie = "UserID=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Verified=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
    document.location.replace('/Log-in.html');
}