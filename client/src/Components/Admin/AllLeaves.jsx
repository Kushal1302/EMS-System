import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, FormControl, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmModal from './ConfirmModal'; // Assuming you have a ConfirmModal component
import axios from 'axios';
import { BASE_URL } from '../../../public/constant';
import { useMutation, useQuery } from 'react-query';
import {toast} from 'react-hot-toast'

const AllLeaves = ({ open }) => {
    const [leaveStatus, setLeaveStatus] = useState("pending");
    const UpdateStatus = (id) => {
        return axios.put(`${BASE_URL}/leave?id=${id}`, {status:leaveStatus})
    }

    const {mutate} = useMutation(UpdateStatus , {
        onSuccess:() => {
            refetch()
            toast.success("Leave Status updated")
        },
        onError:() => {
            toast.error("Something went wrong")
        }
    })
  const pageStyle = {
    backgroundColor: "#F5F7FF",
    marginLeft: "50px",
    minHeight: '100vh',
    mt: 4,
    ...(open && {
      marginLeft: '240px',
      width: `calc(100% - ${240}px)`,
    }),
    p: 5
  };

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  });
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [leaveId, setLeaveId] = useState("");
  

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "employeeName", headerName: "Employee Name", width: 330 },
    { field: "description", headerName: "Description", width: 230 },
    { field: "startDate", headerName: "Start Date", width: 200 },
    { field: "endDate", headerName: "End Date", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            value={params.row.status}
            onChange={(e) => {
                setLeaveStatus(e.target.value)
                mutate(params.row.leaveId)
            }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      )
    },
    
  ];

  const [rows, setRows] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leave/all`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
        }
      });
      const data = response?.data?.data || [];
      console.log(data)
      const formattedData = data.map((leave, index) => ({
        id: index+1,
        leaveId:leave.id,
        employeeName: leave.employee.name,
        description:leave.description,
        startDate: leave.startDate,
        endDate: leave.endDate,
        status: leave.status
      }));
      setRows(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const { refetch } = useQuery(['leave'], fetchLeaves, {
    enabled: rows.length === 0
  });

  const handleStatusChange = async (event, leaveId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`${BASE_URL}/leave/${leaveId}`, { status: newStatus });
      // Refresh the data after status change
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={pageStyle}>
      <Typography variant='h5' fontWeight='bold'>All Leaves</Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={rows.length}
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: 8,
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            },
            '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
              borderRight: '1px solid #E0E0E0',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F4F4F4',
              color: '#333',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #E0E0E0',
              '&:nth-of-type(even)': {
                backgroundColor: '#F9F9F9',
              },
            },
            '& .MuiDataGrid-cell': {
              color: '#555',
            },
            '& .MuiDataGrid-footer, & .MuiDataGrid-toolbar': {
              backgroundColor: '#F5F7FF',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default AllLeaves;
