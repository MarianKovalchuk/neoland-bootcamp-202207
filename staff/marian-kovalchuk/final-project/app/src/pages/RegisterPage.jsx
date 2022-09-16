import Loggito from '../utils/Loggito'
import registerUser from '../logic/registerUser'
import withContext from '../utils/withContext'
import { AuthError, ClientError, ServerError } from 'errors'

function RegisterPage({ props, onLinkClick, context: { handleFeedback } }) {
    const logger = new Loggito(RegisterPage.name)

    logger.info('constructor')


    const handleLinkClick = event => {
        event.preventDefault()

         props.onLinkClick()
    }
    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form.name
        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value
        const name = nameInput.value

        try {
            registerUser(name, email, password, (error, token) => {
                if (error) {
                    if (error instanceof ServerError) {
                        handleFeedback({ message: error.message, level: 'error' })

                        logger.error(error.message)
                    } else if (error instanceof ClientError || error instanceof AuthError) {
                        handleFeedback({ message: error.message, level: 'warning' })

                        logger.warn(error.message)
                    }

                    return
                }

                logger.debug('user logged in')

                sessionStorage.token = token

                form.reset()
                onLinkClick()
            })
        } catch (error) {
            handleFeedback({message:error.message, level: 'warning'})
            logger.warn(error.message)
        }
    }

	logger.info('return')

    return <main className="register-page container container--full container--spaced">
        <form className="form" onSubmit={handleFormSubmit}>
            <div className="form__field">
                <label htmlFor="name">Name</label>
                <input className="input" type="text" name="name" placeholder="name" id="name" />
            </div>


            <div className="form__field">
                <label htmlFor="email">E-mail</label>
                <input className="input" type="email" name="email" placeholder="email" id="email" />
            </div>

            <div className="form__field">
                <label htmlFor="password">Password</label>
                <input className="input" type="password" name="password" placeholder="password" id="password" />
            </div>

            <button className="button" type="submit">Register</button>
        </form>

        <a className="anchor" href="login.html" onClick={handleLinkClick}>Login</a>
    </main>
}

export default withContext(RegisterPage)