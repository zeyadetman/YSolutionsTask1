var id1 = '29fab372-37c8-4deb-a5ef-3ab8a23ae3ab'; //dh asasy
var id2 = 'c67ae14b-f9c2-4c55-8fd4-115b50faee17'; //dh 3amlo follow

function listfollowers() {
    var data = JSON.stringify({
        "User_ID": "29fab372-37c8-4deb-a5ef-3ab8a23ae3ab"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://yakensolution.cloudapp.net/Charity/Api/Following/ListofFollowers");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d7e69fe4-d04e-6738-e904-1de2655f5cdf");

    xhr.send(data);
}