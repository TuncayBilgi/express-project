function getCookie(name) {
    var cookie, c;
    cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        c = cookies[i].split('=');
        if (c[0] == name) {
            return c[1];
        }
    }
    return "";
}

const score = getCookie(' score');
console.log(score);
document.querySelector('#scorefjoefef').innerHTML = score;