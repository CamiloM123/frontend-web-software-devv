import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Toast
import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';

//Components
import Layout from '../Layout/index'
import { Auth } from "../../../api/auth";



// Función para validar el correo electrónico y el dominio
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const domain = email.substring(email.lastIndexOf("@") +1);
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'autonoma.edu.co']; // Agrega los dominios permitidos aquí

  return re.test(email) && allowedDomains.includes(domain);
};


const ListUsers = () => {
  //Lista de usuarios
  const [shouldUpdate, setShouldUpdate] = useState(true);
  //Seleccionar usuarios
  const [selectedRows, setSelectedRows] = useState([]);


  //Dialog
  const [open, setOpen] = React.useState(false); //Dialog
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [creationSuccess, setCreationSuccess ] = useState(false); //Snackbar
  //form 
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [rows, setRows] = useState([]);

  const auth = new Auth();

  const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
      //   type: 'email',
        width: 250,
        editable: true,
      },
      // {
      //   field: 'fullName',
      //   headerName: 'Full name',
      //   description: 'This column has a value getter and is not sortable.',
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      // },
      {
          field: 'Active',
          headerName: 'Active',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.active ? 'Activo' : 'Inactivo'}`,
        },
    ];
    

    //Traer lista de usuarios de la base de datos

    useEffect(() => {
      const getUsers = async () => {
        const response = await auth.getAllUsers();
        const data = await response.json();
        return data;
      };
      
      if (shouldUpdate) {
        getUsers().then(data => {
          const updatedRows = data.map(user => ({
            id: user._id,
            firstName: user.name,
            lastName: user.lastname,
            email: user.email,
            active: user.active,
          }));
          setRows(updatedRows);
          setShouldUpdate(false);
          console.log(updatedRows);
        });
      }
      // eslint-disable-next-line
    }, [shouldUpdate] );
    
    //Dialog


    const handleCloseDialog = () => {
      setOpen(false);
    }
    
    // Enviar los datos del formulario  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);

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
          setOpen(false);
          setCreationSuccess(true);
          setShouldUpdate(true);
        }
      } catch (error) {
        console.log(error);
      }

    };

    const handleDelete = async () => {
      // Aquí puedes enviar una solicitud HTTP para eliminar los usuarios seleccionados
      // Por ejemplo, puedes hacer una solicitud HTTP para eliminar al usuario
      console.log('Usuarios seleccionados:', selectedRows);
      // alert('Usuarios seleccionados: ' + selectedRows);
      try {
        const id = selectedRows[0];
        //tipo de dato
        console.log(typeof(id));
        console.log(id);
        const response = await auth.deleteUser(id);
        console.log(response);
        if (response.status === 200) {
          // La solicitud se completó correctamente, establecer el estado de redirección
          alert('Usuario eliminado');
          setShouldUpdate(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
    }

    const handleCloseSuccess = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setCreationSuccess(false);
    }

  return (
    <Layout>
        <Paper
            sx={{ p:3 }}
        >   
            <Grid container spacing={3}>

                <Grid item xs={8}>
                    <h3 sx={{m : 0}}>Usuarios</h3>
                </Grid>

                <Grid item xs={2}>
                    <Button variant='outlined' startIcon={<AddOutlinedIcon/>} color='success' onClick={() => setOpen(true)} >
                        Agregar
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' startIcon={<DeleteIcon/>} color='error' onClick={handleDelete} >
                        Eliminar
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 5,
                                },
                            },
                            }}
                            getRowId={(row) => row.id}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(data) => {
                              setSelectedRows(data);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            {/* Dialog */}

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"   

              >
                <DialogTitle id="alert-dialog-title">
                  {"Agregar un nuevo usuario"}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <label htmlFor="name">Nombre</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="lastname">Apellido</label>
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        required
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="password">Contraseña</label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="repeatPassword">Repetir contraseña</label>
                      <input
                        id="repeatPassword"
                        type="password"
                        name="repeatPassword"
                        placeholder="Repetir contraseña"
                        required
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  
                </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary"> Cancelar </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus> Crear </Button>
                  </DialogActions>
            </Dialog>
            {/* Snackbar */}
            <Snackbar
              open={creationSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
            >
              <Alert elevation={6} variant="filled" severity="success" onClose={handleCloseSuccess}>
                ¡Creación exitosa!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
        </Paper>

    </Layout>
    
  )
}

export default ListUsers
