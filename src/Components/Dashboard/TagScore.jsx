import React from 'react'
import {Tooltip} from '@mui/material'

const TagScore = ({tagScoresData}) => {

  return (
    <>
        {
            tagScoresData.map((tagData,idx)=>{
                return (
                    <div className='progress_repeat' key={idx}>
                        <div className='progress_name'><label htmlFor="">{tagData.tag}</label></div>
                        <div className="progress tooltip_cus">
                        <Tooltip title={`${tagData.matchCount}/${tagData.count}`} placement="right">
                            <div className="progress-bar bg_green" style={{width: `${tagData.matchPercent}%`}}>{tagData.matchPercent}%</div>
                        </Tooltip>
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default TagScore