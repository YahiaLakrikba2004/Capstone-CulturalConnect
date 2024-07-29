import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const CustomAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            flexGrow: 1,
            cursor: 'pointer',
          }}
        >
          CulturalConnect
        </Typography>

        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/create-user">
          Create User
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar
