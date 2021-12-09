const length = 35651584;
let data = "11101000110010100";

while (data.length < length) {
    data = data + "0" + data.split("").reverse().join("").replace(/0/g, "2").replace(/1/g, "0").replace(/2/g, "1");
}
data = data.substr(0, length);

while (data.length % 2 == 0) {
    const split = data.split("");
    let result = "";
    for (let i = 0; i < split.length; i+=2) {
        if (split[i]==split[i+1]) result += "1";
        else result += "0";
    }
    data = result;
}

console.log(data)
