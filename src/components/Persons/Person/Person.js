// ES6 syntax

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import withClass from '../../../hoc/WithClass.js';
import Aux from '../../../hoc/Aux.js';

class Person extends Component {

	// for v2/newer
	constructor(props){
		super(props);
		this.inputElementRef = React.createRef();
	}

	componentDidMount(){
		// V1/older
		// this.inputElement.focus();
		// V2/newer
		this.inputElementRef.current.focus();
	}

	render() {
		console.log('[Person.js] rendering');
		return(
			<Aux>
			<p onClick={this.props.click}>I'm {this.props.name}, I'm {this.props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{this.props.children}</p>
			<input type="text" onChange={this.props.changed} value={this.props.name}
			// V1/older
			// ref={(inputEl) => {this.inputElement = inputEl}}
			// V2/newer
			ref={this.inputElementRef}
			/>
			</Aux>
		);
	}
}

Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
