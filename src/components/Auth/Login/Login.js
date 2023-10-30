import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';
import { useEffect } from 'react';
import { useState } from 'react';

import { Auth } from "../../../api/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        UAM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme  = createTheme();

export const Login = () =>  {
  
  // const [status, setStatus] = useState(false); // Estado para almacenar el valor de status
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const auth = new Auth();

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const statusParam = params.get('registrationSuccess');

    // Actualiza el estado 'status' con el valor capturado
    // setStatus(statusParam);

    // Abre la Snackbar si 'status' tiene un valor
    if (statusParam) {
      setOpenSnackbar(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const data2 = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await auth.login(data2);
      console.log(response, "response");

      if (response.status === 200) {
        // La solicitud se completó correctamente, establecer el estado de redirección
        console.log("Usuario logueado exitosamente");
        setLoginSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

 
  };

  if (loginSuccess) {
    // window.location.href = '/login?registrationSuccess=true';
    return <Navigate to={`/dashboard?loginSuccess=true`} />;
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setStatus(false);
    setOpenSnackbar(false);
  }; 


  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">

        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Sign In
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert elevation={6} variant="filled" severity="success" onClose={handleCloseSnackbar}>
                ¡Registro exitoso!
              </Alert>
            </Snackbar>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}