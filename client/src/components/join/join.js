import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './join.css'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [hideError, setHideError] = useState(true)

    const handleClick = (e) => {
        if (!name || !room){
            e.preventDefault()
            setHideError(false)
        }
    }

    let errorClass = hideError ? 'error' : 'hide-error'

    return (
        <div className = 'joinOuterContainer'>
            <div className = 'joinInnerContainer'>
                <h1 className = 'heading'> Join </h1>
                <div><input placeholder='Name' className = 'joinInput' type = 'text' onChange = {(e) => setName(e.target.value)} /> </div>
                <div><input placeholder='Room' className = 'joinInput mt-20' type = 'text' onChange = {(e) => setRoom(e.target.value)} /> </div>
                <div><h6 className= {errorClass }> Please enter a Name and Room </h6></div>
                <Link onClick = {handleClick} to = {`/chat?name=${name}&room=${room}`}>
                    <button className = 'button mt-20' type = 'submit'> Sign In </button>
                </Link>
            </div>
        </div>
    )
}

export default Join