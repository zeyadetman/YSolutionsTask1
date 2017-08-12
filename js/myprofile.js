followers(cookieJSON(document.cookie));
following(cookieJSON(document.cookie));

function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
}

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
            for(var i=0;i<response['ListOFFollowers'].length;i++){
            userDetails(response['ListOFFollowers'][i]['FollowID'],response['ListOFFollowers'][i]['Name'],'FollowerList');
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

function following(ideee) {
    var data = JSON.stringify({
        "User_ID":ideee['UserID']
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
            for(var i=0;i<response['ListofPepoleFollowing'].length;i++){
            userDetails(response['ListofPepoleFollowing'][i]['FollowID'],response['ListofPepoleFollowing'][i]['Name'],'FollowingList');
            
            console.log(response['ListofPepoleFollowing']);
        }
    }});

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Following/ListofPepole");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d7cff360-5649-80e7-2aba-8a111577e930");

    xhr.send(data);
}

function userDetails(ideee,name1,place){
    var data = JSON.stringify({
  "User_ID": ideee
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var res = JSON.parse(this.responseText); 
    var parent = document.getElementById(place);
    var child = document.createElement('div');
    var img = document.createElement('img');
    var name = document.createElement('h5');
    var address = document.createElement('span');
    parent.appendChild(child);
    child.appendChild(img);
    child.appendChild(name);
    setAttributes(child,{'class':'profilesummary col-md-12'}); 
    setAttributes(img,{'class':'img-responsive img-circle img-bordered-sm center-block','src':res['ImgURL']});
    name.innerHTML = name1;
            
  }
});

xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "2de09ad6-7b24-8463-e1d2-7230ccc4665f");

xhr.send(data);
}