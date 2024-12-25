var gameboard = [
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
]


mainTxt = document.getElementById("board").innerHTML;
var f=0
for (let k = 0; k < 9; k++) {
    
    i = Math.floor(k/3)

    if(k==3||k==6||f){i*=3;f=1;}

    divTxt = "<div id=\"user_btns\">\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"0\">"+k+"</button>\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"1\">"+k+"</button>\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"2\">"+k+"</button>"

    divTxt += "<button  disabled class=\"tile"+(i+1)+"\" id=\""+k+"3\">"+k+"</button>\
            <button  disabled class=\"tile"+(i+1)+"\" id=\""+k+"4\">"+k+"</button>\
            <button  disabled class=\"tile"+(i+1)+"\" id=\""+k+"5\">"+k+"</button>"

    divTxt += "<button  disabled class=\"tile"+(i+2)+"\" id=\""+k+"6\">"+k+"</button>\
            <button  disabled class=\"tile"+(i+2)+"\" id=\""+k+"7\">"+k+"</button>\
            <button  disabled class=\"tile"+(i+2)+"\" id=\""+k+"8\">"+k+"</button>\
        </div>"
    
    mainTxt += divTxt;
}

document.getElementById("board").innerHTML = mainTxt;

k=0;
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        gameboard[i][j] = k++;
        document.getElementById(i+""+j).innerText = gameboard[i][j];
        // gameboard[i][j] = val;
    }
    
}