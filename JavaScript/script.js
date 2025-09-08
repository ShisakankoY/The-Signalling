//新幹線スライドアニメーション
function shinkansenImg() {
    const shinkansen = document.getElementById('shinkansen');
    if (shinkansen) {
        const move = [
            { transform: 'translateX(-100vw)' },
            { transform: 'translateX(130vw)' },
            { transform: 'translateX(-100vw)' }
        ]

        const option = {
            duration: 10000,
            iterations: Infinity
        }

        shinkansen.animate(move, option);
    }
}
document.addEventListener('DOMContentLoaded', shinkansenImg);

//ドリームリフタースライドアニメーション
function planeanimate() {
    const dreamlifter = document.getElementById('dreamlifter');
    if (dreamlifter) {
        const move = [
            { transform: 'translateX(-100vw) scaleX(1)' },
            { transform: 'translateX(130vw) scaleX(1)', offset: 0.45 },
            { transform: 'translateX(130vw) scaleX(-1)', offset: 0.5 },
            { transform: 'translateX(-100vw) scaleX(-1)', offset: 0.95 },
            { transform: 'translateX(-100vw) scaleX(1)', offset: 1 }
        ]

        const option = {
            duration: 10000,
            iterations: Infinity,
            easing: 'linear'
        }

        dreamlifter.animate(move, option);
    }
}
document.addEventListener('DOMContentLoaded', planeanimate);

//サイト内検索
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const element = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");
function search(event) {
    //buttonのsubmitキャンセル
    event.preventDefault();

    let searchWord = searchInput.value.trim().toLowerCase();

    //前回のハイライトを消去
    for (let el of element) {
        el.style.backgroundColor = '';
    }

    for (let el of element) {
        let text = el.textContent.trim().toLowerCase();
        if (text.includes(searchWord)) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.backgroundColor = 'yellow';
        }
    }
}
searchBtn.addEventListener('click', search);