import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

	const assigned_classes = [];

	let buttonClass = '';

	if (props.showPersons){
		// dynamic inline styling
		buttonClass = classes.Red;
	}

	if (props.persons.length <= 2){
		assigned_classes.push(classes.red);
	}
	if (props.persons.length <= 1){
		assigned_classes.push(classes.bold);
	}

	return (
		<div className={classes.Cockpit}>
			<h1>Hi, I'm a React app</h1>
			<p className={assigned_classes.join(' ')}>This is dynamically styled by class depending on how many people there are.</p>
			<button className={buttonClass} onClick={props.clicked.bind(this, 'everyone')}>Show/Hide Everyone Else</button>
		</div>
	);
}

export default cockpit;
