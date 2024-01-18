import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { AuthContext } from '../../context/authContext'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: email.current.value,
            password: password.current.value
        }
        try {
            await login(user);
            setError(null)
            alert('Login Successful.')
            navigate('/')
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"><span className='logoFirstHalf'>Friends</span>Media</h3>
                    <span className="loginDesc">Connect with friends and world arround you.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder='Email'
                            className="loginInput"
                            ref={email}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            className="loginInput"
                            ref={password}
                            required
                        />
                        {
                            error &&
                            <span className="error">{error}</span>
                        }
                        <button className="button" type='submit'>
                            Log In
                        </button>
                        <hr />
                        <Link to='/signup'>
                            <button className="signupButton button">Create New Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}