class Sentence {
	constructor(el, props) {
		this.el = el;
	}
	static render({ classes, word }) {
		const alphabets = word
			.toLowerCase()
			.split('')
			.map(char => {
				if (parseInt(char, 10)) {
					return (
						'<div class="number number-' +
						(char === ' ' ? '' : char) +
						'"></div>'
					);
				}
				return (
					'<div class="alphabet alphabet-' +
					(char === ' ' ? '' : char) +
					'"></div>'
				);
			})
			.join('');
		return `
            <div class="word ${classes}">
                ${alphabets}
            </div>
        `;
	}
}
registerCompilableClass(Sentence);
