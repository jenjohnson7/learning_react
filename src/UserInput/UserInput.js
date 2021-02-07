import React from 'react';

const userInput = (props) => {
	return (
		<div className='UserInput'>
		<input type="text" onChange={props.changeusernamefunction} value={props.username}
		username_index={props.username_index}/>
		</div>
	)
}

export default userInput;
