import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import { Link } from 'react-router-dom'

export const menuItems = (
  <React.Fragment>
    <ListItemButton to="/dashboard" component={Link}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItemButton>

    {/* <ListItemButton>
        <ListItemIcon>
            <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
    </ListItemButton> */}

    <ListItemButton to="/users" component={Link}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
    </ListItemButton>

    {/* <ListItemButton>
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
    </ListItemButton>

    <ListItemButton>
        <ListItemIcon>
            <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
    </ListItemButton> */}
    
  </React.Fragment>
);

