import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

	// react hook equivalent for functional components
	useEffect(() => {
		console.log('[cockpit.js] useEffect on change persons');
		// arg 1: function/what should happen if arg 2: {props.persons} has changed
		setTimeout(() =>{
			alert('saved data to cloud: persons has changed');
		}, 1000);
	}, [props.persons]);

	useEffect(() => {
		console.log('[cockpit.js] useEffect onload: pass an empty array to only show on first render/on load/componentDidMount ');
		setTimeout(() =>{
			alert('[cockpit.js] useEffect onload');
		}, 1000);
	}, []);

	useEffect(() => {
		console.log('[cockpit.js] useEffect #3');
		const timer = setTimeout(() =>{
			alert('[cockpit.js] useEffect #3');
		}, 1000);
		// extra return statement runs before the main useEffect function but before the (first) render cycle. can be used for any useEffect, not just useEffect with empty []
		return () => {
			clearTimeout(timer); // even though cockpit component has been removed -> should see cleanup,
			console.log('[cockpit.js] useEffect cleanup');
		}
	}, []);

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
			<h1>{props.title}</h1>
			<p className={assigned_classes.join(' ')}>This is dynamically styled by class depending on how many people there are.</p>
			<button className={buttonClass} onClick={props.clicked.bind(this, 'everyone')}>Show/Hide Everyone Else</button>
		</div>
	);
}

export default cockpit;
