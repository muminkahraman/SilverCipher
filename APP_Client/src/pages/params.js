import React from "react"
import "../App.css"
import { Link } from "react-router-dom"

const script = require("../script")

const Params = () => {
    return (
        <>
            <Link to='/' onClick={() => script.resetStore()} className="paramItem">
                Reset Store
            </Link>
            <div onClick={() => script.testUser()} className="paramItem">
                Test user
            </div>
            <Link to='/' className="paramItem">
                Verouiller
            </Link>
        </>
    )
}

export default Params