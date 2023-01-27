import React,{useState} from 'react'
import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route,Redirect} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Trasncriptions from './Components/Transcription/Trasncriptions'


const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/'               element={<Header  Children={<Dashboard />}/>}/>
                <Route path='/dashboard'      element={<Header  Children={<Dashboard />}/>}/>
                <Route path='/scorecard'      element={<Header  Children={<div>SCORECARD CONTENT</div>}/>}/>
                <Route path='/transcriptions' element={<Header  Children={<Trasncriptions/>}/>}/>
                <Route path='/configuration'  element={<Header  Children={<div>CONFIGURATION CONTENT</div>}/>}/>
            </Routes>            
        </BrowserRouter>
    )
}

export default App