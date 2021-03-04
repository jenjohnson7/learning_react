// ES6 syntax

import React from 'react';
import styled from 'styled-components'

const person = (props) => {
	// props arguments can be both values and functions (click=switchNameHandler function in App.js)
	// children are elements between the opening and closing tags

	const StyledDiv = styled.div`
		width: 60%;
		margin: 16px auto;
		border: 10px solid #eee;
		box-shadow: 0 2px 3px #ccc;
		padding: 16px;
		text-align: center;

		@media (min-width: 500px): {
			width: '450px'
		}
	`;

	return (
		// <div className="Person" style={style}>
		<StyledDiv>
			<p onClick={props.click}>I'm {props.name}, I'm {props.age} years old, and I have {Math.floor(Math.random() * 30)} pets.</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name}/>
		</StyledDiv>
	);
}

export default person;
