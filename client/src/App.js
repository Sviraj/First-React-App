import React from 'react';
import {BrowserRouter} from "react-router-dom"; 
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
  return (

    <BrowserRouter>
      <div className="App">

      <ToastContainer position="top-center"/>
       <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/addContact' element={<AddEdit/>} />
          <Route path='/update/:id' element={<AddEdit/>} />
          <Route path='/view/:id' element={<View/>} />
       </Routes>
 
    </div>
    
    
    </BrowserRouter>
    
  );
}

export default App;
