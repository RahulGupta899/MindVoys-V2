import React from 'react'
import {Tooltip} from '@mui/material'

const TagScore = ({tagScoresData}) => {
    console.log("TAG SCORE PROPS: ",tagScoresData)
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
                            {/* <div className='tooltip_data'>
                                {`${tagData.matchCount}/${tagData.count}`}
                            // </div> */}
                        </div>
                    </div>
                )
            })
        }
    </>
    // <div className='progress_repeat'>
    //     <div className='progress_name'><label htmlFor="">Opening</label></div>
    //     <div className="progress tooltip_cus">
    //         <div className="progress-bar bg_green" style={{width: '96%'}}>96%</div>
    //         <div className='tooltip_data'>
    //             70/100
    //         </div>
    //     </div>
    // </div>
  )
}

export default TagScore