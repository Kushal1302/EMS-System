import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { DeleteOutline as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from "../../../public/constant";

const ConfirmModal = ({ openConfirmModal, setConfirmModalOpen, refetch, empId }) => {
  const deleteEmployee = async () => {
    try {
      await axios.delete(`${BASE_URL}/employee?empId=${empId}`);
      setConfirmModalOpen(false);
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      open={openConfirmModal}
      onClose={() => setConfirmModalOpen(false)}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 320,
          backgroundColor: "#fff",
          borderRadius: 8,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setConfirmModalOpen(false)} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Are you sure you want to delete this employee?
        </Typography>
        <Button variant="contained" onClick={deleteEmployee} sx={{ mr: 1, backgroundColor: '#ff6b6b', color: '#fff' }} startIcon={<DeleteIcon />}>Yes</Button>
        <Button variant="contained" onClick={() => setConfirmModalOpen(false)} sx={{ backgroundColor: '#7DA0FA', color: '#fff' }}>No</Button>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
