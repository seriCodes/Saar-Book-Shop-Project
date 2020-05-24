import React from 'react';

import './App.css';
import {AuthProvider} from './context/authContext'
import Router from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';


function App() {
  return (
<React.Fragment>
    <AuthProvider>
<Router></Router>

      </AuthProvider>
      </React.Fragment>
  
  );
}

export default App;


