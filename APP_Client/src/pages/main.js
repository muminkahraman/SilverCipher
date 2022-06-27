import React from "react"
import "../App.css"
import { HashRouter as Router, Route } from 'react-router-dom'

import Sign from './signupin'
import Menu from "./menu"
import Verification from "./verification"

const Main = () => {
    return (
        <Router>
            <Route exact path="/" component={Sign} />
            <Route path="/verify" component={Verification} />
            <Route path="/menu" component={Menu} />
        </Router>
    )
}

export default Main;