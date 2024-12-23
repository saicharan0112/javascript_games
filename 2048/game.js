// 00,01,02,03
// 10,11,12,13
// 20,21,22,23 
// 30,31,32,33 

const grid=[
    ["","","",""],
    ["","","",""],
    ["","","",""],
    ["","","",""]
]

init();
document.addEventListener('keydown', logKey);



function init(){
    var dieRow = Math.floor(Math.random() * 3) + 1;
    var dieCol = Math.floor(Math.random() * 3) + 1;
    setDie(dieRow+""+dieCol,2);
    
    dieRow = Math.floor(Math.random() * 3) + 1;
    dieCol = Math.floor(Math.random() * 3) + 1;
    if (document.getElementById(dieRow+""+dieCol).innerHTML == ""){
        setDie(dieRow+""+dieCol,2);
        return;
    } 
    init();
}

function logKey(e) {
  if (`${e.code}` == "ArrowRight") {
    
    for (let i = 0; i < 4; i++) {
        var totalVal=0;
        for (let j=0; j < 4; j++){
            if(grid[i][j] != ""){
                var tmp = grid[i][j];
                if(totalVal==0 || totalVal==tmp){
                    totalVal = totalVal+tmp;
                    unsetDie(i+""+j);
                }
                unsetDie(i+""+j);
            }
        }
        setDie(i+""+3,totalVal);  
    }
  }

  if (`${e.code}` == "ArrowLeft") {
    for (let i = 0; i < 4; i++) {
        var totalVal=0;
        for (let j=0; j < 4; j++){
            if(grid[i][j] != ""){
                var tmp = grid[i][j];
                if(totalVal==0 || totalVal==tmp){
                    totalVal = totalVal+tmp;
                    unsetDie(i+""+j);
                }
                
            }
        }
        setDie(i+""+0,totalVal);        
    }
  }

  if (`${e.code}` == "ArrowDown") {
    for (let i = 0; i < 4; i++) {
        var totalVal=0;
        for (let j=0; j < 4; j++){
            if(grid[j][i] != ""){
                var tmp = grid[j][i];
                if(totalVal==0 || totalVal==tmp){
                    totalVal = totalVal+tmp;
                    unsetDie(i+""+j);
                }
                unsetDie(i+""+j);
            }
        }
        setDie(3+""+i,totalVal);
        
    }
  }

  if (`${e.code}` == "ArrowUp") {
    for (let i = 0; i < 4; i++) {
        var totalVal=0;
        for (let j=0; j < 4; j++){
            if(grid[j][i] != ""){
                var tmp = grid[j][i];
                if(totalVal==0 || totalVal==tmp){
                    totalVal = totalVal+tmp;
                    unsetDie(i+""+j);
                }
                unsetDie(i+""+j);
            }
        }
        setDie(0+""+i,totalVal); 
               
    }
  }

  dieRow = Math.floor(Math.random() * 3) + 1;
  dieCol = Math.floor(Math.random() * 3) + 1;
  if (document.getElementById(dieRow+""+dieCol).innerHTML == ""){
      setDie(dieRow+""+dieCol,2);
  } 

}

function setDie(cell, value){
    if(value){
        document.getElementById(cell).innerHTML = value;
        console.log(cell[0], cell[1]);
        grid[cell[0]][cell[1]]=value;
        valMul = 30+value;
        document.getElementById(cell).style.backgroundColor="hsl(32, "+valMul+"%,80%)";
    }

}

function unsetDie(cell){
    grid[cell[0]][cell[1]]="";
    document.getElementById(cell).innerHTML = "";
    document.getElementById(cell).style.backgroundColor="hsl(0, 0%, 76%)";
}

document.getElementById("reset").addEventListener("click", () => {location.reload(); init()})
