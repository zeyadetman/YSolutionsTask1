var data = JSON.stringify({
        "Body": "Hello",
        "Subject": "Test",
        "TO": "zeyadetman@gmail.com"
    }),
    xhr = new XMLHttpRequest();

xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        console.log(this.responseText);
        if (this.readyState === 4 && this.responseText) {
            $(".success").fadeIn().delay(3000).fadeOut();
        } else {
            $(".fail").fadeIn().delay(3000).fadeOut();
        }
    }
});

xhr.open("POST", "http://yakensolution.cloudapp.net/SendEmail/Api/SendMail/SendMail");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");

xhr.send(data);