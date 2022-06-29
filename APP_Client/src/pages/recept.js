import React, { useState } from 'react';
import '../App.css';
import { useStateValue } from '../state/StateProvider';
import Transfer from './components/transferCard'

const app = window.require('electron').remote
const axios = app.require("axios");

function Recept() {

  const [{ username }] = useStateValue();
  const [data, setData] = useState([{}]);

  const getData = async () => {
    await axios
      .post("http://localhost:3001/api/transfer/received", { pseudo: username })
      .then((response) => {
        setData(response.data)
      });
  }

  getData()

  return (
    <>
      <div className='boite'>
        {
          data.map((transfer) =><Transfer key={transfer} transfer={transfer} />)
        }
      </div>
    </>
  );
}

export default Recept;
