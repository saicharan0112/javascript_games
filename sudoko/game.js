mainTxt = document.getElementById("board").innerHTML;
j=0
for (let k = 0; k < 9; k++) {
    i = k%3;
    divTxt = "<div id=\"user_btns\">\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"0\"></button>\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"1\"></button>\
            <button  disabled class=\"tile"+i+"\" id=\""+k+"2\"></button>\
            <button  disabled class=\"tile"+(i+3)+"\" id=\""+k+"3\"></button>\
            <button  disabled class=\"tile"+(i+3)+"\" id=\""+k+"4\"></button>\
            <button  disabled class=\"tile"+(i+3)+"\" id=\""+k+"5\"></button>\
            <button  disabled class=\"tile"+(i+6)+"\" id=\""+k+"6\"></button>\
            <button  disabled class=\"tile"+(i+6)+"\" id=\""+k+"7\"></button>\
            <button  disabled class=\"tile"+(i+6)+"\" id=\""+k+"8\"></button>\
        </div>"

    mainTxt += divTxt;
}

document.getElementById("board").innerHTML = mainTxt;