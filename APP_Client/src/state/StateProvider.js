//set up the data layer
import React, { createContext, useContext, useReducer } from 'react';

//this is the data layer
export const StateContexte = createContext();

// build provider
export const StatePorvider = ({ reducer, intialState, children }) => (
  <StateContexte.Provider value={useReducer(reducer, intialState)}>
    {children}
  </StateContexte.Provider>
);

export const useStateValue = () => useContext(StateContexte);
