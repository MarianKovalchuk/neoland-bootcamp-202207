import './TaskList.css'
import Loggito from '../utils/Loggito'

function TaskList({ tasks, onDeleteTask, onUpdateTaskText }) {
    const logger = new Loggito('List')

    logger.info('return')

    return <ul className="TaskList">
        {tasks && tasks.map(task => <li className="TaskList__item" key={task.id}>
           <div> <button className="TaskList__item-delete-button" onClick={() => onDeleteTask(task.id)}>x</button>
           <div className='navigate_buttons'>
            
            <button className='high_priority'>high</button>
            <button className='medium_priority'>medium</button>
            <button className='low_priority'>low</button>
            </div>
            <p suppressContentEditableWarning="true" contentEditable="true"  className="list__item-text" onKeyUp={event => {
                if (window.updateTaskTimeoutId)
                clearTimeout(window.updateTaskTimeoutId)

            window.updateTaskTimeoutId = setTimeout(() => {
                const text = event.target.innerText
                
               onUpdateTaskText(task.id, text)
            }, 500)
        }}>{task.text}</p>
        </div>
    </li>)}
</ul>
}

export default TaskList
            