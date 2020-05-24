import React, {  useState, useEffect, useContext } from "react";
import  firebase  from "../firebase/config";
import { AuthContext } from "../context/authContext";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'


const SigninForm= ()=>{
    const [userKindB,setUserKindB]=useState("")
    useEffect( ()=>{
        console.log("useEffect Main")
      async function fetchData(){
        console.log("Main fetchData");

        var user =await firebase.getUserState() 
       console.log(user);
       if(user){

        setUserKindB("Student or Course")
        console.log("right after setUserKindB in login")

        console.log(userKindB)

    }else{
        setUserKindB("unknown")

    }
    }
    fetchData()   
},[]
    )
    console.log("userKind")

    console.log(userKindB)

    let redirectComponent
    if(userKindB=="Student or Course"){
        console.log("login redirect")
        redirectComponent=(  <Redirect to={{pathname: '/'}}/>)
    }


    
    const [fullName,setfullName]=useState("")
    const [ID,setID]=useState("")
    const [userKind,setUserKind]=useState("")
    const [courseDays,setCourseDays]=useState("")


    const [email,setStateEmail]=useState("")
    const [password,setStatePassword]=useState("")

    const {authState, dispatchAuth} = React.useContext(AuthContext);

    const[redirect,setRedirect]= useState(false)

    const accountCreatedEvent= async (e)=>{
        if(userKind=="LECTURER-Course"){
            var courseDaysList=[]
            for(var i=1; i<=7;i++){
                console.log(document.querySelector('#inline-checkbox-'+i).value)
                console.log(document.querySelector('#inline-checkbox-'+i).checked)
                if(document.querySelector('#inline-checkbox-'+i).checked==true){
                    courseDaysList.push(document.querySelector('#inline-checkbox-'+i).value)
                }
            }
        }
        
        console.log(courseDaysList)


        
        console.log(authState);
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log(userKind);

        const response=  await firebase.signIn(email,password, fullName,ID,userKind,courseDaysList)    
        if(response.hasOwnProperty('message')){
            console.log(response)
            console.log(response.message)
        }else{
            setRedirect(true)
            dispatchAuth({
                type: 'SIGNIN',
                payload: response.user
            })
            

            return response.user;
        } 

    }

    if (redirect){
        return <Redirect to='/'/>
    }

    



   return (
       <React.Fragment>
       {redirectComponent}
   <div className="position">
   <div className="enterAppComponent ">
   <Container>

    <h1 >create account here</h1>
    <form className="" onSubmit={accountCreatedEvent}>

    <div className="form-group row">
    <lable className="col " type='fullName'>Full Name</lable>
   <input className="col" name='fullName' type='fullName' onChange={(e)=>setfullName(e.target.value)}></input>
   </div>

   <div className="form-group row">

   <lable className="col " type='email'>Email here</lable>
   <input className="col " name='email' type='email' onChange={(e)=>setStateEmail(e.target.value)}></input>
   </div>
   <div className="form-group row">

   <lable className="col " type='id'>id here</lable>
   <input className="col " name='id' type='id' onChange={(e)=>setID(e.target.value)}></input>
   </div>
   <div className="form-group row">

   <lable className="col " type='password' >password here</lable>
   <input className="col " name='password' type='password' onChange={ (e)=> setStatePassword(e.target.value)}></input>
   </div>
   
   <div className="form-group row">

   <label className="col " className="form-check-label mb-3 ml-4">
   Administrator/Buyer
 
   <select name="userKind" className="form-control mt-3 col " onChange={ (e)=> setUserKind(e.target.value)} required>
   <option value="" >Please choose</option>  
   <option value="Administrator" >Administrator</option>   
   <option value="Buyer">Buyer</option>
   </select>
   </label>
   </div>


   <input type='submit' value='Create account'/>

   </form>
   </Container>

   </div>
   </div>

   </React.Fragment>
   )
}
export default SigninForm