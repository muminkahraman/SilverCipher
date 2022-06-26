import React from "react"
import "../App.css"

const script = require("../script")

const Params = () => {
    return (
        <>
        <div onClick={script.getusername}>
            Param&#232;tres
        </div>
        </>
    )
}

export default Params