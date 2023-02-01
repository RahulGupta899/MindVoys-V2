import React,{useRef,useEffect,useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {API_EndPoints} from '../../Helper/API_EndPoints'
import axios from 'axios'
import moment from 'moment'
import Waveform from './Waveform';
import {secondsToTimestamp} from '../../Helper/helper'

const InspectCall = ({callId,modelClose,setModelClose}) => {

  // PARTICULAR CALL INFORMATION
  const [transcription,setTranscription] = useState({
    callDate: "",
    url:  "https://demos2t.s3.us-east-2.amazonaws.com/00002051191643537806_66177_20220130052417.m4a",  //default call to avoid the wavesurfer bug
    agentName: "",
    phrases: null,
  })


  // USE EFFECT EXECUTES WHENEVER TRANSCRIPTION IS CHANGED , 
  // IF CLICKED ON THE SAME TRANSCRIPTION STILL USE EFFECT EXECUTES BECAUSE OF MODELCLOSE STATE
  useEffect(()=>{
    setModelClose(false)
    if(!callId || !callId.callId) return    // For callId == null
    (async()=>{
      let {API_GET_getSingleTranscription} = API_EndPoints
      API_GET_getSingleTranscription = `${API_GET_getSingleTranscription}?id=${callId.callId}`
      const {data} = await axios.get(API_GET_getSingleTranscription)
      let callDate = data.transcription.metaData.callDate
      callDate = moment(callDate, "YYYY-MM-DD").format("Do MMM YYYY")
      let agentName = data.transcription.callDetails.agent.name
      let url = data.transcription.transcriptionDetails.url
      let phrases = data.transcription.transcriptionDetails.phrases
      setTranscription({callDate,agentName,url,phrases})
    })()
  },[callId,modelClose])


  // WAVESURFER 
  const wavesurfer = useRef(null)
  const phraseRef =  useRef(null)
  const [playing,setPlaying] = useState(false)

  const jumpToText = (timestamp)=>{
    setPlaying(true)
    wavesurfer.current.play(timestamp)
  }

  
  
  // JSX
  return (
    <div className="modal fade trans_modal" id="transcription_modal">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">

              {/* DATE, AGENT NAME*/}
              <h5 className="modal-title">{`${transcription.callDate}, ${transcription.agentName}`}</h5>
              
              {/* MODEL CLOSE ICON */}
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                onClick={()=>{setModelClose(true)}}
              />

            </div>

            <div className="modal-body">
              <section className='graph_sec comman_top'>
                <div className="row">

                    {/* AUDIO COMPONENT */}
                    <div className="col-lg-12 box_style_main">
                        <div className="box_style">
                            <div className="box_style_body">
                              <div className="wavesurfer_player">
                                {
                                  modelClose
                                  ?
                                  null
                                  :
                                  <Waveform 
                                    transcription={transcription} 
                                    modelClose={modelClose} 
                                    wavesurfer={wavesurfer} 
                                    playing={playing} 
                                    setPlaying={setPlaying}
                                    phraseRef={phraseRef}
                                  />
                                }
                              </div>
                            </div>
                        </div>
                    </div>

                    {/* PHRASE TEXT TRANSCRIPTION */}
                    <div className="col-lg-8 box_style_main">
                        <div className="box_style">
                          <div className="box_style_head">
                            <h2>Transcript</h2>
                            {/* <div className="box_title_right">
                              <div className='t_search'>
                                <input type="text" className="form-control" placeholder='Search..' />
                                <div className='search_icon'>
                                  <button className="t_searach_btn"><SearchIcon /></button>
                                </div>
                              </div>
                            </div> */}
                          </div>
                            <div className="box_style_body" >
                                <div ref={phraseRef} className='text_translate_area' style={{height:'380px', overflowY:'scroll',paddingRight:'30px'}}>
                                  {
                                    transcription.phrases
                                    ?
                                    transcription.phrases.speaker.map((item,idx)=>{
                                      return (
                                        <div className='text_con_repeat agent_row' key={idx}>
                                          <div className='text_con_name'>
                                            <h4>{item}</h4>
                                            <h5 
                                              onClick={()=>{jumpToText(transcription.phrases.timestamp[idx])}}
                                              className="timestamp" 
                                              timestamp={transcription.phrases.timestamp[idx]}

                                            >
                                              {secondsToTimestamp(transcription.phrases.timestamp[idx])}
                                            </h5>
                                          </div>
                                          <div className='text_con_chat' id={`phrase${idx}`}>{transcription.phrases.text[idx]}</div>
                                        </div>
                                      )
                                    })
                                    :
                                    <div>bug fix</div>
                                  }
                                      <button id='dummy'>
                                       DUMMY
                                      </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    {/* SECTION WISE SCORE */}
                    <div className="col-lg-4 box_style_main">
                        <div className="box_style">
                            <div className="box_style_body">
                                score space
                            </div>
                        </div>
                    </div>

                </div>
              </section>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InspectCall



/*
-------------------
  COMPONENT FLOW
-------------------
   1. FIRST TIME THIS COMPONENT WILL RENDER WITH NULL CALL ID 
      (Important to render at the beg as it's a modal)

   2. COMPONENT RE-RENDER :  WHENEVER callID state will change

   3. USE-EFFECT EXECUTION: DEPENDENCY ON [callId]  

*/