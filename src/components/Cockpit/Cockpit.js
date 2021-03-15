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
		// arg 1: the 'main' useEffect function
		const timer = setTimeout(() =>{
			alert('[cockpit.js] useEffect onload');
		}, 1000);
		// the 'cleanup'/return function of the useEffect function is run only when the cockpit component is removed (arg2 = [])
		// therefore, if you 'Remove Cockpit' before 1000 ms, you will not see the alert
		// however, if you don't 'Remove Cockpit' before 1000 ms, you will see the alert because the 'cleanup'/return function will not clear the timer
		return () => {
			clearTimeout(timer);
			console.log('[cockpit.js] useEffect #3 cleanup');
		}
	}, []);

	useEffect(() => {
		// arg 1: the 'main' useEffect function
		console.log('[cockpit.js] useEffect #3');
		setTimeout(() =>{
			alert('[cockpit.js] useEffect #3');
		}, 1000);
		// the return statment of the 'main' useEffect function can be used for cleanup (or other purposes)
		return () => {
			// this return statement is another function that is run
			// after (every) render cycle (or whatever is triggered by arg 2)
			// before the 'main' useEffect function
			console.log('[cockpit.js] useEffect #3 cleanup');
		}
		// because arg 3 = None, this function runs for all changes to state
		// if this was added to the second useEffect (where arg3 = []), the cleanup would only be called when the component is removed from the DOM, more exactly matching the functionality componentWillUnmount)
	});

	const assigned_classes = [];

	let buttonClass = '';

	if (props.showPersons){
		// dynamic inline styling
		buttonClass = classes.Red;
	}

	if (props.personsLength <= 2){
		assigned_classes.push(classes.red);
	}
	if (props.personsLength <= 1){
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

export default React.memo(cockpit);
