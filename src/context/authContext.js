import React from 'react'
import {firebaseAuthReducer} from '../reducers/authReducers'
const AuthContext = React.createContext();
export {AuthContext};

const initialState ={
    user:{}
}
const AuthProvider = (props)=>{
    const [authState,dispatchAuth]= React.useReducer(firebaseAuthReducer, initialState)
    const valueProp= {authState,dispatchAuth}
    return <AuthContext.Provider value={valueProp}>
        {props.children}
            </AuthContext.Provider>
}
export {AuthProvider}