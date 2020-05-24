import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import  firebase  from "../firebase/config";
import {AuthContext} from "../context/authContext";

export const Head = (props) => {
  const [userDBobject,setUser]=useState(null)
  const {authState, dispatchAuth} = React.useContext(AuthContext);
  const [userDBName,setUserName]=useState(null)
  const [userKind,setUserKind]=useState(null)

  useEffect(  ()=>{
    console.log("useEffect head")
  async function fetchData(){
    var user =await firebase.getUserState() 

    if(user){
    let userObject =await firebase.getUserDBobject(user.uid)
   
    
    setUser(userObject)

    setUserName(userObject.name)
    setUserKind(userObject.userKind)

   }else{
  

    setUser(null)
    setUserName(null)
   }
  };
  fetchData()   
},[authState]
)

  const logOutEvent=async ()=>{
    setUser(null)
    await firebase.signout()
    props.history.replace('/login')

    dispatchAuth({
        type:'LOGOUT',
        payload:{}
    })
}

var headerDisplay;



  let alternateNavItemAccordingToUserKind;
  let greeting;
  if(userKind=="Buyer"){ 
    greeting=(<span>Customer</span>)
    alternateNavItemAccordingToUserKind=(

      <div className="d-flex justify-content-between">
      <Nav.Item >
      <Nav.Link className="bg-warning " as={Link} to="/BuyerPage" 
      eventKey="/BuyerPage">
      BuyerPage</Nav.Link>
    </Nav.Item>

    </div>
    )
  }else{
    greeting=(<span>Lecturer</span>)
    alternateNavItemAccordingToUserKind=(
      <Nav.Item >
    <Nav.Link className="bg-warning" as={Link} to="/AdminPage" eventKey="/AdminPage" >
    AdminPage
 </Nav.Link>
  </Nav.Item>
    )
  }



if(userDBobject){ 

  headerDisplay=(
    <div className="head ">
    <div class=" ">

    <Nav className="" variant="pills"  defaultActiveKey={""+props.location.pathname}>

      <Nav.Item className=" ">
        <Nav.Link className=" bg-warning " as={Link} to="/" 
        eventKey="/">          
        Homepage          
        </Nav.Link>
      </Nav.Item>   

    {alternateNavItemAccordingToUserKind}
    </Nav>
    </div>
    <div>


          </div> 
          <h1  className="navbar-nav mx-auto" style={{display:'inline'}}>Hello {greeting} {userDBName}</h1>

          <Nav className = "   ml-auto  "

          variant="pills"  defaultActiveKey={""+props.location.pathname}>
          <Nav.Item className="">
          <Nav.Link to="/Cart" className=" bg-warning" as={Link} 
          >          
          Cart         
          </Nav.Link>
        </Nav.Item>

          <Nav.Item className="">
            <Nav.Link onClick={logOutEvent} className=" bg-transparent text-muted mr-4" as={Link} 
            >          
            Logout         
            </Nav.Link>
          </Nav.Item>
          </Nav>
          </div>

          
          
  )}else{

    headerDisplay=(
    <div 
    style={{  
      display:'flex',
      alignItems:'center',
      justifyContent: 'center'

    }} 
    className="head ">

     <Nav className="bg-warning" variant="pills"  defaultActiveKey={""+props.location.pathname}>
    <Nav.Item >
      <Nav.Link className="bg-warning" as={Link} to="/login" 
      eventKey="/login">          
      Login          
      </Nav.Link>
    </Nav.Item>
    <Nav.Item >
      <Nav.Link className="bg-warning" as={Link} to="/signin" 
      eventKey="/signin">
      Signin</Nav.Link>
    </Nav.Item>
  </Nav>
    </div>
)
}

    return ( 
      <div>
      {headerDisplay}  

      <div className="fixed-top">
      {headerDisplay}  
     
  
          </div>
          </div>
    )
}

