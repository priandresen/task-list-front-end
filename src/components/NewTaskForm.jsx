import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultsFormState = {
	title: '',
	description: '',
	isComplete: false,
}

const NewTaskForm = ({ onHandleSubmit }) => {
	const [formData, setFormData] = useState(kDefaultsFormState);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: name === 'isComplete' ? value === 'true' ? true : false : value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onHandleSubmit(formData);
		setFormData(kDefaultsFormState);
    };

	const makeControlledInput = (name) => {
		return <input type="text" 
		id={`-input-${name}`} 
		name={name}
		value={formData[name]}
		onChange={handleChange}></input>
	};


  return (
	<form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="name">Task Title: </label>
			{makeControlledInput('title')}
		</div>
		<div>
			<label htmlFor="name">Task Description: </label>
			{makeControlledInput('description')}
		</div>
		<div>
			<label htmlFor="is-complete"> Is complete: </label>
			<select name="isComplete" id="is-complete" onChange={handleChange} value={String(formData.isComplete)}>
			<option value="false">False</option>
			<option value="true">True</option>
			</select>
		</div>
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