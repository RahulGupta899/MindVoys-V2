import React, { useEffect, useRef, useState } from "react";
import {Button,Slider,Stack,Box,Typography,CircularProgress, CircularProgressWithLabel} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayBackButton from "./PlayBackButton";
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#e1e5fa",
  progressColor: "#283891",
  progressColor: "black",
  cursorColor: "black",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 100,
  normalize: true,
  partialRender: true,
  hideScrollbar: true,
  backend: "WebAudio"
});


export default function Waveform({transcription,wavesurfer,playing,setPlaying,phraseRef}){
    
    const waveformRef = useRef(null)

    // CONTROLS STATE
    const [volume,setVolume] = useState(0.4)
    const [mute,setMute] = useState(false)
    const [playerStatus,setPlayerStatus] = useState({
      total: 0,
      current: 0,
      remaining: 0,
    })
    const [loading,setLoading] = useState(0)



    

    useEffect(()=>{
        console.log("USE-EFFECT RE-rendered...")
        setLoading(0)
        setAudioLoaded(true)
        setPlaying(false)
        setPlayerStatus({
          total: 0,
          current: 0,
          remaining: 0,
        })

        const options = formWaveSurferOptions(waveformRef.current)
        
        // CREATING WAVESURFER INSTANCE
        wavesurfer.current = WaveSurfer.create(options)

        //LOAD THE URL 
        wavesurfer.current.load(transcription.url)

        //DURING LOADING IT WILL EXECUTE
        wavesurfer.current.on("loading",(percent)=>{
          console.log("EXEC")
          console.log("LOADING....",percent)
          if(percent !== 100)
          setLoading(percent)
        })

        // ON URL LOAD IT RUNS 
        wavesurfer.current.on('ready',()=>{
          console.log("----READY----")
          setLoading(100)
          setAudioLoaded(false)
        })

        // WHEN AUDIO IS PLAYING
        wavesurfer.current.on('audioprocess', function() {
            
            if (wavesurfer.current.isPlaying()) {
              let totalTime = wavesurfer.current.getDuration(),
                  currentTime = wavesurfer.current.getCurrentTime(),
                  remainingTime = totalTime - currentTime;
                  console.log("Total time: ",totalTime)
                  console.log("Current Time: ",currentTime)
              setPlayerStatus({
                total: totalTime,
                current: currentTime,
                remaining: remainingTime
              })  
              

              //SYNCING PART (APPROACH 1)
              let transcriptDiv = phraseRef.current.childNodes

              transcriptDiv = Array.from(transcriptDiv)
              transcriptDiv.map((div)=>{

                let timestamp = div.childNodes[0].childNodes[1]
                if(timestamp) timestamp = timestamp.getAttribute('timestamp')
                const phrase = div.childNodes[1]
                if(currentTime >= Number(timestamp)){
                  phrase.classList.add('active-text')
                  div.childNodes[0].childNodes[1].scrollIntoView({
                    behavior:'smooth'
                  })
                  console.log("Timestamp: ",timestamp)
                }
                if(currentTime < Number(timestamp)) phrase.classList.remove('active-text')
              })

              //SYNCING PART (APPROACH 2)

            }
       
        });

        return () => wavesurfer.current.destroy();
    },[transcription])

    


    //---------------------------------
    // WAVE SURFER CONTROL METHODS
    //---------------------------------
    const handlePlayPause = ()=>{
      setPlaying((state)=>!state)
      wavesurfer.current.playPause()
    }

    const handleVolumeChange = (e,newVal)=>{
      setVolume(newVal)
      wavesurfer.current.setVolume(newVal)
    }

    const handleToggleMute = ()=>{
      setMute((state)=>!state)
      wavesurfer.current.toggleMute()
    }


    //-------------------------------
    // HELPER FUNCTIONS
    //-------------------------------
    const secondsToTimestamp= (seconds)=>{
      seconds = Math.floor(seconds);
      let h = Math.floor(seconds / 3600);
      let m = Math.floor((seconds - (h * 3600)) / 60);
      let s = seconds - (h * 3600) - (m * 60);

      // FORMATTING FOR SINGLE DIGIT
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      return h + ':' + m + ':' + s;
    }


    // VOLUME BAR HIDE AMINATION
    const [sliderActive,setSliderActive] = useState('none') 

    // AUDIO LOADER STATE
    const [AudioLoaded,setAudioLoaded] = useState(true) 


    return(
      <>
      
      
        {/* WAVEFORM */}
        <div id="waveform" ref={waveformRef} />
        {
          AudioLoaded
          ?
          <div className="loader_style">   
            {/*<CircularProgress className="loader_icon"></CircularProgress>  */}
            <div className="wrapper">              
              <div id="preloader_1">
                  <h6>{loading}%</h6>
                  <br/>
                  <span /><span /><span /><span />           
              </div>            
            </div>          
            </div>
          :

          // AUDIO CONTROLLER
          <Stack direction='row'  spacing={4} className="controls wave_controls">

            <div className="play_forward_btn">

              {/* REWIND 10 SEC */}
              <Replay10Icon className="btn_backward" onClick={()=>{wavesurfer.current.skipBackward(10)}}   />
              
              {/* PLAY PAUSE  */}
              <Button  onClick={handlePlayPause} className="btn_play">
                {/* {playing? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />} */}
                {playing? <i class="fa fa-pause" aria-hidden="true"></i> : <i class="fa fa-play" aria-hidden="true"></i>}
              </Button>

              {/* FORWARD 10 SEC */}
              <Forward10Icon className="btn_forward" onClick={()=>{wavesurfer.current.skipForward(10)}} />
            </div>

            {/* PLAYER STATUS */}
            <Typography className="time_durations" variant="subtitle">{`${secondsToTimestamp(playerStatus.current)} / ${secondsToTimestamp(playerStatus.total)}`}</Typography>
           
            {/* PLAYBACK RATE */}
            <PlayBackButton wavesurfer={wavesurfer}/>

            {/* VOLUME */}
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {
                  mute
                  ?
                  <VolumeOffIcon onClick={handleToggleMute} onMouseOver={()=>{
                    setSliderActive('none')
                  }}/>
                  :
                  <VolumeUpIcon  onMouseOver={()=>{
                    setSliderActive('block')
                  }}  onClick={handleToggleMute} />
                }
                
                <Slider 
                  value={volume} 
                  min={0.01} 
                  step={0.01} 
                  max={1} 
                  onChange={handleVolumeChange} 
                  onMouseOver={()=>{setSliderActive('block')}}
                  onMouseOut={()=>{setSliderActive('none')}}
                  sx={{width:'80px', display:`${sliderActive}`}}
                />
              </Stack>
            </Box>
          </Stack>
          
        }
        
      
      </>


    )
}
