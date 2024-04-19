import React from 'react';
import './PopupForm.scss';
import { useState } from 'react'

const PopupForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        console.log('Username:', username);
        console.log('Password:', password);
        // Code to handle login goes here
        props.toggle()
    }

    console.log('Username:', username);
    console.log('Password:', password);

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        console.log(username);
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}

export default PopupForm;