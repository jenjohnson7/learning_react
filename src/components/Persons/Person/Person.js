// ES6 syntax

import React, {Component} from 'react';
import classes from './Person.css';

class Person extends Component {
	render() {
		console.log('[Person.js] rendering');
		return(
			<div className={classes.Person}>
			<p onClick={this.props.click}>I'm {this.props.name}, I'm {this.props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{this.props.children}</p>
			<input type="text" onChange={this.props.changed} value={this.props.name}/>
			</div>
		);
	}
}

export default Person;
