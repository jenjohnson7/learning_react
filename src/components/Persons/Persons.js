import React from 'react';
import Person from './Person/Person.js';

const persons = (props) => {
	return(
		// rendering each object in a list dynamically
		// 'map' converts each elt in array to something else using a function
		// use index feature of 'map' and pass it to the handler to distinguish which person to remove
		// use key = unique identifier to increase efficiency of rerendering
		props.persons.map((person, index) => {
		return <Person key={person.id}
			click={() => props.clicked(index)}
			name={person.name}
			age={person.age}
			changed={(event) => props.changed(event, person.id)}
		/>
		})
	);
}

export default persons;
