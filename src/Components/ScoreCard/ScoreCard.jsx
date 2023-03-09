import React,{useState} from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import AddField from './AddField'
import ToggleButtons from './ToggleButtons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {API_EndPoints} from '../../Helper/API_EndPoints'

const ScoreCard = ({value}) => {

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
      l1Manager,callDuration
  }





  const [checkBoxInfo, setCheckBoxInfo] = useState(null);
  const [dataGridInfo, setDataGridInfo] = useState(null)


  //////////////////////////////////////////////////////////
  // FETCH SECTIONS AND THEIR STATUS FOR CHECKBOX STATUS
  //////////////////////////////////////////////////////////
  useEffect(()=>{
    const fetchData = async()=>{
      // const data = axios.get("API CALL")
      const {API_POST_getScorecardInformation} = API_EndPoints

      const {data} = await axios.post(API_POST_getScorecardInformation,filter)
      console.log("API RESPONSE: ", data)
      const response = {
        checkBoxStatus: data.sectionCheckBoxStatus, 
        rows: data.rows
      }
      setCheckBoxInfo(data.sectionCheckBoxStatus)

      // GET DATAGRID INFORMATION
      createDataGridColumns(response)
    }
    fetchData()
  },[filterController])


  // FUNCTION TO CREATE COLUMN FIELDS FOR AGENT SCORECARD GRID
  const createDataGridColumns = (data)=>{
    
    const {checkBoxStatus, rows} = data

    const tempColumns = [
      {
          field: 'agentName',
          headerName: 'Agent Name',
          type: 'string',
          width:130,
          headerAlign: 'center',
          align: 'center',
      },
      {
        field: 'l1Manager',
        headerName: 'L1 Manager',
        type:'string',
        width:130,
        headerAlign: 'center',
        align: 'center',
      },
      {
          field: 'l2Manager',
          headerName: 'L2 Manager',
          type:'string',
          width:130,
          headerAlign: 'center',
          align: 'center',
      },
      {
        field: 'callDuration',
        headerName: 'Call Duration',
        type:'number',
        width:150,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: params => {
            const mins = parseInt((params.value/60))
            const secs = (params.value%60)

            return `${mins} mins : ${secs} secs`
        }
      },
      {
        field: 'qualityScore',
        headerName: 'Quality Score',
        type: 'number',
        width:130,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params)=>{
          let qualityScore = params.row.qualityScore
          let qualityScoreFormatted = qualityScore.toFixed(2)+" %"
          let scoreClass = ""
          if(qualityScore>=80) scoreClass = "goodScore"
          else if(qualityScore<40) scoreClass = 'badScore'
          else scoreClass = 'avgScore'

          return (
              <>
                  <span className={`highlightScore ${scoreClass}`}>{qualityScoreFormatted}</span>
              </>
          )
        }

      }
    ]

    checkBoxStatus.map((section)=>{       
      // ADD SECTION
      const sectionColumn = {
        field: section.name,
        headerName: section.name,
        type: 'string',
        flex:1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        renderHeader: (params) => {
          return(
            <div className='section_header'>{params.field}</div>
          )
        },
        renderCell: (params)=>{
          let qualityScore = params.row.qualityScore
          let qualityScoreFormatted = qualityScore.toFixed(2)+" %"
          let scoreClass = ""
          if(qualityScore>=80) scoreClass = "goodScore"
          else if(qualityScore<40) scoreClass = 'badScore'
          else scoreClass = 'avgScore'

          return (
              <>
                  <span className={`highlightScore ${scoreClass}`}>{qualityScoreFormatted}</span>
              </>
          )
        }
      }
      tempColumns.push(sectionColumn)

      //ADD TAGS
      section.children.map((tag)=>{
        const tagColumn = {
          field: tag.name,
          headerName: tag.name,
          type: 'string',
          flex:1,
          minWidth: 100,  
          headerAlign: 'center',
          align: 'center',
          renderHeader: (params) => {
            return(
              <div className='tag_header'>{params.field}</div>
            )
          },
          renderCell: (params)=>{
            let qualityScore = params.row.qualityScore 
            let qualityScoreFormatted = qualityScore.toFixed(2)+" %"
            let scoreClass = ""
            if(qualityScore>=80) scoreClass = "goodScore"
            else if(qualityScore<40) scoreClass = 'badScore'
            else scoreClass = 'avgScore'
  
            return (
                <>
                    <span className={`highlightScore ${scoreClass}`}>{qualityScoreFormatted}</span>
                </>
            )
          }
        }
        tempColumns.push(tagColumn)
      })


    })

    // const rows = [
    //   {
    //     id: 10475,
    //     l2Manager: 'Ganesh Marve',
    //     l1Manager: 'Kailash Prakash',
    //     agentName: 'Ravi Goyel',
    //     callDuration: '120',
    //     qualityScore: 45,
    //     section1: '54',
    //     section2: '94',
    //     section3: '64',
    //     tag1: '54',
    //     tag2: '54',
    //     tag3: '54',
    //     tag4: '54',
    //     tag5: '54',
    //     tag6: '54',
    //     tag7: '54',
    //     tag8: '54',
    //   },
    //   {
    //     id: 10476,
    //     l2Manager: 'Arvind Javi',
    //     l1Manager: 'Tanya Kashyab',
    //     agentName: 'Sikha Goyel',
    //     callDuration: '120',
    //     qualityScore: 45,
    //     section1: '54%',
    //     section2: '94%',
    //     section3: '64%',
    //     tag1: '54%',
    //     tag2: '54%',
    //     tag3: '54%',
    //     tag4: '54%',
    //     tag5: '54%',
    //     tag6: '54%',
    //     tag7: '54%',
    //     tag8: '54%',
    //   },
    //   {
    //     id: 90475,
    //     l2Manager: 'Sukesh Marve',
    //     l1Manager: 'Kailash Tawa',
    //     agentName: 'Hema ravi',
    //     callDuration: '120',
    //     qualityScore: 89,
    //     section1: '54%',
    //     section2: '94%',
    //     section3: '64%',
    //     tag1: '54%',
    //     tag2: '54%',
    //     tag3: '54%',
    //     tag4: '54%',
    //     tag5: '54%',
    //     tag6: '54%',
    //     tag7: '54%',
    //     tag8: '54%',
    //   },
    //   {
    //     id: 77475,
    //     l2Manager: 'Urmila Panth',
    //     l1Manager: 'Hazarika Pooja',
    //     agentName: 'Sunny Roy',
    //     callDuration: '9020',
    //     qualityScore: 95,
    //     section1: '54%',
    //     section2: '94%',
    //     section3: '64%',
    //     tag1: '54%',
    //     tag2: '54%',
    //     tag3: '54%',
    //     tag4: '54%',
    //     tag5: '54%',
    //     tag6: '54%',
    //     tag7: '54%',
    //     tag8: '54%',
    //   },
    //   {
    //     id: 88475,
    //     l2Manager: 'Sunil Jay',
    //     l1Manager: 'Himal Prakash',
    //     agentName: 'Parikh Goyel',
    //     callDuration: '9120',
    //     qualityScore: 35,
    //     section1: '54%',
    //     section2: '94%',
    //     section3: '64%',
    //     tag1: '54%',
    //     tag2: '54%',
    //     tag3: '54%',
    //     tag4: '54%',
    //     tag5: '54%',
    //     tag6: '54%',
    //     tag7: '54%',
    //     tag8: '54%',
    //   },
    // ]

    setDataGridInfo({
      columns: tempColumns,
      rows: rows
    })
  }









  ////////////////////////////////
  // SELECT THE ACTIVE FIELDS
  ////////////////////////////////
  const [fieldsVisibility,setFieldsVisibility] = useState(null)
  useMemo(()=>{
    if(checkBoxInfo){
      const fieldStatus = {}
      checkBoxInfo.map((section)=>{
        fieldStatus[section.name] = section.checked
        section.children.map((tag)=>{
          fieldStatus[tag.name] = tag.checked
        })
      })
      // console.log("Field Status: ",fieldStatus)
      setFieldsVisibility(fieldStatus)
    }
  },[checkBoxInfo])







  return (
    <div>
        <h4>ScoreCard</h4>
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <AddField  checkBoxInfo={checkBoxInfo} setCheckBoxInfo={setCheckBoxInfo} />
              <ToggleButtons/>
            </div>
            <div style={{height: '400px'}}>
              {
                (dataGridInfo)
                ?
                <DataGrid
                  rowHeight={47}
                  headerHeight={47}
                  columns={dataGridInfo.columns}
                  getRowId={(row) =>  row.id}
                  rows={dataGridInfo.rows}
                  columnVisibilityModel={fieldsVisibility}
                  // initialState={{
                  //   sorting: {
                  //     sortModel: [{ field: 'agentName', sort: 'desc' }],
                  //   },
                  // }}
                />
                :
                <h5>Loading...</h5>
              }              
            </div>
            
        </div>
    </div>
  )
}

export default ScoreCard