/** Call Followers and Following lists */
followers(cookieJSON(document.cookie));
following(cookieJSON(document.cookie));

originalid = cookieJSON(document.cookie)['UserID'];
/** Finish Call Followers and Following lists */

/**
 * Variables
 */
unfollowissuc = '';
unfollowerror = '';

followerslist = [];
followinglist = [];


console.log(cookieJSON(document.cookie)['UserID']);


//console.log(document.getElementById('ck-span').innerHTML);

function checker123() {
    if (document.getElementById('ck-input').checked)
        document.getElementById('ck-span').innerHTML = 'blue';
    console.log(document.getElementById('ck-span').innerHTML);
}

/****** Set More Attribute ******/
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
/****** Finish Set More Attribute ******/

/****** Retrieve Followers List API ******/
function followers(ideee) {
    var data = JSON.stringify({
        "User_ID": ideee['UserID']
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            var followers_count = document.getElementsByClassName('followers-count');
            for (var i = 0; i < followers_count.length; i++) {
                followers_count[i].innerHTML = response['ListOFFollowers'].length;
            }
            for (var i = 0; i < response['ListOFFollowers'].length; i++) {
                followerslist.push(response['ListOFFollowers'][i]['FollowID']);
                //userDetails(response['ListOFFollowers'][i]['FollowID'], response['ListOFFollowers'][i]['Name'], 'FollowerList');
                //userDetails(,);
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Following/ListofFollowers");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c83dc730-4fa1-7b35-66aa-f271852a970d");

    xhr.send(data);
}

/****** Finish Retrieve Followers List API******/


/****** Read Cookie ******/
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
/****** Finish Read Cookie ******/

/****** Retrieve Following List API******/
function following(ideee) {
    var data = JSON.stringify({
        "User_ID": ideee['UserID']
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var following_count = document.getElementsByClassName('following-count');
            for (var i = 0; i < following_count.length; i++) {
                following_count[i].innerHTML = response['ListofPepoleFollowing'].length;
            }
            for (var i = 0; i < response['ListofPepoleFollowing'].length; i++) {
                //userDetails(response['ListofPepoleFollowing'][i]['FollowID'], response['ListofPepoleFollowing'][i]['Name'], 'FollowingList');
                followinglist.push(response['ListofPepoleFollowing'][i]['FollowID']);
                console.log(response['ListofPepoleFollowing']);
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Following/ListofPepole");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d7cff360-5649-80e7-2aba-8a111577e930");

    xhr.send(data);
}
/****** Finish Retrieve Following List API******/

console.log(followerslist, followinglist);
console.log(JSON.stringify(followerslist));
setTimeout(function() {
    console.log(followerslist.length);
    for (var i = 0; i < followerslist.length; i++) {
        console.log(followerslist[i]);
        userDetails(followerslist[i], 'FollowerList');
    }

    console.log(followinglist.length);
    for (var i = 0; i < followinglist.length; i++) {
        console.log(followinglist[i]);
        userDetails(followinglist[i], 'FollowingList');
    }


}, 1000);


/****** Retrieve Users data API******/
function userDetails(ideee, place) {
    console.log('1');
    var data = JSON.stringify({
        "User_ID": ideee
    });

    var originuser = cookieJSON(document.cookie)['UserID'];
    var secondaryuser = ideee;

    var labl = ''; //span follow or not
    if (place == 'FollowerList') {
        if (followinglist.indexOf(ideee) >= 0) {
            labl = 'Unfollow';
        } else {
            labl = 'Follow';
        }
    } else if (place == 'FollowingList') {
        labl = 'Unfollow';
    }
    console.log(labl);


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var res = JSON.parse(this.responseText);
            var parent = document.getElementById(place);
            var child = document.createElement('div');
            var img = document.createElement('img');
            var name = document.createElement('h5');
            var address = document.createElement('p');
            parent.appendChild(child);
            child.appendChild(img);
            child.appendChild(name);
            child.appendChild(address);
            setAttributes(child, { 'class': 'profilesummary col-md-4' });
            setAttributes(img, { 'class': 'img-responsive img-circle img-bordered-sm center-block', 'src': res['ImgURL'] });
            setAttributes(address, { 'class': 'text-center' });
            name.setAttribute('class', 'text-center');
            address.innerHTML = res['Address'];
            name.innerHTML = res['Name'];
            var btnck = document.createElement('div');
            child.appendChild(btnck);
            var lblck = document.createElement('label');
            btnck.appendChild(lblck);
            var inpck = document.createElement('input');
            lblck.appendChild(inpck);
            var spa = document.createElement('span');
            lblck.appendChild(spa);
            spa.innerHTML = labl;
            setAttributes(btnck, { 'id': 'ck-button', 'class': 'center-block text-center' });
            setAttributes(lblck, { 'class': 'center-block text-center' });
            setAttributes(inpck, { 'class': 'center-block text-center', 'type': 'checkbox', 'value': '1', 'id': 'ck-input' });
            setAttributes(spa, { 'id': 'ck-span', 'class': 'center-block text-center', 'onclick': `followaction('${ideee}')` });
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "2de09ad6-7b24-8463-e1d2-7230ccc4665f");

    xhr.send(data);
}
/****** Finish Retrieve Users Data API******/


/****** Unfollow User API******/
function unfollow(originuser1, secondaryuser1) {
    console.log('1');
    var data = JSON.stringify({
        "User_ID": originuser1,
        "UNFollowingID": secondaryuser1
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var x = this.responseText;
            console.log(x);
            unfollowissuc = JSON.parse(this.responseText)['IsSuccess'];
            unfollowerror = JSON.parse(this.responseText)['ErrorMessage'];
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UNFollow");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "47e11146-fec1-3ce8-63d1-2345db2eb95b");

    xhr.send(data);
}
/****** Finish Unfollow User API******/

/****** Follow User API******/
function follow(originuser1, secondaryuser1) {
    var data = JSON.stringify({
        "User_ID": originuser1,
        "FollowingID": secondaryuser1
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/Follow");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "33720b9a-3a66-8f74-5aca-10b647ecc77c");

    xhr.send(data);
}
/****** Finish follow User API******/

function followaction(ideee) {
    if (followinglist.indexOf(ideee) >= 0) {
        console.log(ideee);
        console.log('unfollow');
        unfollow(originalid, ideee);
        //followers(cookieJSON(document.cookie));
        //following(cookieJSON(document.cookie));
        location.reload();

    } else {
        console.log(ideee);
        console.log('follow');
        follow(originalid, ideee);
        //followers(cookieJSON(document.cookie));
        //following(cookieJSON(document.cookie));
        location.reload();
    }
}