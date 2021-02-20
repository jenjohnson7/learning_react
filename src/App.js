import React, { Component } from 'react';
import './App.css';
import './Person/Person.css';
import './UserInput/UserInput.css';
import Person from './Person/Person.js';
import UserOutput from './UserOutput/UserOutput.js';
import UserInput from './UserInput/UserInput.js';

class App extends Component {
  // state property is only for class-based components (components that extend other components)
  // ages are integers here
  // if state changes, the component will be rerendered

  // if props (argument list in functional components) change, the component will also be rerendered
  state = {
	  persons: [
		  {id: 1, name: 'Julia', age: 25},
		  {id: 2, name: 'Charlie', age: 25},
		  {id: 3, name: 'Amy', age: 24},
		  {id: 4, name: 'Noel', age: 25}
	  ],
	  usernames: [
		  {username: 'jenniferj'},
		  {username: 'jenjenJen'}
	  ],
	  showJen: false,
	  showAnna: false,
	  showPersons: false
  }

  switchNameHandler = (newName, newName2, newName3) => {
	  console.log('clicked');
	  // merges data. Even if no changes to Amy, still need to include her since she will otherwise be detected as deleted from the state, and persons[2] in line 79 will throw an error
	  this.setState(
		  {persons: [
			  {name: newName, age: 25},
			  {name: newName2, age: 26},
			  {name: newName3, age: 24}
	  	  ]}
	  );
  }

  deletePersonHandler = (personIndex) => {
	  // use .slice() or spread operator to make copy instead of reference/pointer
	  // const persons = this.state.persons.slice();
	  const persons = [...this.state.persons];
	  persons.splice(personIndex, 1); // this only updates the temporary variable
	  this.setState({persons:persons});
	  // therefore, I can set the state persons to the temporary/remove variable persons
  }

  nameChangedHander = (event, id) => {
	  const personIndex = this.state.persons.findIndex(p => {
		  return p.id === id;
	  });

	  // spread {} for objects
	  const person = {...this.state.persons[personIndex]};
	  person.name = event.target.value;

	  // spread [] for arrays
	  const persons = [...this.state.persons];
	  persons[personIndex] = person;

	  this.setState({persons: persons});
  }

  usernameEditedHandler = (event) => {

	let first = this.state.usernames[0].username;
	let second = this.state.usernames[1].username;

	let username_to_change = event.target.getAttribute('username_index');

	if (username_to_change === "0"){
		first = event.target.value;
	} else if (username_to_change === '1'){
		second = event.target.value;
	}

	this.setState(
	  {usernames: [
		  {username: first},
		  {username: second}
	  ]}
	);
  }

  togglePersonsHandler = (name) => {
	if (name == "Jen") {
    	const doesShow = this.state.showJen;
		this.setState({showJen: !doesShow});
	} else if (name == "Anna") {
		const doesShow2 = this.state.showAnna;
		this.setState({showAnna: !doesShow2});
	} else if (name == "everyone"){
		const doesShow3 = this.state.showPersons;
		this.setState({showPersons: !doesShow3})
	};
  }

  render() {

	// inline css styling: scoped rather than global
    const style = {
	  backgroundColor: 'white',
	  font: 'inherit',
	  border: '1px solid blue',
	  padding: '8px',
	  cursor: 'pointer'
    }

	const usernameBlock = {
		backgroundColor: '#ccc',
		opacity: '100%',
		width: '60%',
		margin: '16px auto',
		font: 'inherit',
		border: '1px solid green',
		boxShadow: '0 2px 3px #ccc',
		padding: '16px',
		textAlign: 'center'
	}

	let AnnaDiv = null;

	if (this.state.showAnna){
		AnnaDiv = (
			<div>
				<Person name="Anna" age='26'/>
			</div>
		);
	}

	let persons = null;

	if (this.state.showPersons){
		// rendering each object in a list dynamically
		// 'map' converts each elt in array to something else using a function
		// use index feature of 'map' and pass it to the handler to distinguish which person to remove
		// use key = unique identifier to increase efficiency of rerendering
		persons = (
			<div>
			{this.state.persons.map((person, index) => {
				return <Person
					click={() => this.deletePersonHandler(index)}
					name={person.name}
					age={person.age}
					key={person.id}
					changed={(event) => this.nameChangedHander(event, person.id)}
				/>
			})}
			</div>
		);
	}

    return (
	  // JSX

	  // ages (for first 1 people) are strings here
	  // pass switchNameHandler function as property 'click', so it can be accessed in the child Person component
	  // bind syntax is the most common
	  	// if multiple arguments, pass each of them in.
	 // single line function syntax (line 81) may take longer. In this case, single line => implies 'return' and the switchNameHandler needs parentheses
      <div className="App">
        <h1>Hi, I'm a React app</h1>
		<p>paragraph is working!</p>
		<button style={style} onClick={this.switchNameHandler.bind(this, 'Julia Claire', 'Charlie', 'Amy')}>Switch Name</button>

		<button style={style}
		onClick={this.togglePersonsHandler.bind(this, 'Jen')}>Show/Hide Jen</button>

		{ this.state.showJen === true ?
			<div>
				<Person name="Jen" age='24'>Hobbies: Snowboarding</Person>

			</div>
		: null
		}

		<button style={style} onClick={this.togglePersonsHandler.bind(this, 'Anna')}>Show/Hide Anna</button>

		{ AnnaDiv }

		<button style={style} onClick={this.togglePersonsHandler.bind(this, 'everyone')}>Show/Hide Everyone Else</button>

		{ persons }

		<div style={usernameBlock}>
		<UserOutput username={this.state.usernames[0].username} />
		<UserInput
			username={this.state.usernames[0].username}
			changeusernamefunction={this.usernameEditedHandler}
			username_index='0'/>
		</div>
		<div style={usernameBlock}>
		<UserOutput username={this.state.usernames[1].username} />
		<UserInput
			username={this.state.usernames[1].username}
			changeusernamefunction={this.usernameEditedHandler}
			username_index='1'/>
		</div>

      </div>
    );

	// createElement(html tag, css, nested components)
	// className because 'class' is a React special tag (line 5). However, in the html (Chrome inspect), it's back to class).
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!'));
  }
}

export default App;
