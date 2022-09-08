import { useState } from 'react'
import './Header.css'
import Menu from './Menu'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'

function Header({ name, onLogoutClick, onSettingsClick, view: viewHome }) {

    const logger = new Loggito('Header')

    const [view, setView] = useState(null) // [null, f () {}]

    const handleMenuClick = () => {
        setView('menu')

        logger.debug('setView', 'menu')
    }

    const handleCloseClick = () => {
        setView(null)
    
        logger.debug('setView', null)
    }

    const handleSettingsClick = () => {
        setView(null)

        logger.debug('setView', null)

        onSettingsClick()
    }

    logger.info('return')

    return <header className="Header container">
        <div className="container container--row container--distributed">
            <h2 className="title">Hello, {name}!</h2>

            {view === null && <IconButton className="buttonMenu" text="menu" onClick={handleMenuClick} />}
            {view === 'menu' && <IconButton className="buttonMenu" text="close" onClick={handleCloseClick} />}
        </div>

        {view === 'menu' && <Menu onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} view={viewHome} />}
    </header>
}

export default Header