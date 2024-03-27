import React from 'react'
import './PageNotFound.scss'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='page-not-found-wrapper'>
            <div className='page-not-found-container'>
                <h2>Page Not Found</h2>
                <Link to={`/`} className='button'>
                    Go to Main Page
                </Link>

            </div>
        </div>
    )
}
