var pass = "hxbxxyzz";

do
pass = nextPassword(pass);
while (!testPassword(pass))

console.log(pass);

function testPassword(password) {
    if (!/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/g.test(password)) return false;
    if (/[iol]/g.test(password)) return false;
    if ((password.match(/(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/g) || []).length < 2) return false;
    return true;
}

function replaceAt (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function nextPassword(password) {
    var index = password.length - 1;
    password = replaceAt(password, index, String.fromCharCode(password.charCodeAt(index) + 1));
    while (password.includes("{")) {
        index = password.indexOf("{");
        password = replaceAt(password, index, "a");
        password = replaceAt(password, index - 1, String.fromCharCode(password.charCodeAt(index - 1) + 1));
    }
    while (password.includes("i")) {
        index = password.indexOf("i");
        password = replaceAt(password, index, "j");
    }
    while (password.includes("o")) {
        index = password.indexOf("o");
        password = replaceAt(password, index, "p");
    }
    while (password.includes("l")) {
        index = password.indexOf("l");
        password = replaceAt(password, index, "m");
    }
    console.log(password);
    return password;
}