import React from 'react';

const charComponent = (props) => {
	return (
		<div className='Char'>
		<p onClick={props.click}>{props.name}</p>
		</div>
	)
}

export default charComponent;
