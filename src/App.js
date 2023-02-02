import React,{useState} from 'react'
import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Trasncriptions from './Components/Transcription/Trasncriptions'



const App = ()=>{
    // const history = useHistory()
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard'        element={<Header  Children={<Dashboard />}/>}/>
                <Route path='/scorecard'        element={<Header  Children={<div>SCORECARD CONTENT</div>}/>}/>
                <Route path='/transcriptions'   element={<Header  Children={<Trasncriptions/>}/>}/>
                <Route path='/configuration'    element={<Header  Children={<div>CONFIGURATION CONTENT</div>}/>}/>
                <Route path="*"                 element={<Navigate to="/dashboard" replace />}/>
            </Routes>            
        </BrowserRouter>
    )
}

export default App