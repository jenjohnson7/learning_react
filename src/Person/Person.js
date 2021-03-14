// ES6 syntax

import React from 'react';
import classes from './Person.css';

const person = (props) => {
	// props arguments can be both values and functions (click=switchNameHandler function in App.js)
	// children are elements between the opening and closing tags

	return (
		// <div className="Person" style={style}>
		<div className={classes.Person}>
			<p onClick={props.click}>I'm {props.name}, I'm {props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name}/>
		</div>
	);
}

export default person;
