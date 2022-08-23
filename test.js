// 구멍위치 getElement
const pos1 = document.getElementById('position1');
const pos2 = document.getElementById('position2');
const pos3 = document.getElementById('position3');
const pos4 = document.getElementById('position4');
const pos5 = document.getElementById('position5');
const pos6 = document.getElementById('position6');
// 게임시작
const start = document.getElementById('play');

//카운트다운
const countDown = document.getElementById('countDown');
let counter;

// css용 string 변수화
const MOLE = "mole";
const HOLE = "hole";

//구멍위치 array로 관리
const posArray = [pos1, pos2, pos3, pos4, pos5, pos6];

//두더지가 총 몇번 나왔는지 count하는 변수
let moleCount = 0;


//게임시작 버튼을 눌렀을때 실행하는 함수
const main = () => {
    start.addEventListener("click",playRound);
}

// 한 라운드 사이클 함수
const playRound = () => {
    //타이머 시작
    moleTimer();
    start.className="hidden";
    //제한시간 나중에 어레이로 컨트롤
    counter=18;
    countDown.innerText=counter;
}

// 두더지가 나타나는 타이밍을 정하는 함수
const moleTimer = () => {
    timerID = requestAnimationFrame(moleTimer);
    // 3초에 한번씩 등장
    if (timerID % (3 * 60) === 0) {
        pushMole();
    }
    // 두더지가 한 라운드에 5번 나오면 종료한다
    if (moleCount === 5) {
        //moleCount 초기화
        moleCount = 0;
        if (moleCount===0&& counter===0){
            cancelAnimationFrame(timerID);
        }
    }
    
    //카운트다운
    if (timerID % (1*60)===0){
        counter=counter-1;
        countDown.innerText=counter;
        if(counter===0){
            start.innerText="다음라운드";
            start.className="active";
        }
    }
    
}

// 랜덤으로 두더지를 보여주는 함수
// 랜덤 번호를 뽑고 -> 두더지를 보여준다음 -> 일정시간 후에 다시 구멍으로 셋팅하는 사이클 하나
const pushMole = () => {
    // 랜덤으로 나올 구멍을 설정한다.
    const choseMole = Math.floor(Math.random() * posArray.length);
    // choseMole 번호를 전달해서 두더지로 셋팅한다
    setMole(choseMole);
    // mole이 한 라운드당 몇번 나왔는지 count한다
    moleCount++;
    //
    setTimeout(()=>setHole(choseMole),2000);
}


// 구멍에서 두더지로 변하는 함수
const setMole = (choseMole) => {
    // className을 변경해 bg가 mole이 되도록 한다.
    posArray[choseMole].className=MOLE;
}

// 두더지에서 구멍으로 변하는 함수
const setHole = (choseMole) => {
    // className을 변경해 bg가 mole이 되도록 한다.
    posArray[choseMole].className=HOLE;
}

main();


// requestAnimation 타이밍 실험
// const test = ()=>{
//     id = requestAnimationFrame(test);
//     console.log(id);
//     if (id===1200) {
//         cancelAnimationFrame(id);
//     }
// }

// test();

