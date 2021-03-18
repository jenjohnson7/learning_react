import React, { Component } from 'react';
import classes from './App.css';
import '../components/Persons/Person/Person.css';
import '../components/UserInput/UserInput.css';
import '../components/CharComponent/CharComponent.css';
import Person from '../components/Persons/Person/Person.js';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit.js';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.js';
import UserOutput from '../components/UserOutput/UserOutput.js';
import UserInput from '../components/UserInput/UserInput.js';
import ValidationComponent from '../components/ValidationComponent/ValidationComponent.js';
import CharComponent from '../components/CharComponent/CharComponent.js';
import Aux from '../hoc/Aux.js';
import withClass from '../hoc/WithClass.js';
import AuthContext from '../context/auth-context.js';

class App extends Component {

	constructor(props){
		super(props);
		console.log('[App.js] constructor');
	}
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
	  showPersons: false,
	  goal_char_count : 4,
	  typed_string: "",
	  showCockpit: true,
	  changeCounter: 0,
	  authenticated: false,
  }

	static getDerivedStateFromProps(props, state){
		console.log('[App.js] getDerivedStateFromProps', props);
		return state;
	}

	componentDidMount(){
		console.log('[App.js] componentDidMount');
	}

	shouldComponentUpdate(nextProps, nextState){
		console.log('[App.js] shouldComponentUpdate');
		return true;
	}

	componentDidUpdate(prevProps, prevState){
		console.log('[App.js] componentDidUpdate');
	}

  switchNameHandler = (newName, newName2, newName3, newName4) => {
	  // merges data. Even if no changes to Amy, still need to include her since she will otherwise be detected as deleted from the state, and persons[2] in line 79 will throw an error
	  this.setState(
		  {persons: [
			  {name: newName, age: 25, id: 1},
			  {name: newName2, age: 26, id: 2},
			  {name: newName3, age: 24, id: 3},
			  {name: newName4, age: 25, id: 4}
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

	  this.setState((prevState, props) => {
		  return {
			  persons: persons,
			  changeCounter: prevState.changeCounter + 1
		  };
	  });
  };

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
	if (name === "Jen") {
    	const doesShow = this.state.showJen;
		this.setState({showJen: !doesShow});
	} else if (name === "Anna") {
		const doesShow2 = this.state.showAnna;
		this.setState({showAnna: !doesShow2});
	} else if (name === "everyone"){
		const doesShow3 = this.state.showPersons;
		this.setState({showPersons: !doesShow3})
	};
  }

  loginHandler = () => {
	  this.setState({authenticated: true})
  };

  typedStringHandler = (event) => {
	  this.setState({typed_string: event.target.value});
  }

  deleteCharHandler = (charIndex) => {
	  console.log("delete char handler");
	  console.log(charIndex);
	  const previous_typed_string = this.state.typed_string;
	  const char_array = previous_typed_string.split('');
	  char_array.splice(charIndex, 1);
	  let new_string = char_array.join('');
	  this.setState({typed_string:new_string});
  }
  render() {
	  console.log('[App.js] render');
	// inline css styling: scoped rather than global
    const style = {
	  backgroundColor: 'green',
	  color: 'white',
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
		persons = (
			<div>
			<Persons
			persons={this.state.persons}
			clicked={this.deletePersonHandler}
			isAuthenticated={this.state.authenticated}
			changed={this.nameChangedHandler}>
			</Persons>
			</div>
		);
	}

	let chars = null;

	if (this.state.typed_string){
		const a = this.state.typed_string.split('');
		chars = (
			<div>
			{a.map((c, index) => {
				return <CharComponent
						key={Math.random()}
						name={c}
						click={() => this.deleteCharHandler(index)}
						/>
			})}
			</div>
		)
	}

    return (
	  // JSX

	  // ages (for first 1 people) are strings here
	  // pass switchNameHandler function as property 'click', so it can be accessed in the child Person component
	  // bind syntax is the most common
	  	// if multiple arguments, pass each of them in.
	 // single line function syntax (line 81) may take longer. In this case, single line => implies 'return' and the switchNameHandler needs parentheses
	  <Aux>

		<button style={style} onClick={this.switchNameHandler.bind(this, 'Julia Claire', 'Charles PW', 'Lamy Lorn', 'Forte-san')}>Switch Name</button>

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

		<button
		onClick={() => {
			this.setState({showCockpit: false});
		}}>Remove Cockpit</button>
		<AuthContext.Provider
		value={
			{authenticated: this.state.authenticated,
				login: this.loginHandler
			}
		}>
		{this.state.showCockpit ?
		<Cockpit
		title={this.props.appTitle}
		showPersons={this.state.showPersons}
		personsLength={this.state.persons.length}
		clicked={this.togglePersonsHandler}/>
		: null}

		{ persons }
		</AuthContext.Provider>

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

		<div>
		<p>Enter a string to be happy:</p>
		<input type="text" onChange={this.typedStringHandler} value={this.state.typed_string}/>
		<p>{this.state.typed_string.length} characters</p>
		<ValidationComponent string_length={this.state.typed_string.length} goal_char_count={this.state.goal_char_count}/>

		{ chars }
		</div>

      </Aux>
    );

	// createElement(html tag, css, nested components)
	// className because 'class' is a React special tag (line 5). However, in the html (Chrome inspect), it's back to class).
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!'));
  }
}

export default withClass(App, classes.App);
