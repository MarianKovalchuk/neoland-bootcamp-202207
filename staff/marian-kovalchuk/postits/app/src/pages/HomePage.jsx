import { useState, useEffect } from 'react'
import Loggito from '../utils/Loggito'
import retrieveUser from '../logic/retrieveUser'
import retrieveNotes from '../logic/retrieveNotes'
import createNote from '../logic/createNote'
import updateNote from '../logic/updateNoteText'
import deleteNote from '../logic/deleteNote'
import Settings from '../components/Settings'
import NoteList from '../components/NoteList'
import Header from '../components/Header'
import withContext from '../utils/withContext'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

   function HomePage({ onLogoutClick, context: { handleFeedback } }) {
    const logger = new Loggito('HomePage')

    const [name, setName] = useState(null)
    const [notes, setNotes] = useState(null)
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

        loadNotes()
    }, [])

    const loadNotes = () =>{
        try{
            retrieveNotes(sessionStorage.token, (error, notes)=>{
                if (error){
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                setNotes(notes)

                logger.debug('setNotes', notes)
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleAddClick = () => {
        try {
            createNote(sessionStorage.token, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                loadNotes()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleUpdateNote = (noteId, text)=>{
        try{
            updateNote (sessionStorage.token, noteId, text, error =>{
                if (error){
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

    const handleDeleteNote = noteId =>{
        try {
            deleteNote (sessionStorage.token, noteId, error =>{
                if (error){
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                loadNotes()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn (error.message)
        }
    }

    const handleSettingsClick = () => {
        navigate('settings')

         logger.debug('navigate to settings')


        loadNotes()
    }

    const handleSettingsCloseClick = () => {
        navigate('/')



        logger.debug('navigate to list')
    }

    logger.info('return')

    return name ?
        <div className="home-page container container--full container--distributed">
            <Header name={name} onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} />
            <img className="image" src={image} />
            <main className="main">
              
              <Routes>
                    <Route path="/" element={<NoteList notes={notes} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote} />} />
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
