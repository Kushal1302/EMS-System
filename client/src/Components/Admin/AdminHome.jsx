import React, { useState } from 'react'
import {Box,Typography,Grid } from '@mui/material'
import back from '../../assets/background.jpg'
import { DataGrid } from '@mui/x-data-grid';
import {useQuery} from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../../public/constant';

const AdminHome = ({open}) => {
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
          field: "name",
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
    const [rows , setRows] = useState([])
    const [RowCount,setRowCount] = useState()
    const fetchEmployee = () => {
        return axios.get(`${BASE_URL}/employee/all`)
    }
    const {data:employees} = useQuery(['employee'] , fetchEmployee , {
        onSuccess:(data) => {
            const array = data?.data?.data.map((e,i) => {
                return {
                    id:i+1,
                    name:e.name,
                    age:e.age,
                    dob:e.dob
                }
            })
            setRows(array)
        },
        enabled:rows.length === 0,
        onError:(err) => {
            console.log(err)
        }
    })

  return (
    <>
    <Box sx={pageStyle}>
        <Typography variant='h5'  sx={{fontWeight:'bold'}}>
            Welcome Kushal
        </Typography>
        <Typography variant='p' sx={{fontWeight:'bold'}}>
            All systems are running smoothly , <span style={{color:"#4B49AC ",fontWeight:'bold'}}>You have 3 unread alerts</span>
        </Typography>
        <Grid container lg={12} md={12} sm={12} xs={12}>
            <Grid item container lg={12} md={12} sm={12} xs={12}>
                <Grid item lg={6} md={12} sm={12}  >
                   <img src={back} alt="back-img"  width={'100%'} style={{borderRadius:20 }}/>
                </Grid>
                <Grid item container lg={6} md={12} sm={12} xs={12}>
                    <Grid item lg={12} md={6} sm={6} xs={12} sx={{backgroundColor:'#7DA0FA',p:1 , borderRadius:10 , color:'#fff' , marginBottom:1 }} >
                        <Box sx={{display:'flex' , flexDirection:'column' ,height:'100%' , width:'100%' , padding:2 }}>
                            <Typography>
                                Total Employees
                            </Typography>
                            <Typography variant='h5' >
                                {rows.length}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={12} md={6} sm={6} xs={12} sx={{backgroundColor:'#F3797E' , borderRadius:10 , color:'#fff', marginBottom:1}}>
                    <Box sx={{display:'flex' , flexDirection:'column' ,height:'100%' , width:'100%' , padding:2  }}>
                            <Typography>
                                Total Absent Employees
                            </Typography>
                            <Typography variant='h5' >
                                5
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
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
    </>
  )
}

export default AdminHome
