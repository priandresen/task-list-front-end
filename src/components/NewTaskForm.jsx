import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onHandleSubmit }) => {
  const [name, setName] = useState('');
	
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newTask = {
				title: name,
				isComplete: false,
				description: '',
		}
		onHandleSubmit(newTask);
		setName('');
    };

  return (
	<form onSubmit={handleSubmit}>
		<label htmlFor="name">Task Title: </label>
		<input type="text" id="name" name="name" value={name} onChange={handleNameChange}/>
		<div>
			<input type="submit" value="Add a Task" />
			</div>
			</form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;