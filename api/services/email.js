var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
var jwt = require('jsonwebtoken');

async function sendEmail(UserEmail) {
    var token = jwt.sign({ foo: UserEmail }, 'shhhhh');
    var link = "http://localhost:80/api/verif?adresse=" + UserEmail + "&token=" + token;    

    await Email.send({
        Host : "smtp.elasticemail.com",
        Username : "matthiasvirassamy@gmail.com",
        Password : "5C676A05496A108865DA5BEDE3B755976A6C",
        To : UserEmail,
        From : "matthiasvirassamy@gmail.com",
        Subject : "Verify your email address",
        Body : "<html><h2>Verify your email address</h2><strong>To start using Dashboard, just click one the link: </strong><br></br><em>" + link + "</em></html>", 
       });
    return token;
}

async function ForgotEmail(UserEmail) {
    var token = jwt.sign({ foo: UserEmail }, 'shhhhh');
    var link = "http://localhost:80/api/resetPassword?adresse=" + UserEmail + "&token=" + token;    

    await Email.send({
        Host : "smtp.elasticemail.com",
        Username : "matthiasvirassamy@gmail.com",
        Password : "5C676A05496A108865DA5BEDE3B755976A6C",
        To : UserEmail,
        From : "matthiasvirassamy@gmail.com",
        Subject : "Reset Your Password",
        Body : "<html><h2>Verify your email address</h2><strong>Hi! We got a request to reset your Dashboard password.</strong><br></br><em>" + link + "</em></html>", 
       });
    return token;
}

exports.sendEmail = sendEmail;