import React, { Component } from 'react';

class Controls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			workTime: 25,
			breakTime: 5
		};

		this.changeTime = this.changeTime.bind(this)
	}


	changeTime(clock, amount) {
		// console.log(this.state);
		return () => {
			this.setState((prevState) => {
				let total = prevState[clock] + amount
				this.props[this.inheritFunctionNamer(clock)].call(this, total)
				return {
					[clock]: total
				}
			});
		}
	}

	inheritFunctionNamer(name) {
		return `inherit${this.toUpperCamelCase(name)}`
	}

	toUpperCamelCase(word) {
		let letter = word.charAt(0).toUpperCase();
		let rest = word.slice(1, word.length)
		return `${letter}${rest}`
	}

	render() {
		return (
			<div className="row-center">
				<div className="row-space-between timer-controls">
					<div>
					<button className="changeTime" onClick={this.changeTime('workTime', -1)}>-</button>
						{this.state.workTime}
					<button className="changeTime" onClick={this.changeTime('workTime', 1)}>+</button>
					</div>
					<div>
					<button className="changeTime" onClick={this.changeTime('breakTime', -1)}>-</button>
						{this.state.breakTime}
					<button className="changeTime" onClick={this.changeTime('breakTime', 1)}>+</button>
					</div>
				</div>
			</div>
		)
	}


}

export default Controls