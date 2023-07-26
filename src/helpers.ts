export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function show(elem: HTMLElement): void {
    elem.classList.remove('hide');
}

export function hide(elem: HTMLElement): void {
    elem.classList.add('hide');
}