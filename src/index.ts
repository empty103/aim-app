import './style/styles.scss';
import { getRandomNumber, hide, show } from './helpers';

const $btnStart = document.querySelector('#start') as HTMLButtonElement;
const $game = document.querySelector('#game') as HTMLDivElement;
const $time = document.querySelector('#time') as HTMLSpanElement;
const $result = document.querySelector('#result') as HTMLSpanElement;
const $resultHeader = document.querySelector('#result-header') as HTMLHeadingElement;
const $timeHeader = document.querySelector('#time-header') as HTMLHeadingElement;
const $inputTime = document.querySelector('#game-time') as HTMLInputElement;

$btnStart.addEventListener('click', start);
$game.addEventListener('click', clickBox);

const colors: string[] = [
    'E83F3B',
    'E8C93B',
    '81E83B',
    '3BE8DC',
    '3B4CE8',
    'BB3BE8',
    'E83BCD',
];

let score: number = 0;


function clickBox({ target }: MouseEvent): void {
    const $target = target as HTMLElement;

    if ($target.dataset.box) {
        score++;
        $target.remove();
        renderBox();
    }
}


function start(): void {
    score = 0;

    $game.style.backgroundColor = '#f3f3f3';
    hide($btnStart);
    setTime();

    let interval = setInterval(() => {
        let time: number = parseFloat($time.textContent || '0');

        if (time <= 0) {
            clearInterval(interval);
            finish();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);

    $inputTime.disabled = true;
    renderBox();
}

function finish(): void {
    $game.style.backgroundColor = '#e1e1e1';

    showScore();
    show($btnStart);
    hide($timeHeader);

    $inputTime.disabled = false;
    $game.textContent = '';
}

function setTime(): void {
    let time = +$inputTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function showScore(): void {
    $result.textContent = score.toString();
    show($resultHeader);
}


function renderBox() {
    const game: DOMRect = $game.getBoundingClientRect();
    const randomColorIndex: number = getRandomNumber(0, colors.length - 1);
    const sizeBox: number = getRandomNumber(40, 50);

    const maxTop: number = game.height - sizeBox;
    const maxLeft: number = game.width - sizeBox;

    const box: HTMLDivElement = document.createElement('div');

    box.dataset.box = 'true';
    box.style.backgroundColor = '#' + colors[randomColorIndex];
    box.style.borderRadius = '50%';
    box.style.width = box.style.height = sizeBox + 'px';
    box.style.position = 'absolute';
    box.style.top = getRandomNumber(0, maxTop) + 'px';
    box.style.left = getRandomNumber(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';

    box.style.animation = 'boxResize 2.5s forwards';

    $game.append(box);
}
