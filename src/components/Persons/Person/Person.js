// ES6 syntax

import React, {Component} from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/WithClass.js';
import Aux from '../../../hoc/Aux.js';

class Person extends Component {
	render() {
		console.log('[Person.js] rendering');
		return(
			<Aux>
			<p onClick={this.props.click}>I'm {this.props.name}, I'm {this.props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{this.props.children}</p>
			<input type="text" onChange={this.props.changed} value={this.props.name}/>
			</Aux>
		);
	}
}

export default withClass(Person, classes.Person);
