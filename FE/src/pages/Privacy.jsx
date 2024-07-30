import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'
import { styled } from '@mui/system'
import { AccessTime, Lock, Shield } from '@mui/icons-material'

// Styled Components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}))

const SectionContent = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
}))

const IconSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
}))

const Privacy = () => {
  // Ottieni la data corrente nel formato '1 gennaio 2024'
  const currentDate = new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}
      >
        Politica sulla Privacy
      </Typography>

      <IconSection>
        <AccessTime sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Introduzione</SectionTitle>
          <SectionContent variant="body1">
            Benvenuto nella nostra Politica sulla Privacy. Qui spieghiamo come
            raccogliamo, utilizziamo e proteggiamo le tue informazioni
            personali. La tua privacy è importante per noi e ci impegniamo a
            garantire che le tue informazioni siano al sicuro.
          </SectionContent>
        </Box>
      </IconSection>

      <Divider sx={{ my: 4 }} />

      <IconSection>
        <Lock sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Raccolta delle Informazioni</SectionTitle>
          <SectionContent variant="body1">
            Raccogliamo informazioni personali quando ti registri, effettui un
            acquisto o interagisci con il nostro sito. Le informazioni possono
            includere nome, email, indirizzo e dettagli di pagamento.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <Shield sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Utilizzo delle Informazioni</SectionTitle>
          <SectionContent variant="body1">
            Utilizziamo le tue informazioni per fornire e migliorare i nostri
            servizi, gestire la tua registrazione e comunicare con te riguardo a
            offerte e aggiornamenti. Le informazioni possono essere utilizzate
            anche per scopi di analisi e marketing.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <Lock sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">
            Protezione delle Informazioni
          </SectionTitle>
          <SectionContent variant="body1">
            Implementiamo misure di sicurezza adeguate per proteggere le tue
            informazioni personali da accessi non autorizzati, modifiche e
            divulgazioni. Utilizziamo tecnologie avanzate per garantire la
            sicurezza dei dati.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <AccessTime sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Diritti dell'Utente</SectionTitle>
          <SectionContent variant="body1">
            Hai il diritto di accedere, correggere o cancellare le tue
            informazioni personali. Puoi contattarci per richiedere l'accesso ai
            tuoi dati o per esercitare i tuoi diritti in base alle leggi
            applicabili sulla protezione dei dati.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <AccessTime sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">
            Modifiche alla Politica sulla Privacy
          </SectionTitle>
          <SectionContent variant="body1">
            Ci riserviamo il diritto di modificare questa politica sulla
            privacy. Eventuali modifiche saranno pubblicate su questa pagina e
            avranno effetto immediato. Ti invitiamo a controllare periodicamente
            questa pagina per rimanere aggiornato.
          </SectionContent>
        </Box>
      </IconSection>

      <Typography variant="body1" paragraph sx={{ mt: 4, textAlign: 'center' }}>
        Ultimo aggiornamento: {currentDate}
      </Typography>
    </Container>
  )
}

export default Privacy
