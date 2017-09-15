import React, { Component } from 'react';
import Controls from './Controls';
import Tomato from './Tomato';
import Title from './Title';
import tick from './audio/tick.mp3'
import ding from './audio/ding.mp3'

class Pomodoro extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: false,
			icon: this.createIconClass(false),
			mode: 'workTime',
			workTime: 25,
			breakTime: 5,
			longBreakTime: 15,
			checkMark: 0,
			counter: 0,
			seconds: this.minutesToSeconds(25)
		}

		this.frameRate = 4;
		this.ms = 1000;
		this.tickSound = new Audio(tick);
		this.dingSound = new Audio(ding);

		this.clearButton = this.clearButton.bind(this);
		this.switch = this.switch.bind(this);
	}

	minutesToSeconds(minutes) {
		return minutes * 60
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
				toggle: !prevState.toggle,
				icon: this.createIconClass(!prevState.toggle)
			}
		})
	}


	clearButton() {
		this.clearState();
	}

	createIconClass(bool) {
		if (!bool) return 'fa fa-play';
		else return 'fa fa-ban';
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

	clearState() {
		this.stop();
		this.setState(function(prevState) {
			return {
				toggle: false,
				icon: this.createIconClass(false),
				mode: 'workTime',
				checkMark: 0,
				counter: 0,
				seconds: this.minutesToSeconds(prevState.workTime)
			}	
		});
	}

	frame() {
		this.setState(function(prevState) {
			let { counter, seconds, checkMark, mode } = prevState;
			let date;

			// if frame equals one second
			if (Math.abs(counter - this.ms) < 6 || counter >= this.ms) {

				// if clock is finished
				if (prevState.seconds === 1) {
					
					this.ding();
					date = new Date();

					switch(mode) {
						case 'workTime':
							checkMark < 3 ? mode = 'breakTime' : mode = 'longBreakTime';
							checkMark >= 3 ? checkMark = 0 : undefined;
							break;
						case 'breakTime':
							mode = 'workTime';
							checkMark += 1;	
							console.log(`checkMark: ${checkMark}`);
							break;
						case 'longBreakTime':
							mode = 'workTime';
							break;
					}

					// evaluate mode and seconds to add to clock
					seconds = this.minutesToSeconds(prevState[mode]) 
					counter = 0;
				} else {

					// normal tick at one second
					this.tick();
					date = new Date();
					seconds -= 1;
					counter = 0;
				}
			} else { 

				// normal frame between second intervals
				date = new Date();
				let difference = (date - prevState.date);
				counter += difference;
			}

			// setting states
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

	ding() {
		console.log('ding');

		// ensures sounds don't run into each other
		this.dingSound.pause();
		this.dingSound.currentTime = 0;
		this.dingSound.play();
	}

	render() {

		return(
			<div>
				<Title text="Pomodoro  Clock" />
				<div>
					<Tomato seconds={this.state.seconds} mode={this.state.mode} 
						workTime={this.minutesToSeconds(this.state.workTime)}
						breakTime={this.minutesToSeconds(this.state.breakTime)} 
						longBreakTime={this.minutesToSeconds(this.state.longBreakTime)} />
				</div>
				<div className="controls">
					<div className="row-center">
						<button className="switch" onClick={this.switch}>
							<i className={this.state.icon}></i>
						</button>
						<button className="clear" onClick={this.clearButton}>
							<i className="fa fa-undo"></i>
						</button>
					</div>
					<Controls 
						inheritWorkTime={this.inheritWorkTime}
						inheritBreakTime={this.inheritBreakTime} />
				</div>
				<p className="footnote">read about pomodoro technique on <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">wikipedia</a></p>
			</div>
		)
	}
}


export default Pomodoro;
