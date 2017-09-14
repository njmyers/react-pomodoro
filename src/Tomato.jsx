import React, { Component } from 'react';
import tomato from './tomato.svg';

class Tomato extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: this.formatTime(this.props.seconds),
			mode: this.formatMode(this.props.mode),
			style: {
				transform: 'rotate(0deg)'
			}
		}
	}

	rotation() {

	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (this.state.seconds !== nextProps.seconds) return true;
	// 	else return false
	// }

	// componentWillUpdate(nextProps, nextState) {
	// 	console.log(nextState);
	// }

	componentWillReceiveProps(nextProps) {
		if (this.props.seconds !== nextProps.seconds) {
			this.setState({
				time: this.formatTime(nextProps.seconds)
			})
		}

		if (this.props.mode !== nextProps.mode) {
			this.setState({
				mode: this.formatMode(nextProps.mode)
			})
		}
	}

	formatMode(mode) {
		let regex = /[A-Z]/g;
		return mode.replace(regex, (match) => ` ${match.toLowerCase()}`)
	}

	formatTime(propSeconds) {
		// console.log(propSeconds)
		let minutes = Math.floor(propSeconds / 60);
		let seconds = this.padDigits(propSeconds % 60);
		return `${minutes}:${seconds}`
	}

	padDigits(num) {
		if (num.toString().length < 2) return `0${num.toString()}`;
		else return num.toString();
	}

	render() {
		return(
			<div className="row">
				<div className="tomato">
					<img src={tomato} />
					<p>{this.state.time}</p>
					<p>{this.state.mode}</p>
				</div>
			</div>
		)
	}

}

export default Tomato;