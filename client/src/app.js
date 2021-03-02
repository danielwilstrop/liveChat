import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import join from './components/join/join'
import chat from './components/chat/chat'

const App = () => {
    return (
        <Router>
            <Route path = '/' exact component ={join} />
            <Route path = '/chat' component ={chat} />
        </Router>
    )
}

export default App;