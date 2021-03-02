// ES6 syntax

import React from 'react';
import Radium from 'radium';

const person = (props) => {
	// props arguments can be both values and functions (click=switchNameHandler function in App.js)
	// children are elements between the opening and closing tags
	const style = {
		'@media (min-width: 500px)': {
			width: '450px'
		}
	};
	return (
		<div className="Person" style={style}>
			<p onClick={props.click}>I'm {props.name}, I'm {props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name}/>
		</div>
	);
}

export default Radium(person);
