import React, {Component} from 'react';
import Person from './Person/Person.js';

class Persons extends Component {

	shouldComponentUpdate(nextProps, nextState){
		console.log('[Persons.js] shouldComponentUpdate');
		return true; // usually some logic to compare old/current and new state
	}

	getSnapshotBeforeUpdate(prevProps, prevState){
		console.log('[Persons.js] getSnapshotBeforeUpdate');
		return {message: 'Snapshot!'};
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		console.log(snapshot);
		console.log('[Persons.js] componentDidUpdate');
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
