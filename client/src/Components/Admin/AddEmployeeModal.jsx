import React, { useState } from "react";
import { Modal, Box ,Grid,Typography,TextField,Button} from "@mui/material";
import {useMutation} from 'react-query'
import axios from 'axios'
import { BASE_URL } from "../../../public/constant";

const AddEmployeeModal = ({ openModal, setModalOpen,refetch }) => {
    const [employeeDetail , setEmployeeDetail] = useState({role:"employee"})
    const handleChange = (e) => {
        setEmployeeDetail({
            ...employeeDetail,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = () => {
        addEmployee()
    }
    const AddEmployee = () => {
        return axios.post(`${BASE_URL}/employee`,employeeDetail)
    }
    const {mutate : addEmployee} = useMutation(AddEmployee , {
        onSuccess:(data) => {
            console.log(data)
            setModalOpen(false)
            refetch()
        },
        onError:(err) => {
            console.log(err)
        }
    })
  return (
    <Modal
      open={openModal}
      onClose={() => setModalOpen(false)}
      variant="persistant"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display:'flex', alignItems:'center' , justifyContent:'center'}}
    >
      <Box sx={{ width: 500, height: 500, background: "#fff",borderRadius:3 ,p:2 , '@media(max-width:540px)':{ width: 350, height: 400} }}>
        <Grid container lg={12} md={12} sm={12} xs={12} sx={{display:'flex',justifyContent:'center'}}>
            <Grid item lg={10} md={10} sm={10} xs={12} sx={{textAlign:'center'}}>
                <Typography variant="h5">EMS</Typography>
                <TextField placeholder="Enter Name" fullWidth name="name" onChange={handleChange}/>
                <TextField placeholder="Enter Email" fullWidth name="email" onChange={handleChange}/>
                <TextField placeholder="Enter Age" fullWidth name="age" onChange={handleChange}/>
                <TextField placeholder="Enter Password" fullWidth name="password" onChange={handleChange}/>
                <TextField type="date" placeholder="Enter DOB" fullWidth name="dob" onChange={handleChange}/>
                <Button variant="contained" sx={{bgcolor:'#F3797E' , marginTop:2}} onClick={handleSubmit}>Save</Button>
            </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
