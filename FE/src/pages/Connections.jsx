import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Divider,
} from '@mui/material'
import { keyframes } from '@mui/system'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import CancelIcon from '@mui/icons-material/Cancel'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

// Variabili per le animazioni
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleHover = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`

const cardStyles = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  position: 'relative',
  height: 'auto',
  '&:hover': {
    animation: `${scaleHover} 0.3s ease-in-out`,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
}

const onlineStatusStyles = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '50%',
  padding: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const statusIconStyles = {
  fontSize: '1.2rem',
}

// Stili per la paginazione
const paginationButtonStyles = {
  mx: 1,
  px: 3,
  py: 1.5,
  borderRadius: '8px',
  fontWeight: 600,
  minWidth: '120px',
  fontSize: '16px',
}

const Connections = () => {
  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState(null)
  const itemsPerPage = 6

  // Funzione per simulare lo stato di connessione
  const simulateOnlineStatus = connectionId => {
    return Math.random() > 0.2 // 80% di probabilità di essere online
  }

  // Funzione per il recupero delle connessioni
  const fetchConnections = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/connections')
      if (Array.isArray(response.data)) {
        const updatedConnections = response.data.map(connection => ({
          ...connection,
          online: simulateOnlineStatus(connection.id),
        }))
        setConnections(updatedConnections)
        setFilteredConnections(updatedConnections)
      } else {
        throw new Error('Data is not an array')
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
      setError('Errore nel recupero delle connessioni. Riprova più tardi.')
      toast.error('Errore nel recupero delle connessioni. Riprova più tardi.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchConnections()
  }, [fetchConnections])

  // Filtra le connessioni quando cambia il termine di ricerca o le connessioni
  useEffect(() => {
    const filtered = connections.filter(
      connection =>
        connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        connection.interests.some(interest =>
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    setFilteredConnections(filtered)
    setCurrentPage(1)
  }, [searchTerm, connections])

  // Gestione dell'aggiunta come amico
  const handleAddFriend = async id => {
    if (connecting === id) return

    setConnecting(id)
    try {
      const response = await axios.post(
        'http://localhost:8080/api/friendships/send',
        null,
        {
          params: { requesterId: 1, receiverId: id }, // Assicurati che `requesterId` e `receiverId` siano corretti
        }
      )
      if (response.status === 200) {
        toast.success('Richiesta di amicizia inviata con successo!')
        setConnections(prevConnections =>
          prevConnections.map(connection =>
            connection.id === id
              ? { ...connection, friendshipStatus: 'PENDING' }
              : connection
          )
        )
      }
    } catch (error) {
      console.error(
        'Error sending friend request:',
        error.response ? error.response.data : error.message
      )
      if (error.response && error.response.status === 403) {
        toast.error('Richiesta di amicizia già inviata!')
      } else {
        toast.error("Errore nell'invio della richiesta di amicizia.")
      }
    } finally {
      setConnecting(null)
    }
  }

  // Gestione della rimozione di una richiesta di amicizia
  const handleRemoveFriendRequest = async id => {
    if (connecting === id) return

    setConnecting(id)
    try {
      const response = await axios.delete(
        'http://localhost:8080/api/friendships/cancel',
        {
          params: { requesterId: 1, receiverId: id }, // Assicurati che `requesterId` e `receiverId` siano corretti
        }
      )
      if (response.status === 200) {
        toast.success('Richiesta di amicizia annullata con successo!')
        setConnections(prevConnections =>
          prevConnections.map(connection =>
            connection.id === id
              ? { ...connection, friendshipStatus: 'NOT_FRIEND' }
              : connection
          )
        )
      }
    } catch (error) {
      console.error(
        'Error canceling friend request:',
        error.response ? error.response.data : error.message
      )
      toast.error('Errore nella cancellazione della richiesta di amicizia.')
    } finally {
      setConnecting(null)
    }
  }

  // Gestione dell'accettazione di una richiesta di amicizia
  const handleAcceptFriendRequest = async receiverId => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/friendships/accept',
        null,
        {
          params: { receiverId },
        }
      )
      toast.success('Richiesta di amicizia accettata con successo!')
      setConnections(prevConnections =>
        prevConnections.map(connection =>
          connection.id === receiverId
            ? { ...connection, friendshipStatus: 'ACCEPTED' }
            : connection
        )
      )
    } catch (error) {
      console.error('Error accepting friend request:', error)
      toast.error(
        error.response?.data ||
          "Errore durante l'accettazione della richiesta di amicizia"
      )
    }
  }

  // Gestione della modifica del termine di ricerca
  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  // Gestione del cambio di pagina
  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  // Apertura del dialogo dei dettagli
  const handleDetailDialogOpen = connection => {
    setSelectedConnection(connection)
    setDetailDialogOpen(true)
  }

  // Chiusura del dialogo dei dettagli
  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false)
    setSelectedConnection(null)
  }

  // Stato di caricamento
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 700 }}>
          Caricamento Connessioni
        </Typography>
        <Box
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 4,
            animation: `${fadeIn} 0.5s ease-in-out`,
          }}
        >
          <CircularProgress color="primary" size={60} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
            Caricamento in corso...
          </Typography>
        </Box>
      </Container>
    )
  }

  // Stato di errore
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 700 }}>
          Connessioni Recenti
        </Typography>
        <Box
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: '#ffe6e6',
            boxShadow: 4,
            animation: `${fadeIn} 0.5s ease-in-out`,
          }}
        >
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            sx={{ mb: 2, fontWeight: 500 }}
          >
            {error}
          </Alert>
          <Button variant="contained" color="error" onClick={fetchConnections}>
            Riprova
          </Button>
        </Box>
      </Container>
    )
  }

  // Calcolo della paginazione
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentConnections = filteredConnections.slice(
    indexOfFirstItem,
    indexOfLastItem
  )
  const totalPages = Math.ceil(filteredConnections.length / itemsPerPage)

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Box Connessioni */}
      <Box
        sx={{
          mt: { xs: 3, sm: 4 },
          mb: { xs: 4, sm: 6 },
          textAlign: 'center',
          py: { xs: 6, sm: 8 },
          px: { xs: 3, sm: 4 },
          bgcolor: theme => theme.palette.background.paper,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: theme => `1px solid ${theme.palette.divider}`,
          animation: `${fadeIn} 0.5s ease-in-out`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: theme => theme.palette.text.primary,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Nuove Connessioni
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: theme => theme.palette.text.secondary,
            fontWeight: 400,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
          }}
        >
          Scopri e connettiti con persone che condividono i tuoi interessi.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: { xs: '50px', sm: '70px' },
            borderBottomWidth: '4px',
            borderColor: theme => theme.palette.primary.main,
          }}
        />
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Cerca per nome o interesse..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Box>

      {/* Connessioni */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          {currentConnections.map(connection => (
            <Grid item xs={12} sm={6} md={4} key={connection.id}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={
                      connection.imageUrl || 'https://via.placeholder.com/160'
                    }
                    alt={connection.name}
                    sx={{ objectFit: 'cover' }} // Mantiene la proporzione
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {connection.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {connection.interests.join(', ')}
                      </Typography>
                    </Box>
                    <Box>{/* Spazio per le azioni */}</Box>
                  </CardContent>
                  <CardActions>
                    <Box sx={onlineStatusStyles}>
                      {connection.online ? (
                        <Tooltip title="Online">
                          <CircleIcon sx={statusIconStyles} color="success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Offline">
                          <CancelIcon sx={statusIconStyles} color="error" />
                        </Tooltip>
                      )}
                    </Box>
                    <IconButton
                      color="primary"
                      disabled={connecting === connection.id}
                      onClick={() => handleDetailDialogOpen(connection)}
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                    {connection.friendshipStatus === 'ACCEPTED' ? (
                      <Typography variant="body2" color="success">
                        Amico
                      </Typography>
                    ) : connection.friendshipStatus === 'PENDING' ? (
                      <>
                        <Typography variant="body2" color="warning">
                          Richiesta Inviata
                        </Typography>
                        <IconButton
                          color="primary"
                          disabled={connecting === connection.id}
                          onClick={() =>
                            handleRemoveFriendRequest(connection.id)
                          }
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        color="primary"
                        disabled={connecting === connection.id}
                        onClick={() => handleAddFriend(connection.id)}
                      >
                        <PersonAddIcon />
                      </IconButton>
                    )}
                    {connection.friendshipStatus === 'REQUESTED' && (
                      <IconButton
                        color="primary"
                        disabled={connecting === connection.id}
                        onClick={() => handleAcceptFriendRequest(connection.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Paginazione */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          sx={paginationButtonStyles}
        >
          Precedente
        </Button>
        <Typography variant="body1" sx={{ mx: 2, fontWeight: 600 }}>
          {currentPage} di {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          sx={paginationButtonStyles}
        >
          Successivo
        </Button>
      </Box>

      {/* Dialogo Dettagli */}
      <Dialog
        open={detailDialogOpen}
        onClose={handleDetailDialogClose}
        aria-labelledby="details-dialog-title"
      >
        <DialogTitle id="details-dialog-title">
          Dettagli Connessione
        </DialogTitle>
        <DialogContent>
          {selectedConnection && (
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {selectedConnection.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedConnection.interests.join(', ')}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedConnection.bio || 'Nessuna biografia disponibile.'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose}>Chiudi</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  )
}

export default Connections
