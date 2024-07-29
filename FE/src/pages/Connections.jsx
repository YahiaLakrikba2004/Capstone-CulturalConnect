import React from 'react'
import { Container, Typography, List, ListItem, Paper } from '@mui/material'

const Connections = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Nuove Connessioni
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Trova e connettiti con persone
        </Typography>
        <List>
          <ListItem>Connessione 1: Dettagli</ListItem>
          <ListItem>Connessione 2: Dettagli</ListItem>
        </List>
      </Paper>
    </Container>
  )
}

export default Connections
