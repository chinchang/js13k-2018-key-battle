var styles = getComputedStyle(document.documentElement);
const PIXEL_SIZE = parseInt(styles.getPropertyValue('--zoom').trim(), 0);
let sprites = [];
const FPS = 30;
const FRAME_DELAY = 1000 / FPS;
let lastUpdateTime = Date.now();
const W = ~~((window.innerWidth - 40) / 8);
const H = ~~(Math.min(500, window.innerHeight) / 8);
stageEl.style.width = `${W}px`;
stageEl.style.height = `${H}px`;
stageEl.style.marginBottom = `${(H / 2) * PIXEL_SIZE}px`;
const TREE_COUNT = 10;
const timeColors = [
	'hsl(50, 69%, 61%)',
	'hsl(197, 71%, 60%)',
	'hsl(208, 51%, 55%)',
	'hsl(214, 46%, 35%)',
	'hsl(219, 48%, 13%)'
];
let wordLevel = 0;
let wordSpeed = 0.5;
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

function addSentence(container, word, classes) {
	var sentence = document.createElement('Sentence');
	sentence.setAttribute('word', word);
	sentence.setAttribute('classes', classes);
	container.appendChild(sentence);
	return compile('Sentence')[0];
}
class Word {
	constructor(word) {
		this.isActive = true;
		this.word = word;
		this.el = addSentence(stageEl, word, 'sprite');

		this.el.appendChild(createNode('div', ['pointer', 'pointer-1']));
		this.el.appendChild(createNode('div', ['pointer', 'pointer-2']));

		this.x = W / 2 - word.length * 3;
		this.y = 0;
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

		this.y += wordSpeed;
		if (this.y + this.h > H) {
			this.isActive = false;
			const bounds = this.el.getBoundingClientRect();
			blastAround(bounds);
			play('explosion');

			if (gameState === GameStates.TYPE_1_GAME) {
				// gameover
				if (gameState === GameStates.TYPE_1_GAME) {
					window.open(
						`http://twitter.com/share?url=${
							location.href
						}&text=🎮 I reached level ${
							playerScores[0]
						} of Key Battle 🔥.&count=horiztonal&hashtags=js13k,game&via=chinchang457&related=chinchang457`
					);
				}
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
class Ufo {
	constructor(type) {
		this.isActive = true;
		this.creationTime = Date.now();
		this.x = 0;
		this.y = 0;
		this.speedX = type === 'bird' ? random(1, 3) : random(1, 2);
		var el = createNode('div', ['sprite', type]);
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
		this.el.style.bottom = `${this.y}px`;
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
	for (let i = 6; i--; ) {
		const p = new Particle(x + random(-10, 10), y + random(-10, 10), color);
		sprites.push(p);
	}
}
function blastAround({ left, top, width, height }, color) {
	for (let i = 4; i--; ) {
		setTimeout(() => {
			blast(left + random(0, width), top + random(0, height), color);
		}, random(0, 600));
	}
}

function update() {
	if (1) {
		if (Math.random() < 0.005) {
			incrementTime();
		}
		if (Math.random() < 0.01) {
			const b = new Ufo('bird');
			b.y = random(15, H);
			sprites.push(b);
		}
		if (Math.random() < 0.003) {
			const b = new Ufo('cloud');
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
	p1ScoreEl.innerHTML = p2ScoreEl.innerHTML = '';
	addSentence(p1ScoreEl, playerScores[0] + '', '');
	addSentence(p2ScoreEl, playerScores[1] + '', '');
}

function checkWin() {
	var didWon = false;
	if (playerWords[0] === currentWord.word) {
		didWon = 0;
	} else if (playerWords[1] === currentWord.word) {
		didWon = 1;
	}
	if (didWon !== false) {
		playerScores[didWon]++;
		updateScoreUi();

		play('coin');

		if (gameState === GameStates.TYPE_2_GAME) {
			speak(`Player ${didWon + 1} gets 1 point`);
		}
		playerWords[0] = playerWords[1] = '';
		document.documentElement.style.setProperty(`--p1-pointer`, 0);
		document.documentElement.style.setProperty(`--p2-pointer`, 0);
		startNewWord();
	}
}
function handleWordSpeed() {
	if (wordLevel > 8) {
		wordSpeed = 1.3;
	} else if (wordLevel > 5) {
		wordSpeed = 0.9;
	} else {
		wordSpeed = 0.5;
	}
}

function startNewWord() {
	if (currentWord) {
		currentWord.destroy();
	}
	const word = wordList[wordLevel++];
	handleWordSpeed();
	if (wordLevel > 5) {
		speak(word);
	} else {
		speak(`new word is, ${word}`);
	}
	currentWord = new Word(word.toLowerCase());
	sprites.push(currentWord);
}
/**
 *
 * @param {number} type Type 0 is 1player and 1 is 2 player
 */
function startGame(type) {
	document.documentElement.style.setProperty(`--p1-pointer`, 0);
	document.documentElement.style.setProperty(`--p2-pointer`, 0);
	wordList = wordList.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
	wordLevel = 0;

	if (type === 0) {
		changeGameState(GameStates.TYPE_1_GAME);
	} else {
		changeGameState(GameStates.TYPE_2_GAME);
	}
	play('start');
	playerScores[0] = playerScores[1] = 0;
	playerWords[0] = playerWords[1] = '';
	updateScoreUi();

	startNewWord();
}
function gameTypeBtnClickHandler(e) {
	const type = parseInt(e.currentTarget.dataset.type, 10);
	startGame(type);
}

function compile(className) {
	const targets = document.querySelectorAll(className);
	const compiledElements = [];
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
		compiledElements.push(target.previousElementSibling);
		target.remove();
	});
	return compiledElements;
}

function changeGameState(state) {
	gameState = state;
	document.body.setAttribute('class', state);
	setTimeout(() => {
		if (gameState === GameStates.TYPE_SELECTION) {
			document.querySelector('button').focus();
		}
	}, 300);
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
			play('button');

			if (
				!document.activeElement ||
				document.activeElement.tagName !== 'BUTTON'
			) {
				document.querySelector('button').focus();
			} else if (
				document.activeElement.nextElementSibling.tagName === 'BUTTON'
			) {
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
			gameState === GameStates.TYPE_2_GAME ? play('powerup') : play('coin');
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
				blastAround(winnerBounds, Colors.VICTORY);
			}
			if (gameState === GameStates.TYPE_2_GAME) {
				blastAround(looserBounds, Colors.BOO);
			}
		} else {
			play('damage');
			const looserBounds = window[`p${e.playerId + 1}`].getBoundingClientRect();
			blastAround(looserBounds, Colors.BOO);
		}
		checkWin();
	});

	loop();
}
init();
