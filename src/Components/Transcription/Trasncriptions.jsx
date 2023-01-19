import React,{useState,useEffect} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import moment from 'moment/moment'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import {NavLink,useLocation} from 'react-router-dom'
import axios from 'axios';
import {API_EndPoints} from '../../Helper/API_EndPoints'
import {Button, TextField, Stack} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const Trasncriptions = ({value})=>{
    
    
    // FILTER STATES
    const {
        dateRange,agentName,
        l2Manager,tenure,
        l1Manager,section,
        tagName,callDuration,
        filterController
    } = value
    const filter = {
        dateRange,agentName,
        l2Manager,tenure,
        l1Manager,section,
        tagName,callDuration
    }

    

    // PAGINATION COLUMNS
    const columns = [
        {
            field: 'callDate',
            headerName: 'Date',
            type:'date',
            flex:1,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: params => 
            moment(params.value).format("DD-MMM-YYYY "),
        },
        {
            field: 'callDuration',
            headerName: 'Call Duration',
            type:'number',
            flex:1,
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
            flex:1,
            headerAlign: 'center',
            align: 'center',
        },
        
        {
            field: 'qualityScore',
            headerName: 'Quality Score',
            type:'number',
            flex:1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'id',
            headerName: 'Analyze',
            type: 'number',
            flex:1,
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


    // PAGINATION PAGE STATE
    const [pageState,setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 10, 
    })


    // SERVER SIDE DATA RENDERING ON PAGE CHANGE, PAGE SIZE CHANGE AND APPLY FILTER 
    useEffect(()=>{
        const fetchData = async()=>{
            // console.log("  -->>>TRANSCRIPTIONS USE-EFFECT")
            const {API_POST_getTranscriptionsPagination} = API_EndPoints
            const API_WithQuery = `${API_POST_getTranscriptionsPagination}?page=${pageState.page}&limit=${pageState.pageSize}`
            
            setPageState(old=>({...old, isLoading:true}))
            const {data} = await axios.post(API_WithQuery,filter)
            console.log(data)
            setPageState(old=>({...old, isLoading:false, data: data.data, total: data.total}))
        }
        fetchData()
    },[pageState.page,pageState.pageSize,filterController])


    //---------------------------------
    // SEARCH STATE
    //---------------------------------
    const [searchText,setSearchText] = useState("");
    const [searchActive,setSearchActive] = useState(false);

    const handleOnSearch = async()=>{
        if(searchText === "") return 
        setSearchPageState((state)=>{
            return {
                ...state,
                page:0
            }
        })
        setSearchActive(true)
        const {API_POST_getTranscriptionsPaginationOnSearch} = API_EndPoints
        const API_WithQuery = `${API_POST_getTranscriptionsPaginationOnSearch}?text=${searchText}&page=${searchPageState.page}&limit=${searchPageState.pageSize}`
        
        setSearchPageState(old=>({...old, isLoading:true}))
        const {data} = await axios.post(API_WithQuery,filter)
        console.log("Searched Data: ",data)
        setSearchPageState(old=>({...old, isLoading:false, data: data.data, total: data.total}))
    }

    const handleClearSearch = async()=>{
        setSearchActive(false)
        setSearchText("")
    }

    // SEARCH PAGINATION COLUMNS
    const searchColumns = [
        {
            field: 'callDate',
            headerName: 'Date',
            type:'date',
            flex:1,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: params => 
            moment(params.value).format("DD-MMM-YYYY "),
        },
        {
            field: 'callDuration',
            headerName: 'Call Duration',
            type:'number',
            flex:1,
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
            flex:1,
            headerAlign: 'center',
            align: 'center',
        },
        
        {
            field: 'qualityScore',
            headerName: 'Quality Score',
            type:'number',
            flex:1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'searchWordFreq',
            headerName: 'Frequency',
            type: 'number',
            flex:1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'id',
            headerName: 'Analyze',
            type: 'number',
            flex:1,
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

    // SEARCH PAGINATION PAGE STATE
    const [searchPageState,setSearchPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 10, 
    })
    console.log("SEARCH PAGE STATE: ",searchPageState)

    // SERVER SIDE DATA RENDERING ON PAGE CHANGE, PAGE SIZE CHANGE AND APPLY FILTER 
    useEffect(()=>{
        const fetchData = async()=>{
            // console.log("  -->>>TRANSCRIPTIONS USE-EFFECT")
            const {API_POST_getTranscriptionsPaginationOnSearch} = API_EndPoints
            const API_WithQuery = `${API_POST_getTranscriptionsPaginationOnSearch}?text=${searchText}&page=${searchPageState.page}&limit=${searchPageState.pageSize}`
            
            setSearchPageState(old=>({...old, isLoading:true}))
            const {data} = await axios.post(API_WithQuery,filter)
            console.log("Searched Data: ",data)
            setSearchPageState(old=>({...old, isLoading:false, data: data.data, total: data.total}))
        }
        fetchData()
    },[searchPageState.page,searchPageState.pageSize,filterController])


    // JSX
    return(
        <>
            <section className="page_title_sec">
            <h1>Transcriptions</h1>
            </section>
            <section className='graph_sec comman_top'>
                <div className="row">
                    <div className="col-lg-12 box_style_main" >
                        
                        <div className="box_style">

                            {/* SEARCH BOX */}
                            <div>
                                <Stack direction='row' >
                                    <TextField 
                                        placeholder='Search...'
                                        value={searchText}
                                        onChange={(e)=>setSearchText(e.target.value)}
                                    />
                                    <Button 
                                        variant='contained' 
                                        sx={{height:'55px', marginLeft:'5px'}}
                                        onClick={handleOnSearch}
                                    >
                                        <SearchIcon/>
                                    </Button> 
                                    {
                                        searchText.length>0
                                        ?
                                        <Button 
                                            variant='contained' 
                                            color='error'
                                            sx={{height:'55px', marginLeft:'5px'}}
                                            onClick={handleClearSearch}
                                        >
                                            <CloseIcon/>
                                        </Button> 
                                        :
                                        <></>
                                    }
                                    
                                </Stack>
                            </div>

                            {/* TABALE */}
                            <div className="box_style_body table_style_comman" id="transcription_tbl">
                                {
                                    !searchActive
                                    ?
                                    <DataGrid
                                        rows={pageState.data}
                                        rowCount={pageState.total}
                                        loading={pageState.isLoading}
                                        rowHeight={47}
                                        headerHeight={47}
                                        rowsPerPageOptions={[10,25,50,100]}
                                        pagination
                                        page={pageState.page}
                                        pageSize={pageState.pageSize}
                                        paginationMode="server"
                                        onPageChange={(newPage) => setPageState(old=>({...old,page:newPage}))}
                                        onPageSizeChange={(newPageSize) => setPageState(old=>({...old, pageSize:newPageSize}))}
                                        columns={columns}
                                    />
                                    :
                                    <DataGrid
                                        rows={searchPageState.data}
                                        rowCount={searchPageState.total}
                                        loading={searchPageState.isLoading}
                                        rowHeight={47}
                                        headerHeight={47}
                                        rowsPerPageOptions={[10,25,50,100]}
                                        pagination
                                        page={searchPageState.page}
                                        pageSize={searchPageState.pageSize}
                                        paginationMode="server"
                                        onPageChange={(newPage) => setSearchPageState(old=>({...old,page:newPage}))}
                                        onPageSizeChange={(newPageSize) => setSearchPageState(old=>({...old, pageSize:newPageSize}))}
                                        columns={searchColumns}
                                    /> 
                                    

                                }
                                                               
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
    
        
}







 

export default Trasncriptions



