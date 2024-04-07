import React , {useState} from 'react'
import {Box,Typography,Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

const AllEmployee = ({open}) => {
    const pageStyle  = {
        backgroundColor:"#F5F7FF",
        marginLeft:"50px",
        minHeight:'100vh',
        ...(open && {
            marginLeft: '240px',
            width: `calc(100% - ${240}px)`,
        }),
        p:5
    }
    const [paginationModel , setPaginationModel] = useState({
        pageSize:5,
        page:0
    })
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
          field: "employeeName",
          headerName: "Employee Name",
          width: 330,
        },
        { field: "department", headerName: "Department", width: 330 },
        {
          field: "salary",
          headerName: "Salary",
          width: 230,
        },
    ]
    const rows = [
        {
            id:1,
            employeeName:"Kushal Kumar",
            department:"Software Development",
            salary:"85000"
        }
    ]
  return (
    <Box sx={pageStyle}>
        <Box>
            <Typography variant='h5' fontWeight={'bold'} marginBottom={2}>All Employees</Typography>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
                sx={{
                    'MuiDataGrid-topContainer':{
                        background:'#7978E9'
                    },
                    borderRadius:5,
                    background:'#fff',
                }}
                
            />
        </Box>
    </Box>
  )
}

export default AllEmployee
