import React, { useState } from "react";
import { Modal, Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from '@mui/icons-material';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from "../../../public/constant";

const AddEmployeeModal = ({ openModal, setModalOpen, refetch }) => {
  const [employeeDetail, setEmployeeDetail] = useState({ role: "employee" });

  const handleChange = (e) => {
    setEmployeeDetail({
      ...employeeDetail,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    addEmployee();
  };

  const AddEmployee = () => {
    return axios.post(`${BASE_URL}/employee`, employeeDetail);
  };

  const { mutate: addEmployee } = useMutation(AddEmployee, {
    onSuccess: (data) => {
      console.log(data);
      setModalOpen(false);
      refetch();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <Modal
      open={openModal}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: "#fff",
          borderRadius: 8,
          p: 3,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>EMS</Typography>
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="DOB"
              type="date"
              name="dob"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#F3797E', mt: 2 }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
