import React from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';


const Params = () => {

    const [{ username, email, tel, password }, dispatch] = useStateValue();


    function testUser() {
        console.log(username, email, tel, password)
    }

    function resetStore() {
        dispatch({type:"RESET"})
    }

    
    return (
        <>
            <Link to='/' onClick={() => resetStore()} className="paramItem">
                Reset Store
            </Link>
            <div onClick={() => testUser()} className="paramItem">
                Affiche user
            </div>
            <Link to='/' className="paramItem">
                Verouiller
            </Link>
        </>
    )
}

export default Params