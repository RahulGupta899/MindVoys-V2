import React,{useState,useEffect} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import moment from 'moment/moment'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import {NavLink,useLocation} from 'react-router-dom'
import axios from 'axios';
import {API_EndPoints} from '../../Helper/API_EndPoints'
import {Button} from '@mui/material'


const Trasncriptions = ({value})=>{

    // FILTERS
    const {
        dateRange,agentName,
        l2Manager,tenure,
        l1Manager,section,
        tagName,callDuration,controller,
        transController
    } = value
    const filter = {
        dateRange,agentName,
        l2Manager,tenure,
        l1Manager,section,
        tagName,callDuration
    }


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
        // {
        //     field: 'searchWordFreq',
        //     headerName: 'Search Word Freq',
        //     type: 'number',
        //     width:200,
        //     headerAlign: 'center',
        //     align: 'center',
        // },
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
                            <Button className="bg_light_blue"  >
                                <PhoneForwardedIcon  sx={{color:'white'}} />
                            </Button>
                        </NavLink>
                
            }
        }
                
    ]


    const [pageState,setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 10, 
    })

    useEffect(()=>{
        const fetchData = async()=>{
            const {API_POST_getTranscriptionsPagination} = API_EndPoints
            const API_WithQuery = `${API_POST_getTranscriptionsPagination}?page=${pageState.page}&limit=${pageState.pageSize}`
            
            setPageState(old=>({...old, isLoading:true}))
            const {data} = await axios.post(API_WithQuery,filter)
            console.log(data)
            setPageState(old=>({...old, isLoading:false, data: data.data, total: data.total}))
        }
        fetchData()
    },[pageState.page,pageState.pageSize,controller,transController])








    return(
        <>
            <section className="page_title_sec">
            <h1>Transcriptions</h1>
            </section>
            <section className='graph_sec comman_top'>
                <div className="row">
                    <div className="col-lg-12 box_style_main" >
                        <div class="box_style">
                            <div class="box_style_body" style={{height: '420px'}}>
                            <DataGrid
                                rows={pageState.data}
                                rowCount={pageState.total}
                                loading={pageState.isLoading}
                                rowsPerPageOptions={[10,25,50,100]}
                                pagination
                                page={pageState.page}
                                pageSize={pageState.pageSize}
                                paginationMode="server"
                                onPageChange={(newPage) => setPageState(old=>({...old,page:newPage}))}
                                onPageSizeChange={(newPageSize) => setPageState(old=>({...old, pageSize:newPageSize}))}
                                columns={columns}
                            />                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        // <div style={{height:'400px'}}>
            
        // </div>
    )
    
        
}







 

export default Trasncriptions



