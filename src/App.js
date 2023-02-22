import React,{useState} from 'react'
import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Trasncriptions from './Components/Transcription/Trasncriptions'
import ScoreCard from './Components/ScoreCard/ScoreCard'

const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard'        element={<Header  Children={<Dashboard />}/>}/>
                <Route path='/scorecard'        element={<Header  Children={<ScoreCard/>}/>}/>
                <Route path='/transcriptions'   element={<Header  Children={<Trasncriptions/>}/>}/>
                <Route path='/configuration'    element={<Header  Children={<div>CONFIGURATION CONTENT</div>}/>}/>
                <Route path="*"                 element={<Navigate to="/dashboard" replace />}/>
            </Routes>            
        </BrowserRouter>
    )
}

export default App