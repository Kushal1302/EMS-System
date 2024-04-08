import React , {useState} from 'react'
import {Box,Typography,Grid,Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import AddEmployeeModal from './AddEmployeeModal';
import {useQuery} from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../../public/constant';
import ConfirmModal from './ConfirmModal';

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
    const [openModal , setModalOpen] = useState(false)
    const [openConfirmModal,setConfirmModalOpen] = useState(false)
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
        {
            field: "action",
            headerName: "Action",
            width: 230,
            renderCell:(params) => {
                return (
                    <Button variant='contained' sx={{background:"#7DA0FA"}} onClick={() =>{
                        setConfirmModalOpen(true)
                        setEmpId(params.row.employeeId)
                    }}>Delete</Button>
                )
            }
          },
    ]
    const [rows , setRows] = useState([])
    const [empId , setEmpId] = useState("")
    const [RowCount,setRowCount] = useState()
    const fetchEmployee = () => {
        return axios.get(`${BASE_URL}/employee/all`)
    }
    const {data:employees , refetch} = useQuery(['employee'] , fetchEmployee , {
        onSuccess:(data) => {
            const array = data?.data?.data.map((e,i) => {
                return {
                    id:i+1,
                    name:e.name,
                    age:e.age,
                    dob:e.dob,
                    employeeId:e.id
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
    <Box sx={pageStyle}>
        <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <Typography variant='h5' fontWeight={'bold'} marginBottom={2}>All Employees</Typography>
            <Button variant="contained" sx={{background:'#7DA0FA',color:'#fff'}} onClick={() => setModalOpen(true)} >Add Employee</Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={RowCount}
                sx={{
                    'MuiDataGrid-topContainer':{
                        background:'#7978E9'
                    },
                    borderRadius:5,
                    background:'#fff',
                }}
                
            />
        </Box>
        {openModal && <AddEmployeeModal openModal={openModal} setModalOpen={setModalOpen} refetch={refetch}/>}
        {openConfirmModal && <ConfirmModal openConfirmModal={openConfirmModal} setConfirmModalOpen={setConfirmModalOpen} refetch={refetch} empId={empId}/>}
    </Box>
  )
}

export default AllEmployee
