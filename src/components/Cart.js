import React, {useState, useEffect} from 'react'
import  {BooksList}  from "./BooksList";
import  {Redirect}  from "react-router-dom";
import  firebase  from "../firebase/config";

export const Cart = () => {
    const [userKind,setUserKind]=useState('Admin or Shopper')
    const [UserKey,setUserKey]=useState('')
    const [userCart,setUserCart]=useState(null)
    let redirectComponent;

    useEffect(  ()=>{
        console.log("useEffect MyBooks")
      async function fetchData(){
        var user =await firebase.getUserState() 
       console.log(user);
       if(user){
        let userDBobject
        userDBobject =await firebase.getUserDBobject(user.uid)

        // console.log(userDBobject);
let bookIDarray=[]
        for  (const bookID in userDBobject.cart){
            console.log(bookID);
            bookIDarray.push(userDBobject.cart[""+bookID])
        }
        console.log(bookIDarray);
        setUserCart(bookIDarray)
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
    console.log(userCart);
    if(userKind=="unknown"){
        console.log("redirect to main" )
        redirectComponent=(<Redirect to="/"/>)
    }




    return (
        <div>
        
        <BooksList isAdmin={userKind=="Administrator"?true:false} isBuyer={false} isCart={true} UserKey={UserKey} booksIDs={userCart}></BooksList>
        {redirectComponent}
            </div>
    )
}
