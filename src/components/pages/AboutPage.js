import React from 'react'
import { Link } from 'react-router-dom'


function AboutPage() {
  return (
    <div className='about'>
      <h1>About This Project</h1>
      <p>This is a React app to leave feedback</p>
      <p>Version: 1.0.0</p>
      <p>
        <Link to="/">Back To Home</Link>
      </p>
    </div>
  )
}

export default AboutPage

