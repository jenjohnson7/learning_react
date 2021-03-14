import React from 'react';

const validationComponent = (props) => {
	return (
		<div>
		{ props.string_length >= props.goal_char_count ?
		<p>Text is long enough :)</p>
		: <p>Text is too short :(</p>
		}
		</div>
	)
}

export default validationComponent;
