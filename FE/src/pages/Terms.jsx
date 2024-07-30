import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'
import { styled } from '@mui/system'
import { FileCopy, Description, Gavel } from '@mui/icons-material'

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

const Terms = () => {
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
        Termini e Condizioni
      </Typography>

      <IconSection>
        <FileCopy sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Accettazione dei Termini</SectionTitle>
          <SectionContent variant="body1">
            Utilizzando questo sito web, accetti di rispettare e essere
            vincolato dai seguenti termini e condizioni. Se non accetti questi
            termini, ti preghiamo di non utilizzare il sito.
          </SectionContent>
        </Box>
      </IconSection>

      <Divider sx={{ my: 4 }} />

      <IconSection>
        <Gavel sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Modifiche ai Termini</SectionTitle>
          <SectionContent variant="body1">
            Ci riserviamo il diritto di modificare questi termini e condizioni
            in qualsiasi momento. Le modifiche verranno pubblicate su questa
            pagina e saranno effettive immediatamente.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <Description sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Uso del Sito</SectionTitle>
          <SectionContent variant="body1">
            Il sito e il suo contenuto sono protetti da diritti d'autore e
            marchi. Non è consentito riprodurre, distribuire o modificare
            qualsiasi parte del sito senza il nostro consenso scritto.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <FileCopy sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">
            Limitazione di Responsabilità
          </SectionTitle>
          <SectionContent variant="body1">
            Non siamo responsabili per eventuali danni diretti, indiretti,
            incidentali o consequenziali derivanti dall'uso o dall'impossibilità
            di utilizzare il sito.
          </SectionContent>
        </Box>
      </IconSection>

      <IconSection>
        <Gavel sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <SectionTitle variant="h6">Legge Applicabile</SectionTitle>
          <SectionContent variant="body1">
            Questi termini sono regolati dalla legge italiana. Qualsiasi
            controversia derivante dall'uso del sito sarà risolta dai tribunali
            competenti di Padova.
          </SectionContent>
        </Box>
      </IconSection>

      <Typography variant="body1" paragraph sx={{ mt: 4, textAlign: 'center' }}>
        Ultimo aggiornamento: {currentDate}
      </Typography>
    </Container>
  )
}

export default Terms
