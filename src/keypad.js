const KEYPAD_THROTTLE = 80;
class Controller {
	constructor(el, props) {
		this.el = el;
		this.props = props;
		this.alphabet = 97;
		this.lastKeypressTime = Date.now();
		window.addEventListener('keypress', e => {
			if (gameState === GameStates.TYPE_1_GAME) {
				// because its 1 player game
				if (+this.props.id === 1) {
					return;
				}
				const event = new Event('controllerinput');
				event.letter = String.fromCharCode(e.which);
				event.playerId = +this.props.id;
				window.dispatchEvent(event);
				this.cycleAlphabet(String.fromCharCode(e.which));

				return;
			}
			if (e.which === +this.props.enterkey) {
				const event = new Event('controllerinput');
				event.letter = String.fromCharCode(this.alphabet);
				event.playerId = +this.props.id;

				window.dispatchEvent(event);
				return;
			}
			if (e.which === +this.props.leftkey || e.which === +this.props.rightkey) {
				if (Date.now() - this.lastKeypressTime < KEYPAD_THROTTLE) {
					return;
				}
				this.lastKeypressTime = Date.now();
				this.cycleAlphabet(e.which === +this.props.leftkey ? -1 : 1);
			}
		});
	}
	static render(props) {
		return `
            <div class="controller ${props.class}">
                <div class="sprite"><div class="alphabet alphabet-a"></div>
            </div>
        `;
	}
	cycleAlphabet(diff, targetAlphabet) {
		this.alphabet += diff;
		if (this.alphabet > 122) {
			this.alphabet = 97;
		}
		if (this.alphabet < 97) {
			this.alphabet = 122;
		}
		const el = this.el.querySelector('.alphabet');
		el.setAttribute(
			'class',
			`alphabet alphabet-${targetAlphabet ||
				String.fromCharCode(this.alphabet)}`
		);
		// play('button');
	}
}
registerCompilableClass(Controller);
