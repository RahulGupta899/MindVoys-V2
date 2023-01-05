import React from 'react'
import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route,Redirect} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'



const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path='/'               element={<Header Children={<Dashboard />}/>}/>
                <Route path='/dashboard'      element={<Header Children={<Dashboard />}/>}/>
                <Route path='/scorecard'      element={<Header Children={<div>SCORECARD CONTENT</div>}/>}/>
                <Route path='/transcriptions' element={<Header Children={<div>TRANSCRIPTIONS CONTENT</div>}/>}/>
                <Route path='/configuration'  element={<Header  Children={<div>CONFIGURATION CONTENT</div>}/>}/>
                <Route path='/resources' element={<Header/>}/>
            </Routes>            
        </BrowserRouter>
    )
}

export default App