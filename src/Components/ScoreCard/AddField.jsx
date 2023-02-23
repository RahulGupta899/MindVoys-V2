import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckBoxGroups from './CheckBoxGroup'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0.5px solid #000',
  borderRadius: '5px',
  boxShadow: 20,
  p: 4,
};

const AddField = ({checkBoxInfo, setCheckBoxInfo})=>{
    const [modalOpen,setModalOpen] = useState(false)
    const handleOpen =  ()=> setModalOpen(true)
    const handleClose = ()=> setModalOpen(false)

    return (
        <div>
            <Button onClick={handleOpen}>Add Field</Button>
            <Modal
                open={modalOpen}
                onClose ={handleClose}
            >
                <Box sx={style}>
                    <Typography>Select Fields</Typography>
                    {
                        checkBoxInfo
                        ?
                        <CheckBoxGroups checkBoxInfo={checkBoxInfo} setCheckBoxInfo={setCheckBoxInfo}/>
                        :
                        <h6>Loading...</h6>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default AddField