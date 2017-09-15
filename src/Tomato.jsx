import React, { Component } from 'react';
import tomato from './tomato.svg';

// All times in seconds here

class Tomato extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: this.formatTime(this.props.seconds),
			mode: this.formatMode(this.props.mode),
			icon: this.createIconClass(this.formatMode(this.props.mode)), // must call twice on init
			style: {
				transform: 'rotate(0deg)'
			}
		}
	}

	calcRotation(secondsElapsed, totalSeconds) {
		// console.log(secondsElapsed, totalSeconds)
	    let deg = secondsElapsed / totalSeconds * 360;
	    deg = 360 - deg;
	    return deg;
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

			let deg = this.calcRotation(nextProps.seconds, nextProps[nextProps.mode])

			this.setState({
				time: this.formatTime(nextProps.seconds),
				style: {
					transform: `rotate(${deg}deg)`
				}
			})
		}

		if (this.props.mode !== nextProps.mode) {
			let mode = this.formatMode(nextProps.mode);
			let icon = this.createIconClass(mode);
			this.setState({
				mode,
				icon
			})
		}
	}

	createIconClass(mode) {
		if (mode === 'work') return 'fa fa-laptop';
		if (mode === 'break') return 'fa fa-coffee';
	}

	formatMode(mode) {
		let regex = /[A-Z]/g;
		return mode.slice(0, mode.search(regex));
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
			<div className="tomato row-center">
				<div className="tomato-wrapper">
					<img src={tomato} alt="tomato" style={this.state.style} />
					<div className="tomato-text">
						<div>
							<p>{this.state.time}</p>
							<p>{this.state.mode} <i className={this.state.icon}></i></p>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Tomato;