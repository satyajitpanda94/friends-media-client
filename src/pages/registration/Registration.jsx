import React, { useRef, useState } from 'react'
import './Registration.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Registration() {
  const apiBaseURL= process.env.REACT_APP_API_BASE_URL
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      await confirmPassword.current.setCustomValidity("Passwords don't match!")
      await confirmPassword.current.reportValidity()
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post(`${apiBaseURL}/auth/register`, user);
        setError(null)
        alert('User Signup Successful.')
        navigate('/login')
      } catch (err) {
        setError(err.response.data)
      }
    }
  }

  return (
    <div className='registration'>
      <div className="registrationWrapper">
        <div className="registrationLeft">
          <h3 className="registrationLogo"><span className='logoFirstHalf'>Friends</span>Media</h3>
          <span className="registrationDesc">Connect with friends and world arround you.</span>
        </div>
        <div className="registrationRight">
          <form className="registrationBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Name'
              className="registrationInput"
              ref={username}
              required
            />
            <input
              type="email"
              placeholder='Email'
              className="registrationInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder='Password'
              className="registrationInput"
              ref={password}
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder='Confirm Password'
              className="registrationInput"
              ref={confirmPassword}
              onInput={e => e.target.setCustomValidity('')}
              required
            />
            {
              error &&
              <span className="error">{error}</span>
            }
            <button className="button" type="submit">Sign Up</button>
            <hr />
            <Link to='/login'>
              <button className="loginButton button">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
