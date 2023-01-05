import React from 'react'
import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route,Redirect} from 'react-router-dom'

const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path='/'              element={<Header Children={<div>DASHBOARD CONTENT</div>}/>}/>
                <Route path='/dashboard'      element={<Header Children={<div>DASHBOARD CONTENT</div>}/>}/>
                <Route path='/scorecard'      element={<Header Children={<div>SCORECARD CONTENT</div>}/>}/>
                <Route path='/transcriptions' element={<Header Children={<div>TRANSCRIPTIONS CONTENT</div>}/>}/>
                <Route path='/configuration'  element={<Header  Children={<div>CONFIGURATION CONTENT</div>}/>}/>
                <Route path='/resources' element={<Header/>}/>
            </Routes>            
        </BrowserRouter>
    )
}

export default App