import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Layout from '../Layout/index'



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
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'j@hotmail.com', active: true },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', email:'c@hotmail.com' , active: false },    
  ];


const ListUsers = () => {
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
                    <Button variant='outlined' startIcon={<AddOutlinedIcon/>} color='success' >
                        Agregar
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' startIcon={<DeleteIcon/>} color='error' >
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
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Grid>
            </Grid>
            
        </Paper>
    </Layout>
    
  )
}

export default ListUsers
