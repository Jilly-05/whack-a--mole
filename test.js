// 구멍위치 getElement
const pos1 = document.getElementById('position1');
const pos2 = document.getElementById('position2');
const pos3 = document.getElementById('position3');
const pos4 = document.getElementById('position4');
const pos5 = document.getElementById('position5');
const pos6 = document.getElementById('position6');
// 게임시작
const start = document.getElementById('play');
//count down
const countDown = document.getElementById('countDown');
let gameTimer = 17; //어레이로 관리

// css용 string 변수화
const MOLE = "mole";
const HOLE = "hole";

//구멍위치 array로 관리
const posArray = [pos1, pos2, pos3, pos4, pos5, pos6];

//두더지가 총 몇번 나왔는지 count하는 변수
let moleCount = 0;

//두더지를 잡았는지
let isCaught = false;
const area = document.getElementById('background');
const score = document.getElementById('score');
let scoreCounter = 0;
const lives = document.getElementById('lives');
let livesCount = 3;


//게임시작 버튼을 눌렀을때 실행하는 함수
const main = () => {
    start.addEventListener("click",playRound);
}

// 한 라운드 사이클 함수
const playRound = () => {
    //게임진행
    if (livesCount > 0) {
        //두더지 타이밍 시작
        moleTimer();
        countDown.innerText = gameTimer;
        //목숨은 라운드마다 초기화
        lives.innerText = livesCount;
        start.innerText = "";
        //타이머 함수
        const timer = setInterval(() => {
            if (gameTimer > 0) {
                countDown.innerText = gameTimer;
                gameTimer--;
            }
            if (gameTimer === 0 || livesCount === 0) {
                clearInterval(timer);
                countDown.innerText = 0;
                if (livesCount > 0) {
                    //어레이로 관리 레벨에 맞춰서
                    start.innerText = "다음단계";
                    gameTimer = 3 * 5;
                } else {
                    start.innerText = "게임오버";
                }
            }
        }, 1000)
    }
    //게임오버인 경우
    else{
        return 0;//임시로 설정 더이상 클릭이벤트 작둉안함
        //게임 다시 시작이랑 종료버튼
        //여기다가 써줄거는 아니지만(왜냐면 여긴 이벤트리스너 함수니까) 게임오버 화면 로컬스토리지에서 점수 표시하는거 넣기
    }
}


// 두더지가 나타나는 타이밍을 정하는 함수
const moleTimer = () => {
    timerID = requestAnimationFrame(moleTimer);
    if (timerID % (3 * 60) === 0) {
        pushMole();
    }
    // 두더지가 한 라운드에 5번 나오거나 목숨이 끝나면 종료한다
    if (moleCount === 5 || livesCount===0) {
        cancelAnimationFrame(timerID);
        //moleCount 초기화
        moleCount = 0;
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
    area.addEventListener("click",scoreCheck);

    //2초뒤에 holefh setting 한다
    setTimeout(()=>setHole(choseMole),2000);
}

const scoreCheck = (event) => {
    //만약 클릭했을 때 두더지를 잡았다면->점수: 한번만 인식
    if (event.target.className === MOLE && isCaught === false) {
        isCaught = true;
        scoreCounter = scoreCounter + 100;
        score.innerText = scoreCounter;
    }
}


// 구멍에서 두더지로 변하는 함수
const setMole = (choseMole) => {
    // className을 변경해 bg가 mole이 되도록 한다.
    posArray[choseMole].className = MOLE;
}

// 두더지에서 구멍으로 변하는 함수
const setHole = (choseMole) => {
    // className을 변경해 bg가 mole이 되도록 한다.
    posArray[choseMole].className = HOLE;
    // 두더지를 잡은 상태 초기화
    if (isCaught === true) {
        isCaught = false;
    } else {//만약 못잡거나 헛스윙을 하면 ->목숨까임
        //목숨에 따라 다음단계로 넘어갈지 말지 결정
        if (livesCount > 1) {
            livesCount--;
            lives.innerText = livesCount;
        } else {
            lives.innerText = "";
            livesCount = 0;
        }
    }
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