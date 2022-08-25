import './Menu.css'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import { useLocation } from 'react-router-dom'

function Menu({ onLogoutClick, onSettingsClick, context: { toggleTheme } }) {
    const logger = new Loggito('Menu')
    const location = useLocation()

    const handleLogoutClick = () => onLogoutClick()

    const handleSettingsClick = () => onSettingsClick()

    logger.info('return')

    return <ul className="Menu container container--row">
        
        {location.pathname !== '/settings' && <li className="Menu__item">
            <IconButton text="settings" onClick={handleSettingsClick} />
        </li>}
        <li className="Menu__item">
            <IconButton text="light" onClick={toggleTheme} />
        </li>
        <li className="Menu__item">
            <IconButton text="logout" onClick={handleLogoutClick} />
        </li>
    </ul>
}

export default withContext(Menu)