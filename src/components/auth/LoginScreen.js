import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword} from '../../actions/auth'
import {useForm} from '../../hooks/useForm'

const LoginScreen = () => {

    //con esta funcion podemos hacer los dispatch
    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui )

    const [ formValues, handleInputChange ] = useForm({
        email:'kensa@gmail.com',
        password:'123456',
    })

    const { email,password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()

    // con esto hacemos el dispatch al store
        dispatch( startLoginEmailPassword(email,password))
    }

    const handleLoginGoogle = () => {

        dispatch( startGoogleLogin() )
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={ handleLogin } className='animate__animated animate__fadeIn animate__faster'>
                <input 
                    type="text" 
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled = { loading }
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p className="btn-text">sign in with google</p>
                    <div 
                        className="google-btn"
                        onClick= { handleLoginGoogle }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to='/auth/register'
                    className='link'

                >
                    Create new account
                </Link>

            </form>
        </>
    )
}

export default LoginScreen
