const canvas = document.getElementById('ayuGameCanvas');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//画像座標初期設定
let x = 0;
let y = 0;

//クリック回数カウント
let count = 0;

let pointText = document.getElementById('point');

let drawWidth = 150;
let drawHeight = 100;

//画像生成
const img = new Image();
img.src = "../images/swimmingAyu.png";

//ローカルストレージ(ポイント)
const savedData = localStorage.getItem("userData");
if (savedData) {
    const newData = JSON.parse(savedData);
    count = newData.score || 0;
    pointText.textContent = "現在のポイント：" + count + "Point";
}

//ローカルストレージ(スキン)
let shioSkinFlag = false; //塩焼きスキン獲得済みか判定用フラグ

const savedSkinData = localStorage.getItem("skin");
if (savedSkinData) {
    const newSkinData = JSON.parse(savedSkinData);
    shioSkinFlag = newSkinData.shioyaki;
}

let sashimiFlag = false; //刺身スキン獲得判定フラグ

const savedSkinData2 = localStorage.getItem("skin2");
if (savedSkinData2) {
    const newSkinData2 = JSON.parse(savedSkinData2);
    sashimiFlag = newSkinData2.sashimi;
}

let touchX;
let touchY;

//画面タッチ時座標
canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    touchX = touch.clientX - rect.left;
    touchY = touch.clientY - rect.top;
    count++;
    pointText.textContent = "現在のポイント：" + count + "Point";

    const scoreData = {
        score: count
    }

    localStorage.setItem("userData", JSON.stringify(scoreData));
});

let clickX;
let clickY;

//画面クリック時座標
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    clickX = event.clientX - rect.left;
    clickY = event.clientY - rect.top;
    count++;
    pointText.textContent = "現在のポイント：" + count + "Point";

    const scoreData = {
        score: count
    }

    localStorage.setItem("userData", JSON.stringify(scoreData));
});

const skinBtnShio = document.getElementById('skinBtnShio');
const skinBtnNomal = document.getElementById('skinBtnNomal');
const skinBtnSashimi = document.getElementById('skinBtnSashimi');

//アニメーション
function Animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //移動
    if (touchX !== undefined && touchY !== undefined) {
        ctx.drawImage(img, touchX, touchY, drawWidth, drawHeight);
    } else if (clickX !== undefined && clickY !== undefined) {
        ctx.drawImage(img, clickX, clickY, drawWidth, drawHeight);
    }

    skinBtnNomal.addEventListener('click', () => {
        img.src = "../images/swimmingAyu.png";
        drawWidth = 150;
        drawHeight = 100;
    });

    //スキン変更・ローカルストレージ
    skinBtnShio.addEventListener('click', () => {
        if (shioSkinFlag) {
            img.src = "../images/ayuShioyaki.png";
            drawWidth = 230;
            drawHeight = 60;
        }

        if (!shioSkinFlag) {
            if (count >= 60) {
                img.src = "../images/ayuShioyaki.png";
                drawWidth = 230;
                drawHeight = 60;
                shioSkinFlag = true;
                count -= 30;
                pointText.textContent = "現在のポイント：" + count + "Point";
            }
        }

        const skinData = {
            shioyaki: shioSkinFlag
        }

        localStorage.setItem("skin", JSON.stringify(skinData));

    });

    skinBtnSashimi.addEventListener('click', () => {
        if (sashimiFlag) {
            img.src = "../images/ayu_Sashimi.png";
            drawWidth = 230;
            drawHeight = 60;
        }

        if (!sashimiFlag) {
            if (count >= 160) {
                img.src = "../images/ayu_Sashimi.png";
                drawWidth = 230;
                drawHeight = 60;
                sashimiFlag = true;
                count -= 100;
                pointText.textContent = "現在のポイント：" + count + "Point";
            }
        }

        const skinData2 = {
            sashimi: sashimiFlag
        }

        localStorage.setItem("skin2", JSON.stringify(skinData2));
    });

    requestAnimationFrame(Animate);
}

img.onload = () => {
    Animate();
}

//ローカルストレージリセット
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    const resetPass = prompt("リセットする場合は、A+38uWと記入してください。(一度リセットすると、復元できません。)");
    if (resetPass === "A+38uW") {
        localStorage.removeItem("userData");
        localStorage.removeItem("skin");
        location.reload();
    } else {
        alert("パスが違います。やり直してください。(もう一度リセットボタンを押してください。)");
    }
});
