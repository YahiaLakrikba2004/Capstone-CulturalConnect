import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
} from '@mui/material'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: 'auto',
  maxWidth: 345,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 140,
  width: '100%',
  objectFit: 'cover',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}))

const Carousel = ({ items, title, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(items.length)
  const itemsPerPage = 3
  const carouselRef = useRef(null)

  // Duplicare gli elementi per la ripetizione continua
  const duplicatedItems = [...items, ...items, ...items]

  const handleNext = () => {
    if (carouselRef.current) {
      setCurrentIndex(prevIndex => {
        const newIndex = Math.min(
          prevIndex + itemsPerPage,
          duplicatedItems.length - itemsPerPage
        )
        carouselRef.current.style.transform = `translateX(-${
          (newIndex / itemsPerPage) * 100
        }%)`
        // Gestire il ritorno all'inizio
        if (newIndex >= items.length * 2) {
          setTimeout(() => {
            carouselRef.current.style.transition = 'none'
            setCurrentIndex(items.length)
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease'
            }, 50)
          }, 500)
        }
        return newIndex
      })
    }
  }

  const handlePrev = () => {
    if (carouselRef.current) {
      setCurrentIndex(prevIndex => {
        const newIndex = Math.max(prevIndex - itemsPerPage, 0)
        carouselRef.current.style.transform = `translateX(-${
          (newIndex / itemsPerPage) * 100
        }%)`
        // Gestire il ritorno alla fine
        if (newIndex < items.length) {
          setTimeout(() => {
            carouselRef.current.style.transition = 'none'
            setCurrentIndex(items.length * 2 - itemsPerPage)
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease'
            }, 50)
          }, 500)
        }
        return newIndex
      })
    }
  }

  // Set up an interval to automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [duplicatedItems.length])

  return (
    <Box>
      <Typography variant="h2" component="h2" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box
        className="carousel-container"
        sx={{ position: 'relative', overflow: 'hidden' }}
      >
        <Box
          ref={carouselRef}
          className="carousel-wrapper"
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <Box
              key={item.id + index}
              className="carousel-item"
              sx={{ flex: '0 0 auto', width: '33.33%', p: 1 }}
            >
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={item.imageUrl}
                  title={item.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  {item.date && (
                    <Typography variant="body2" color="textSecondary">
                      {item.date}
                    </Typography>
                  )}
                  {item.location && (
                    <Typography variant="body2" color="textSecondary">
                      {item.location}
                    </Typography>
                  )}
                  <Typography variant="body2" paragraph>
                    {item.description || item.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => item.onClick && item.onClick(item)}
                  >
                    {item.buttonText || 'Dettagli'}
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === items.length}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= duplicatedItems.length}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Carousel
