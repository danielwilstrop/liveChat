import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import Infobar from '../infobar/infobar'
import Input from '../input/input'
import Messages from '../messages/messages'
import './chat.css'
import TextContainer from '../textContainer/textContainer'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const ENDPOINT = 'https://danreactchat.herokuapp.com/'

    useEffect(()=> {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)
        setRoom(room)
        setName(name)

        socket.emit('join', { name, room }, () => {
            
        })
        return () => {
            socket.on('diconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message ) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });

    },[messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)


    return (
        <div className = 'outerContainer'>
            <div className = 'container'>
                <Infobar room = {room} />
                <Messages messages = {messages} name = {name} />
                <Input sendMessage = {sendMessage} message = {message} setMessage = {setMessage} />
            </div>
            <TextContainer users = {users} />
        </div>
    )
}

export default Chat