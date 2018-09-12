var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 30;
const FRAME_DELAY = 1000 / FPS;
let lastUpdateTime = Date.now();
const W = ~~(window.innerWidth / 7);
const H = ~~(Math.min(500, window.innerHeight) / 7);
stageEl.style.width = `${W}px`;
stageEl.style.height = `${H}px`;
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
const compilableClasses = {};
const GameStates = {
	TYPE_SELECTION: 'state-type-selection',
	TYPE_1_GAME: 'state-type1-game',
	TYPE_2_GAME: 'state-type2-game'
};
let gameState;

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
function registerCompilableClass(claz) {
	compilableClasses[claz.name] = claz;
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
		this.el.appendChild(createNode('div', ['pointer', 'pointer-1']));
		this.el.appendChild(createNode('div', ['pointer', 'pointer-2']));

		stageEl.appendChild(this.el);
		this.x = W / 2 - word.length * 3;
		this.y = 0;
		this.bounds = this.el.getBoundingClientRect();
		this.w = this.el.offsetWidth;
		this.h = this.el.offsetHeight;
	}
	destroy() {
		this.isActive = false;
		this.el.remove();
	}
	update() {
		if (!this.isActive) {
			return;
		}

		this.y += 0.5;
		if (this.y + this.h > H) {
			this.isActive = false;
			const bounds = this.el.getBoundingClientRect();
			blastAround({
				x: bounds.left,
				y: bounds.top,
				w: bounds.width,
				h: bounds.height
			});
			play('explosion');

			if (gameState === GameStates.TYPE_1_GAME) {
				// gameover
				changeGameState(GameStates.TYPE_SELECTION);
				setTimeout(() => {
					this.destroy();
				}, 2000);
			}
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
		this.speedX = random(2, 5);
		var el = createNode('div', ['sprite', 'bird']);
		stageEl.appendChild(el);
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
		stageEl.appendChild(el);
		this.el = el;
	}
	update() {
		if (!this.isActive) {
			return;
		}

		this.x += random(1, 3);
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
	stageEl.style.backgroundColor = timeColors[++timeIndex % timeColors.length];
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
	// x *= PIXEL_SIZE;
	// y *= PIXEL_SIZE;
	for (let i = 5; i--; ) {
		setTimeout(() => {
			blast(x + random(0, w), y + random(0, h), color);
		}, random(0, 600));
	}
}

function update() {
	if (1) {
		if (Math.random() < 0.005) {
			incrementTime();
		}
		if (Math.random() < 0.01) {
			const b = new Bird();
			b.y = random(15, H);
			sprites.push(b);
		}
		if (Math.random() < 0.003) {
			const b = new Cloud();
			b.y = random(5, H);
			sprites.push(b);
		}
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

function updateScoreUi() {
	p1ScoreEl.setAttribute('class', `number number-${playerScores[0]}`);
	p2ScoreEl.setAttribute('class', `number number-${playerScores[1]}`);
}

function checkWin() {
	var didWon = false;
	if (playerWords[0] === currentWord.word) {
		didWon = 0;
	} else if (playerWords[1] === currentWord.word) {
		didWon = 1;
	}
	if (didWon !== false) {
		console.log(`PLAYER ${didWon + 1} WON`);
		playerScores[didWon]++;
		updateScoreUi();

		play('coin');
		speak(`Player ${didWon + 1} gets 1 point`);
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
	const word = wordList[~~(Math.random() * wordList.length)];
	// const word = 'ab';
	speak(`your new word is, ${word}`);
	currentWord = new Word(word.toLowerCase());
	sprites.push(currentWord);
}
/**
 *
 * @param {numbre} type Type 0 is 1player and 1 is 2 player
 */
function startGame(type) {
	if (type === 0) {
		changeGameState(GameStates.TYPE_1_GAME);
	} else {
		changeGameState(GameStates.TYPE_2_GAME);
	}
	playerScores[0] = playerScores[1] = 0;
	updateScoreUi();

	startNewWord();
}
function gameTypeBtnClickHandler(e) {
	const type = parseInt(e.currentTarget.dataset.type, 10);
	startGame(type);
}

function compile(className) {
	const targets = document.querySelectorAll(className);
	targets.forEach(target => {
		const props = [...target.attributes].reduce((value, current) => {
			value[current.name] = current.value;
			return value;
		}, {});
		target.parentElement.insertBefore(document.createElement('div'), target);
		target.previousElementSibling.innerHTML = compilableClasses[
			className
		].render(props);
		target.parentElement.insertBefore(
			target.previousElementSibling.children[0],
			target.previousElementSibling
		);
		target.previousElementSibling.remove();
		new compilableClasses[className](target.previousElementSibling, props);
		target.remove();
	});
}

function changeGameState(state) {
	gameState = state;
	document.body.setAttribute('class', state);
}

function init() {
	changeGameState(GameStates.TYPE_SELECTION);

	const isCactusTree = Math.random() > 0.5;
	for (let i = TREE_COUNT; i--; ) {
		const tree = createNode('div', [
			'sprite',
			'tree',
			isCactusTree ? 'cactus' : ''
		]);
		tree.style.left = `${random(10, W - 10)}px`;

		stageEl.appendChild(tree);
	}
	window.addEventListener('click', e => {
		blast(e.pageX, e.pageY);
	});
	window.addEventListener('keyup', e => {
		if (
			gameState === GameStates.TYPE_SELECTION &&
			(e.which === 38 || e.which === 40)
		) {
			if (document.activeElement.nextElementSibling.tagName === 'BUTTON') {
				document.activeElement.nextElementSibling.focus();
			} else {
				document.activeElement.previousElementSibling.focus();
			}
		}
	});
	window.addEventListener('controllerinput', e => {
		if (
			gameState !== GameStates.TYPE_1_GAME &&
			gameState !== GameStates.TYPE_2_GAME
		) {
			return;
		}
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
			if (gameState !== GameStates.TYPE_1_GAME || e.playerId === 0) {
				blastAround({
					x: winnerBounds.left,
					y: winnerBounds.top,
					w: winnerBounds.width,
					h: winnerBounds.height,
					color: Colors.VICTORY
				});
			}
			if (gameState === GameStates.TYPE_2_GAME) {
				blastAround({
					x: looserBounds.left,
					y: looserBounds.top,
					w: looserBounds.width,
					h: looserBounds.height,
					color: Colors.BOO
				});
			}
		} else {
			play('damage');
			const looserBounds = window[`p${e.playerId + 1}`].getBoundingClientRect();
			blastAround({
				x: looserBounds.left,
				y: looserBounds.top,
				w: looserBounds.width,
				h: looserBounds.height,
				color: Colors.BOO
			});
		}
		checkWin();
	});

	loop();
}
init();
