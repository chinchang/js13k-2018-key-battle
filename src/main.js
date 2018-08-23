var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 5;
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
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.y += PIXEL_SIZE;
        if (this.y > H) {
            this.isActive = false;
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
        var el = createNode('div', ['sprite', 'cloud'])
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

function createNode(tag, classes) {
    const node = document.createElement(tag);
    classes.forEach(claz => node.classList.add(claz));
    return node;
}

function update() {
    // console.log('update')
    if (Math.random() < 0.01) {
        const b = Math.random() > 0.5 ? new Bird() : new Cloud();
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

    loop();
}
init();