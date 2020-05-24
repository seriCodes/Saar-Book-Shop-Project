import React, {useState, useEffect} from 'react'
import  SingleBook  from "./SingleBook";
import  firebase  from "../firebase/config";

export const BooksList = (props) => {


const [booksObjects,setBooksObjects]=useState([])
const [booksObjectsCompleteInitialArray,setBooksObjectsCompleteInitialArray]=useState([])

const [totalPrice,setTotalPrice]=useState(0)



useEffect(  ()=>{
    console.log("useEffect MyBooks")
  async function fetchData(){
    
// let IDTestarrayOfbooks=["432","123123","bbbbbbbbbbbb","fכגכג","ff5566"]

console.log(props.booksIDs)

let booksObjectsArray;
if(props.booksIDs){
    console.log(props.booksIDs)
    booksObjectsArray=await firebase.getBooksObjects(props.booksIDs)

}else{
    console.log(props.booksIDs)

    booksObjectsArray=await firebase.getBooksObjects()
}

console.log(booksObjectsArray);
   setBooksObjects(booksObjectsArray)
   setBooksObjectsCompleteInitialArray(booksObjectsArray)
let priceTotal=0;
   booksObjectsArray.forEach((book)=>{
    priceTotal+= Number(book.Price)
   })

   setTotalPrice(priceTotal)

   
  };
  fetchData()   
},[props.booksIDs]
)
const filterBooksByname=async(e)=>{
    console.log(e.target.value)
    let searchTerm=e.target.value;
    // console.log(booksObjects)
    let filteredArray=[]
    booksObjectsCompleteInitialArray.forEach((booksObject)=>{
       if( booksObject.bookName.toLowerCase().includes(searchTerm.toLowerCase())){
        filteredArray.push(booksObject)
       }
    })
    setBooksObjects(filteredArray)

    

    }
let sumTotalJSX;
    if(props.isCart){
       
        console.log("Cartaaa")
        sumTotalJSX=(
            <div class="aw-highlight mb-2 d-flex justify-content-center">

            <div className="h1 justify-content-center "><u>{props.isCart? "Cart's":"Shop's"} Sum Total {totalPrice}$</u></div>        
            </div>
    
        )
    }else{
        console.log("no Cartaaa")
    }
console.log(booksObjects)
    return (
        <div>

        <div class="aw-highlight mb-2 d-flex justify-content-center">

        <div className="h1 justify-content-center display-1"><u>{props.isCart? "Cart's":"Shop's"} Books </u></div>        
        </div>


        <div className="aw-highlight mb-2 d-flex ">

        <div className="h1 mr-4 ">Serach books</div>
        <div class="aw-highlight mb-2 d-flex ">
        <input className="h1 container" type="text" name="filterByName" onChange={filterBooksByname}></input>  </div>      
        </div>

       {sumTotalJSX}
        

           {
            booksObjects.length !==0?(booksObjects.map((booksObject)=>{
                   return <SingleBook key={booksObject.BookID} booksObject={booksObject} isAdmin={props.isAdmin} isBuyer={true} isCart={props.isCart} UserKey={props.UserKey}> </SingleBook>
            
                })):(<div>No books</div>)
            }

        </div>
    )
}
