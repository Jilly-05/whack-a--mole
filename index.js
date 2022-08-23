const pos1 = document.getElementById('position1');
const pos2 = document.getElementById('position2');
const pos3 = document.getElementById('position3');
const pos4 = document.getElementById('position4');
const pos5 = document.getElementById('position5');
const pos6 = document.getElementById('position6');
const totalScore = document.getElementById('totalScore');
const timer = document.getElementById('countDown');
const catcher = document.getElementById('catch');
const start = document.getElementById('play');

const posArray = [pos1,pos2,pos3,pos4,pos5,pos6];
const level = [2000,1500,1000,500]

// for (let i=0; i<posArray.length; i++) {
//     posArray[i].addEventListener("click",calcScore);
// }

let plusHit = 0;
let minusHit = 0;
let isHit = false;
let countDown = 30;
let nowLevel = 0;


function pushMole(i){
    const choseMole = Math.floor(Math.random()*posArray.length);
    posArray[choseMole].addEventListener("click",function(){calcScore(choseMole)});
    //addEventListener에서 함수에 parmeter를 전달하고 싶다면, 익명함수를 사용해야한다.
    setMole(choseMole);
    setTimeout(()=>setHole(choseMole),level[i]);

}
function setMole(choseMole){
    posArray[choseMole].className="mole";
    isHit=false; //hit 정보를 초기화한다
    
}
function setHole(choseMole){
    posArray[choseMole].className="hole";
    catcher.innerText="";
}

function stage(nowLevel){
    const starter = setInterval(()=>{pushMole(nowLevel);console.log("hi")},2000);
    setInterval(()=>{
        if(countDown>=0){
            timer.innerText = countDown;
            countDown--;
        }
        if(countDown===0){
            clearInterval(starter);
        }
    },1000);
}

function checkLevel(){
    nowLevel++;
    stage(nowLevel);
    countDown=30;
    console.log(nowLevel);
    console.log(countDown);
}

function main(){
    start.addEventListener("click",checkLevel);
    // stage(nowLevel-1);
}

main();

function calcScore(choseMole){
    if (!isHit){ //아직 휘두르지 않았을 때
        if (posArray[choseMole].className==="mole"){
            plusHit=plusHit+1;
            showScore();
            catcher.innerText="잡았다";
            isHit=true; //더 이상 점수 카운트를 하지 않는다
        } else if(posArray[choseMole].className==="hole") {
            minusHit = minusHit+1;
            showScore();
            catcher.innerText="놓쳤다";
            isHit=true //더 이상 점수 카운트를 하지 않는다
        }
    }
}

function showScore(){
    const Score = plusHit*200-minusHit*100;
    totalScore.innerText = Score;
}

// function setTimer(){
//     if(countDown>=0){
//         timer.innerText = countDown;
//         countDown--;
//     }

// }