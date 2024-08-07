import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Recommendations = ({ recommendations }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ti potrebbe interessare
      </Typography>
      {recommendations.map((item) => (
        <Card key={item.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Recommendations;
