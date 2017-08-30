endfuserid = cookieJSON(document.cookie)['UserID'];
filler();


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

function addcase() {
    addcasea();
    setTimeout(function() {
        location.reload();
    }, 5000);
}

function addcasea() {

    var data = JSON.stringify({
        "Name": $("#newcasename").val(),
        "Amount": $("#newcaseamount").val(),
        "CategoryID": $("#inputinterests").val(),
        "EndDate": $("#newcaseenddate").val(),
        "CauseDescription": $("#newcasedescription").val(),
        "IMG": $("#uploadcasepicbtn").val(),
        "status": "1",
        "User_ID": endfuserid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            if (JSON.parse(this.responseText)['IsSuccess'] === true) {
                $("#caseresult").html(`Your content was added successfully.`);
            } else {
                $("#caseresult").html(`Error when add content.`);
            }

        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Case/AddCause");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "12c424cc-4c67-03cd-dec0-cbe8b9c43eaa");

    xhr.send(data);
}

function filler() {
    console.log(endfuserid);
    var data = JSON.stringify({
        "User_ID": endfuserid
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText)['AllCasesList']);
            var ros = JSON.parse(this.responseText)['AllCasesList'];
            for (var i = 0; i < ros.length; i++) {
                var firstdiv = document.getElementById('cases');
                var seconddiv = document.createElement('div');
                var firstimg = document.createElement('img');
                var thirddiv = document.createElement('div');
                var firsth4 = document.createElement('h4');
                var small = document.createElement('small');
                var pdescription = document.createElement('p');
                var pamount = document.createElement('p');
                var spanfirst = document.createElement('span');
                var pnoj = document.createElement('p');
                var spannoj = document.createElement('span');
                var pstatus = document.createElement('p');
                var spanstat = document.createElement('span');
                var controlbtns = document.createElement('div');
                var remover = document.createElement('i');
                var editor = document.createElement('i');
                var complete = document.createElement('i');
                $(firstdiv).append(seconddiv);
                $(seconddiv).append(firstimg);
                $(seconddiv).append(thirddiv);
                $(seconddiv).append(controlbtns); //--
                $(thirddiv).append(firsth4);
                $(thirddiv).append(small);
                $(thirddiv).append(pdescription);
                $(thirddiv).append(pamount);
                $(thirddiv).append(spanfirst);
                $(thirddiv).append(pnoj);
                $(thirddiv).append(spannoj);
                $(thirddiv).append(pstatus);
                $(thirddiv).append(spanstat);

                if (ros[i]['status'] == 1) {
                    $(controlbtns).append(remover);
                    $(controlbtns).append(editor);
                    $(controlbtns).append(complete);
                }

                setAttributes(firstdiv, { 'class': 'col-md-12 xx' });
                setAttributes(seconddiv, { 'class': 'col-md-5 xx1', 'id': i });
                setAttributes(firstimg, { 'src': ros[i]['IMG'], 'class': 'img-responsive xx11' });
                setAttributes(thirddiv, { 'class': 'xx11' });
                setAttributes(pdescription, { 'class': 'descriptioncase' });
                setAttributes(pamount, { 'class': 'amount' });
                setAttributes(spanfirst, { 'class': 'enMoney' });
                setAttributes(pnoj, { 'class': 'noj' });
                setAttributes(spannoj, { 'class': 'nnoj' });
                setAttributes(pstatus, { 'class': 'status' });
                setAttributes(spanstat, { 'class': 'stat', 'id': `spanstat${ros[i]['CauseID']}` });
                setAttributes(controlbtns, { 'class': 'col-md-6 xxw' });
                setAttributes(remover, { 'class': 'fa fa-times fa-2x', 'aria-hidden': 'true', 'onclick': `removeyourcase('${ros[i]['CauseID']}',${i})`, 'id': `remover${ros[i]['CauseID']}` }); //--
                setAttributes(editor, { 'class': 'fa fa-pencil-square-o fa-2x', 'aria-hidden': 'true', 'onclick': `edityourcase('${ros[i]['CauseID']}',${i})`, 'id': `editor${ros[i]['CauseID']}` });
                setAttributes(complete, { 'class': 'fa fa-check fa-2x', 'aria-hidden': 'true', 'onclick': `compeletecase('${ros[i]['CauseID']}' , ${i})`, 'id': `compelete${ros[i]['CauseID']}` });
                firsth4.innerHTML = ros[i]['CaseName'];
                small.innerHTML = ros[i]['EndDate'];
                pdescription.innerHTML = ros[i]['CaseDescription'];
                pamount.innerHTML = "Amount:";
                spanfirst.innerHTML = numberWithCommas(ros[i]['Amount']);
                pnoj.innerHTML = "Number of joins:";
                spannoj.innerHTML = ros[i]['Numberofjoins'];
                pstatus.innerHTML = "Status:";
                if (ros[i]['status'] == 1)
                    spanstat.innerHTML = "Not Compelete";
                else
                    spanstat.innerHTML = "Compelete";

            }

        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/User/UserDetails");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "066dfb0a-6395-5495-8b2b-c1e60332f81f");

    xhr.send(data);
}


function compeletecase(caseid, iidd) {
    var data = JSON.stringify({
        "CauseID": caseid,
        "ActionType": "2"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (JSON.parse(this.responseText)['IsSuccess'] == true) {
                $(`#remover${caseid}`).css("display", "none");
                $(`#editor${caseid}`).css("display", "none");
                $(`#compelete${caseid}`).css("display", "none");
                $(`#spanstat${caseid}`).html('Compelete');
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Case/DeleteCause");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "0d4089df-d9be-6f79-01c8-539996ee08f4");

    xhr.send(data);
}

function removeyourcase(caseid, iidd) {

    var aac = window.confirm('Are you really want to delete this case?');
    if (aac == true) {

        var data = JSON.stringify({
            "CauseID": caseid,
            "ActionType": "1"
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                $(`#${iidd}`).css("display", "none");
            }
        });

        xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Case/DeleteCause");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("postman-token", "02840b66-36ab-e4e8-941d-ecddf03f255a");

        xhr.send(data);
    }
}

var res = [];

function edityourcase(caseid, iidd) {
    var xxxxx = document.createElement('a');
    $(`#${iidd}`).append(xxxxx);
    setAttributes(xxxxx, { "href": "#", "data-toggle": "modal", "data-target": ".bs-example2-modal2" });
    $(xxxxx).css("display", "none");
    $(xxxxx).click();

    res = [caseid, iidd];
}

function saveyouredits() {
    var data = JSON.stringify({
        "CauseID": res[0],
        "Name": $('#neweditcasename').val(),
        "Amount": $('#neweditcaseamount').val(),
        "CategoryID": $('#inputeditinterests').val(),
        "EndDate": $('#neweditcaseenddate').val(),
        "CauseDescription": $("#neweditcasedescription").val(),
        "IMG": $("#uploadeditcasepicbtn").val(),
        "status": "1"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText)['IsSuccess']);
            var jjjoo = JSON.parse(this.responseText)['IsSuccess'];
            if (jjjoo == true) {
                $("#editcaseresult").html(`Your content was updated successfully.`);
                setTimeout(function() {
                    location.reload();
                }, 3000);

            } else {
                $("#editcaseresult").html(`Error when add content.`);
            }
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Case/EditCause");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "6b7d1b20-fce8-b181-6382-8be5566a8868");

    xhr.send(data);
    console.log(res);
}