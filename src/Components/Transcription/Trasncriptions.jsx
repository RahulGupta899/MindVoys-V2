import React,{useState} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import moment from 'moment/moment'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import {Button} from '@mui/material'
import {NavLink} from 'react-router-dom'

const Trasncriptions = (props) => {
    console.log("TRANSCRIPTION PROPS: ",props)

    const [pageSize,setPageSize] = useState(5);
    const [rowCount,setRowCount] = useState(120)
    const [loading,setLoading] = useState(false)


    //------------------------
    // TABLE FIELDS
    //------------------------
    const columns = [
        {
            field: 'callDate',
            headerName: 'Date',
            type:'date',
            width:200,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: params => 
            moment(params.value).format("DD-MMM-YYYY "),
        },
        {
            field: 'callDuration',
            headerName: 'Call Duration',
            type:'number',
            width:200,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: params => {
                const mins = parseInt((params.value/60))
                const secs = (params.value%60)

                return `${mins} mins : ${secs} secs`
            }
        },
        {
            field: 'agentName',
            headerName: 'Agent Name',
            type: 'string',
            width:200,
            headerAlign: 'center',
            align: 'center',
        },
        
        {
            field: 'qualityScore',
            headerName: 'Quality Score',
            type:'number',
            width:200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'searchWordFreq',
            headerName: 'Search Word Freq',
            type: 'number',
            width:200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'id',
            headerName: 'Analyze',
            type: 'number',
            width:200,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params)=>{
                const id = params.row.id
                return <NavLink to={`/transcription/${id}`}>
                            <PhoneForwardedIcon color='primary' />
                       </NavLink>
                
            }
        }
        
    ]


    const data = [
        {
            id:"10475",
            callDate: "2022-04-16",
            callDuration: '600',
            agentName: 'Rajiv Desai',
            qualityScore: 84.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10476",
            callDate: "2021-02-10",
            callDuration: '870',
            agentName: 'Jaydeb Verma',
            qualityScore: 69,
            searchWordFreq: 'N.A'
        },
        {
            id:"1047",
            callDate: "2022-08-19",
            callDuration: '380',
            agentName: 'Subham Desai',
            qualityScore: 67.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10478",
            callDate: "2021-02-16",
            callDuration: '1800',
            agentName: 'Divya Verna',
            qualityScore: 23.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10479",
            callDate: "2023-02-16",
            callDuration: '12800',
            agentName: 'Palemo Seth',
            qualityScore: 89.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10480",
            callDate: "2021-01-24",
            callDuration: '600',
            agentName: 'Rajiv Desai',
            qualityScore: 84.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10481",
            callDate: "2022-04-16",
            callDuration: '1600',
            agentName: 'Jay Desai',
            qualityScore: 80.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10482",
            callDate: "2021-02-10",
            callDuration: '5319',
            agentName: 'Himadri Desai',
            qualityScore: 94.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10483",
            callDate: "2022-08-06",
            callDuration: '78940',
            agentName: 'Divya Desai',
            qualityScore: 74.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10484",
            callDate: "2022-04-16",
            callDuration: '600',
            agentName: 'Rajiv Desai',
            qualityScore: 84.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10485",
            callDate: "2021-02-10",
            callDuration: '870',
            agentName: 'Jaydeb Verma',
            qualityScore: 69,
            searchWordFreq: 'N.A'
        },
        {
            id:"1086",
            callDate: "2022-08-19",
            callDuration: '380',
            agentName: 'Subham Desai',
            qualityScore: 67.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10487",
            callDate: "2021-02-16",
            callDuration: '1800',
            agentName: 'Divya Verna',
            qualityScore: 23.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10488",
            callDate: "2023-02-16",
            callDuration: '12800',
            agentName: 'Palemo Seth',
            qualityScore: 89.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10489",
            callDate: "2021-01-24",
            callDuration: '600',
            agentName: 'Rajiv Desai',
            qualityScore: 84.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10490",
            callDate: "2022-04-16",
            callDuration: '1600',
            agentName: 'Jay Desai',
            qualityScore: 80.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10491",
            callDate: "2021-02-10",
            callDuration: '5319',
            agentName: 'Himadri Desai',
            qualityScore: 94.5,
            searchWordFreq: 'N.A'
        },
        {
            id:"10492",
            callDate: "2022-08-06",
            callDuration: '78940',
            agentName: 'Divya Desai',
            qualityScore: 74.5,
            searchWordFreq: 'N.A'
        },
    ]


  return (
        <>
            <section className="page_title_sec">
            <h1>Transcriptions</h1>
            </section>
            <section className='graph_sec comman_top'>
                <div className="row">
                    <div className="col-lg-12 box_style_main" >
                        <div class="box_style">
                            <div class="box_style_body" style={{height: '380px'}}>
                                <DataGrid 
                                    columns={columns} 
                                    rows={data} 
                                    getRowId={row=>row.id}
                                    disableSelectionOnClick
                                    loading={loading}
                                    rowsPerPageOptions={[5,10,15,20]}
                                    pageSize={pageSize}
                                    onPageSizeChange={(size)=>setPageSize(size)}
                                    onPageChange={(page)=>{ 
                                        console.log("Page: ",page)
                                        setLoading(true)
                                        setTimeout(()=>{
                                            setLoading(false)
                                        },500)
                                    }}

                                    
                                    rowCount={rowCount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

   )
  
}


 {/* // <div style={{height: '400px'}}> */}
    //     
    // </div>

 

export default Trasncriptions



