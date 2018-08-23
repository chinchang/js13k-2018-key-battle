var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 5;
const FRAME_DELAY = 1000 / FPS;
let lastUpdateTime = Date.now();
const W = window.innerWidth;
const H = window.innerHeight;
class Word {
    constructor(word) {
        this.isActive = true;
        this.el = document.createElement('div');
        this.el.classList.add('sprite');
        this.el.classList.add('word');

        word.split('').forEach(char => {
            const charEl = document.createElement('div');
            // charEl.classList.add('sprite');
            charEl.classList.add('alphabet');
            charEl.classList.add(`alphabet-${char}`);
            this.el.appendChild(charEl);
        });
        document.body.appendChild(this.el);
        this.x = W / 3;
        this.y = 0;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.y += PIXEL_SIZE / 2;
        if (this.y > H) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }
}
class Bird {
    // isActive: true;
    constructor() {
        this.isActive = true;
        this.creationTime = Date.now();
        this.x = 0;
        this.y = 0;
        var el = document.createElement('div');
        el.classList.add('sprite');
        el.classList.add('bird');
        document.body.appendChild(el);
        this.el = el;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.x += PIXEL_SIZE;
        if (this.x > W) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${this.x}px`;
        this.el.style.bottom = `${this.y}`;
    }
}

class Cloud {
    // isActive: true;
    constructor() {
        this.isActive = true;
        this.creationTime = Date.now();
        this.x = 0;
        this.y = 0;
        var el = document.createElement('div');
        el.classList.add('sprite');
        el.classList.add('cloud');
        document.body.appendChild(el);
        this.el = el;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.x += PIXEL_SIZE;
        if (this.x > W) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${this.x}px`;
        this.el.style.bottom = `${this.y}`;
    }
}

function random(a, b) {
    return a + ~~(Math.random() * (b - a));
}

function update() {
    // console.log('update')
    if (Math.random() < 0.08) {
        // const b = new Word('deaf');
        // b.y = `calc(var(--pixel-size) * ${random(5,20)})`;
        // sprites.push(b);

    }
    sprites.forEach(s => s.update())
    sprites = sprites.filter(s => s.isActive)
}

function render() {
    sprites.forEach(s => s.render())

}

function loop() {
    requestAnimationFrame(loop);
    if (Date.now() - lastUpdateTime < FRAME_DELAY) {
        return;
    }
    lastUpdateTime = Date.now();
    update();
    render();
}

loop();
const b = new Word('deaf');
// b.y = `calc(var(--pixel-size) * ${random(5,20)})`;
sprites.push(b);