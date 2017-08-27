/** Call Followers and Following lists */
followers(cookieJSON(document.cookie));
following(cookieJSON(document.cookie));

countriesandcities = [];
countrieslist = [{}];
generalinfo = [];

originalid = cookieJSON(document.cookie)['UserID'];
/** Finish Call Followers and Following lists */

/**
 * Variables
 */
unfollowissuc = '';
unfollowerror = '';

followerslist = [];
followinglist = [];


listsfiller();


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
    //console.log(list);
    for (var i = 0; i < list.length; i += 2) {
        dic[list[i]] = list[i + 1];
    }
    //console.log(dic['UserID']);
    //console.log(dic['Verified']);
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
            // console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var following_count = document.getElementsByClassName('following-count');
            for (var i = 0; i < following_count.length; i++) {
                following_count[i].innerHTML = response['ListofPepoleFollowing'].length;
            }
            for (var i = 0; i < response['ListofPepoleFollowing'].length; i++) {
                //userDetails(response['ListofPepoleFollowing'][i]['FollowID'], response['ListofPepoleFollowing'][i]['Name'], 'FollowingList');
                followinglist.push(response['ListofPepoleFollowing'][i]['FollowID']);
                //console.log(response['ListofPepoleFollowing']);
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


//console.log(followerslist, followinglist);
//console.log(JSON.stringify(followerslist));

function listsfiller() {
    setTimeout(function() {
        //      console.log(followerslist.length);
        for (var i = 0; i < followerslist.length; i++) {
            //        console.log(followerslist[i]);
            userDetails(followerslist[i], 'FollowerList');
        }

        //  console.log(followinglist.length);
        for (var i = 0; i < followinglist.length; i++) {
            //    console.log(followinglist[i]);
            userDetails(followinglist[i], 'FollowingList');
        }

        $("#followerlistcountermain").html(`Followerlist ${followerslist.length}`);
        $("#followinglistcountermain").html(`Followinglist ${followinglist.length}`);
        aboutme(originalid);
    }, 300);
}

setTimeout(function() {
    for (var i = 0; i < countrieslist.length; i++) {
        cities1(countrieslist[i]['countryid'], countrieslist[i]['countryname']);
    }
    console.log(countriesandcities);
    cowboy(countriesandcities);

}, 600);


/****** Retrieve Users data API******/
function userDetails(ideee, place) {
    //  console.log('1');
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
    //console.log(labl);


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
            address.innerHTML = `Address: ${res['Address']}`;
            //address.innerHTML = res['Address'];
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
    //console.log('1');
    var data = JSON.stringify({
        "User_ID": originuser1,
        "UNFollowingID": secondaryuser1
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var x = this.responseText;
            // console.log(x);
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
        // console.log(ideee);
        // console.log('unfollow');
        unfollow(originalid, ideee);
        //followers(cookieJSON(document.cookie));
        //following(cookieJSON(document.cookie));
        location.reload();

    } else {
        // console.log(ideee);
        // console.log('follow');
        follow(originalid, ideee);
        //followers(cookieJSON(document.cookie));
        //following(cookieJSON(document.cookie));
        location.reload();
    }
}

$(window).load(function() {
    $('.preloader').fadeOut(6000); // set duration in brackets 

});

useraddressid = '';

$(function() {
    $("div").slice(0, 6).show();
    $("#loadMore").on('click', function(e) {
        e.preventDefault();
        $("div:hidden").slice(0, 6).slideDown();
        if ($("div:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});

function aboutme(riginalid) {
    console.log(riginalid);
    var data = JSON.stringify({
        "User_ID": riginalid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var ww = JSON.parse(this.responseText);
            console.log(ww['Address']);

            console.log(ww);
            generalinfo = ww;
            useraddressid = ww['Address']
            $(".aboutmeprofileimage").attr("src", ww['Img']);
            $("#avatarbaby").attr("src", ww['Img']);
            $("#mapmarkerpng").html(ww['Address']);
            $("#emailspng").html(ww['EMail']);
            $("#aboutmeusername").html(ww['Name']);
            $("#phone").html(ww['MobileNumber']);
            $("#gmailpng").html(ww['GMailID']);
            $("#facebookpng").html(ww['FacebookID']);
            if (ww['IsTrusted'] == true) {
                var x = document.createElement('img');
                $("#fffggg").append(x);
                $(x).addClass("img-responsive verifiedperson");
                x.setAttribute("src", "../../verified.png");
            } else if (ww['IsTrusted'] == false) {
                //  $("#verificationicon").css("display", "none");
            }
            $('#counterssfollowers').html(numberWithCommas(followerslist.length));
            $('#counterssfollowing').html(numberWithCommas(followinglist.length));
            $('#counterssmycases').html(numberWithCommas(ww['MyCases'].length));
            $('#counterssreviews').html(numberWithCommas(ww['ReviewNumbers']));

            $(".btnuploadpic").css("background-image", `url(${ww['Img']})`);

            $("#inputName").attr("placeholder", ww['Name']);
            $("#inputEmail").attr("placeholder", ww['EMail']);
            $("#inputmobile").attr("placeholder", ww['MobileNumber']);

        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "b1b3432f-b46b-67ee-d670-1ac24cb84ab2");

    xhr.send(data);

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


countries();
console.log(countrieslist);


function countries() {
    var data = JSON.stringify({});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var res = JSON.parse(this.responseText);
            //$("#inputcountry");
            for (var i = 0; i < res['AllCountries'].length; i++) {
                countrieslist.push({ countryid: res['AllCountries'][i]['CountryID'], countryname: res['AllCountries'][i]['Countryname'] });
                var ex = document.createElement('option');
                $("#inputcountry").append(ex);
                setAttributes(ex, { 'value': res['AllCountries'][i]['CountryID'] });
                ex.innerHTML = res['AllCountries'][i]['Countryname'];
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Country/AllCountries");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "5ecefa47-a7e4-088d-3226-3a271f99a62c");

    xhr.send(data);
}

function cities(kntre) {
    var data = JSON.stringify({
        "CountryID": kntre
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var res = JSON.parse(this.responseText);
            for (var i = 0; i < res['AllCities'].length; i++) {
                var ex = document.createElement('option');
                $("#inputcity").append(ex);
                setAttributes(ex, { 'value': res['AllCities'][i]['CityID'] });
                ex.innerHTML = res['AllCities'][i]['CityName'];
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Country/AllCities");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "db97af10-4a84-0911-6c44-6676fca5845f");

    xhr.send(data);
}



function cities1(kntre, kntrename) {
    var data = JSON.stringify({
        "CountryID": kntre
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var res = JSON.parse(this.responseText);

            if (res['AllCities'] != null) {
                console.log(res['AllCities'], res['AllCities'].length);
                for (var i = 0; i < res['AllCities'].length; i++) {
                    countriesandcities.push({ cityid: res['AllCities'][i]['CityID'], cityname: res['AllCities'][i]['CityName'], countryid: kntre, countryname: kntrename });
                }
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Country/AllCities");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "db97af10-4a84-0911-6c44-6676fca5845f");

    xhr.send(data);
}

function changeFunc() {
    $("#inputcountry :selected").text(); // The text content of the selected option
    $("#inputcountry").val();
    console.log($("#inputcountry").val());
    $('#inputcity')
        .find('option')
        .remove()
        .end()
        .append('<option value="">Default option</option>')
    cities($("#inputcountry").val());
}

function cityFunc() {
    $("#inputcity :selected").text(); // The text content of the selected option
    $("#inputcity").val();
    console.log($("#inputcity :selected").text(),
        $("#inputcity").val()
    );
}


setTimeout(GetAllCategories(), 500);

//not finished//
function GetAllCategories() {
    console.log('22');
    var data = JSON.stringify({
        "User_ID": originalid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            var res = JSON.parse(this.responseText)['AllCategories'];
            for (var i = 0; i < res.length; i++) {
                var ex = document.createElement('option');
                var ex1 = document.createElement('option');
                $("#inputinterests").append(ex1);
                $("#inputeditinterests").append(ex);
                setAttributes(ex, { 'value': res[i]['CategoryID'] });
                setAttributes(ex1, { 'value': res[i]['CategoryID'] });
                ex.innerHTML = res[i]['CategoryName'];
                ex1.innerHTML = res[i]['CategoryName'];
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Category/GetAllCategories");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "03ccebbb-48d7-3f3f-16ea-3e957c6da926");

    xhr.send(data);
}
//- ---------------- -//

function cowboy(countriesandcities) {
    setTimeout(function() {
        for (var i = 0; i < countriesandcities.length; i++) {
            if (countriesandcities[i]['cityid'] == useraddressid) {
                console.log(countriesandcities[i]);
            }
        }
    }, 500);
}

function validation() {
    console.log('22');
    if ($("#inputpassword").val() !== $("#inputrepassword").val()) {
        alert('enter correct password');
    } else {
        console.log($("#yourenotbeauty").val());
        addimage();
        finallyedit();
        setTimeout(function() {
            location.reload();
        }, 6000);
    }
}

function addimage() {
    var data = $("#yourenotbeauty").val();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", `http://yakensolution.cloudapp.net/Charity/Api/User/AddPicture?User_ID=${originalid}`);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "2cc1bc27-c042-5eaa-3abb-fc0fb36de568");

    xhr.send(data);
}

function finallyedit() {
    console.log(originalid);
    console.log(generalinfo);
    var name = '';
    var email = '';
    var password = '';
    var gender = '';
    var mobile = '';
    var address = '';
    var interested = '';

    if ($("#inputName").val() == '') {
        name = generalinfo['Name'];
    } else {
        name = $("#inputName").val();
    }
    email = generalinfo['EMail'];
    password = $("#inputpassword").val();
    if ($("#inputgender").val() == '0') {
        gender = generalinfo['Gender'];
    } else {
        gender = $("#inputgender").val();
    }
    if ($("#inputmobile").val() == '') {
        mobile = generalinfo['MobileNumber'];
    } else {
        mobile = $("#inputmobile").val();
    }
    if ($("#inputcity").val() == '0') {
        address = generalinfo['Address'];
    } else {
        address = $("#inputcity").val();
    }

    if ($("#inputinterests").val() == '0') {
        interested = generalinfo['InterstedCategory'];
    } else {
        interested = $("#inputinterests").val();
    }

    console.log(name, address, password, email, mobile, gender, interested);
    var data = JSON.stringify({
        "UserID": originalid,
        "Name": name,
        "Password": password,
        "EMail": email,
        "MobileNumber": mobile,
        "Address": address,
        "Gender": gender,
        "InterestedCategory": interested
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/EditProfile");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "ecea19fc-31b4-3424-556d-c81233c5aa43");

    xhr.send(data);
}