import React, { Component } from 'react';
import './App.css';
import './Person/Person.css';
import Person from './Person/Person.js';

class App extends Component {
  // state property is only for class-based components (components that extend other components)
  // ages are integers here
  // if state changes, the component will be rerendered

  // if props (argument list in functional components) change, the component will also be rerendered
  state = {
	  persons: [
		  {name: 'Julia', age: 25},
		  {name: 'Charlie', age: 25},
		  {name: 'Amy', age: 24}
	  ]
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

  nameChangedHander = (event) => {
	  this.setState(
		  {persons: [
			  {name: 'Julia', age: 25},
			  {name: event.target.value, age: 25},
			  {name: 'Amy', age: 24}
		  ]}
	  );
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

		<Person name="Jen" age='24'>Hobbies: Snowboarding</Person>
		<Person name="Anna" age='26'/>

		<Person
			name={this.state.persons[0].name}
			age={this.state.persons[0].age}
			click={this.switchNameHandler.bind(this, 'Judge Jusi', 'Charlie', 'Amy')}>Hobbies: Knitting</Person>
		<Person
			name={this.state.persons[1].name}
			age={this.state.persons[1].age}
			click={this.switchNameHandler.bind(this, 'Julia', 'Charles PW', 'Amy')}
			changed={this.nameChangedHander}/>
		<Person
			name={this.state.persons[2].name}
			age={this.state.persons[2].age}
			click={ () => this.switchNameHandler('Julia', 'Charlie', 'Lamy Lorn') }/>
      </div>
    );

	// createElement(html tag, css, nested components)
	// className because 'class' is a React special tag (line 5). However, in the html (Chrome inspect), it's back to class).
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!'));
  }
}

export default App;
