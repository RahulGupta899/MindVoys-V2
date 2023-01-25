import React, { useEffect, useRef, useState } from "react";
import {Button,Slider,Stack,Box,Typography} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayBackButton from "./PlayBackButton";

import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "black",
  cursorColor: "black",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 180,
  normalize: true,
  partialRender: true,
  // hideScrollbar: true
});


export default function Waveform({url}){
    const waveformRef = useRef(null)
    const wavesurfer = useRef(null)

    const [volume,setVolume] = useState(0.4)
    const [playing,setPlaying] = useState(false)
    const [mute,setMute] = useState(false)
    const [playerStatus,setPlayerStatus] = useState({
      total: 0,
      current: 0,
      remaining: 0,
    })
    console.log(playerStatus)

    useEffect(()=>{

        const options = formWaveSurferOptions(waveformRef.current)
        
        // CREATING WAVESURFER INSTANCE
        wavesurfer.current = WaveSurfer.create(options)

        //LOAD THE URL 
        wavesurfer.current.load(url)

        //DURING LOADING IT WILL EXECUTE
        wavesurfer.current.on("loading",(percent)=>{
          console.log("LOADING....",percent)
        })

        // ON URL LOAD IT RUNS (but not working)*
        // wavesurfer.current.on('ready',()=>{
        //     console.log("PLAYING....",)
        //     // wavesurfer.current.play()
        //     // setPlaying(true)
        // })

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

    },[url])

    


    //---------------------------------
    // WAVE SURFER CONTROL METHODS
    //---------------------------------
    const handlePlayPause = ()=>{
      setPlaying((state)=>!state)
      wavesurfer.current.playPause()
      console.log((wavesurfer.current.getCurrentTime()/60)+" / "+wavesurfer.current.getDuration())
      console.log("IN Secs: "+(wavesurfer.current.getDuration()/60))
    }

    const handleVolumeChange = (e,newVal)=>{
      setVolume(newVal)
      wavesurfer.current.setVolume(newVal)
    }

    const handleToggleMute = ()=>{
      setMute((state)=>!state)
      wavesurfer.current.toggleMute()
    }

    const handleVolumeMax = ()=>{
      setVolume(1)
      wavesurfer.current.setVolume(0.9)
    }

    const handle10SecRewind = ()=>{
      wavesurfer.current.skipBackward(10)
    }

    const handle10SecForward = ()=>{
      wavesurfer.current.skipForward(10)
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


    return(
      <>
        {/* AUDIO PLAYER */}
        <div id="waveform" ref={waveformRef} />

        {/* CONTROLS */}
        <Stack direction='row'  spacing={4} className="controls">
          
          {/* PLAY PAUSE  */}
          <Button variant="contained" onClick={handlePlayPause}>{playing? "Pause" : "Play"}</Button>
          
          {/* VOLUME */}
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              {
                mute
                ?
                <VolumeOffIcon onClick={handleToggleMute}/>
                :
                <VolumeUpIcon onClick={handleToggleMute} />
              }
              <Slider 
                value={volume} 
                min={0.01} 
                step={0.01} 
                max={1} 
                onChange={handleVolumeChange} 
              />
            </Stack>
          </Box>

          {/* PLAYER STATUS */}
          <Box>
            <Stack>
              <Typography variant="subtitle1">Remaining : {secondsToTimestamp(playerStatus.remaining)}</Typography>
              <Typography variant="subtitle">Status: {`${secondsToTimestamp(playerStatus.current)} / ${secondsToTimestamp(playerStatus.total)}`}</Typography>
            </Stack>
          </Box>

          <PlayBackButton wavesurfer={wavesurfer}/>

          <FastRewindIcon onClick={handle10SecRewind}/>
          <FastForwardIcon onClick={handle10SecForward}/>

        </Stack>
      
      </>


    )
}


























