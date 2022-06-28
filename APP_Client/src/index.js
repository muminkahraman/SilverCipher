import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { StatePorvider } from './state/StateProvider';
import reducer, { initialState } from './state//reducer';

import Main from './pages/main'

ReactDOM.render(
    <StatePorvider intialState={initialState} reducer={reducer}>
        <Main />
    </StatePorvider>,
    document.getElementById("root")
)
