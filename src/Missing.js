import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>
        Well,that's Disappointing.
      </p>
      <p>
        <Link to="/">Visit Out Homepage</Link>
      </p>
    </main>
  )
}

export default Missing