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

var originaliid = cookieJSON(document.cookie)['UserID'];
inbox();

function inbox() {
    var data = JSON.stringify({
        "User_ID": '8081c15c-4247-4c31-a2c6-569ed5996dd0' //originaliid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText)['ListOfMasseges']);
            var rcs = JSON.parse(this.responseText)['ListOfMasseges'];
            for (var i = 0; i < rcs.length; i++) {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var ali = document.createElement('a');
                var chk = document.createElement('input');
                $(".tbodyinbox").append(tr);
                $(tr).append(td2, td3, td4);
                $(td2).append(ali);
                setAttributes(td2, { 'class': 'mailbox-name' });
                setAttributes(ali, { 'onclick': `readmail('${rcs[i]['FromID']}','${rcs[i]['ThreadID']}')` });
                setAttributes(td3, { 'class': 'mailbox-subject' });
                setAttributes(td4, { 'class': 'mailbox-date' });
                if (rcs[i]['IsMine'] == true) {
                    $(td3).html(`You:${rcs[i]['MSGBoody'].match(/.{1,15}/g)[0]}...`);
                    if (rcs[i]['IsSeen'] == true)
                        $(td3).css("font-weight", "bold");
                } else if (rcs[i]['IsMine'] == false) {
                    $(td3).html(`${(rcs[i]['MSGBoody']).match(/.{1,15}/g)[0]}...`);
                    if (rcs[i]['IsSeen'] == true)
                        $(td3).css("font-weight", "bold");
                }
                $(ali).html(rcs[i]['Name']);
                $(td4).html((rcs[i]['Date']).split('T')[0]);

            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Messeging/Inbox");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "a4a8c7f2-7ec2-29cc-fb8b-96d6085a2138");

    xhr.send(data);
}

/****** Set More Attribute ******/
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
/****** Finish Set More Attribute ******/

function readmail(fromdi, threaddi) {
    var data = JSON.stringify({
        "ThreadID": threaddi,
        "MasgDate": "1/1/9999",
        "User_ID": originaliid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            var ttt = JSON.parse(this.responseText)['UserName'];
            //$(".frroom span").html(JSON.parse(this.responseText)['Date']);
            var rfs = JSON.parse(this.responseText)['MSgs'];
            console.log(rfs.length);
            for (var i = 0; i < rfs.length; i++) {
                console.log(rfs[i]);
                $(".frroom").html(`${ttt}<span class="mailbox-read-time pull-right">${rfs[i]['Date']}</span>`);
                $(".mailbox-read-message p").html(rfs[i]['MSGBoody']);
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Messeging/RecieveMassege");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c21e77ad-23aa-4d5c-762a-c320b6e0d25a");

    xhr.send(data);
}