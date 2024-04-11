import React, { useState } from 'react';
import { Box, Typography, Grid, Paper,CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../../../public/constant';

const AdminHome = ({ open }) => {
    const {user} = JSON.parse(localStorage.getItem('jwt'))
  const pageStyle = {
    backgroundColor: '#F5F7FF',
    marginLeft: "50px",
    minHeight: '100vh',
    mt:4,
    ...(open && {
      marginLeft: '240px',
      width: `calc(100% - ${240}px)`,
    }),
    p: 5,
  };

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Employee Name', width: 330 },
    { field: 'department', headerName: 'Department', width: 330 },
    { field: 'salary', headerName: 'Salary', width: 230 },
  ];

  const [rows, setRows] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/all`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`,
        },
      });
      const data = response?.data?.data || [];
      const formattedData = data.map((employee, index) => ({
        id: index + 1,
        name: employee.name,
        department: employee.department,
        salary: employee.salary,
      }));
      setRows(formattedData);
      setTotalEmployees(data.length);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const {isLoading} = useQuery(['employee'], fetchEmployee, {
    enabled: rows.length === 0,
  });

  return (
    <Box sx={pageStyle}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Welcome {user?.name}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        All systems are running smoothly. <span style={{ color: '#4B49AC', fontWeight: 'bold' }}>You have 3 unread alerts</span>
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Paper sx={{ backgroundColor: '#7DA0FA', p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              Total Employees
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {isLoading ? <CircularProgress/> :totalEmployees}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ backgroundColor: '#F3797E', p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              Total Absent Employees
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              5
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{
            borderRadius: 5,
            bgcolor: '#fff',
            '& .MuiDataGrid-columnsContainer': {
              backgroundColor: '#7978E9',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminHome;
