import React from 'react';

const userOutput = (props) => {
	return (
		<div>
		<p>This is the user.</p>
		<p>User name: {props.username}</p>
		</div>
	)
}

export default userOutput;
