import React from 'react'
import { Container, Typography, List, ListItem, Paper } from '@mui/material'

const Resources = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Risorse
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Risorse utili per i tuoi interessi culturali
        </Typography>
        <List>
          <ListItem>Risorsa 1: Dettagli</ListItem>
          <ListItem>Risorsa 2: Dettagli</ListItem>
        </List>
      </Paper>
    </Container>
  )
}

export default Resources
