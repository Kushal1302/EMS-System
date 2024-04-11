import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import {useMutation} from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../public/constant';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import ToastMessage from '../Customs/ToastMessage';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4), // Adding padding
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  position: 'absolute', // Positioning absolute
  top: '50%', // Centering vertically
  left: '50%', // Centering horizontally
  transform: 'translate(-50%, -50%)', // Adjusting position
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const Login = () => {
  const [loginDetails , setLoginDetails] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginDetails({
        ...loginDetails,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate()
  };
  const LoginFunc = () => {
    return axios.post(BASE_URL+"/login" , loginDetails)
  }
  const {mutate} = useMutation(LoginFunc , {
    onSuccess:(data) => {
        localStorage.setItem("jwt" , JSON.stringify(data?.data))
        if(data?.data?.user.role === "admin") {
            ToastMessage(data?.data.message)
            return navigate('/adminHome')
        }
        if(data?.data?.user.role === "employee") return navigate('/employeeHome')
    },
    onError:(err) => {
        console.log(err.message)
    }
  })
  return (
    <StyledContainer component="main" maxWidth="xs">
      <Typography component="h1" variant="h4" color="primary" gutterBottom>
        Welcome to EMS
      </Typography>
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        Sign in
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          variant="outlined"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={loginDetails?.email}
          onChange={handleChange}
        />
        <StyledTextField
          variant="outlined"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={loginDetails?.password}
          onChange={handleChange}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </StyledButton>
      </StyledForm>
      <StyledTypography variant="body2" color="textSecondary">
        Don't have an account? Sign up
      </StyledTypography>
    </StyledContainer>
  );
};

export default Login;
