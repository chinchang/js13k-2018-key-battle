;
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
const sounds = {};

function addSound(sid, list) {
    sounds[sid] = [];
    list.forEach(function (s) {
        var a = new Audio();
        a.src = jsfxr(s);
        sounds[sid].push(a);
    });
}

function play(sid) {
    sounds[sid] && sounds[sid][random(0, sounds[sid].length - 1)].play();
}
addSound('coin', [
    [2, , 0.0547, 0.5447, 0.1704, 0.5662, , , , , , , , , , , , , 1, , , , , 0.5],
    [2, , 0.0236, 0.3286, 0.2658, 0.6069, , , , , , 0.2147, 0.5666, , , , , , 1, , , , , 0.5],
    [2, , 0.0143, 0.5022, 0.26, 0.5323, , , , , , 0.3248, 0.5518, , , , , , 1, , , , , 0.5]
]);
addSound('powerup', [
    [2, , 0.2307, , 0.4397, 0.3404, , 0.1526, , 0.0544, 0.4236, , , 0.3724, , , , , 1, , , , , 0.5],
    [2, , 0.3894, , 0.3024, 0.4107, , 0.1792, , , , , , 0.0228, , 0.5141, , , 1, , , , , 0.5]
    // [1,,0.0439,,0.4676,0.2578,,0.2415,,,,,,,,,,,1,,,,,0.5]
]);
addSound('explosion', [
    [3, , 0.3708, 0.5822, 0.3851, 0.0584, , -0.0268, , , , -0.0749, 0.7624, , , , , , 1, , , , , 0.5],
    [3, , 0.1669, 0.6956, 0.4757, 0.053, , 0.25, , , , 0.5472, 0.7599, , , 0.516, 0.3194, -0.1415, 1, , , , , 0.5],
    [3, , 0.1679, 0.6792, 0.4546, 0.1048, , -0.3239, , , , -0.3376, 0.6851, , , , , , 1, , , , , 0.5]
]);
addSound('hit', [
    [0, , 0.0658, , 0.2198, 0.4852, , -0.5898, , , , , , 0.4405, , , , , 1, , , , , 0.5],
    [0, , 0.0444, , 0.1355, 0.2247, , -0.3034, , , , , , 0.416, , , , , 1, , , 0.1094, , 0.5],
    [3, , 0.0833, , 0.1753, 0.3698, , -0.3655, , , , , , , , , , , 1, , , , , 0.5],
    [1, , 0.0892, , 0.2721, 0.38, , -0.379, , , , , , , , , , , 1, , , 0.1896, , 0.5]
]);
addSound('damage', [
    [3, , 0.0138, , 0.2701, 0.4935, , -0.6881, , , , , , , , , , , 1, , , , , 0.25],
    [0, , 0.0639, , 0.2425, 0.7582, , -0.6217, , , , , , 0.4039, , , , , 1, , , , , 0.25],
    [3, , 0.0948, , 0.2116, 0.7188, , -0.6372, , , , , , , , , , , 1, , , 0.2236, , 0.25],
    [3, , 0.1606, 0.5988, 0.2957, 0.1157, , -0.3921, , , , , , , , , 0.3225, -0.2522, 1, , , , , 0.25],
    [3, , 0.1726, 0.2496, 0.2116, 0.0623, , -0.2096, , , , , , , , , 0.2665, -0.1459, 1, , , , , 0.25],
    [3, , 0.1645, 0.7236, 0.3402, 0.0317, , , , , , , , , , , , , 1, , , , , 0.25]
]);

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
        this.x = W / 2 - (word.length * PIXEL_SIZE * 3.5);
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
            play('explosion');
        }
    }
    render() {
        this.el.style.left = `${pixelize(this.x)}px`;
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
    classes
        .filter(claz => claz)
        .forEach(claz => node.classList.add(claz));
    return node;
}

function blast(x, y) {
    for (let i = 10; i--;) {
        const p = new Particle(x + random(-10, 10), y + random(-10, 10));
        sprites.push(p);
    }
}


function update() {
    if (Math.random() < 0.005) {
        incrementTime();
    }
    if (Math.random() < 0.015) {
        const b = new Bird();
        b.y = `calc(var(--pixel-size) * ${random(15,80)})`;
        sprites.push(b);

    }
    if (Math.random() < 0.005) {
        const b = new Cloud();
        b.y = `calc(var(--pixel-size) * ${random(5,80)})`;
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
    // const word = ['chang', 'halwa', 'top', 'cry', 'hop', 'amazing', 'helicopter'][~~(Math.random() * 7)]
    const word= 'Helicopter';
    currentWord = new Word(word);
    sprites.push(currentWord);
}

function init() {
    startNewWord();

    const isCactusTree = Math.random() > 0.5;
    for (let i = TREE_COUNT; i--;) {
        const tree = createNode('div', ['sprite', 'tree', isCactusTree ? 'cactus' : '']);
        tree.style.left = `calc(var(--pixel-size) * ${random(5, 100)})`;

        document.body.appendChild(tree);
    }
    window.addEventListener('click', e => {
        blast(e.pageX, e.pageY);
    });
    window.addEventListener('controllerinput', e => {
        console.log('controller', e);
        if (currentWord.word.indexOf(playerWords[e.playerId] + e.letter) === 0) {
            play('powerup');
            playerWords[e.playerId] += e.letter;
        } else {
            play('damage');
        }
        checkWin();
    })

    loop();
}
init();