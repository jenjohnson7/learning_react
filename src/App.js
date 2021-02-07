import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js';

// now this is a functional component like Person.js
const app = (props) => {

	const [personsState, setPersonsState] = useState({
		// the intial state of persons
		persons: [
			{name: 'Julia', age: 25},
			{name: 'Charlie', age: 25},
			{name: 'Amy', age: 24}
		],
	});

	// can use multiple useStates to set different values

	// this is an example of a named state property (passing in an object)
	const [otherState, setOtherState] = useState({
		// the initial state of otherProperty
		otherProperty: 'some other value'
	});

	// this is an example of an unnamed property (passing in a string)
	const [anotherState, setAnotherState] = useState(
		// the initial state of another state 'slice'
		'another value'
	);

	console.log(personsState, otherState, anotherState);
	// now, otherProperty (and 'another value') preserved before and after clicking the button, even though the switchNameHandler only sets persons

	// function within a function is ok in a functional component.
	const switchNameHandler = () => {
		console.log('clicked');
		// instead of merging for class based components, with functional components, the state is replaced. after clicking the button, otherState: 'other value' is missing unless you pull it with another call of useState (lines 20-29)
		setPersonsState({
			persons: [
				{name: 'Julia Claire', age: 25},
				{name: 'Charlie', age: 26},
				{name: 'Amy', age: 24}
			],
		})
	}

    return (
	  // JSX

	  // ages (for first 1 people) are strings here
	  // no 'this' since we're not in class anymore
	  // instead of this.state, use personsState from line 8
      <div className="App">
        <h1>Hi, I'm a React app</h1>
		<p>paragraph is working!</p>
		<button onClick={switchNameHandler}>Switch Name</button>

		<Person name="Jen" age='24'>Hobbies: Snowboarding</Person>
		<Person name="Anna" age='26'/>

		<Person name={personsState.persons[0].name} age={personsState.persons[0].age}>Hobbies: Knitting</Person>
		<Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
		<Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
      </div>
    );

	// createElement(html tag, css, nested components)
	// className because 'class' is a React special tag (line 4). However, in the html (Chrome inspect), it's back to class).
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!'));
}

export default app;
