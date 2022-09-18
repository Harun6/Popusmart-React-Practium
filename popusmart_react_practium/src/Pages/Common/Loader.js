import React from 'react'
import logo from '../../logo.svg'

export default function Loader() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Page is Loading Right Now Pls Wait ....
                </p>
            </header>
        </div>
    )
}
