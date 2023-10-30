import React from 'react'
import { Link} from "react-router-dom";

const Layout = () => {
  return (
    <header>
        <h1>APP V1</h1>
        <nav>
            <ul>
              <li><Link to='/' className='custom-link'> Home </Link></li>
              <li><Link to='/signup' className='custom-link'>SignUp</Link></li>
              <li><Link to='/login' className='custom-link'>Login</Link></li>
            </ul>
          </nav>
    </header>
  )
}

export default Layout
