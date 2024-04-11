import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddEmployeeModal from './AddEmployeeModal';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../../../public/constant';
import ConfirmModal from './ConfirmModal';

const AllEmployee = ({ open }) => {
  const pageStyle = {
    backgroundColor: "#F5F7FF",
    marginLeft: "50px",
    minHeight: '100vh',
    mt:4,
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
  const [openModal, setModalOpen] = useState(false);
  const [openConfirmModal, setConfirmModalOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Employee Name", width: 330 },
    { field: "department", headerName: "Department", width: 330 },
    { field: "salary", headerName: "Salary", width: 230 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Button variant='contained' color='error' onClick={() => {
            setConfirmModalOpen(true);
            setEmpId(params.row.employeeId);
          }}>Delete</Button>
        );
      }
    },
  ];
  const [rows, setRows] = useState([]);
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/all`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
        }
      });
      const data = response?.data?.data || [];
      const formattedData = data.map((e, i) => ({
        id: i + 1,
        name: e.name,
        department: e.department,
        salary: e.salary,
        employeeId: e.id
      }));
      setRows(formattedData);
    } catch (err) {
      console.error(err);
    }
  };
  const {refetch} = useQuery(['employee'], fetchEmployee, {
    enabled: rows.length === 0
  });
  return (
    <Box sx={pageStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant='h5' fontWeight='bold'>All Employees</Typography>
        <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ background: '#7DA0FA', color: '#fff' }}>Add Employee</Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={rows.length}
          sx={{
            'MuiDataGrid-topContainer': {
              background: '#7978E9'
            },
            borderRadius: 5,
            background: '#fff',
          }}
        />
      </Box>
      {openModal && <AddEmployeeModal openModal={openModal} setModalOpen={setModalOpen} />}
      {openConfirmModal && <ConfirmModal openConfirmModal={openConfirmModal} setConfirmModalOpen={setConfirmModalOpen} empId={empId} refetch={refetch} />}
    </Box>
  );
}

export default AllEmployee;
