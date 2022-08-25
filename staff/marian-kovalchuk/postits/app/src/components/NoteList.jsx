import './NoteList.css'
import Loggito from '../utils/Loggito'

function NoteList({ notes, onDeleteNote, onUpdateNote }) {
    const logger = new Loggito('List')

    logger.info('return')

    return <ul className="NoteList">
        {notes && notes.map(note => <li className="NoteList__item" key={note.id}>
            <button className="NoteList__item-delete-button" onClick={() => onDeleteNote(note.id)}>x</button>


            <p suppressContentEditableWarning="true" contentEditable="true"  className="list__item-text" onKeyUp={event => {
                if (window.updateNoteTimeoutId)
                clearTimeout(window.updateNoteTimeoutId)

            window.updateNoteTimeoutId = setTimeout(() => {
                const text = event.target.innerText
                
               onUpdateNote(note.id, text)
            }, 500)
        }}>{note.text}</p>
    </li>)}
</ul>
}

export default NoteList
            