import React,{useState} from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import AddField from './AddField'
import { DataGrid } from '@mui/x-data-grid';

const ScoreCard = () => {

  const [checkBoxInfo, setCheckBoxInfo] = useState(null);
  const [dataGridInfo, setDataGridInfo] = useState(null)
  console.log("DATAGRID: ",dataGridInfo)


  //////////////////////////////////////////////////////////
  // FETCH SECTIONS AND THEIR STATUS FOR CHECKBOX STATUS
  //////////////////////////////////////////////////////////
  useEffect(()=>{
    (async function(){
      // const data = axios.get("API CALL")
      const data = [
        {
          name: 'section1',
          checked: true,
          children: [
            { name: 'tag1', checked: false },
            { name: 'tag2', checked: false },
          ],
        },
        {
          name: 'section2',
          checked: true,
          children: [
            { name: 'tag3', checked: false },
            { name: 'tag4', checked: false },
          ],
        },
        {
            name: 'section3',
            checked: true,
            children: [
              { name: 'tag5', checked: false },
              { name: 'tag6', checked: false },
              { name: 'tag7', checked: false },
              { name: 'tag8', checked: false },
            ],
          },
      ]
      setCheckBoxInfo(data)

      // Make columns field
      createDataGridColumns(data)
    })()
  },[])

  // FUNCTION TO CREATE COLUMN FIELDS FOR AGENT SCORECARD GRID
  const createDataGridColumns = (data)=>{
    const tempColumns = [
      {
          field: 'l2Manager',
          headerName: 'L2 Manager',
          type:'string',
          width:130,
          headerAlign: 'center',
          align: 'center',
      },
      {
          field: 'l1Manager',
          headerName: 'L1 Manager',
          type:'String',
          width:130,
          headerAlign: 'center',
          align: 'center',
      },
      {
          field: 'agentName',
          headerName: 'Agent Name',
          type: 'string',
          width:130,
          headerAlign: 'center',
          align: 'center',
      },
      {
        field: 'callDuration',
        headerName: 'Call Duration',
        type:'number',
        width:130,
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
      }
    ]
    data.map((section)=>{       
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
        }
        tempColumns.push(tagColumn)
      })


    })


    const rows = [
      {
        id: 10475,
        l2Manager: 'Ganesh Marve',
        l1Manager: 'Kailash Prakash',
        agentName: 'Ravi Goyel',
        callDuration: '120',
        qualityScore: 45,
        section1: '54%',
        section2: '94%',
        section3: '64%',
        tag1: '54%',
        tag2: '54%',
        tag3: '54%',
        tag4: '54%',
        tag5: '54%',
        tag6: '54%',
        tag7: '54%',
        tag8: '54%',
      },
      {
        id: 10476,
        l2Manager: 'Arvind Javi',
        l1Manager: 'Tanya Kashyab',
        agentName: 'Sikha Goyel',
        callDuration: '120',
        qualityScore: 45,
        section1: '54%',
        section2: '94%',
        section3: '64%',
        tag1: '54%',
        tag2: '54%',
        tag3: '54%',
        tag4: '54%',
        tag5: '54%',
        tag6: '54%',
        tag7: '54%',
        tag8: '54%',
      },
      {
        id: 90475,
        l2Manager: 'Sukesh Marve',
        l1Manager: 'Kailash Tawa',
        agentName: 'Hema ravi',
        callDuration: '120',
        qualityScore: 89,
        section1: '54%',
        section2: '94%',
        section3: '64%',
        tag1: '54%',
        tag2: '54%',
        tag3: '54%',
        tag4: '54%',
        tag5: '54%',
        tag6: '54%',
        tag7: '54%',
        tag8: '54%',
      },
      {
        id: 77475,
        l2Manager: 'Urmila Panth',
        l1Manager: 'Hazarika Pooja',
        agentName: 'Sunny Roy',
        callDuration: '9020',
        qualityScore: 95,
        section1: '54%',
        section2: '94%',
        section3: '64%',
        tag1: '54%',
        tag2: '54%',
        tag3: '54%',
        tag4: '54%',
        tag5: '54%',
        tag6: '54%',
        tag7: '54%',
        tag8: '54%',
      },
      {
        id: 88475,
        l2Manager: 'Sunil Jay',
        l1Manager: 'Himal Prakash',
        agentName: 'Parikh Goyel',
        callDuration: '9120',
        qualityScore: 35,
        section1: '54%',
        section2: '94%',
        section3: '64%',
        tag1: '54%',
        tag2: '54%',
        tag3: '54%',
        tag4: '54%',
        tag5: '54%',
        tag6: '54%',
        tag7: '54%',
        tag8: '54%',
      },
    ]

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
      console.log("Field Status: ",fieldStatus)
      setFieldsVisibility(fieldStatus)
    }
  },[checkBoxInfo])







  return (
    <div>
        <h4>ScoreCard</h4>
        <div>
            <AddField  checkBoxInfo={checkBoxInfo} setCheckBoxInfo={setCheckBoxInfo} />
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