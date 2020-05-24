import React, {useState,useEffect} from 'react'
import  firebase  from "../firebase/config";
import  {Redirect}  from "react-router-dom";

import {Link} from 'react-router-dom';

const Main = ()=>{
        let redirectComponent;
        const [userKind,setUserKind]=useState("")

        useEffect( ()=>{
                console.log("useEffect Main")
              async function fetchData(){
                console.log("Main fetchData");

                var user =await firebase.getUserState() 
               console.log(user);

               if(user){

                setUserKind("Admin or Shopper")

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

            if(userKind=="unknown"){
                console.log("redirect from main" )
                redirectComponent=(<Redirect to="/login"/>)
            }
        

    return(
            <React.Fragment>
            {redirectComponent}
            <div  className="">
            <div className=" h-100 w-100  mb-2 d-flex align-content-center justify-content-center ">

<h1 className="display-1

"><u>Saar's Book On-Line Shop</u></h1>
</div></div>



</React.Fragment>
        )
}
export default Main;