import React, { Component } from 'react';
import Controls from './Controls';
import Tomato from './Tomato';
import Title from './Title';
import tick from './audio/tick.mp3'

class Pomodoro extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: false,
			mode: 'workTime',
			workTime: 25,
			breakTime: 5,
			checkMark: 0,
			counter: 0,
			seconds: this.minutesToSeconds(25)
		}

		this.frameRate = 4;
		this.ms = 1000;
		this.tickSound = new Audio(tick);

		// this.clearButton = this.clearButton.bind(this);
		this.switch = this.switch.bind(this);
	}

	minutesToSeconds(minutes) {
		return minutes //* 60
	}
	
	inheritBreakTime = (breakTime) => {
		this.setState({ breakTime })
	}

	inheritWorkTime = (workTime) => {
		this.setState({ 
			workTime,
			seconds: this.minutesToSeconds(workTime)
		})
	}

	switch() {
		console.log(this.state);
		this.setState(function(prevState) {
			prevState.toggle ? this.stop() : this.start()
			return {
				toggle: !prevState.toggle
			}
		})
	}

	start() {
		this.setInitialState()
		this.timerID = setInterval(() => {
			this.frame();
		}, this.frameRate);
	}

	stop() {
		clearInterval(this.timerID)
	}

	setInitialState() {
		this.setState({
			date: new Date(),
			seconds: this.minutesToSeconds(this.state[this.state.mode])
		})
	}

	frame() {
		this.setState(function(prevState) {
			let counter, date, seconds, checkMark, mode

			if (Math.abs(prevState.counter - this.ms) < 6 || prevState.counter >= this.ms) {
				if (prevState.seconds === 1) {
					date = new Date();
					switch(prevState.mode) {
						case 'workTime':
							seconds = this.minutesToSeconds(prevState.breakTime)
							mode = 'breakTime';
							break;
						case 'breakTime':
							seconds = this.minutesToSeconds(prevState.workTime)
							mode = 'workTime';
							break;
						case 'longBreak':
							// seconds = this.minutesToSeconds
							break;
					}
					counter = 0;
					checkMark = prevState.checkMark + 1;	
				}
				else {
					this.tick();
					date = new Date();
					seconds = prevState.seconds - 1;
					counter = 0;
					checkMark = prevState.checkMark
					mode = prevState.mode
				}
			} else {
				date = new Date();
				seconds = prevState.seconds;
				let difference = (date - prevState.date);
				counter = prevState.counter + difference;
				checkMark = prevState.checkMark
				mode = prevState.mode
			}

			return {
				date,
				seconds,
				counter,
				checkMark,
				mode
			}
		});
	}

	tick() {
		console.log('tick');

		// ensures sounds don't run into each other
		this.tickSound.pause();
		this.tickSound.currentTime = 0;
		this.tickSound.play();
	}

	// Move to Controls Class

	// clearButton() {
	// 	// Set Initial State
	// }

	render() {

		return(
			<div>
				<Title text="Pomodoro  Clock" />
				<div>
					<Tomato seconds={this.state.seconds} mode={this.state.mode}/>
				</div>
				<div className="controls">
					<div className="row-center">
					<button className="switch" onClick={this.switch}>
						{this.state.toggle ? "STOP" : "START"}
					</button>
					<button className="clear" onClick={this.clearButton}>
						CLEAR
					</button>
					</div>
					<Controls inheritWorkTime={this.inheritWorkTime} inheritBreakTime={this.inheritBreakTime} />
				</div>
			</div>
		)
	}
}


export default Pomodoro;
