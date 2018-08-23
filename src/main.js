var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 30;
const FRAME_DELAY = 1000 / FPS;
let lastUpdateTime = Date.now();
const W = window.innerWidth;
const H = window.innerHeight;
const TREE_COUNT = 10;

class Word {
    constructor(word) {
        this.isActive = true;
        this.el = createNode('div', ['sprite', 'word'])

        word.split('').forEach(char => {
            const charEl = createNode('div', ['alphabet', `alphabet-${char}`])
            this.el.appendChild(charEl);
        });
        document.body.appendChild(this.el);
        this.x = W / 3;
        this.y = 0;
        this.width = this.el.getBoundingClientRect().width;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.y += PIXEL_SIZE;
        if (this.y > H) {
            this.isActive = false;
            blast(this.x + this.width / 2 + random(-100, 100), H);
            blast(this.x + this.width / 2 + random(-100, 100), H);
            blast(this.x + this.width / 2 + random(-100, 100), H);
            // this.el.remove();
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
        var el = createNode('div', ['sprite', 'bird'])
        document.body.appendChild(el);
        this.el = el;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.x += 6;
        if (this.x > W) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${pixelize(this.x)}px`;
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
        var el = createNode('div', ['sprite', 'cloud'])
        document.body.appendChild(el);
        this.el = el;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.x += 2;
        if (this.x > W) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${pixelize(this.x)}px`;
        this.el.style.bottom = `${this.y}`;
    }
}

class Particle {
    constructor(x, y) {
        this.isActive = true;
        this.x = x;
        this.y = y;
        this.size = random(1, 5);
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
        this.drag = 0.92;

        this.wander = 0.15;
        this.theta = random(0, 360) * Math.PI / 180;
        var el = createNode('div', ['particle'])
        document.body.appendChild(el);
        this.el = el;
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= this.drag;
        this.speedY *= this.drag;
        this.theta += random(-0.5, 0.5);
        this.speedX += Math.sin(this.theta) * 0.1;
        this.speedY += Math.cos(this.theta) * 0.1;
        this.size *= 0.8;


        if (this.size < 0.1) {
            this.isActive = false;
            this.el.remove();
        }
    }
    render() {
        this.el.style.left = `${pixelize(this.x)}px`;
        this.el.style.top = `${pixelize(this.y)}px`;
        this.el.style.transform = `scale(${this.size})`;
    }
}

function pixelize(n) {
    return Math.floor(n / PIXEL_SIZE) * PIXEL_SIZE;
}

function random(a, b) {
    return a + ~~(Math.random() * (b - a));
}

function createNode(tag, classes) {
    const node = document.createElement(tag);
    classes.forEach(claz => node.classList.add(claz));
    return node;
}

function blast(x, y) {
    for (let i = 10; i--;) {
        const p = new Particle(x + random(-10, 10), y + random(-10, 10));
        sprites.push(p);
    }
}


function update() {
    if (Math.random() < 0.015) {
        const b = new Bird();
        b.y = `calc(var(--pixel-size) * ${random(15,30)})`;
        sprites.push(b);

    }
    if (Math.random() < 0.005) {
        const b = new Cloud();
        b.y = `calc(var(--pixel-size) * ${random(5,20)})`;
        sprites.push(b);

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

function init() {
    const b = new Word('deaf');
    // b.y = `calc(var(--pixel-size) * ${random(5,20)})`;
    sprites.push(b);

    for (let i = TREE_COUNT; i--;) {
        const tree = createNode('div', ['sprite', 'tree']);
        tree.style.left = `calc(var(--pixel-size) * ${random(5, 100)})`;
        document.body.appendChild(tree);
    }
    window.addEventListener('click', e => {
        blast(e.pageX, e.pageY);
    })

    loop();
}
init();