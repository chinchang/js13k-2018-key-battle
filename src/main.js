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
const Colors = {
	VICTORY: 'limegreen',
	BOO: 'indianred'
};
let timeIndex = 0;
let currentWord = '';
const playerWords = ['', ''];
const playerScores = [0, 0];
const sounds = {};

var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance('');
utterThis.rate = 4;
function speak(word) {
	utterThis.text = word;
	synth.speak(utterThis);
}

function addSound(sid, list) {
	sounds[sid] = [];
	list.forEach(function(s) {
		var a = new Audio();
		a.src = jsfxr(s);
		sounds[sid].push(a);
	});
}

function play(sid) {
	sounds[sid] && sounds[sid][random(0, sounds[sid].length - 1)].play();
}

class Word {
	constructor(word) {
		this.isActive = true;
		this.word = word;
		this.el = createNode('div', ['sprite', 'word']);

		word
			.toLowerCase()
			.split('')
			.forEach(char => {
				const charEl = createNode('div', [
					'alphabet',
					`alphabet-${char === ' ' ? '' : char}`
				]);
				this.el.appendChild(charEl);
			});
		this.el.appendChild(createNode('div', ['pointer', 'pointer1']));
		this.el.appendChild(createNode('div', ['pointer', 'pointer2']));

		document.body.appendChild(this.el);
		this.x = W / 2 - word.length * PIXEL_SIZE * 3.5;
		this.y = 0;
		this.bounds = this.el.getBoundingClientRect();
	}
	destroy() {
		this.isActive = false;
		this.el.remove();
	}
	update() {
		if (!this.isActive) {
			return;
		}

		this.y += PIXEL_SIZE;
		if (this.y > H) {
			this.isActive = false;
			blastAround({
				x: this.x,
				y: this.y - this.bounds.height,
				w: this.bounds.width,
				h: this.bounds.height
			});
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
		this.speedX = random(3, 8);
		var el = createNode('div', ['sprite', 'bird']);
		document.body.appendChild(el);
		this.el = el;
	}
	update() {
		if (!this.isActive) {
			return;
		}

		this.x += this.speedX;
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
		var el = createNode('div', ['sprite', 'cloud']);
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
	constructor(x, y, color = '#fff') {
		this.isActive = true;
		this.x = x;
		this.y = y;
		this.size = random(1, 5);
		this.speedX = random(-5, 5);
		this.speedY = random(-5, 5);
		this.drag = 0.92;

		this.wander = 0.15;
		this.theta = (random(0, 360) * Math.PI) / 180;
		var el = createNode('div', ['particle']);
		document.body.appendChild(el);
		this.el = el;

		this.el.style.backgroundColor = color;
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
	document.body.style.backgroundColor =
		timeColors[++timeIndex % timeColors.length];
}

function createNode(tag, classes) {
	const node = document.createElement(tag);
	classes.filter(claz => claz).forEach(claz => node.classList.add(claz));
	return node;
}

function blast(x, y, color) {
	for (let i = 10; i--; ) {
		const p = new Particle(x + random(-10, 10), y + random(-10, 10), color);
		sprites.push(p);
	}
}
function blastAround({ x, y, w, h, color }) {
	for (let i = 5; i--; ) {
		setTimeout(() => {
			blast(x + random(0, w), y + random(0, h), color);
		}, random(0, 600));
	}
}

function update() {
	if (Math.random() < 0.005) {
		incrementTime();
	}
	if (Math.random() < 0.01) {
		const b = new Bird();
		b.y = `calc(var(--pixel-size) * ${random(15, 80)})`;
		sprites.push(b);
	}
	if (Math.random() < 0.003) {
		const b = new Cloud();
		b.y = `calc(var(--pixel-size) * ${random(5, 80)})`;
		sprites.push(b);
	}
	sprites.forEach(s => s.update());
	sprites = sprites.filter(s => s.isActive);
}

function render() {
	sprites.forEach(s => s.render());
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
		p1ScoreEl.setAttribute('class', `number number-${playerScores[0]}`);
		didWon = true;
	} else if (playerWords[1] === currentWord.word) {
		console.log('PLAYER 2 WON');
		playerScores[1]++;
		p1ScoreEl.setAttribute('class', `number number-${playerScores[1]}`);
		didWon = true;
	}
	if (didWon) {
		play('coin');
		speak('Player 1 gets 1 point');
		playerWords[0] = playerWords[1] = '';
		document.documentElement.style.setProperty(`--p1-pointer`, 0);
		document.documentElement.style.setProperty(`--p2-pointer`, 0);
		startNewWord();
	}
}

function startNewWord() {
	if (currentWord) {
		currentWord.destroy();
	}
	const word = ['chang', 'halwa', 'top', 'cry', 'hop', 'amazing', 'helicopter'][
		~~(Math.random() * 7)
	];
	// const word = 'ab';
	speak(`your new word is, ${word}`);
	currentWord = new Word(word.toLowerCase());
	sprites.push(currentWord);
}

function init() {
	startNewWord();

	const isCactusTree = Math.random() > 0.5;
	for (let i = TREE_COUNT; i--; ) {
		const tree = createNode('div', [
			'sprite',
			'tree',
			isCactusTree ? 'cactus' : ''
		]);
		tree.style.left = `calc(var(--pixel-size) * ${random(5, 100)})`;

		document.body.appendChild(tree);
	}
	window.addEventListener('click', e => {
		blast(e.pageX, e.pageY);
	});
	window.addEventListener('controllerinput', e => {
		if (currentWord.word.indexOf(playerWords[e.playerId] + e.letter) === 0) {
			play('powerup');
			playerWords[e.playerId] += e.letter;
			document.documentElement.style.setProperty(
				`--p${e.playerId + 1}-pointer`,
				playerWords[e.playerId].length
			);
			const winnerBounds = window[`p${e.playerId + 1}`].getBoundingClientRect();
			const looserBounds = window[
				`p${(e.playerId ^ 1) + 1}`
			].getBoundingClientRect();
			blastAround({
				x: winnerBounds.left,
				y: winnerBounds.top,
				w: winnerBounds.width,
				h: winnerBounds.height,
				color: Colors.VICTORY
			});
			blastAround({
				x: looserBounds.left,
				y: looserBounds.top,
				w: looserBounds.width,
				h: looserBounds.height,
				color: Colors.BOO
			});
		} else {
			play('damage');
		}
		checkWin();
	});

	loop();
}
init();
