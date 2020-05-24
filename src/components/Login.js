import React, {useState, useEffect  } from "react";
import { AuthContext } from "../context/authContext";
import firebase from '../firebase/config';
import {Redirect} from 'react-router-dom'

import Container from 'react-bootstrap/Container'

const Login= ()=>{

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[redirect,setRedirect]=useState(false)
    const {authState, dispatchAuth} =React.useContext(AuthContext)
    const [userKind,setUserKind]=useState("")
    useEffect( ()=>{
        console.log("useEffect Main")
      async function fetchData(){
        console.log("Main fetchData");

        var user =await firebase.getUserState() 
       console.log(user);
       if(user){

        setUserKind("Student or Course")
        console.log("right after setUserKind in login")

        console.log(userKind)
    }else{
        setUserKind("unknown")

    }
    }
    fetchData()   
},[]
    )
    console.log("userKind")

    console.log(userKind)

    let redirectComponent
    if(userKind=="Student or Course"){
        console.log("login redirect")
        redirectComponent=(  <Redirect to={{pathname: '/'}}/>)
    }


    const loginEvent= async (e)=>{
        console.log(authState)
        e.preventDefault();

        const response=await firebase.login(email,password)
            if(response.hasOwnProperty('message')){
            console.log(response.message)
            return response.message
            }
            if(response.user){
                console.log("response.user")

                console.log(response.user)
                console.log(response.user.uid)

                console.log(authState)
             
                setRedirect(true)

                return dispatchAuth({
                    type:'LOGIN',
                    payload:response.user
                })
            }
        }
        
        if (redirect){
            return <Redirect to='/'/>
        }
    
    return (
        <React.Fragment>
        <div className="position">

        <div className="enterAppComponent">
        <Container>

        <h1 >please Login</h1>
        <form onSubmit={loginEvent}> 
        <div className="form-group row">
       
        <lable className="col " htmlFor='email'>email</lable>
        <input className="col " name='email' type='email' onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className="form-group row">

        <lable className="col " htmlFor='password'>password</lable>
        <input className="col " name='password' type='password' onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        
        <input   type='submit' value='Login'></input>
        </form>
        </Container>

{redirectComponent}
</div>
</div>

        </React.Fragment>
    )
}
export default Login;


