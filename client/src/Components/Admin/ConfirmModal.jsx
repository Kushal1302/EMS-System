import React from 'react'

import { Modal, Box ,Grid,Typography,TextField,Button} from "@mui/material";
import {useMutation} from 'react-query'
import axios from 'axios'
import { BASE_URL } from "../../../public/constant";

const ConfirmModal = ({openConfirmModal,setConfirmModalOpen,refetch,empId}) => {
    const deleteEmployee = async () => {
        try {
            console.log(empId)
            await axios.delete(`${BASE_URL}/employee?empId=${empId}`)
            setConfirmModalOpen(false)
            refetch()
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <Modal
      open={openConfirmModal}
      onClose={() => setConfirmModalOpen(false)}
      variant="persistant"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display:'flex', alignItems:'center' , justifyContent:'center'}}
    >
      <Box sx={{ width: 200, height: 200, background: "#fff" ,p:2,display:'flex' , justifyContent:'center',alignItems:'center'  }}>
        <Button variant="contained" onClick={deleteEmployee}>Yes</Button>
        <Button variant="contained" onClick={() => setConfirmModalOpen(false)}>No</Button>
      </Box>
    </Modal>
  )
}

export default ConfirmModal
