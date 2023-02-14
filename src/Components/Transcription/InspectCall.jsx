import React,{useRef,useEffect,useState, useCallback} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {API_EndPoints} from '../../Helper/API_EndPoints'
import axios from 'axios'
import moment from 'moment'
import Waveform from './Waveform';
import SectionScores from "./SectionScores";
import {secondsToTimestamp} from '../../Helper/helper'

const InspectCall = ({callId,modelClose,setModelClose}) => {
  
  // PARTICULAR CALL INFORMATION
  const [transcription,setTranscription] = useState({
    callDate: "",
    url:  "https://demos2t.s3.us-east-2.amazonaws.com/00002051191643537806_66177_20220130052417.m4a",  //default call to avoid the wavesurfer bug
    agentName: "",
    phrases: null,
  })
  const [sections,setSections] = useState(null)
  const [qualityScore,setQualityScore] = useState(null)


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
      setSections(data.sectionWiseScoresInfo)
      setQualityScore(data.callQualityScore)
    })()
  },[callId,modelClose])


  // WAVESURFER 
  const wavesurfer = useRef(null)
  const master = useRef(null)
  const phraseRef =  useRef(null)
  const [playing,setPlaying] = useState(false)
  const [playerStatus,setPlayerStatus] = useState({
    total: 0,
    current: 0,
    remaining: 0,
  })


  const jumpToText = useCallback((timestamp)=>{
    setPlaying(true)
    wavesurfer.current.play(timestamp)
    if(phraseRef.current) {
      phraseRef.current.scrollIntoView({block: "center", inline: "nearest"});
    }
  },[])

  
  
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
              <section className='audio_player_sec'>
                <div className="row">

                    {/* AUDIO COMPONENT */}
                    <div className="col-lg-12 box_style_main" >
                        <div className="box_style wavesuffer_box">
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
                                    playerStatus={playerStatus}
                                    setPlayerStatus={setPlayerStatus}
                                    master={master}
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
                          </div>
                            <div className="box_style_body"  >
                                <div className='text_translate_area scrollbar_style'ref={master} style={{overflowY:'scroll',paddingRight:'30px'}}>
                                  {
                                    transcription.phrases
                                    ?
                                    transcription.phrases.speaker.map((item,idx)=>{
                                      const phraseTimestamp = transcription.phrases.timestamp[idx]
                                      return (
                                        <div className={`text_con_repeat ${(item==='Agent'? 'agent_row': '')}`} key={idx}>
                                          <div className='text_con_name'>
                                            <h4>{item}</h4>
                                            <h5 
                                              onClick={()=>{jumpToText(phraseTimestamp)}}
                                              className="timestamp" 
                                            >
                                              {secondsToTimestamp(phraseTimestamp)}
                                            </h5>
                                          </div>
                                          <div 
                                            className={`text_con_chat ${(playerStatus.current>phraseTimestamp)? "active-text": ''}`}
                                            ref={(playerStatus.current>phraseTimestamp)?phraseRef:null}
                                          >{transcription.phrases.text[idx]}</div>
                                        </div>
                                      )
                                    })
                                    :
                                    <div></div>
                                  } 
                                  {/* <button>hello</button>                            */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* SECTION WISE SCORE */}
                    <div className="col-lg-4 box_style_main">
                        <div className="box_style">
                            <div className="box_style_head tagName_container">
                              <h2>Scorecard</h2>
                              <h5>{qualityScore}%</h5>
                            </div>
                            <div className="box_style_body">
                                <SectionScores jumpToText={jumpToText} sections={sections}/>
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