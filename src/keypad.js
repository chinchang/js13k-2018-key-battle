const KEYPAD_THROTTLE = 80;
class Controller {
	constructor(el, props) {
		this.el = el;
		this.props = props;
		this.alphabet = 97;
		this.lastKeypressTime = Date.now();
		window.addEventListener('keypress', e => {
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
	cycleAlphabet(diff) {
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
			`alphabet alphabet-${String.fromCharCode(this.alphabet)}`
		);
		// play('button');
	}
}
(function() {
	const TAG = 'controller';

	function init(props) {
		const targets = document.querySelectorAll(TAG);
		targets.forEach(target => {
			const props = [...target.attributes].reduce((value, current) => {
				value[current.name] = current.value;
				return value;
			}, {});
			target.parentElement.insertBefore(document.createElement('div'), target);
			target.previousElementSibling.innerHTML = Controller.render(props);
			target.parentElement.insertBefore(
				target.previousElementSibling.children[0],
				target.previousElementSibling
			);
			target.previousElementSibling.remove();
			const instance = new Controller(target.previousElementSibling, props);
			target.remove();
		});
	}
	init();
})();
