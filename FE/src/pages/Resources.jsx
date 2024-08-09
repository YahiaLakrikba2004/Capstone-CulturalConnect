import React from 'react'
import {
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled, useTheme } from '@mui/system'

const StyledCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}))

const StyledCardMedia = styled('img')(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
}))

const ModalContent = styled(Box)(({ theme }) => ({
  bgcolor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  p: 4,
  maxWidth: '90%',
  maxHeight: '80%',
  overflowY: 'auto',
  position: 'relative',
}))

const Resources = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedResource, setSelectedResource] = React.useState(null)
  const theme = useTheme()

  const resources = [
    {
      id: 1,
      title: 'Guida agli Eventi Locali',
      description:
        'Scopri come trovare e organizzare eventi locali con successo. Una guida completa per ogni esigenza.',
      imageUrl:
        'https://www.webepc.it/wp-content/webpc-passthru.php?src=https://www.webepc.it/wp-content/uploads/2023/12/il-mio-sito-wordpress-e-professionale.png&nocache=1',
      link: 'https://www.eventbrite.com/blog/guide-to-local-events-ds00/',
    },
    {
      id: 2,
      title: 'Strumenti per la Pianificazione di Eventi',
      description:
        'Esplora gli strumenti e le app migliori per gestire e promuovere i tuoi eventi in modo efficace.',
      imageUrl:
        'https://assets.asana.biz/transform/af148fbe-ea78-4c15-8db4-5c2d47d4b30d/article-marketing-event-planning-tools-2x',
      link: 'https://www.eventplanner.com/tools/',
    },
    {
      id: 3,
      title: 'Guide al Networking',
      description:
        'Leggi le nostre guide su come costruire e mantenere una rete professionale solida.',
      imageUrl:
        'https://www.millionaire.it/wp-content/uploads/2024/03/iStock-1485726179.jpg',
      link: 'https://www.forbes.com/sites/forbeshumanresourcescouncil/2020/03/10/how-to-build-and-maintain-your-professional-network/',
    },
    {
      id: 4,
      title: 'Piattaforme per Connessioni Professionali',
      description:
        'Scopri le migliori piattaforme online per fare networking e connetterti con professionisti del tuo settore.',
      imageUrl:
        'https://prod-images.dacast.com/wp-content/uploads/2022/11/12-Best-Professional-Video-Hosting-Platforms_-Choosing-the-Best-Solution-for-Business-2022-Update-1024x574.png',
      link: 'https://www.linkedin.com/',
    },
  ]

  const handleOpen = resource => {
    setSelectedResource(resource)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedResource(null)
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Sezione Iniziale */}
      <Box
        sx={{
          mt: 6,
          mb: 6,
          textAlign: 'center',
          py: 6,
          px: 4,
          bgcolor: theme.palette.background.default,
          borderRadius: 4,
          boxShadow: theme.shadows[3],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: '2.5rem',
          }}
        >
          Risorse Utili
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            fontWeight: 400,
            fontSize: '1.2rem',
          }}
        >
          Esplora una selezione curata di risorse per ampliare le tue conoscenze
          e capacità.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: '80px',
            borderBottomWidth: '4px',
            borderColor: theme.palette.primary.main,
          }}
        />
      </Box>

      {/* Risorse */}
      <Grid container spacing={4}>
        {resources.map(resource => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <StyledCard>
              <StyledCardMedia src={resource.imageUrl} alt={resource.title} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-start', px: 2, pb: 2 }}>
                <StyledButton
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleOpen(resource)}
                >
                  Maggiori dettagli
                </StyledButton>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Modal per dettagli aggiuntivi */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedResource?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedResource?.imageUrl && (
            <img
              src={selectedResource.imageUrl}
              alt={selectedResource.title}
              style={{
                width: '100%',
                height: 'auto',
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius,
                marginBottom: theme.spacing(2),
              }}
            />
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedResource?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            href={selectedResource?.link}
            target="_blank"
          >
            Leggi di più
          </Button>
          <Button onClick={handleClose} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Resources
