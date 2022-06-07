import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/videogame/:id' element={<Detail/>}/>
      <Route path='/videogame' element={<Create/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
