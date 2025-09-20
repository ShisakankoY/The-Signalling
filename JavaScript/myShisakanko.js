const input = document.getElementById('input');
const Btn = document.getElementById('Btn');
const text = document.getElementById('text');
let savedCount = 0;

//喚呼本体・数のローカルストレージ
function save() {
    let kanko = input.value.trim();
    let count = 0;

    if (!kanko) {
        return;
    }

    let kankoBox = JSON.parse(localStorage.getItem('kanko')) || [];
    
    if (kankoBox.includes(kanko)) {
        return;
    }

    if (kanko.includes('よし')) {
        kankoBox.push(kanko);
        count = kankoBox.length;
        localStorage.setItem('kanko', JSON.stringify(kankoBox));
        localStorage.setItem('count', count);
    }
    
    showKanko();
}

function load() {
    showKanko();
}

function showKanko() {
    const kankoData = JSON.parse(localStorage.getItem('kanko')) || [];
    savedCount = Number(localStorage.getItem('count')) || 0;
    text.innerHTML = '';
    for (let i = 0; i < kankoData.length; i++) {
        const span = document.createElement('span');
        span.textContent = kankoData[i];
        text.appendChild(span);
    }

    action();
}
//ここまで

window.addEventListener('DOMContentLoaded', () => {
    Btn.addEventListener('click', save);
    load();
});

const Tokaido1 = document.getElementById('Tokaido1');
const Tokaido2 = document.getElementById('Tokaido2');

function action() {
    if (savedCount >= 10) {
        Tokaido1.style.display = 'block';
    }
    if (savedCount >= 15) {
        Tokaido2.style.display = 'block';
    }
}

const Btn2 = document.getElementById('Btn2');

Btn2.addEventListener('click', () => {
    const deletePass = prompt("履歴データを消去する場合は、14736と入力してください。");
    if (deletePass === "14736") {
        localStorage.removeItem('kanko');
        localStorage.removeItem('count');
        text.innerHTML = '';
        savedCount = 0;
        Tokaido1.style.display = 'none';
        Tokaido2.style.display = 'none';
    }
});


