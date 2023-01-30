import React, { useEffect, useRef, useState } from "react";
import {Button,Slider,Stack,Box,Typography,CircularProgress} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayBackButton from "./PlayBackButton";
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import WaveSurfer from "wavesurfer.js";
import CircularBuffer from './CircularBuffer'

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "black",
  cursorColor: "black",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 120,
  normalize: true,
  partialRender: true,
  hideScrollbar: true,
  backend: "WebAudio"
});


export default function Waveform({transcription,wavesurfer,playing,setPlaying}){

    const waveformRef = useRef(null)
    // const wavesurfer = useRef(null)

    // CONTROLS STATE
    const [volume,setVolume] = useState(0.4)
    // const [playing,setPlaying] = useState(false)
    const [mute,setMute] = useState(false)
    const [playerStatus,setPlayerStatus] = useState({
      total: 0,                                         
      current: 0,
      remaining: 0,
    })



    

    useEffect(()=>{

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
          console.log("LOADING....",percent)
        })

        wavesurfer.current.on('ready',()=>{
          setAudioLoaded(false)
        })

        wavesurfer.current.on('audioprocess', function() {
            if (wavesurfer.current.isPlaying()) {
              let totalTime = wavesurfer.current.getDuration(),
                  currentTime = wavesurfer.current.getCurrentTime(),
                  remainingTime = totalTime - currentTime;
              setPlayerStatus({
                total: totalTime,
                current: currentTime,
                remaining: remainingTime
              })          
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


    

    //--------------------------------
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
          <CircularProgress/>   
          :

          // AUDIO CONTROLLER
          <Stack direction='row'  spacing={4} className="controls">

            {/* REWIND 10 SEC */}
            <Replay10Icon onClick={()=>{wavesurfer.current.skipBackward(10)}}   />
            
            {/* PLAY PAUSE  */}
            <Button  onClick={handlePlayPause}>
              {playing? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
            </Button>

            {/* FORWARD 10 SEC */}
            <Forward10Icon onClick={()=>{wavesurfer.current.skipForward(10)}} />

            {/* PLAYER STATUS */}
            <Typography variant="subtitle">{`${secondsToTimestamp(playerStatus.current)} / ${secondsToTimestamp(playerStatus.total)}`}</Typography>
            {/* PLAYBACK RATE */}
            <PlayBackButton wavesurfer={wavesurfer}/>

            {/* VOLUME */}
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {
                  mute
                  ?
                  <VolumeOffIcon 
                    onClick={handleToggleMute} 
                    onMouseOver={()=>{setSliderActive('none')}}
                  />
                  :
                  <VolumeUpIcon  
                    onClick={handleToggleMute} 
                    onMouseOver={()=>{setSliderActive('block')}}  
                  />
                }
                <Slider 
                  value={volume} 
                  min={0.01} 
                  step={0.01} 
                  max={1} 
                  onChange={handleVolumeChange} 
                  onMouseOver={()=>{setSliderActive('block')}}
                  onMouseOut={()=>{setSliderActive('none')}}
                  sx={{width:'100px', display:`${sliderActive}`}}
                />
              </Stack>
            </Box>
          </Stack>
        }
        
      </>

    )
}


























