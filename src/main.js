var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 30;
const FRAME_DELAY = 1000 / FPS;
let lastUpdateTime = Date.now();
const W = window.innerWidth;
const H = window.innerHeight;
const TREE_COUNT = 10;
const timeColors = [
    'hsl(50, 69%, 61%)',
    'hsl(197, 71%, 60%)',
    'hsl(208, 51%, 55%)',
    'hsl(214, 46%, 35%)',
    'hsl(219, 48%, 13%)'
];
let timeIndex = 0;
let currentWord = '';
const playerWords = ['', ''];
const playerScores = [0, 0];

class Word {
    constructor(word) {
        this.isActive = true;
        this.word = word;
        this.el = createNode('div', ['sprite', 'word'])

        word.toLowerCase().split('').forEach(char => {
            const charEl = createNode('div', ['alphabet', `alphabet-${char === ' ' ? '' : char}`])
            this.el.appendChild(charEl);
        });
        document.body.appendChild(this.el);
        this.x = W / 2 - (word.length * PIXEL_SIZE * 3);
        this.y = 0;
        this.width = this.el.getBoundingClientRect().width;
    }
    destroy() {
        this.el.remove();
    }
    update() {
        if (!this.isActive) {
            return;
        }

        this.y += PIXEL_SIZE;
        if (this.y > H) {
            this.isActive = false;
            blast(this.x + this.width / 2 + random(-this.width / 2, this.width / 2), H);
            blast(this.x + this.width / 2 + random(-this.width / 2, this.width / 2), H);
            blast(this.x + this.width / 2 + random(-this.width / 2, this.width / 2), H);
            blast(this.x + this.width / 2 + random(-this.width / 2, this.width / 2), H);
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

function incrementTime() {
    document.body.style.backgroundColor = timeColors[++timeIndex % timeColors.length];
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
    if (Math.random() < 0.01) {
        incrementTime();
    }
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

function checkWin() {
    var didWon = false;
    if (playerWords[0] === currentWord.word) {
        console.log('PLAYER 1 WON');
        playerScores[0]++;
        didWon = true;
    } else if (playerWords[1] === currentWord.word) {
        console.log('PLAYER 2 WON');
        playerScores[1]++;
        didWon = true;
    }
    if (didWon) {
        playerWords[0] = playerWords[1] = ''
        startNewWord();
    }
}

function startNewWord() {
    if (currentWord) {
        currentWord.destroy();
    }
    const word = ['chang', 'halwa', 'top', 'cry', 'hop'][~~(Math.random() * 5)]
    currentWord = new Word(word);
    sprites.push(currentWord);
}

function init() {
    startNewWord();

    for (let i = TREE_COUNT; i--;) {
        const tree = createNode('div', ['sprite', 'tree']);
        tree.style.left = `calc(var(--pixel-size) * ${random(5, 100)})`;
        document.body.appendChild(tree);
    }
    window.addEventListener('click', e => {
        blast(e.pageX, e.pageY);
    });
    window.addEventListener('controllerinput', e => {
        console.log('controller', e);
        playerWords[e.playerId] += e.letter;
        checkWin();
    })

    loop();
}
init();