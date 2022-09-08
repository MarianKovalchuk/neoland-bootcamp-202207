import './TaskList.css'
import Loggito from '../utils/Loggito'

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
    const logger = new Loggito('List')

    logger.info('return')

    return <ul className="TaskList">
        {tasks && tasks.map(task => <li className="TaskList__item" key={task.id}>
            <button className="TaskList__item-delete-button" onClick={() => onDeleteTask(task.id)}>x</button>


            <p suppressContentEditableWarning="true" contentEditable="true"  className="list__item-text" onKeyUp={event => {
                if (window.updateTaskTimeoutId)
                clearTimeout(window.updateTaskTimeoutId)

            window.updateTaskTimeoutId = setTimeout(() => {
                const text = event.target.innerText
                
               onUpdateTask(task.id, text)
            }, 500)
        }}>{task.text}</p>
    </li>)}
</ul>
}

export default TaskList
            