import React, { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: 400, 
  maxWidth: 345,
  minWidth: 200, 
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 150, 
  width: '100%', 
  objectFit: 'cover', 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Carousel = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const carouselRef = useRef(null);

  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (carouselRef.current) {
      setCurrentIndex(prevIndex => {
        const newIndex = Math.min(
          prevIndex + itemsPerPage,
          duplicatedItems.length - itemsPerPage
        );
        carouselRef.current.style.transform = `translateX(-${(newIndex / itemsPerPage) * 100}%)`;

        if (newIndex >= items.length * 2) {
          setTimeout(() => {
            carouselRef.current.style.transition = 'none';
            setCurrentIndex(items.length);
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease';
            }, 50);
          }, 500);
        }
        return newIndex;
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      setCurrentIndex(prevIndex => {
        const newIndex = Math.max(prevIndex - itemsPerPage, 0);
        carouselRef.current.style.transform = `translateX(-${(newIndex / itemsPerPage) * 100}%)`;

        if (newIndex < items.length) {
          setTimeout(() => {
            carouselRef.current.style.transition = 'none';
            setCurrentIndex(items.length * 2 - itemsPerPage);
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease';
            }, 50);
          }, 500);
        }
        return newIndex;
      });
    }
  };

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
              sx={{ flex: '0 0 auto', width: `${100 / itemsPerPage}%`, p: 1 }}
            >
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={item.imageUrl}
                  title={item.title}
                />
                <CardContent sx={{ height: 'calc(400px - 150px)', overflow: 'hidden' }}>
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
                <CardActions sx={{ marginTop: 'auto' }}> {/* Assicurati che le azioni siano posizionate correttamente */}
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
          disabled={currentIndex === 0}
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
  );
};

export default Carousel;
