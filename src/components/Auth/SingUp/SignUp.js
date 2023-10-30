import * as React from 'react';

// import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from "../../../api/auth";

//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Toast
import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';

// import { Login } from '../Login/Login';

// Función para validar el correo electrónico y el dominio
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const domain = email.substring(email.lastIndexOf("@") +1);
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'autonoma.edu.co']; // Agrega los dominios permitidos aquí

  return re.test(email) && allowedDomains.includes(domain);
};

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

export const SignUp = () =>  {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');




  const [userDecision, setUserDecision] = useState(null);
  const auth = new Auth();

  // Enviar los datos del formulario  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const lastname = data.get('lastname');
    const email = data.get('email');
    const password = data.get('password');
    const repeatPassword = data.get('repeatPassword');

    if (!validateEmail(email)) {
      // Mostrar un Snackbar si el correo electrónico no es válido
      setErrorMessage('El correo electrónico no es válido');
      setErrorMessage('Ingrese un correo con caracteres validos');
      setOpenSnackbar(true);
      return;
    }

    if (password !== repeatPassword) {
      // Mostrar un Snackbar si las contraseñas no coinciden
      setErrorMessage('Las contraseñas no coinciden');
      setOpenSnackbar(true);
      return;
    } else {
      // Aquí puedes enviar los datos del formulario si las contraseñas coinciden
      // Por ejemplo, puedes hacer una solicitud HTTP para registrar al usuario
      console.log('Contraseñas coinciden, puedes enviar el formulario.');
    }

    const data2 = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    };

    console.log(data2);
    try {
      const response = await auth.signUp(data2);
      console.log(response);
      if (response.status === 201) {
        // La solicitud se completó correctamente, establecer el estado de redirección
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

  };

  if (registrationSuccess) {
    // window.location.href = '/login?registrationSuccess=true';
    return <Navigate to={`/login?registrationSuccess=true`} />;
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };  

  const handleAgree = () => {
    setUserDecision('agree');
    setOpen(false);
  };

  const handleDisagree = () => {
    setUserDecision('disagree');
    setOpen(false);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} >
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Lastname"
                    name="lastname"
                    autoComplete="lastname"
                  />
                </Grid>

            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatPassword"
                  autoComplete="new-password"
                  // value={repeatPassword}
                  // onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <Grid item>
                <Link href="#" variant="body2" onClick = {handleClickOpen}>
                  Términos y condiciones
                </Link>
              </Grid>
  
              </Grid>
              {/* Dialog */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Términos y Condiciones de Uso"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
              
                  <Typography gutterBottom>
                    Por favor, lee detenidamente los siguientes términos y condiciones 
                    antes de utilizar nuestro sitio web. Al acceder y utilizar este sitio web, 
                    aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con 
                    alguno de los siguientes puntos, te recomendamos que no utilices nuestro sitio web.
                  </Typography>

                  <Typography gutterBottom>
                    1. Uso del Sitio Web 
                  </Typography>
                    El contenido de este sitio web es únicamente para información general y 
                    puede estar sujeto a cambios sin previo aviso. No garantizamos la exactitud, 
                    integridad o actualidad de la información proporcionada en este sitio web.

                    <Typography gutterBottom>
                    1.1 El uso de cualquier información o material en este sitio web es bajo tu propio riesgo. 
                    Es tu responsabilidad asegurarte de que cualquier producto, servicio o información disponible 
                    a través de este sitio web cumpla con tus requisitos específicos.
                    </Typography>
                  <Typography gutterBottom>
                    1.2 Este sitio web puede contener enlaces a otros sitios web que no están bajo nuestro control. 
                    No tenemos control sobre la naturaleza, el contenido y la disponibilidad de esos sitios. 
                    La inclusión de cualquier enlace no implica necesariamente una recomendación o respaldo 
                    de los puntos de vista expresados en ellos.
                  </Typography>

                  <Typography gutterBottom>
                  2. Propiedad intelectual
                  </Typography>
                    2.1. Todos los derechos de propiedad intelectual en relación con este sitio web y su contenido
                    (incluyendo, pero no limitado a, texto, gráficos, logotipos, imágenes y software) 
                    son propiedad de SENNOVALAB o de nuestros licenciantes. Estos están protegidos por 
                    las leyes de propiedad intelectual aplicables.

                  <Typography gutterBottom>
                    2.2. Está prohibida cualquier reproducción, distribución, modificación o uso no autorizado del 
                    contenido de este sitio web sin nuestro consentimiento previo por escrito.
                    Está prohibida cualquier reproducción, distribución, modificación o uso no autorizado 
                    del contenido de este sitio web sin nuestro consentimiento previo por escrito.

                  <Typography gutterBottom>
                  3. Privacidad y Protección de Datos
                  </Typography>
                    3.1.La recopilación y el uso de tus datos personales en relación con este sitio web están 
                    sujetos a nuestra Política de Privacidad. Al utilizar nuestro sitio web, aceptas el 
                    procesamiento de tus datos personales de acuerdo con nuestra Política de Privacidad.

                  <Typography gutterBottom>
                  4. Limitación de Responsabilidad
                  </Typography>
                    4.1.En la medida permitida por la ley aplicable, excluimos todas las garantías y condiciones 
                    relacionadas con nuestro sitio web y su contenido. No seremos responsables de ningún daño 
                    directo, indirecto, incidental, especial o consecuente que surja del uso de este sitio web.

                  <Typography gutterBottom>
                  5. Modificaciones de los Términos y Condiciones
                  </Typography>
                    5.1.Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                    Los cambios serán efectivos tan pronto como se publiquen en este sitio web. Te recomendamos 
                    que revises regularmente estos términos y condiciones para estar al tanto de cualquier cambio.

                  </Typography>
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDisagree} color="primary">Disagree</Button>
                  <Button onClick={handleAgree} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              {userDecision && <p>You chose: {userDecision}</p>}
            </Grid>
            
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        
      </Container>
    </ThemeProvider>
  );
}