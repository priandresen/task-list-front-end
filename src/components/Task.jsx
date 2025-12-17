import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onComplete, onRemoveTask }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const completedTaskButtonClicked = () => {
    onComplete(id);
  };
  const removeTaskButtonClicked= () => {
    onRemoveTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => completedTaskButtonClicked()}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={()=>removeTaskButtonClicked()}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default Task;
