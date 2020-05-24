import React, {useState,  useEffect}  from 'react'

import  firebase  from "../firebase/config";
import  Button  from "react-bootstrap/Button";
import  Modal  from "react-bootstrap/Modal";
import  {CreateEditBook}  from "./CreateEditBook";
import Nav from 'react-bootstrap/Nav'

import  {Redirect}  from "react-router-dom";
import  {useLocation,useHistory , useParams,useRouteMatch }  from "react-router";



  const  SingleBook =  (
    {booksObject, isAdmin, removeRegistration,isBuyer,isCart,UserKey}) => {

const [modalShow, setModalShow] = useState(false);



    const [RedirectComponent,setRedirectComponent]=useState("")

      const registerCourse=(e)=>{
          e.preventDefault()
        console.log(e)
        console.log(e.target.value)
    }



    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
            <CreateEditBook isEdit={true} bookObject={booksObject}></CreateEditBook>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>


          </Modal>
        );
      }
  let editEnablenButton;
if(isAdmin){

    editEnablenButton=(    
        <div>

          <Button variant="primary" onClick={() => setModalShow(true)}>
Edit book       </Button> 

            </div>


        )

}
const addBookToCart= async()=>{

    await firebase.updateUserCart(UserKey,booksObject.BookID)
}
const removeBookFromCart=async()=>{
    console.log("removeBookFromCart")
    await firebase.removeItemFromUserCart(UserKey,booksObject.BookID)

    }
let addOrRemoveFromCartButton;

if(isBuyer){

    if(isCart){
        addOrRemoveFromCartButton=(    
            <div>
              <Button variant="danger" onClick={removeBookFromCart}>
    Remove book from cart      </Button> 
    
                </div>
                )
    }else{
        addOrRemoveFromCartButton=(    
            <div>
              <Button variant="primary" onClick={addBookToCart}>
    Add book to cart      </Button> 
    
                </div>
                )
    }
}


    
console.log(useLocation()) 
let redirectToSingleBook;
const singleComponentDisplay=()=>{
    console.log('singleComponentDisplay')
    console.log(booksObject)


    redirectToSingleBook=(<Redirect to={{
        pathname: `/displayBook/${booksObject.BookID}`,
        state: { booksObject} 
      }}/>)


    setRedirectComponent(redirectToSingleBook)

}
let componentRedirectedState=useLocation().state

if (componentRedirectedState){
    booksObject=componentRedirectedState.booksObject
}
let imageJsx;
if(booksObject.photo!="No photo"){


  imageJsx=(
    <div class="col-12 col-md-6 mt-3">
    <img width="100%" alt="no pic" src={booksObject.photo} />
  </div>

  )
}

let bookNameJSX;

if(useLocation().pathname.includes("displayBook")){
  console.log('displayBook')
  bookNameJSX=(  <div className=" pl-3 "> {componentRedirectedState.booksObject.bookName}</div>)

}else{
  console.log('no displayBook')
  bookNameJSX=(
    <Nav className="p-0 pr-0 "> 
    <Nav.Item >
    <Nav.Link >
    {booksObject.bookName}
    </Nav.Link>
    </Nav.Item>
     </Nav>
  )

}



let bookDispaly;
    if(  Object.keys(booksObject).length===0 ){      
        bookDispaly="no book in this id"
    }else{
        bookDispaly=(
            <div>

            <div class="container border-bottom ">
						<div class=" row align-items-center h-25 w-50">
              
            {imageJsx}
              
            <div class="col-12 col-md-6 ">
            
            <h3 className=" ">          
            <div className="card-title " onClick={singleComponentDisplay}>

            {bookNameJSX}
            
           
                            </div>
    </h3>
								<p className="pl-3"> {booksObject.Price}$ <br/>
                id:&nbsp;{booksObject.BookID}<br/>
                </p>
            
                <div class="">
            
                <div className="">
                            {editEnablenButton}
                            {addOrRemoveFromCartButton}
                            </div>
                {RedirectComponent}
                            </div>
							</div>
            </div>
            <div class=" row align-items-center h-25 w-50">
            <div class="col-12 col-md-6">

            <h4 class="card-title">Summary</h4>

            <p> {booksObject.BookSummary}
            </p>
            </div>
            </div>

					</div>





            </div>
        )
    }

    
    return (
        <div>

        {bookDispaly}
      

        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />


      </div>
    )
}
export default SingleBook

