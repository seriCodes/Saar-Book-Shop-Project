import React from 'react'
import{BrowserRouter,Route, Switch} from 'react-router-dom'

//component
import Main from './components/Main'
import Signin from './components/Signin'
import Login from './components/Login'
import {Head} from './components/Head'
import {Cart} from './components/Cart'
import SingleBook from './components/SingleBook'
import {BuyerPage} from './components/BuyerPage'
import {AdminPage} from './components/AdminPage'
import Container from 'react-bootstrap/Container'

const Router = ()=>{

    return (  
      <BrowserRouter> 
  <Route path='/' component={Head} ></Route> 
  <Container >
     
  <Switch>
    <Route exact path='/' component= {Main}></Route>
    <Route exact path='/login' component= {Login}></Route>
    <Route exact path='/signin' component= {Signin}></Route>
    <Route exact path='/Cart' component= {Cart}></Route>
    <Route exact path='/displayBook/:bookID' component= {SingleBook} ></Route>
    <Route exact path='/AdminPage' component= {AdminPage}></Route>
    <Route exact path='/BuyerPage' component= {BuyerPage}></Route>


    
    </Switch>
    </Container>

    </BrowserRouter>
        )
}
export default Router

