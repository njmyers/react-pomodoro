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
				total < 1 ? total = 1 : undefined;
				total > 45 ? total = 45 : undefined;
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
			<div className="row-center timer-controls">
					<span className="timer-controls-each">
						<button className="timer-controls-button" onClick={this.changeTime('workTime', -1)}>
							<i className="fa fa-angle-down fa-lg"></i>
						</button>
							<span className="timer-text">{this.state.workTime}</span>
						<button className="timer-controls-button" onClick={this.changeTime('workTime', 1)}>
							<i className="fa fa-angle-up fa-lg"></i>
						</button>
					</span>
					<span className="timer-controls-each">
						<button className="timer-controls-button" onClick={this.changeTime('breakTime', -1)}>
							<i className="fa fa-angle-down fa-lg"></i>
							</button>
							<span className="timer-text">{this.state.breakTime}</span>
						<button className="timer-controls-button" onClick={this.changeTime('breakTime', 1)}>
							<i className="fa fa-angle-up fa-lg"></i>
						</button>
					</span>
			</div>
		)
	}


}

export default Controls