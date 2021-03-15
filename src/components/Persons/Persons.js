import React, {Component} from 'react';
import Person from './Person/Person.js';

class Persons extends Component {

	shouldComponentUpdate(nextProps, nextState){
		// optimize: if only cockpit is changed in App.js, no need to rerender this too

		// if (nextProps.persons !== this.props.persons){
			// console.log('[Persons.js] shouldComponentUpdate true');
			// return true
		// } else {
			// return false
		// }

		// one liner - shallow comparison works because we made a copy of the persons array, so persons isn't just a pointer to the array in memory
		return nextProps.persons !== this.props.persons
	}

	getSnapshotBeforeUpdate(prevProps, prevState){
		console.log('[Persons.js] getSnapshotBeforeUpdate');
		return {message: 'Snapshot!'};
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		console.log(snapshot);
		console.log('[Persons.js] componentDidUpdate');
	}

	// for cleaning up
	componentWillUnmount(){
		console.log('[Persons.js] componentDidUnmount');
	}

	render() {
		console.log('[Persons.js] rendering');
		return(
			// rendering each object in a list dynamically
			// 'map' converts each elt in array to something else using a function
			// use index feature of 'map' and pass it to the handler to distinguish which person to remove
			// use key = unique identifier to increase efficiency of rerendering
			this.props.persons.map((person, index) => {
			return <Person key={person.id}
				click={() => this.props.clicked(index)}
				name={person.name}
				age={person.age}
				changed={(event) => this.props.changed(event, person.id)}
			/>
			})
		);
	}
}

export default Persons;
