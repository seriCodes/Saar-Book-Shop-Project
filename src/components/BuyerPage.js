import React, {useState, useEffect} from 'react'
import  firebase  from "../firebase/config";
import  {Redirect}  from "react-router-dom";

import  {BooksList}  from "./BooksList";

export const BuyerPage = () => {
   
    const [userKind,setUserKind]=useState('Buyer')
    const [UserKey,setUserKey]=useState('')

    useEffect(  ()=>{
        console.log("useEffect MyBooks")
      async function fetchData(){
        var user =await firebase.getUserState() 
       console.log(user);
       if(user){
        let userDBobject
        userDBobject =await firebase.getUserDBobject(user.uid)

        // console.log(userDBobject);

        setUserKind(userDBobject.userKind)
        let userKey;
        userKey= await firebase.getUserKey(user.uid)
        console.log(userKey);

        setUserKey(userKey)
    }else{
        setUserKind("unknown")
  
       }
      };
      fetchData()   
    },[]
    )



    console.log(UserKey);

    let redirectComponent;
    if(userKind!="Buyer"){
        console.log("redirect from AdminPage...")
        redirectComponent=(<Redirect to="/"/>)
    }
    return (
        <div>

 

<BooksList isAdmin={false} isBuyer={true} isCart={false} UserKey={UserKey}></BooksList>
       
            {redirectComponent}

        </div>
    )
}
