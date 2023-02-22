// import React,{useState,useEffect,useCallback} from 'react';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';


// const sections = [
//     {
//         sectionName: 'section1',
//         tags:["tag1", "tag2", "tag3", "tag4"]
//     }, 
//     {
//         sectionName: 'section2',
//         tags:["tag5", "tag6"]
//     }
// ]



// const  CheckBoxGroupsTest = ()=>{
    
//     const [checkBoxesInfo,setCheckBoxesInfo] = useState(null)
//     console.log(checkBoxesInfo)
//     useEffect(() => {
//       const data = {
//         section1: true,
//         section2: false,
//         tag1: true,
//         tag2: true,
//         tag3: true,
//         tag4: true,
//         tag5: true,
//         tag6: true
//       }
//       setCheckBoxesInfo(data)
//     }, [])
    





//     const handleTagChange = (tag)=>{
//         setCheckBoxesInfo({
//             ...checkBoxesInfo,
//             [tag]: !checkBoxesInfo[tag]
//         })
//     }

//     const handleSectionChange = (e,section)=>{
        
//         if(e.target.checked){
//             // Select Section and all it's tags
//             const tags = sections.find((sec) => sec.sectionName === section )
//             const tagNames = {}
//             tags.tags.map((tag)=> {
//                 tagNames[tag]= true
//             })
//             console.log("TAG Names: ",tagNames)
//             setCheckBoxesInfo({
//                 ...checkBoxesInfo,
//                 [section]: true,
//                 ...tagNames
//             })
//         }
//         else{
//             // Deselect section and all it's tags
//             console.log("DESELECT SECTION AND IT'S SECTION")
//             const tags = sections.find((sec) => sec.sectionName === section )
//             const tagNames = {}
//             tags.tags.map((tag)=> {
//                 tagNames[tag]= false
//             })
//             console.log("TAG Names: ",tagNames)
//             setCheckBoxesInfo({
//                 ...checkBoxesInfo,
//                 [section]: false,
//                 ...tagNames
//             })
//         }
//     }

//     const checkIntermediate = (section)=>{
//         console.log("INTERMEDIATE STATE")

//         // CHECK FOR ATLEAST 1 TRUE
//         console.log("APPLY FIND ON : ", section)
//         let case1 = section.tags.find((tag) => checkBoxesInfo[tag]===true) 

//         // CHECK FOR ATLEAST 1 FALSE
//         let case2 = section.tags.find((tag) => checkBoxesInfo[tag]===false)

//         if(case1&&case2){
//             checkBoxesInfo[section.sectionName] = true
//         }
//         return case1&&case2
//     }

//     // const checkChecked = 

//     const checkChecked = useCallback((section)=>{

            
//             console.log("Use callback executed...")
//             console.log("sectionName: ",section)
            

//             // const tags = sections.find((sec) => sec.sectionName === section )
//             // const tagUnchecked = tags.tags.find((tag)=> checkBoxesInfo[tag]===false)
    
//             // if(tagUnchecked){
//             //     setCheckBoxesInfo({
//             //         ...checkBoxesInfo,
//             //         [section]: false
//             //     })
//             //     return false
//             // }
//             // else{
//             //     setCheckBoxesInfo({
//             //         ...checkBoxesInfo,
//             //         [section]: true
//             //     })
//             //     return true
//             // } 
        
//     },[checkBoxesInfo])
    
//     return (
//         <div>
//             {   
//                 checkBoxesInfo
//                 &&
//                 sections.map((section,idx)=>{
//                     return (
//                         <>
//                         <FormControlLabel
//                             key={idx}
//                             label = {section.sectionName}
//                             control={<Checkbox 
//                                         checked={checkBoxesInfo[section.sectionName]} 
//                                         // checked={checkChecked(section.sectionName)}
//                                         indeterminate={checkIntermediate(section)} 
//                                         onChange={(e)=>{handleSectionChange(e,section.sectionName)}} 
//                                     />}
//                         />
//                         <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
//                             {
//                                 section.tags.map((tag)=>{
//                                     return (
//                                         <FormControlLabel
//                                             label= {tag}
//                                             control={<Checkbox 
//                                                         checked={checkBoxesInfo[tag]} 
//                                                         onChange={()=>{handleTagChange(tag)}} 
//                                                     />}
//                                         />
//                                     )
//                                 })
//                             }                            
//                         </Box>
//                         </>
//                     )
//                 })
//             }
            
//         </div>
//     )                                
    
// }

// export default CheckBoxGroupsTest



import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { Card } from "@mui/material";

const estudiantes = [
  { uid: 1, label: "Student 1" },
  { uid: 2, label: "Student 2" },
  { uid: 3, label: "Student 3" }
];

const CheckBoxGroup = () => {
  const [checkedStudents, setCheckedStudents] = useState([]);

  const handleChange1 = (isChecked) => {
    if (isChecked)
      return setCheckedStudents(
        estudiantes.map((estudiante) => estudiante.uid)
      );
    else setCheckedStudents([]);
  };

  const handleChange2 = (isChecked, uid) => {
    const index = checkedStudents.indexOf(uid);

    // The checked value is altered before the state changes for some reason is not a trully controlled component
    // So the next conditions are INVERTED.

    if (isChecked) return setCheckedStudents((state) => [...state, uid]);

    if (!isChecked && index > -1)
      return setCheckedStudents((state) => {
        state.splice(index, 1);
        return JSON.parse(JSON.stringify(state)); // Here's the trick => React does not update the f* state array changes even with the spread operator, the reference is still the same.
      });
  };

  return (
    <Fragment>
      {/* Parent */}

      <Checkbox
        checked={checkedStudents.length === estudiantes.length}
        indeterminate={
          checkedStudents.length !== estudiantes.length &&
          checkedStudents.length > 0
        }
        onChange={(event) => handleChange1(event.target.checked)}
      />

      {/* Childrens */}
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {checkedStudents &&
          estudiantes.map((estudiante) => (
            <Checkbox
              key={estudiante.uid}
              checked={checkedStudents.includes(estudiante.uid)}
              onChange={(event) =>
                handleChange2(event.target.checked, estudiante.uid)
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          ))}
      </Box>

      <h3>ID's: {JSON.stringify(checkedStudents)}</h3>
    </Fragment>
  );
};

export default CheckBoxGroup;


