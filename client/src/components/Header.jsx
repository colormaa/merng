import React from 'react'
import logo from './assets/munichmodel.jpeg'
export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
        <div className="container">
            <a className='navbar-brand' href="#">
                <div className="f-flex">
                    <img alt="" src={logo} className="mr-2"/>
                    <div>Project mgmt</div>
                </div>
            </a>
        </div>
    </nav>
    
  )
}
