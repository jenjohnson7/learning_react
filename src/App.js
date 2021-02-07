import React, { Component } from 'react';
import './App.css';
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

  switchNameHandler = () => {
	  console.log('clicked');
	  // merges data. Even if no changes to Amy, still need to include her since she will otherwise be detected as deleted from the state, and persons[2] in line 45 will throw an error
	  this.setState(
		  {persons: [
			  {name: 'Julia Claire', age: 25},
			  {name: 'Charlie', age: 26},
			  {name: 'Amy', age: 24}
	  	  ]}
	  )
  }

  render() {

    return (
	  // JSX

	  // ages (for first 1 people) are strings here
      <div className="App">
        <h1>Hi, I'm a React app</h1>
		<p>paragraph is working!</p>
		<button onClick={this.switchNameHandler}>Switch Name</button>

		<Person name="Jen" age='24'>Hobbies: Snowboarding</Person>
		<Person name="Anna" age='26'/>

		<Person name={this.state.persons[0].name} age={this.state.persons[0].age}>Hobbies: Knitting</Person>
		<Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
		<Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );

	// createElement(html tag, css, nested components)
	// className because 'class' is a React special tag (line 4). However, in the html (Chrome inspect), it's back to class).
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!'));
  }
}

export default App;
