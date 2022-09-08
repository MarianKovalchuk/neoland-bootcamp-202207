import { useState, useEffect } from 'react'
import Loggito from '../utils/Loggito'
import retrieveUser from '../logic/retrieveUser'
import retrieveTasks from '../logic/retrieveTasks'
import createTask from '../logic/createTask'
import updateTaskText from '../logic/updateTaskText'
import deleteTask from '../logic/deleteTask'
import Settings from '../components/Settings'
import TaskList from '../components/TaskList'
import Header from '../components/Header'
import withContext from '../utils/withContext'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

function HomePage({ onLogoutClick, context: { handleFeedback } }) {
    const logger = new Loggito('HomePage')

    const [name, setName] = useState(null)
    const [tasks, setTasks] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        logger.info('"componentDidMount"')

        try {
            retrieveUser(sessionStorage.token, (error, user) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    onLogoutClick()

                    return
                }

                setName(user.name)

                logger.debug('setName', user.name)
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }

        loadTasks()
    }, [])

    const loadTasks = () => {
        try {
            retrieveTasks(sessionStorage.token, (error, notes) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                setTasks(tasks)

                logger.debug('setTaskss', tasks)
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleAddClick = () => {
        try {
            createTask(sessionStorage.token, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                loadTasks()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleUpdateTaskText = (taskId, text) => {
        try {
            updateTaskText(sessionStorage.token, taskId, text, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleDeleteTask = taskId => {
        try {
            deleteTask(sessionStorage.token, taskId, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                loadTasks()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleSettingsClick = () => {
        navigate('settings')

        logger.debug('navigate to settings')

        loadTasks()
    }

    const handleSettingsCloseClick = () => {
        navigate('/')

        logger.debug('navigate to list')
    }

    logger.info('return')

    return name ?
        <div className="home-page container container--full container--distributed">
            <Header name={name} onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} />

            <main className="main">
                <Routes>
                    <Route path="/" element={<TaskList tasks={tasks} onUpdateTaskText={handleUpdateTaskText} onDeleteTask={handleDeleteTask} />} />
                    <Route path="settings" element={<Settings onCloseClick={handleSettingsCloseClick} />} />
                </Routes>
            </main>

            <footer className="footer">
                {location.pathname === '/' && <button className="transparent-button" onClick={handleAddClick}>+</button>}
            </footer>
        </div>
        :
        null
}

export default withContext(HomePage)